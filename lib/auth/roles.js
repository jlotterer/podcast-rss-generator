// User role definitions and permissions
export const USER_ROLES = {
  ADMIN: 'admin',
  CREATOR: 'creator',
  LISTENER: 'listener',
};

// Permission definitions
export const PERMISSIONS = {
  // Admin permissions
  MANAGE_USERS: 'manage_users',
  VIEW_ALL_CONTENT: 'view_all_content',
  DELETE_CONTENT: 'delete_content',
  MANAGE_SETTINGS: 'manage_settings',

  // Creator permissions
  UPLOAD_EPISODES: 'upload_episodes',
  EDIT_OWN_EPISODES: 'edit_own_episodes',
  PUBLISH_EPISODES: 'publish_episodes',

  // Listener permissions
  VIEW_EPISODES: 'view_episodes',
  ACCESS_RSS: 'access_rss',
};

// Role permission mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_ALL_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.MANAGE_SETTINGS,
    PERMISSIONS.UPLOAD_EPISODES,
    PERMISSIONS.EDIT_OWN_EPISODES,
    PERMISSIONS.PUBLISH_EPISODES,
    PERMISSIONS.VIEW_EPISODES,
    PERMISSIONS.ACCESS_RSS,
  ],
  [USER_ROLES.CREATOR]: [
    PERMISSIONS.UPLOAD_EPISODES,
    PERMISSIONS.EDIT_OWN_EPISODES,
    PERMISSIONS.PUBLISH_EPISODES,
    PERMISSIONS.VIEW_EPISODES,
    PERMISSIONS.ACCESS_RSS,
  ],
  [USER_ROLES.LISTENER]: [
    PERMISSIONS.VIEW_EPISODES,
    PERMISSIONS.ACCESS_RSS,
  ],
};

// Check if user has specific permission
export function hasPermission(userRole, permission) {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
}

// Check if user has any of the specified permissions
export function hasAnyPermission(userRole, permissionList) {
  if (!userRole || !permissionList?.length) return false;
  return permissionList.some(permission => hasPermission(userRole, permission));
}

// Check if user has all of the specified permissions
export function hasAllPermissions(userRole, permissionList) {
  if (!userRole || !permissionList?.length) return false;
  return permissionList.every(permission => hasPermission(userRole, permission));
}

// Get user role from environment variables or database
export function getUserRole(email) {
  // Check environment variable for admin emails
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  const creatorEmails = process.env.CREATOR_EMAILS?.split(',').map(e => e.trim()) || [];

  if (adminEmails.includes(email)) {
    return USER_ROLES.ADMIN;
  }

  if (creatorEmails.includes(email)) {
    return USER_ROLES.CREATOR;
  }

  // Default role for authenticated users
  return USER_ROLES.LISTENER;
}

// Middleware helper to check if user is authenticated and has required role
export function requireRole(allowedRoles) {
  return (session) => {
    if (!session || !session.user) {
      return { authorized: false, error: 'Not authenticated' };
    }

    const userRole = session.user.role;
    const hasAccess = allowedRoles.includes(userRole);

    if (!hasAccess) {
      return {
        authorized: false,
        error: `Insufficient permissions. Required: ${allowedRoles.join(' or ')}`
      };
    }

    return { authorized: true };
  };
}

// Middleware helper to check if user has required permission
export function requirePermission(requiredPermission) {
  return (session) => {
    if (!session || !session.user) {
      return { authorized: false, error: 'Not authenticated' };
    }

    const userRole = session.user.role;
    const hasAccess = hasPermission(userRole, requiredPermission);

    if (!hasAccess) {
      return {
        authorized: false,
        error: `Insufficient permissions. Required: ${requiredPermission}`
      };
    }

    return { authorized: true };
  };
}
