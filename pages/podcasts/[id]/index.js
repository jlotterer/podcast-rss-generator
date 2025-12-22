import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, Edit, Loader2, FolderOpen, User, Mail, Calendar, Play, Pause, Rss, Copy, Check, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import ProtectedPage from '../../../components/ProtectedPage';
import AuthHeader from '../../../components/AuthHeader';

const EpisodeItem = ({ episode, isPlaying, onTogglePlay }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200/80 hover:bg-gray-50 transition-all duration-200 ease-in-out">
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onTogglePlay(episode.id)}
        className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-full shadow-sm hover:bg-blue-100 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current" />}
      </button>
      <div>
        <h4 className="font-semibold text-gray-800">{episode.title}</h4>
        <p className="text-sm text-gray-500">{new Date(episode.pubDate).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
);

export default function PodcastView() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [copied, setCopied] = useState(false);
  const [rssUrl, setRssUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(10);
  const audioRef = useRef(null);

  useEffect(() => {
    if (id && status === 'authenticated') {
      fetchPodcast();
      fetchEpisodes();
    }
  }, [id, status]);

  useEffect(() => {
    if (typeof window !== 'undefined' && id) {
      setRssUrl(`${window.location.origin}/api/rss/${id}`);
    }
  }, [id]);

  useEffect(() => {
    if (currentlyPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentlyPlaying]);

  const fetchPodcast = async () => {
    try {
      const res = await fetch(`/api/podcasts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPodcast(data.podcast);
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

  const fetchEpisodes = async () => {
    setLoadingEpisodes(true);
    try {
      const res = await fetch(`/api/podcasts/${id}/episodes`);
      if (res.ok) {
        const data = await res.json();
        setEpisodes(data.episodes);
      }
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  const handleTogglePlay = (episodeId) => {
    const episode = episodes.find(ep => ep.id === episodeId);
    if (!episode) return;

    if (currentlyPlaying?.id === episodeId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(episode);
    }
  };

  const copyToClipboard = () => {
    if (rssUrl) {
      navigator.clipboard.writeText(rssUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  if (!podcast) {
    return null;
  }

  const currentAudioSrc = currentlyPlaying?.audioUrl || '';

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <Link
              href="/podcasts"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Podcasts
            </Link>
            <AuthHeader />
          </div>

          {/* Audio player element, hidden but functional */}
          <audio
            ref={audioRef}
            src={currentAudioSrc}
            onEnded={() => setCurrentlyPlaying(null)}
            key={currentAudioSrc}
          />

          {/* Podcast Header */}
          <header className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center border border-gray-200/80">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 text-left">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{podcast.name}</h1>
                {podcast.description && (
                  <p className="text-gray-600">{podcast.description}</p>
                )}
                <div className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${
                  podcast.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {podcast.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <Link
                href={`/podcasts/${podcast.id}/edit`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit
              </Link>
            </div>
          </header>

          {/* RSS Feed Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Rss className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">RSS Feed</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={rssUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono text-gray-900"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Episodes Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Episodes</h2>
              <button
                onClick={fetchEpisodes}
                disabled={loadingEpisodes}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loadingEpisodes ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {loadingEpisodes ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : episodes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">No episodes found</p>
                <p className="text-sm text-gray-500">
                  Add audio files to the Google Drive folder to see them here
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {episodes
                    .slice((currentPage - 1) * episodesPerPage, currentPage * episodesPerPage)
                    .map((episode) => (
                      <EpisodeItem
                        key={episode.id}
                        episode={episode}
                        isPlaying={currentlyPlaying?.id === episode.id}
                        onTogglePlay={handleTogglePlay}
                      />
                    ))}
                </div>

                {/* Pagination Controls */}
                {episodes.length > episodesPerPage && (
                  <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600">
                      Showing {((currentPage - 1) * episodesPerPage) + 1} to{' '}
                      {Math.min(currentPage * episodesPerPage, episodes.length)} of{' '}
                      {episodes.length} episodes
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(episodes.length / episodesPerPage), prev + 1))}
                        disabled={currentPage >= Math.ceil(episodes.length / episodesPerPage)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
}
