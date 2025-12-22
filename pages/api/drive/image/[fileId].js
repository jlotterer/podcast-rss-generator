import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { fileId } = req.query;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
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

    // Get file metadata first to set proper content type
    const metadata = await drive.files.get({
      fileId: fileId,
      fields: 'mimeType, name',
    });

    // Stream the file
    const response = await drive.files.get(
      { fileId: fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    // Set headers
    res.setHeader('Content-Type', metadata.data.mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.setHeader('Content-Disposition', `inline; filename="${metadata.data.name}"`);

    // Pipe the stream to response
    response.data.pipe(res);

  } catch (error) {
    console.error('Error fetching image from Google Drive:', error);

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
        details: 'You do not have permission to access this file. Please check sharing settings.'
      });
    }

    if (error.code === 404) {
      return res.status(404).json({
        error: 'File not found',
        details: 'The specified file could not be found. It may have been deleted or you may not have access.'
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch image from Google Drive',
      details: error.message || 'An unexpected error occurred'
    });
  }
}
