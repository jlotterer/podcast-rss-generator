import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RefreshCw, Upload, Settings, Rss, Copy, Check, Play, Pause, Loader2, Info, CheckCircle2, XCircle } from 'lucide-react';
import ProtectedPage from '../components/ProtectedPage';
import AuthHeader from '../components/AuthHeader';

// A simple component for a single episode
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


export default function Home({ podcastTitle, podcastImage }) {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rssFeedUrl, setRssFeedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Audio playback state and ref
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Set the RSS feed URL based on the current domain
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setRssFeedUrl(`${origin}/api/rss`); // Set the full RSS URL
      // Fetch episodes on initial load
      fetchEpisodes(); 
    }
  }, []);
  
  // Effect to control the audio element
  useEffect(() => {
    if (currentlyPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentlyPlaying]);
  
  const fetchEpisodes = async () => {
    setIsLoading(true);
    setError('');
    try {
      // It's better to have a dedicated JSON endpoint for the frontend
      const response = await fetch(`/api/episodes`); 
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch episodes. Status: ${response.status}. Details: ${errorText}`);
      }
      
      const data = await response.json();
      setEpisodes(data.episodes || []); // Expecting a JSON object with an 'episodes' array
      
    } catch (err) {
      console.error(err);
      setError(err.message);
      setEpisodes([]); // Clear episodes on error
    }
    setIsLoading(false);
  };

  const copyRSSUrl = async () => {
    if (!rssFeedUrl) return;
    try {
      await navigator.clipboard.writeText(rssFeedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy RSS URL: ', err);
      alert('Failed to copy URL.');
    }
  };

  const togglePlayback = (episodeId) => {
    const episode = episodes.find(e => e.id === episodeId);
    if (!episode) return;
  
    if (currentlyPlaying?.id === episodeId) {
      // If the same episode is clicked, pause it
      setCurrentlyPlaying(null);
    } else {
      // If a new episode is clicked, play it
      setCurrentlyPlaying(episode);
    }
  };

  const currentAudioSrc = currentlyPlaying?.audioUrl || '';

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* User Auth Header */}
          <div className="mb-6 flex justify-end">
            <AuthHeader />
          </div>

          {/* Audio player element, hidden but functional */}
          <audio
              ref={audioRef}
              src={currentAudioSrc}
              onEnded={() => setCurrentlyPlaying(null)} // Reset when track finishes
              key={currentAudioSrc} // Force re-render on src change
          />

          {/* Header */}
          <header className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center border border-gray-200/80">
          {podcastImage && (
            <div className="mb-6 mx-auto w-40 h-40 sm:w-48 sm:h-48 relative shadow-md rounded-2xl overflow-hidden">
              <Image src={podcastImage} alt={`${podcastTitle} cover art`} layout="fill" objectFit="cover" />
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            {podcastTitle}
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            Your personal podcast, powered by Google Drive.
          </p>
          
          <div className="bg-gray-100 border border-gray-200/80 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Rss className="text-blue-600 w-6 h-6 mr-2" />
              <span className="text-blue-800 font-medium">Your Public RSS Feed</span>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <code className="text-blue-600 font-mono text-sm break-all">{rssFeedUrl || 'Loading...'}</code>
                <button
                  onClick={copyRSSUrl} 
                  className="ml-4 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  aria-label="Copy RSS Feed URL"
                >
                  {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-blue-600" />}
                </button>
              </div>
            </div>
            <p className="text-sm text-blue-700">
              Add this URL to your favorite podcast app to start listening!
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid lg:grid-cols-5 gap-8">
          
          {/* Episodes List (Left/Main Column) */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6 border border-gray-200/80">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Latest Episodes
                </h2>
                <button
                  onClick={fetchEpisodes}
                  disabled={isLoading}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              <div className="space-y-4">
                {isLoading && (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {error && (
                  <div className="flex flex-col items-center justify-center text-center p-6 bg-red-50 text-red-700 rounded-lg">
                    <XCircle className="w-12 h-12 mb-4" />
                    <p className="font-semibold">Failed to load episodes</p>
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                {!isLoading && !error && episodes.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 text-gray-500 rounded-lg">
                    <Info className="w-12 h-12 mb-4" />
                    <p className="font-semibold">No episodes found</p>
                    <p className="text-sm">Add audio files to your Google Drive folder to get started.</p>
                  </div>
                )}
                {episodes.map(episode => (
                  <EpisodeItem
                    key={episode.id}
                    episode={episode}
                    isPlaying={currentlyPlaying?.id === episode.id}
                    onTogglePlay={togglePlayback}
                  />
                ))}
              </div>
          </div>

          {/* Instructions (Right/Side Column) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/80">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                How It Works
              </h2>
              <div className="space-y-4 text-gray-600 text-sm">
                  <p>This tool automatically generates a podcast RSS feed from audio files in a specified Google Drive folder.</p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Audio files are stored in a Google Drive folder.</li>
                    <li>This application reads the files from that folder via the Google Drive API.</li>
                    <li>It generates a valid RSS feed URL that you can use in any podcast player.</li>
                    <li>The homepage provides a simple player to preview your episodes.</li>
                  </ol>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200/80">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Upload className="w-6 h-6 mr-2" />
                    Setup Status
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />
                    <span>Frontend application is running.</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    {error ? <XCircle className="w-5 h-5 mr-3 text-red-500" /> : <CheckCircle2 className="w-5 h-5 mr-3 text-green-500" />}
                    <span>Connection to Google Drive API.</span>
                  </div>
                </div>
            </div>
          </div>
        </main>
        </div>
      </div>
    </ProtectedPage>
  );
}

export async function getServerSideProps() {
  // Fetch podcast metadata from environment variables on the server
  const podcastTitle = process.env.PODCAST_TITLE || 'My Automated Podcast';
  const podcastImage = process.env.PODCAST_IMAGE || null; // Use null if not set

  return {
    props: {
      podcastTitle,
      podcastImage,
    },
  };
}
