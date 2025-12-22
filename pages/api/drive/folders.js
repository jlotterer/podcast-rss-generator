import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { google } from 'googleapis';
import cache from '../../../lib/cache';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { parentId } = req.query;

  // Check cache first
  const cacheKey = `drive:folders:${session.user.id}:${parentId || 'root'}`;
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.status(200).json(cached);
  }

  try {
    // Create Google Drive client with user's OAuth tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: session.user.googleAccessToken,
      refresh_token: session.user.googleRefreshToken,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Build query
    let query = "mimeType='application/vnd.google-apps.folder' and trashed=false";
    if (parentId) {
      query += ` and '${parentId}' in parents`;
    } else {
      // If no parent, get root level folders
      query += " and 'root' in parents";
    }

    // Fetch folders
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, parents, modifiedTime)',
      orderBy: 'name',
      pageSize: 100,
    });

    const folders = response.data.files || [];

    const result = {
      folders,
      parent: parentId || 'root',
    };

    // Cache for 5 minutes
    cache.set(cacheKey, result, 5 * 60 * 1000);

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching folders from Google Drive:', error);

    // Provide more specific error messages
    if (error.code === 401 || error.message?.includes('invalid_grant')) {
      return res.status(401).json({
        error: 'Google Drive authentication expired',
        details: 'Please reconnect your Google Drive account in settings',
        needsReauth: true
      });
    }

    if (error.code === 403) {
      return res.status(403).json({
        error: 'Access denied',
        details: 'You do not have permission to access this folder. Please check sharing settings.'
      });
    }

    if (error.code === 404) {
      return res.status(404).json({
        error: 'Folder not found',
        details: 'The specified folder could not be found. It may have been deleted or you may not have access.'
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch folders from Google Drive',
      details: error.message || 'An unexpected error occurred'
    });
  }
}
