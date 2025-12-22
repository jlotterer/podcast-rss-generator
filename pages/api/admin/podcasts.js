import { withAdmin } from '../../../lib/auth/middleware';
import prisma from '../../../lib/prisma';

async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetAllPodcasts(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeletePodcast(req, res);
  } else if (req.method === 'PUT') {
    return handleUpdatePodcast(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

// Get all podcasts across all users (admin only)
async function handleGetAllPodcasts(req, res) {
  try {
    const podcasts = await prisma.podcast.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({ podcasts });
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    return res.status(500).json({ error: 'Failed to fetch podcasts' });
  }
}

// Delete a podcast (admin only)
async function handleDeletePodcast(req, res) {
  try {
    const { podcastId } = req.body;

    if (!podcastId) {
      return res.status(400).json({ error: 'Podcast ID is required' });
    }

    await prisma.podcast.delete({
      where: { id: podcastId },
    });

    return res.status(200).json({
      success: true,
      message: 'Podcast deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting podcast:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    return res.status(500).json({ error: 'Failed to delete podcast' });
  }
}

// Update podcast status (admin only)
async function handleUpdatePodcast(req, res) {
  try {
    const { podcastId, isActive } = req.body;

    if (!podcastId) {
      return res.status(400).json({ error: 'Podcast ID is required' });
    }

    const podcast = await prisma.podcast.update({
      where: { id: podcastId },
      data: { isActive },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Podcast updated successfully',
      podcast,
    });
  } catch (error) {
    console.error('Error updating podcast:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Podcast not found' });
    }

    return res.status(500).json({ error: 'Failed to update podcast' });
  }
}

export default withAdmin(handler);
