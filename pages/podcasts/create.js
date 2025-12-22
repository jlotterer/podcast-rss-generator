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
      <PageLayout
        title="Create New Podcast"
        subtitle="Set up your podcast with Google Drive integration"
      >
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Podcast Information Card */}
            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Podcast Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Podcast Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Awesome Podcast"
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="A brief description of your podcast..."
                    rows="4"
                    className="w-full px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Google Drive Integration Card */}
            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-6">Google Drive Integration</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Episode Folder *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.folderName}
                      readOnly
                      placeholder="Select a folder from Google Drive"
                      className="flex-1 px-4 py-2 bg-muted border border-input rounded-lg text-foreground cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowFolderBrowser(true)}
                      className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <FolderOpen className="w-5 h-5" />
                      Browse
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select the Google Drive folder containing your podcast episodes
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cover Art Image
                  </label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        placeholder="https://example.com/cover.jpg or browse from Drive"
                        className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
                      />
                      <button
                        type="button"
                        onClick={() => setShowImageBrowser(true)}
                        disabled={!formData.googleDriveFolderId}
                        className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ImageIcon className="w-5 h-5" />
                        Browse
                      </button>
                    </div>
                    {formData.coverImage && (
                      <div className="mt-4">
                        <img
                          src={formData.coverImage}
                          alt="Cover preview"
                          className="w-40 h-40 object-cover rounded-xl border-2 border-border"
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
                className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.googleDriveFolderId}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
