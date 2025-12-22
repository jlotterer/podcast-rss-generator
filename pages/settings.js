import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { User, Save, Loader2, CheckCircle2, XCircle, BarChart3, Calendar, Clock, HardDrive, RefreshCw, Moon, Sun } from 'lucide-react';
import ProtectedPage from '../components/ProtectedPage';
import PageLayout from '../components/PageLayout';
import { useTheme } from '../components/ThemeProvider';

export default function Settings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    podcastCount: 0,
    createdAt: null,
    lastAccessedAt: null,
  });

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.user.name || '',
          email: data.user.email,
          role: data.user.role,
          podcastCount: data.user._count.podcasts,
          createdAt: data.user.createdAt,
          lastAccessedAt: data.user.lastAccessedAt,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleReconnectDrive = async () => {
    setReconnecting(true);
    setMessage(null);

    try {
      // Trigger re-authentication with Google
      const { signIn } = await import('next-auth/react');
      await signIn('google', {
        callbackUrl: '/settings',
        prompt: 'consent', // Force consent screen to get new tokens
      });
    } catch (error) {
      console.error('Error reconnecting Google Drive:', error);
      setMessage({ type: 'error', text: 'Failed to reconnect Google Drive' });
      setReconnecting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedPage>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage>
      <PageLayout
        title="Settings"
        subtitle="Manage your account and preferences"
        maxWidth="max-w-4xl"
      >

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            {/* User Information */}
            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold">User Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Enter your display name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed capitalize"
                  />
                  <p className="mt-1 text-sm text-gray-500">Role is managed by administrators</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Podcasts Created
                  </label>
                  <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                    {profile.podcastCount} podcast{profile.podcastCount !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            {/* Google Drive Integration */}
            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <HardDrive className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold">Google Drive Integration</h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Your Google Drive account is connected and used to access podcast audio files and cover art images.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Connected to: {profile.email}
                      </p>
                      <p className="text-xs text-blue-700">
                        You have granted access to browse folders and read files from your Google Drive
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Need to reconnect?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you're experiencing issues accessing Google Drive files or folders, reconnect your account to refresh the connection.
                  </p>
                  <button
                    type="button"
                    onClick={handleReconnectDrive}
                    disabled={reconnecting}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reconnecting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Reconnecting...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5" />
                        Reconnect Google Drive
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                {theme === 'dark' ? (
                  <Moon className="w-6 h-6 text-indigo-600" />
                ) : (
                  <Sun className="w-6 h-6 text-amber-600" />
                )}
                <h2 className="text-xl font-semibold">Appearance</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Theme
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setTheme('light')}
                      className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                        theme === 'light'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-blue-600' : 'text-gray-600'}`} />
                        <div className="text-left">
                          <div className={`font-medium ${theme === 'light' ? 'text-blue-900' : 'text-gray-900'}`}>
                            Light
                          </div>
                          <div className="text-xs text-gray-500">Bright and clean</div>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTheme('dark')}
                      className={`flex-1 px-6 py-4 rounded-xl border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-blue-600' : 'text-gray-600'}`} />
                        <div className="text-left">
                          <div className={`font-medium ${theme === 'dark' ? 'text-blue-900' : 'text-gray-900'}`}>
                            Dark
                          </div>
                          <div className="text-xs text-gray-500">Easy on the eyes</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold">Account Statistics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm font-medium text-blue-900">Member Since</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {profile.createdAt
                      ? `${Math.floor((new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60 * 24))} days ago`
                      : ''}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <h3 className="text-sm font-medium text-green-900">Last Active</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {profile.lastAccessedAt
                      ? new Date(profile.lastAccessedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Never'}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {profile.lastAccessedAt
                      ? new Date(profile.lastAccessedAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
      </PageLayout>
    </ProtectedPage>
  );
}
