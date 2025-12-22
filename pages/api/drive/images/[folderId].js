import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { google } from 'googleapis';
import cache from '../../../../lib/cache';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { folderId } = req.query;

  if (!folderId) {
    return res.status(400).json({ error: 'Folder ID is required' });
  }

  // Check cache first
  const cacheKey = `drive:images:${session.user.id}:${folderId}`;
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

    // Fetch all image files from the folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'image/')`,
      fields: 'files(id, name, mimeType, size, imageMediaMetadata, webContentLink, thumbnailLink)',
      orderBy: 'name',
      pageSize: 100,
    });

    const images = response.data.files || [];

    // Process images to include useful metadata
    const processedImages = images.map(image => ({
      id: image.id,
      name: image.name,
      mimeType: image.mimeType,
      size: parseInt(image.size) || 0,
      width: image.imageMediaMetadata?.width || 0,
      height: image.imageMediaMetadata?.height || 0,
      thumbnailLink: image.thumbnailLink,
      // Create a direct link that will work with our API
      directLink: `/api/drive/image/${image.id}`,
    }));

    // Find potential cover art candidates (square images, minimum 300x300)
    const coverArtCandidates = processedImages.filter(img => {
      const isSquare = img.width === img.height;
      const isLargeEnough = img.width >= 300 && img.height >= 300;
      const hasValidName = /cover|artwork|art|podcast/i.test(img.name);

      return isSquare && isLargeEnough;
    });

    // Sort candidates: prefer those with "cover" in name, then by size
    coverArtCandidates.sort((a, b) => {
      const aHasCoverName = /cover|artwork/i.test(a.name);
      const bHasCoverName = /cover|artwork/i.test(b.name);

      if (aHasCoverName && !bHasCoverName) return -1;
      if (!aHasCoverName && bHasCoverName) return 1;

      // If both have cover name or neither, prefer larger images
      return (b.width * b.height) - (a.width * a.height);
    });

    const result = {
      images: processedImages,
      coverArtCandidates,
      suggestedCover: coverArtCandidates[0] || null,
    };

    // Cache for 10 minutes (images don't change frequently)
    cache.set(cacheKey, result, 10 * 60 * 1000);

    return res.status(200).json(result);

  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);

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
      error: 'Failed to fetch images from Google Drive',
      details: error.message || 'An unexpected error occurred'
    });
  }
}
