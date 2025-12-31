import { google } from 'googleapis';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { id, fileId } = req.query;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' });
  }

  try {
    // Fetch podcast from database
    const podcast = await prisma.podcast.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            googleAccessToken: true,
            googleRefreshToken: true,
          },
        },
      },
    });

    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    // Check if podcast is active
    if (!podcast.isActive) {
      return res.status(404).json({ error: 'Podcast is not active' });
    }

    // Create Google Drive client with user's OAuth tokens
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: podcast.user.googleAccessToken,
      refresh_token: podcast.user.googleRefreshToken,
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Get file metadata
    const fileMetadata = await drive.files.get({
      fileId: fileId,
      fields: 'name, mimeType, size',
    });

    const { name, mimeType, size } = fileMetadata.data;

    // Stream the file
    const fileStream = await drive.files.get(
      {
        fileId: fileId,
        alt: 'media',
      },
      { responseType: 'stream' }
    );

    // Set appropriate headers
    res.setHeader('Content-Type', mimeType || 'audio/mpeg');
    res.setHeader('Content-Disposition', `inline; filename="${name}"`);
    if (size) {
      res.setHeader('Content-Length', size);
    }
    res.setHeader('Accept-Ranges', 'bytes');

    // Pipe the stream to the response
    fileStream.data.pipe(res);

  } catch (error) {
    console.error('Error streaming audio file:', error);
    return res.status(500).json({
      error: 'Failed to stream audio',
      details: error.message,
    });
  }
}
