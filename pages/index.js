import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { RefreshCw, Upload, Settings, Rss, ExternalLink, Copy, Check, AlertCircle, Play, Pause } from 'lucide-react';

// A simple component for a single episode
const EpisodeItem = ({ episode, isPlaying, onTogglePlay }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
    <div className="flex items-center space-x-4">
      <button
        onClick={() => onTogglePlay(episode.id)}
        className="p-3 bg-white rounded-full shadow-md hover:bg-blue-50"
      >
        {isPlaying ? <Pause className="w-5 h-5 text-blue-600" /> : <Play className="w-5 h-5 text-blue-600" />}
      </button>
      <div>
        <h4 className="font-semibold text-gray-800">{episode.title}</h4>
        <p className="text-sm text-gray-500">{new Date(episode.pubDate).toLocaleDateString()}</p>
      </div>
    </div>
    <a href={episode.audioUrl} target="_blank" rel="noopener noreferrer" title="Download episode">
      <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-600" />
    </a>
  </div>
);


export default function Home({ podcastTitle, podcastImage }) {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rssFeedUrl, setRssFeedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Audio playback state
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Set the RSS feed URL based on the current domain
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setRssFeedUrl(`${origin}/api/rss`);
      // Fetch episodes on initial load
      fetchEpisodes(origin); 
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
  
  const fetchEpisodes = async (origin) => {
    setIsLoading(true);
    setError('');
    try {
      // It's better to have a dedicated JSON endpoint for the frontend
      const response = await fetch(`${origin || window.location.origin}/api/episodes`); 
      
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

  const currentAudioSrc = currentlyPlaying ? currentlyPlaying.audioUrl : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Audio player element, hidden but functional */}
        <audio
            ref={audioRef}
            src={currentAudioSrc}
            onEnded={() => setCurrentlyPlaying(null)} // Reset when track finishes
            key={currentAudioSrc} // Force re-render on src change
        />

        {/* Header */}
        <header className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
          {podcastImage && (
            <div className="mb-6 mx-auto w-48 h-48 relative shadow-lg rounded-2xl overflow-hidden">
              <Image src={podcastImage} alt={`${podcastTitle} cover art`} layout="fill" objectFit="cover" />
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎙️ {podcastTitle}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your personal podcast, powered by Google Drive.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
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
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-xl p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Latest Episodes
                </h2>
                <button
                  onClick={() => fetchEpisodes()}
                  disabled={isLoading}
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>

              <div className="space-y-4">
                {isLoading && <p className="text-gray-500 text-center">Loading episodes...</p>}
                {error && <p className="text-red-600 bg-red-50 p-4 rounded-lg text-center">{error}</p>}
                {!isLoading && !error && episodes.length === 0 && (
                  <p className="text-gray-500 text-center p-4 bg-gray-50 rounded-lg">
                    No episodes found. Add audio files to your Google Drive folder to get started.
                  </p>
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
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                How It Works
              </h2>
              <div className="space-y-4 text-gray-700">
                  {/* Step-by-step instructions */}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Upload className="w-6 h-6 mr-2" />
                    Setup Status
                </h2>
                {/* Static setup status content */}
            </div>
          </div>
        </main>
      </div>
    </div>
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
