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
      return getProfile(req, res, userId);
    case 'PUT':
      return updateProfile(req, res, userId);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// Get user profile
async function getProfile(req, res, userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        googleDriveFolderId: true,
        createdAt: true,
        lastAccessedAt: true,
        updatedAt: true,
        _count: {
          select: { podcasts: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
}

// Update user profile
async function updateProfile(req, res, userId) {
  try {
    const { name, googleDriveFolderId } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (googleDriveFolderId !== undefined) updateData.googleDriveFolderId = googleDriveFolderId;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        googleDriveFolderId: true,
        updatedAt: true,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
}
