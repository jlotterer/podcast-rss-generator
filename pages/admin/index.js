import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Settings, ArrowLeft, CheckCircle2, XCircle, Info, Trash2, Podcast, Edit, User, Calendar, FolderOpen } from 'lucide-react';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deletingPodcastId, setDeletingPodcastId] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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

    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'podcasts') {
      fetchPodcasts();
    }
  }, [session, status, router, activeTab]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
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

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/admin/podcasts');

      if (!response.ok) {
        throw new Error('Failed to fetch podcasts');
      }

      const data = await response.json();
      setPodcasts(data.podcasts || []);
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole, userEmail) => {
    try {
      setUpdatingUserId(userId);
      setError('');
      setSuccessMessage('');

      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user role');
      }

      setSuccessMessage(`Updated ${userEmail} to ${newRole}`);
      await fetchUsers();
    } catch (err) {
      console.error('Error updating user role:', err);
      setError(err.message);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (!confirm(`Are you sure you want to delete user ${userEmail}? This will also delete all their podcasts and cannot be undone.`)) {
      return;
    }

    try {
      setDeletingUserId(userId);
      setError('');
      setSuccessMessage('');

      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user');
      }

      setSuccessMessage(`User ${userEmail} deleted successfully`);
      await fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleDeletePodcast = async (podcastId, podcastName) => {
    if (!confirm(`Are you sure you want to delete podcast "${podcastName}"? This cannot be undone.`)) {
      return;
    }

    try {
      setDeletingPodcastId(podcastId);
      setError('');
      setSuccessMessage('');

      const response = await fetch('/api/admin/podcasts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ podcastId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete podcast');
      }

      setSuccessMessage(`Podcast "${podcastName}" deleted successfully`);
      await fetchPodcasts();
    } catch (err) {
      console.error('Error deleting podcast:', err);
      setError(err.message);
    } finally {
      setDeletingPodcastId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors text-gray-700">
            <ArrowLeft className="w-4 h-4" />
            Back to Podcasts
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
                Manage users and platform content
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="font-medium text-gray-900">{session.user.email}</p>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white rounded-t-2xl shadow-lg border border-gray-200 border-b-0">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'users'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              Users ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('podcasts')}
              className={`flex-1 px-6 py-4 font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'podcasts'
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Podcast className="w-5 h-5" />
              All Podcasts ({podcasts.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-6 border border-gray-200">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-2">
              <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <>
              {users.length === 0 && !error && (
                <div className="p-12 bg-gray-50 rounded-lg text-center">
                  <Info className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No users found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Users will appear here when they sign in to the application
                  </p>
                </div>
              )}

              {users.length > 0 && (
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {user.role === 'admin' ? <Shield className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900">{user.name || user.email}</p>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{user.email}</p>

                            <div className="mb-3">
                              <label className="text-xs font-medium text-gray-700 block mb-1">Role</label>
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value, user.email)}
                                disabled={updatingUserId === user.id || session.user.id === user.id}
                                className={`text-sm px-3 py-1.5 border rounded-lg ${
                                  user.role === 'admin'
                                    ? 'border-purple-300 bg-purple-50 text-purple-700'
                                    : user.role === 'creator'
                                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 bg-gray-50 text-gray-700'
                                } ${
                                  updatingUserId === user.id || session.user.id === user.id
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'cursor-pointer hover:border-gray-400'
                                }`}
                                title={session.user.id === user.id ? 'Cannot change your own role' : 'Change user role'}
                              >
                                <option value="admin">Admin</option>
                                <option value="creator">Creator</option>
                                <option value="listener">Listener</option>
                              </select>
                            </div>

                            <div className="text-xs text-gray-500 space-y-1">
                              <p><span className="font-medium">User ID:</span> {user.id}</p>
                              <p className="flex items-center gap-1">
                                <Podcast className="w-3 h-3" />
                                <span className="font-medium">Podcasts:</span> {user.podcastCount || 0}
                              </p>
                              <p><span className="font-medium">Created:</span> {formatDate(user.createdAt)}</p>
                              <p><span className="font-medium">Last Access:</span> {formatDate(user.lastAccessedAt)}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          disabled={deletingUserId === user.id || session.user.id === user.id}
                          className={`ml-3 p-2 rounded-lg transition-colors flex-shrink-0 ${
                            session.user.id === user.id
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : deletingUserId === user.id
                              ? 'bg-gray-200 text-gray-400 cursor-wait'
                              : 'bg-red-100 text-red-600 hover:bg-red-200'
                          }`}
                          title={session.user.id === user.id ? 'Cannot delete yourself' : 'Delete user'}
                        >
                          {deletingUserId === user.id ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Podcasts Tab */}
          {activeTab === 'podcasts' && (
            <>
              {podcasts.length === 0 && !error && (
                <div className="p-12 bg-gray-50 rounded-lg text-center">
                  <Podcast className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No podcasts found</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Podcasts created by users will appear here
                  </p>
                </div>
              )}

              {podcasts.length > 0 && (
                <div className="space-y-3">
                  {podcasts.map((podcast) => (
                    <div
                      key={podcast.id}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{podcast.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              podcast.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                              {podcast.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          {podcast.description && (
                            <p className="text-sm text-gray-600 mb-3">{podcast.description}</p>
                          )}
                          <div className="text-xs text-gray-500 space-y-1">
                            <p className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span className="font-medium">Owner:</span> {podcast.user.name || podcast.user.email}
                            </p>
                            {podcast.author && (
                              <p className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span className="font-medium">Author:</span> {podcast.author}
                              </p>
                            )}
                            <p className="flex items-center gap-1">
                              <FolderOpen className="w-3 h-3" />
                              <span className="font-medium">Folder ID:</span>
                              <span className="font-mono text-xs">{podcast.googleDriveFolderId}</span>
                            </p>
                            <p className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span className="font-medium">Created:</span> {formatDate(podcast.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-3">
                          <Link
                            href={`/podcasts/${podcast.id}`}
                            className="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors"
                            title="View podcast"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDeletePodcast(podcast.id, podcast.name)}
                            disabled={deletingPodcastId === podcast.id}
                            className={`p-2 rounded-lg transition-colors ${
                              deletingPodcastId === podcast.id
                                ? 'bg-gray-200 text-gray-400 cursor-wait'
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                            title="Delete podcast"
                          >
                            {deletingPodcastId === podcast.id ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                            ) : (
                              <Trash2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
