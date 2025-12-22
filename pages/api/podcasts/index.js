import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'GET':
      return listPodcasts(req, res, userId, session.user.role);
    case 'POST':
      return createPodcast(req, res, userId);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// List podcasts (users see only their own)
async function listPodcasts(req, res, userId, userRole) {
  try {
    // Always filter by userId - users should only see their own podcasts
    // Admin panel has a separate endpoint for viewing all podcasts
    const podcasts = await prisma.podcast.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({ podcasts });
  } catch (error) {
    console.error('Error listing podcasts:', error);
    return res.status(500).json({ error: 'Failed to list podcasts' });
  }
}

// Create a new podcast
async function createPodcast(req, res, userId) {
  try {
    const {
      name,
      description,
      googleDriveFolderId,
      author,
      email,
      coverImage,
    } = req.body;

    // Validate required fields
    if (!name || !googleDriveFolderId) {
      return res.status(400).json({ error: 'Name and Google Drive folder ID are required' });
    }

    const podcast = await prisma.podcast.create({
      data: {
        name,
        description: description || null,
        googleDriveFolderId,
        author: author || null,
        email: email || null,
        coverImage: coverImage || null,
        userId,
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    return res.status(201).json({ podcast });
  } catch (error) {
    console.error('Error creating podcast:', error);
    return res.status(500).json({ error: 'Failed to create podcast' });
  }
}
