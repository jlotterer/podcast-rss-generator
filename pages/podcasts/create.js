import { useState } from 'react';
import { useRouter } from 'next/router';
import { Save, Loader2, FolderOpen, Image as ImageIcon } from 'lucide-react';
import ProtectedPage from '../../components/ProtectedPage';
import PageLayout from '../../components/PageLayout';
import DriveFolderBrowser from '../../components/DriveFolderBrowser';
import DriveImageBrowser from '../../components/DriveImageBrowser';

export default function CreatePodcast() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showFolderBrowser, setShowFolderBrowser] = useState(false);
  const [showImageBrowser, setShowImageBrowser] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    googleDriveFolderId: '',
    folderName: '',
    coverImage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/podcasts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          googleDriveFolderId: formData.googleDriveFolderId,
          coverImage: formData.coverImage,
        }),
      });

      if (res.ok) {
        router.push('/podcasts');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create podcast');
      }
    } catch (error) {
      console.error('Error creating podcast:', error);
      alert('Failed to create podcast');
    } finally {
      setLoading(false);
    }
  };

  const handleFolderSelect = (folderId, folderName) => {
    setFormData({ ...formData, googleDriveFolderId: folderId, folderName });
    setShowFolderBrowser(false);
  };

  const handleImageSelect = (imageUrl) => {
    setFormData({ ...formData, coverImage: imageUrl });
    setShowImageBrowser(false);
  };

  return (
    <ProtectedPage>
      <PageLayout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Create New Podcast</h2>
            <p className="text-gray-600 mt-1">Set up your podcast with Google Drive integration</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Podcast Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Podcast Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Podcast Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Awesome Podcast"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="A brief description of your podcast..."
                    rows="4"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Google Drive Integration Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Google Drive Integration</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Episode Folder *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.folderName}
                      readOnly
                      placeholder="Select a folder from Google Drive"
                      className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowFolderBrowser(true)}
                      title="Browse your Drive folders"
                      className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex-shrink-0"
                    >
                      <FolderOpen className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Select the Google Drive folder containing your podcast episodes
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cover Art Image
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="https://example.com/cover.jpg or browse from Drive"
                        className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowImageBrowser(true)}
                        disabled={!formData.googleDriveFolderId}
                        title="Browse images from Drive folder"
                        className="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                    </div>
                    {formData.coverImage && (
                      <div className="mt-4">
                        <img
                          src={formData.coverImage}
                          alt="Cover preview"
                          className="w-40 h-40 object-cover rounded-xl border-2 border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.push('/podcasts')}
                className="flex-1 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.googleDriveFolderId}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create Podcast
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Folder Browser Modal */}
          {showFolderBrowser && (
            <DriveFolderBrowser
              onClose={() => setShowFolderBrowser(false)}
              onSelect={handleFolderSelect}
            />
          )}

          {/* Image Browser Modal */}
          {showImageBrowser && (
            <DriveImageBrowser
              folderId={formData.googleDriveFolderId}
              onClose={() => setShowImageBrowser(false)}
              onSelect={handleImageSelect}
            />
          )}
        </div>
      </PageLayout>
    </ProtectedPage>
  );
}
