import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { hasPermission, USER_ROLES } from './roles';

// Wrapper to protect API routes with authentication
export function withAuth(handler, options = {}) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized - Please sign in' });
    }

    // Attach session to request for handler to use
    req.session = session;
    req.user = session.user;

    return handler(req, res);
  };
}

// Wrapper to protect API routes with role-based access control
export function withRole(handler, allowedRoles = []) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized - Please sign in' });
    }

    const userRole = session.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        error: 'Forbidden - Insufficient permissions',
        required: allowedRoles,
        current: userRole
      });
    }

    // Attach session to request for handler to use
    req.session = session;
    req.user = session.user;

    return handler(req, res);
  };
}

// Wrapper to protect API routes with permission-based access control
export function withPermission(handler, requiredPermission) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(401).json({ error: 'Unauthorized - Please sign in' });
    }

    const userRole = session.user.role;

    if (!hasPermission(userRole, requiredPermission)) {
      return res.status(403).json({
        error: 'Forbidden - Insufficient permissions',
        required: requiredPermission,
        current: userRole
      });
    }

    // Attach session to request for handler to use
    req.session = session;
    req.user = session.user;

    return handler(req, res);
  };
}

// Middleware for admin-only routes
export function withAdmin(handler) {
  return withRole(handler, [USER_ROLES.ADMIN]);
}

// Middleware for creator and admin routes
export function withCreator(handler) {
  return withRole(handler, [USER_ROLES.ADMIN, USER_ROLES.CREATOR]);
}

// Helper to get session in API routes
export async function getSession(req, res) {
  return await getServerSession(req, res, authOptions);
}
