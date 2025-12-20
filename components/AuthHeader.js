import { useSession, signIn, signOut } from 'next-auth/react';
import { LogOut, Shield, User, Settings, UserCog } from 'lucide-react';
import Link from 'next/link';

export default function AuthHeader() {
  const { data: session, status } = useSession();

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
    <div className="flex items-center gap-3">
      {(isCreator) && (
        <Link href="/podcasts" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Podcasts
        </Link>
      )}

      <Link href="/settings" className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2">
        <UserCog className="w-4 h-4" />
        Settings
      </Link>

      {isAdmin && (
        <Link href="/admin" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Admin
        </Link>
      )}

      <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">
            {session.user.name || session.user.email}
          </span>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500 capitalize">{userRole}</span>
          </div>
        </div>
        <button
          onClick={() => signOut()}
          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
