import React, { useState, useEffect } from 'react';
import { RefreshCw, Upload, Settings, Rss, ExternalLink, Copy, Check, AlertCircle, Play, Pause } from 'lucide-react';

export default function Home() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [podcastSettings, setPodcastSettings] = useState({
    title: 'My NotebookLM Podcast',
    description: 'AI-generated podcasts from my research',
    author: '',
    email: '',
    websiteUrl: '',
    imageUrl: '',
    driveFolder: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rssFeedUrl, setRssFeedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

  useEffect(() => {
    // Set the RSS feed URL based on current domain
    if (typeof window !== 'undefined') {
      setRssFeedUrl(`${window.location.origin}/api/rss`);
    }
  }, []);


    const fetchEpisodes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/rss');
        if (response.ok) {
          // Since we're getting RSS, we'll just indicate success
          // In a real app, you'd have a separate API endpoint for JSON data
          setIsAuthorized(true);
          alert('Successfully fetched RSS feed! Status: ' + response.status);
        } else {
          // If the response is not OK, log the status and text
          const errorText = await response.text();
          console.error('Failed to fetch RSS feed:', response.status, errorText);
          alert(`Error fetching RSS feed. Status: ${response.status}. Check the browser console for details.`);
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
        alert('A network error occurred. Check the browser console for details.');
      }
      setIsLoading(false);
    };
  
    const copyRSSUrl = async () => {
  // ...existing code...

  const copyRSSUrl = async () => {
    try {
      await navigator.clipboard.writeText(rssFeedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const togglePlayback = (episodeId) => {
    setCurrentlyPlaying(currentlyPlaying === episodeId ? null : episodeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎙️ Automated Podcast RSS Generator
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Sync with Google Drive • Auto-generate RSS • Deploy everywhere
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <Rss className="text-blue-600 w-6 h-6 mr-2" />
                <span className="text-blue-800 font-medium">Your RSS Feed is Ready!</span>
              </div>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <code className="text-blue-600 font-mono text-sm">{rssFeedUrl}</code>
                  <button
                    onClick={copyRSSUrl}
                    className="ml-4 p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-sm text-blue-700">
                Add this URL to your podcast app to start listening!
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-2" />
              How It Works
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Create in NotebookLM</h3>
                  <p className="text-gray-600 text-sm">Generate your podcast using Google NotebookLM</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Upload to Drive</h3>
                  <p className="text-gray-600 text-sm">Save audio files to your designated Google Drive folder</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-full p-2 mt-1">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Make Public</h3>
                  <p className="text-gray-600 text-sm">Share each file with "Anyone with the link"</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <span className="text-green-600 font-bold text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Auto-Update</h3>
                  <p className="text-gray-600 text-sm">RSS feed updates automatically within 1 hour</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip</h4>
              <p className="text-yellow-700 text-sm">
                Name your files descriptively like "Climate-Research-Overview.mp3" - 
                the filename becomes your episode title!
              </p>
            </div>
          </div>

          {/* Configuration Status */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Upload className="w-6 h-6 mr-2" />
              Setup Status
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800 font-medium">RSS Feed Generated</span>
                </div>
                <span className="text-green-600 text-sm">Ready</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-blue-800 font-medium">Environment Variables</span>
                </div>
                <span className="text-blue-600 text-sm">Configure in Vercel</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                  <span className="text-yellow-800 font-medium">Google Drive Folder</span>
                </div>
                <span className="text-yellow-600 text-sm">Set GOOGLE_DRIVE_FOLDER_ID</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={fetchEpisodes}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-5 h-5 mr-2" />
                )}
                Test RSS Feed
              </button>
            </div>
          </div>
        </div>

        {/* Add to Podcast Apps */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📱 Add to Podcast Apps</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🎵</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Apple Podcasts</h3>
              <p className="text-gray-600 text-sm mb-4">Submit to Apple Podcasts Connect</p>
              <a 
                href="https://podcastsconnect.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Submit Podcast →
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🎧</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Spotify</h3>
              <p className="text-gray-600 text-sm mb-4">Upload via Spotify for Podcasters</p>
              <a 
                href="https://podcasters.spotify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Submit Podcast →
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl">🔍</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Other Apps</h3>
              <p className="text-gray-600 text-sm mb-4">Add RSS URL directly to any podcast app</p>
              <button 
                onClick={copyRSSUrl}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Copy RSS URL →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}