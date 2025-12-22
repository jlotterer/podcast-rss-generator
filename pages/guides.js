import { Brain, Youtube, BookOpen, FileText, GraduationCap, Mic, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Guides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-3xl font-[700] text-blue-600 font-logo cursor-pointer">poddio</h1>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">How-To Guides</h2>
          <p className="text-xl text-gray-600">
            Step-by-step tutorials for creating personal podcasts with poddio
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Jump to Guide:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="#notebooklm" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Brain className="w-4 h-4" /> NotebookLM Podcasts
            </a>
            <a href="#youtube" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Youtube className="w-4 h-4" /> YouTube to Audio
            </a>
            <a href="#research" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <BookOpen className="w-4 h-4" /> Research Digests
            </a>
            <a href="#newsletter" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <FileText className="w-4 h-4" /> Newsletter Audio
            </a>
            <a href="#learning" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <GraduationCap className="w-4 h-4" /> Learning Playlists
            </a>
            <a href="#traditional" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Mic className="w-4 h-4" /> Traditional Podcasts
            </a>
          </div>
        </div>
      </section>

      {/* Guide: NotebookLM */}
      <section id="notebooklm" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">NotebookLM Podcasts</h3>
              <p className="text-gray-600">Turn any content into AI-generated podcast conversations</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What You'll Need</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>A Google account with access to NotebookLM</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Content to convert (documents, PDFs, websites, YouTube videos)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>A poddio account connected to Google Drive</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Step-by-Step Instructions</h4>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Step 1: Create Your Notebook</h5>
                <p className="text-gray-700">
                  Go to <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
                    notebooklm.google.com <ExternalLink className="w-3 h-3" />
                  </a> and create a new notebook. Add your source materials—this could be:
                </p>
                <ul className="mt-2 ml-6 text-gray-700 space-y-1">
                  <li>• Research papers or PDFs</li>
                  <li>• Website URLs</li>
                  <li>• YouTube video links</li>
                  <li>• Google Docs or uploaded text files</li>
                  <li>• Any combination of the above</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Step 2: Generate Audio Overview</h5>
                <p className="text-gray-700">
                  Once your sources are loaded, click on the "Audio Overview" button. NotebookLM will analyze your content and generate a natural, conversational podcast-style discussion between two AI hosts.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Step 3: Download the Audio</h5>
                <p className="text-gray-700">
                  After generation completes (usually 3-5 minutes), download the audio file to your computer. NotebookLM creates high-quality MP3 files perfect for podcast distribution.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Step 4: Upload to Google Drive</h5>
                <p className="text-gray-700">
                  Navigate to your Google Drive and upload the audio file to the folder you've connected to poddio. Name it descriptively (e.g., "Episode 1 - AI in Healthcare.mp3").
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Step 5: Automatic Publishing</h5>
                <p className="text-gray-700">
                  That's it! poddio automatically detects new audio files in your Drive folder and adds them to your RSS feed. Your NotebookLM episode is now available in podcast apps within minutes.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Create themed series by grouping related topics</li>
                <li>• Use Deep Research feature for comprehensive topic coverage</li>
                <li>• Add custom instructions to NotebookLM to guide the conversation style</li>
                <li>• Create consistent naming conventions for easy organization</li>
                <li>• Schedule uploads to maintain a regular publishing cadence</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guide: YouTube to Audio */}
      <section id="youtube" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">YouTube to Audio</h3>
              <p className="text-gray-600">Convert video content into podcast episodes</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">What You'll Need</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>YouTube videos you want to convert (must respect copyright)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>An audio extraction tool (we recommend yt-dlp or online converters)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Your poddio-connected Google Drive folder</span>
              </li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Quick Method</h4>
            <div className="space-y-4">
              <p className="text-gray-700">
                Use a YouTube to MP3 converter like <strong>yt-dlp</strong> (command line) or online tools:
              </p>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                yt-dlp -x --audio-format mp3 [YouTube URL]
              </div>
              <p className="text-gray-700">
                Upload the resulting MP3 file to your Google Drive folder, and poddio handles the rest!
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Copyright Notice</h4>
              <p className="text-gray-700">
                Only convert content you have permission to use. Great for:
              </p>
              <ul className="mt-2 ml-6 text-gray-700 space-y-1">
                <li>• Your own YouTube videos</li>
                <li>• Educational content with proper licensing</li>
                <li>• Public domain or Creative Commons content</li>
                <li>• Videos where you have explicit permission</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guide: Research Digests */}
      <section id="research" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Research Digests</h3>
              <p className="text-gray-600">Create topic-based podcast series with Deep Research</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Using Google Deep Research</h4>
            <p className="text-gray-700 mb-4">
              Google Deep Research can compile comprehensive reports on any topic. Combined with NotebookLM's audio generation, you can create authoritative podcast series.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">1. Run Deep Research</h5>
                <p className="text-gray-700">
                  Use Gemini Advanced to perform Deep Research on your chosen topic. It will analyze multiple sources and create a detailed report.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">2. Feed to NotebookLM</h5>
                <p className="text-gray-700">
                  Export the research report and upload it to NotebookLM as a source. Generate an audio overview to create your podcast episode.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">3. Build a Series</h5>
                <p className="text-gray-700">
                  Create multiple episodes on related topics to build a comprehensive podcast series. Upload all episodes to Drive for automatic publishing.
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">🎯 Great For</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Industry trend analysis</li>
                <li>• Academic literature reviews</li>
                <li>• Technology deep dives</li>
                <li>• Historical event summaries</li>
                <li>• Market research digests</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guide: Newsletter Audio */}
      <section id="newsletter" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Newsletter to Audio</h3>
              <p className="text-gray-600">Transform written content into audio format</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Many people prefer listening to reading. Convert your newsletter, blog posts, or articles into podcast episodes for broader accessibility.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Methods</h4>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Option 1: NotebookLM Audio</h5>
                <p className="text-gray-700">
                  Upload your written content to NotebookLM and generate a conversational audio overview. The AI hosts will discuss the key points in an engaging format.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Option 2: Text-to-Speech</h5>
                <p className="text-gray-700">
                  Use Google Cloud Text-to-Speech or similar services to create a direct reading of your content. Choose from natural-sounding voices.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Option 3: Record Yourself</h5>
                <p className="text-gray-700">
                  Read your newsletter aloud with your own voice for a personal touch. Tools like Audacity or GarageBand make recording easy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide: Learning Playlists */}
      <section id="learning" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Learning Playlists</h3>
              <p className="text-gray-600">Educational podcast series from course materials</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Create a personal learning podcast by converting course materials, textbooks, or study guides into audio lessons.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Building Your Learning Series</h4>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Organize by Topic</h5>
                <p className="text-gray-700">
                  Break down your course into logical units. Each unit becomes a podcast episode. Upload materials to NotebookLM chapter by chapter.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Add Supplementary Materials</h5>
                <p className="text-gray-700">
                  Include lecture notes, textbook chapters, and related articles as sources to create comprehensive episode coverage.
                </p>
              </div>

              <div className="border-l-4 border-orange-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Sequential Publishing</h5>
                <p className="text-gray-700">
                  Upload episodes in order to create a structured learning path. Number them clearly (e.g., "Lesson 01 - Introduction.mp3").
                </p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">📚 Perfect For</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Online course materials</li>
                <li>• Professional certification prep</li>
                <li>• Language learning</li>
                <li>• Personal skill development</li>
                <li>• Book summaries and reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Guide: Traditional Podcasts */}
      <section id="traditional" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Mic className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Traditional Podcasts</h3>
              <p className="text-gray-600">Record and publish the classic way—simplified</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              poddio makes traditional podcast publishing incredibly simple. Record your audio however you prefer, then let us handle the distribution.
            </p>

            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">The Simple Workflow</h4>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">1. Record Your Episode</h5>
                <p className="text-gray-700">
                  Use any recording tool you like: Audacity, GarageBand, Riverside.fm, Zencastr, or even your phone's voice recorder.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">2. Edit (Optional)</h5>
                <p className="text-gray-700">
                  Clean up your audio, add intro/outro music, and export as MP3. Or don't—raw and authentic works too!
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">3. Upload to Drive</h5>
                <p className="text-gray-700">
                  Drop your MP3 file into your poddio Google Drive folder. No separate hosting, no FTP uploads, no complicated dashboards.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">4. Automatic Everything</h5>
                <p className="text-gray-700">
                  poddio detects your upload, updates your RSS feed, and makes it available across all podcast platforms. Usually within minutes.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">✨ Why This Approach Works</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• No monthly hosting fees—use Google Drive storage you already have</li>
                <li>• No need to learn complex podcast hosting platforms</li>
                <li>• Keep your existing recording workflow</li>
                <li>• Collaborate easily—shared Drive folders for team podcasts</li>
                <li>• Automatic backups with Google Drive</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Create your first podcast in minutes with poddio
          </p>
          <Link href="/">
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 text-lg rounded-xl font-semibold transition-colors shadow-lg inline-flex items-center gap-2">
              Sign Up Free <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-2xl font-[700] text-blue-600 font-logo mb-2">poddio</h1>
              <p className="text-gray-600">Podcast publishing made simple</p>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/guides" className="text-gray-600 hover:text-gray-900 transition-colors">
                Guides
              </Link>
              <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            © {new Date().getFullYear()} poddio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
