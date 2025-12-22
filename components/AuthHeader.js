import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LogOut, Shield, User, Settings, UserCog, ChevronDown, Podcast as PodcastIcon, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AuthHeader({ onCreateClick }) {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn('google')}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Sign In
      </button>
    );
  }

  const userRole = session.user.role || 'listener';
  const isAdmin = userRole === 'admin';
  const isCreator = userRole === 'creator' || isAdmin;

  return (
    <div className="flex items-center gap-2">
      {/* Material Design Icons */}
      <Link
        href="/podcasts"
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        title="My Podcasts"
      >
        <PodcastIcon className="w-5 h-5 text-gray-700" />
      </Link>

      {onCreateClick && (
        <button
          onClick={onCreateClick}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          title="Create New Podcast"
        >
          <Plus className="w-5 h-5 text-gray-700" />
        </button>
      )}

      <Link
        href="/settings"
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        title="Settings"
      >
        <Settings className="w-5 h-5 text-gray-700" />
      </Link>

      {/* User Profile Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-10 h-10 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          title={session.user.name || session.user.email}
        >
          {/* User Avatar */}
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || session.user.email}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
              {(session.user.name || session.user.email || 'U')[0].toUpperCase()}
            </div>
          )}
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <>
            {/* Backdrop to close dropdown when clicking outside */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />

            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
              <div className="p-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.user.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session.user.email}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/settings"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserCog className="w-4 h-4" />
                  Settings
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => {
                    setShowDropdown(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
