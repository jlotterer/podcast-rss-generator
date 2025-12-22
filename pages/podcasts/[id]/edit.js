import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, CheckCircle2, XCircle, AlertCircle, Image as ImageIcon, FolderOpen } from 'lucide-react';
import ProtectedPage from '../../../components/ProtectedPage';
import AuthHeader from '../../../components/AuthHeader';
import DriveImageBrowser from '../../../components/DriveImageBrowser';
import DriveFolderBrowser from '../../../components/DriveFolderBrowser';
import { extractDriveFolderId } from '../../../lib/utils/driveHelpers';

export default function PodcastEdit() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [folderIdError, setFolderIdError] = useState('');
  const [showImageBrowser, setShowImageBrowser] = useState(false);
  const [showFolderBrowser, setShowFolderBrowser] = useState(false);
  const [autoDetectingCover, setAutoDetectingCover] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImage: '',
    googleDriveFolderId: '',
    author: '',
    email: '',
    isActive: true,
  });

  useEffect(() => {
    if (id && status === 'authenticated') {
      fetchPodcast();
    }
  }, [id, status]);

  const fetchPodcast = async () => {
    try {
      const res = await fetch(`/api/podcasts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.podcast.name,
          description: data.podcast.description || '',
          coverImage: data.podcast.coverImage || '',
          googleDriveFolderId: data.podcast.googleDriveFolderId,
          author: data.podcast.author || '',
          email: data.podcast.email || '',
          isActive: data.podcast.isActive,
        });
      } else {
        router.push('/podcasts');
      }
    } catch (error) {
      console.error('Error fetching podcast:', error);
      router.push('/podcasts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setFolderIdError('');

    try {
      // Extract folder ID from URL or validate existing ID
      let folderId = formData.googleDriveFolderId;
      try {
        folderId = extractDriveFolderId(formData.googleDriveFolderId);
      } catch (err) {
        setFolderIdError(err.message);
        setMessage({ type: 'error', text: 'Invalid Google Drive folder URL or ID' });
        setSaving(false);
        return;
      }

      const res = await fetch(`/api/podcasts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          googleDriveFolderId: folderId,
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Podcast updated successfully!' });
        setTimeout(() => {
          router.push(`/podcasts/${id}`);
        }, 1500);
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error || 'Failed to update podcast' });
      }
    } catch (error) {
      console.error('Error updating podcast:', error);
      setMessage({ type: 'error', text: 'Failed to update podcast' });
    } finally {
      setSaving(false);
    }
  };

  const handleFolderIdChange = (value) => {
    setFormData({ ...formData, googleDriveFolderId: value });
    setFolderIdError('');
    setMessage(null);
  };

  const autoDetectCoverArt = async (folderId) => {
    setAutoDetectingCover(true);

    try {
      const res = await fetch(`/api/drive/images/${folderId}`);

      if (res.ok) {
        const data = await res.json();

        if (data.suggestedCover) {
          setFormData(prev => ({
            ...prev,
            coverImage: data.suggestedCover.directLink,
          }));
        }
      }
    } catch (error) {
      console.error('Error auto-detecting cover art:', error);
    } finally {
      setAutoDetectingCover(false);
    }
  };

  const handleImageSelect = (imageUrl, imageData) => {
    setFormData(prev => ({
      ...prev,
      coverImage: imageUrl,
    }));
  };

  const handleBrowseImages = () => {
    try {
      const folderId = extractDriveFolderId(formData.googleDriveFolderId);
      setShowImageBrowser(true);
    } catch (err) {
      setFolderIdError(err.message);
      setMessage({ type: 'error', text: 'Please enter a valid Google Drive folder URL or ID first' });
    }
  };

  const handleFolderSelect = async (folderId, folderData) => {
    setFormData(prev => ({
      ...prev,
      googleDriveFolderId: folderId,
    }));
    setFolderIdError('');
    setMessage(null);

    await autoDetectCoverArt(folderId);
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
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <Link
              href={`/podcasts/${id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Podcast
            </Link>
            <AuthHeader />
          </div>

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

          {/* Edit Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Podcast</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Podcast Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Image URL
                </label>
                <div className="flex gap-2">
                  <div className="flex-shrink-0">
                    {formData.coverImage ? (
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-300">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="https://example.com/podcast-cover.jpg or browse from Drive"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleBrowseImages}
                        disabled={!formData.googleDriveFolderId || autoDetectingCover}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {autoDetectingCover ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <FolderOpen className="w-4 h-4" />
                        )}
                        Browse Drive
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Public URL to your podcast cover art (recommended: 1400x1400px or larger, square)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Drive Folder URL or ID *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.googleDriveFolderId}
                    onChange={(e) => handleFolderIdChange(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/1abc... or just the folder ID"
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm ${
                      folderIdError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowFolderBrowser(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <FolderOpen className="w-4 h-4" />
                    Browse Folders
                  </button>
                </div>
                {folderIdError ? (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {folderIdError}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">
                    Paste the full Google Drive URL or just the folder ID, or browse your Drive folders
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  Inactive podcasts won't appear in RSS feeds
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Link
                  href={`/podcasts/${id}`}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Drive Folder Browser Modal */}
      {showFolderBrowser && (
        <DriveFolderBrowser
          onSelect={handleFolderSelect}
          onClose={() => setShowFolderBrowser(false)}
          currentFolderId={formData.googleDriveFolderId}
        />
      )}

      {/* Drive Image Browser Modal */}
      {showImageBrowser && formData.googleDriveFolderId && (
        <DriveImageBrowser
          folderId={extractDriveFolderId(formData.googleDriveFolderId)}
          onSelect={handleImageSelect}
          onClose={() => setShowImageBrowser(false)}
          currentImage={formData.coverImage}
        />
      )}
    </ProtectedPage>
  );
}
