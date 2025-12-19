import { withAdmin } from '../../../lib/auth/middleware';
import { getUserRole } from '../../../lib/auth/roles';

async function handler(req, res) {
  if (req.method === 'GET') {
    return handleGetUsers(req, res);
  } else if (req.method === 'POST') {
    return handleUpdateUserRole(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleGetUsers(req, res) {
  try {
    // In a real application, this would query a database
    // For now, we'll return the users from environment variables
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
    const creatorEmails = process.env.CREATOR_EMAILS?.split(',').map(e => e.trim()) || [];

    const users = [
      ...adminEmails.map(email => ({ email, role: 'admin' })),
      ...creatorEmails.map(email => ({ email, role: 'creator' })),
    ];

    return res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function handleUpdateUserRole(req, res) {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({ error: 'Email and role are required' });
    }

    if (!['admin', 'creator', 'listener'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // In a real application, this would update a database
    // For now, return a message instructing to update environment variables
    return res.status(200).json({
      message: 'To update user roles, please modify the ADMIN_EMAILS or CREATOR_EMAILS environment variables in .env.local',
      note: 'In production, implement a proper user database',
      email,
      role,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ error: 'Failed to update user role' });
  }
}

export default withAdmin(handler);
