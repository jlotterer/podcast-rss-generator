import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Podcast as PodcastIcon,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  ExternalLink,
  MoreVertical,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import ProtectedPage from '../components/ProtectedPage';
import PageLayout from '../components/PageLayout';
import { PodcastCardSkeleton } from '../components/SkeletonLoader';

export default function Podcasts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [episodeCounts, setEpisodeCounts] = useState({});

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      fetchPodcasts();
    } else if (status === 'authenticated' && !session?.user?.id) {
      // Session doesn't have user ID yet, this shouldn't happen but handle it
      console.error('Session missing user.id:', session);
      setLoading(false);
    }
  }, [status, session?.user?.id]);

  const fetchPodcasts = async () => {
    try {
      console.log('Fetching podcasts...');
      const res = await fetch('/api/podcasts');
      console.log('Podcasts response status:', res.status);

      if (res.ok) {
        const data = await res.json();
        console.log('Podcasts data:', data);
        setPodcasts(data.podcasts);

        // Fetch episode counts for each podcast
        data.podcasts.forEach(podcast => {
          fetchEpisodeCount(podcast.id);
        });
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Failed to fetch podcasts:', res.status, errorData);
      }
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEpisodeCount = async (podcastId) => {
    try {
      const res = await fetch(`/api/podcasts/${podcastId}/episodes`);
      if (res.ok) {
        const data = await res.json();
        setEpisodeCounts(prev => ({
          ...prev,
          [podcastId]: data.episodes.length
        }));
      }
    } catch (error) {
      console.error(`Error fetching episodes for podcast ${podcastId}:`, error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/podcasts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await fetchPodcasts();
        setDeleteConfirm(null);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete podcast');
      }
    } catch (error) {
      console.error('Error deleting podcast:', error);
      alert('Failed to delete podcast');
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
      <PageLayout onCreateClick={() => router.push('/podcasts/create')}>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900">My Podcasts</h2>
          <p className="text-gray-600 mt-1">Manage your podcast collection</p>
        </div>

        {/* Podcasts List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <PodcastCardSkeleton key={i} />
            ))}
          </div>
        ) : podcasts.length === 0 ? (
          <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-12 text-center">
            <PodcastIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No podcasts yet</h3>
            <p className="text-muted-foreground mb-6">Create your first podcast to get started</p>
            <button
              onClick={() => router.push('/podcasts/create')}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Podcast
            </button>
          </div>
        ) : (
            <div className="space-y-4">
              {podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="bg-card text-card-foreground rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Cover Art - square on left with rounded corners */}
                    <Link href={`/podcasts/${podcast.id}`} className="flex-shrink-0 p-3">
                      {podcast.coverImage ? (
                        <div className="relative w-full sm:w-40 aspect-square bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={podcast.coverImage}
                            alt={podcast.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"><svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg></div>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-40 aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center rounded-xl">
                          <PodcastIcon className="w-12 h-12 text-white" />
                        </div>
                      )}
                    </Link>

                    {/* Content on right */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <Link href={`/podcasts/${podcast.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
                              {podcast.name}
                            </h3>
                          </Link>
                          {podcast.description && (
                            <p className="text-gray-600 text-sm line-clamp-1 mb-2">{podcast.description}</p>
                          )}
                        </div>

                        {/* Three-dot menu */}
                        <div className="relative ml-4">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === podcast.id ? null : podcast.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="More options"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>

                          {openMenuId === podcast.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenMenuId(null)}
                              />
                              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                                <Link
                                  href={`/podcasts/${podcast.id}/edit`}
                                  onClick={() => setOpenMenuId(null)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </Link>
                                <button
                                  onClick={() => {
                                    setOpenMenuId(null);
                                    setDeleteConfirm(podcast.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-b-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Metadata grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        {podcast.author && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="font-medium">Creator:</span>
                            <span className="truncate">{podcast.author}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-700">
                          <FolderOpen className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Folder:</span>
                          <span className="font-mono text-xs truncate">{podcast.googleDriveFolderId}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Created:</span>
                          <span>{new Date(podcast.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <div className={`w-2 h-2 rounded-full ${
                            podcast.isActive ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="font-medium">Status:</span>
                          <span className={podcast.isActive ? 'text-green-700' : 'text-gray-600'}>
                            {podcast.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <PodcastIcon className="w-4 h-4 text-gray-500" />
                          <span className="font-medium">Episodes:</span>
                          <span className="text-gray-900">
                            {episodeCounts[podcast.id] !== undefined ? episodeCounts[podcast.id] : '...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-card text-card-foreground rounded-2xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Delete Podcast?</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this podcast? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-6 py-3 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </PageLayout>
    </ProtectedPage>
  );
}
