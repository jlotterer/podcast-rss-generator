import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';
import { google } from 'googleapis';
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

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

    // Check permissions (admins can see all, users only their own)
    if (session.user.role !== 'admin' && podcast.userId !== session.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
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

    // Fetch audio files from the podcast's Google Drive folder
    const response = await drive.files.list({
      q: `'${podcast.googleDriveFolderId}' in parents and (mimeType contains 'audio/')`,
      fields: 'files(id, name, size, createdTime, webContentLink)',
      orderBy: 'createdTime desc',
    });

    const audioFiles = response.data.files || [];

    const episodes = audioFiles.map(file => {
      const audioUrl = `/api/podcasts/${id}/play?fileId=${file.id}`;
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');

      return {
        id: file.id,
        title: title,
        audioUrl: audioUrl,
        pubDate: file.createdTime,
        fileSize: file.size,
      };
    });

    return res.status(200).json({ episodes });

  } catch (error) {
    console.error('Error fetching podcast episodes:', error);
    return res.status(500).json({
      error: 'Failed to fetch episodes',
      details: error.message,
    });
  }
}
