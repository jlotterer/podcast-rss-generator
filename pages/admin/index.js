import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Settings, ArrowLeft, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    if (session.user.role !== 'admin') {
      router.push('/');
      return;
    }

    fetchUsers();
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <a className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors text-gray-700">
              <ArrowLeft className="w-4 h-4" />
              Back to Podcast
            </a>
          </Link>
        </div>

        <header className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-600" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage users and system settings
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-medium text-gray-900">{session.user.email}</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              User Management
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Error loading users</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {users.length === 0 && !error && (
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No users configured yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Add user emails to the ADMIN_EMAILS or CREATOR_EMAILS environment variables
                </p>
              </div>
            )}

            {users.length > 0 && (
              <div className="space-y-3">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {user.role === 'admin' ? <Shield className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.email}</p>
                        <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-gray-600" />
              Configuration Guide
            </h2>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Managing User Roles</h3>
                <p className="mb-3">
                  To add or modify user roles, update these environment variables in your .env.local file:
                </p>
                <div className="bg-white p-3 rounded border border-blue-200 font-mono text-xs space-y-1">
                  <div>ADMIN_EMAILS=user1@example.com,user2@example.com</div>
                  <div>CREATOR_EMAILS=creator@example.com</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Role Permissions</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-purple-900">Admin:</span>
                      <span className="text-gray-600"> Full access to all features, user management, and settings</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-blue-900">Creator:</span>
                      <span className="text-gray-600"> Can upload and manage podcast episodes</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-900">Listener:</span>
                      <span className="text-gray-600"> Can view and listen to podcast content</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Production Recommendation</h3>
                <p className="text-yellow-800">
                  For production use, consider implementing a proper database to store user roles instead of environment variables. This will allow dynamic user management through this admin interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
