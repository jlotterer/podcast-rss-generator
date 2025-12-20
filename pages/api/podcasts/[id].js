import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const userId = session.user.id;
  const userRole = session.user.role;

  switch (req.method) {
    case 'GET':
      return getPodcast(req, res, id, userId, userRole);
    case 'PUT':
      return updatePodcast(req, res, id, userId, userRole);
    case 'DELETE':
      return deletePodcast(req, res, id, userId, userRole);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// Get a single podcast
async function getPodcast(req, res, id, userId, userRole) {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    // Check permissions (admins can see all, users only their own)
    if (userRole !== 'admin' && podcast.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    return res.status(200).json({ podcast });
  } catch (error) {
    console.error('Error fetching podcast:', error);
    return res.status(500).json({ error: 'Failed to fetch podcast' });
  }
}

// Update a podcast
async function updatePodcast(req, res, id, userId, userRole) {
  try {
    // First, check if podcast exists and user has permission
    const existingPodcast = await prisma.podcast.findUnique({
      where: { id },
    });

    if (!existingPodcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    if (userRole !== 'admin' && existingPodcast.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const {
      name,
      description,
      googleDriveFolderId,
      author,
      email,
      coverImage,
      isActive,
    } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (googleDriveFolderId !== undefined) updateData.googleDriveFolderId = googleDriveFolderId;
    if (author !== undefined) updateData.author = author;
    if (email !== undefined) updateData.email = email;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (isActive !== undefined) updateData.isActive = isActive;

    const podcast = await prisma.podcast.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({ podcast });
  } catch (error) {
    console.error('Error updating podcast:', error);
    return res.status(500).json({ error: 'Failed to update podcast' });
  }
}

// Delete a podcast
async function deletePodcast(req, res, id, userId, userRole) {
  try {
    // First, check if podcast exists and user has permission
    const existingPodcast = await prisma.podcast.findUnique({
      where: { id },
    });

    if (!existingPodcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    if (userRole !== 'admin' && existingPodcast.userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await prisma.podcast.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Podcast deleted successfully' });
  } catch (error) {
    console.error('Error deleting podcast:', error);
    return res.status(500).json({ error: 'Failed to delete podcast' });
  }
}
