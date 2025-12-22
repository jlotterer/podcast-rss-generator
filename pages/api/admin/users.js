import { withAdmin } from '../../../lib/auth/middleware';
import { getUserRole } from '../../../lib/auth/roles';
import prisma from '../../../lib/prisma';

async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetUsers(req, res);
  } else if (req.method === 'POST') {
    return handleUpdateUserRole(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteUser(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleGetUsers(req, res) {
  try {
    // Fetch all users from database with podcast counts
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        lastAccessedAt: true,
        updatedAt: true,
        _count: {
          select: {
            podcasts: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Transform to include podcast count at top level
    const usersWithCounts = users.map(user => ({
      ...user,
      podcastCount: user._count.podcasts,
      _count: undefined, // Remove the nested _count object
    }));

    return res.status(200).json({ users: usersWithCounts });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function handleUpdateUserRole(req, res) {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ error: 'User ID and role are required' });
    }

    if (!['admin', 'creator', 'listener'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Update user role in database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(500).json({ error: 'Failed to update user role' });
  }
}

async function handleDeleteUser(req, res) {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Delete the user from the database
    // This will cascade delete their podcasts due to onDelete: Cascade in schema
    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(500).json({ error: 'Failed to delete user' });
  }
}

export default withAdmin(handler);
