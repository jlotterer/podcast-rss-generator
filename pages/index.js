import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Mic, Zap, Cloud, Share2, ArrowRight, CheckCircle2, X, Sparkles, BookOpen, Youtube, FileText, GraduationCap, Brain } from 'lucide-react';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(true);

  // Redirect to podcasts if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/podcasts');
    }
  }, [status, router]);

  // Show nothing while checking auth or redirecting
  if (status === 'loading' || status === 'authenticated') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Beta Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 relative">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm sm:text-base">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <p className="text-center">
              <span className="font-semibold">Early Access:</span> We're actively building new features. Join us as we shape the future of podcast publishing!
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-[700] text-blue-600 font-logo">poddio</h1>
            <div className="flex gap-3">
              <button
                onClick={() => signIn('google')}
                className="px-5 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => signIn('google')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Publish Your Podcast
            <span className="block text-blue-600 mt-2">Effortlessly</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed">
            Transform your Google Drive into a powerful podcast publishing platform.
            No complex hosting, no technical headaches—just your voice, heard worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => signIn('google')}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Start Publishing Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 text-lg rounded-xl font-semibold transition-colors shadow-md border border-gray-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white rounded-3xl shadow-xl mb-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h3>
          <p className="text-xl text-gray-600">Simple podcast publishing powered by Google Drive</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Drive Integration</h4>
            <p className="text-gray-600">
              Store episodes in Google Drive. No separate hosting required—use storage you already have.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Instant Publishing</h4>
            <p className="text-gray-600">
              Upload to Drive, and your episodes are live. It's that simple. No complicated workflows.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">RSS Feeds</h4>
            <p className="text-gray-600">
              Automatic RSS feed generation for all major podcast platforms and directories.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mic className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">Focus on Content</h4>
            <p className="text-gray-600">
              Spend time creating great content, not managing infrastructure. We handle the rest.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Three Simple Steps</h3>
          <p className="text-xl text-gray-600">From episode to podcast in minutes</p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">Connect Your Google Drive</h4>
              <p className="text-lg text-gray-600">
                Sign in with Google and select the folder where you'll store your episodes. That's it.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">Upload Your Episodes</h4>
              <p className="text-lg text-gray-600">
                Drop your audio files into your Drive folder. poddio automatically detects and publishes them.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6 items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-semibold text-gray-900 mb-2">Share Your Feed</h4>
              <p className="text-lg text-gray-600">
                Get your RSS feed link and submit to Apple Podcasts, Spotify, and other platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">What You Can Create</h3>
          <p className="text-xl text-gray-600">AI-powered personal podcasting for everyone</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* NotebookLM - Featured */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200 relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Popular</span>
            </div>
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">NotebookLM Podcasts</h4>
            <p className="text-gray-700 mb-4">
              Turn any research, documents, or ideas into AI-generated podcast conversations with Google NotebookLM. Save to Drive, auto-publish to your feed.
            </p>
            <a href="/guides#notebooklm" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1">
              Learn how <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* YouTube to Podcast */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <Youtube className="w-7 h-7 text-red-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">YouTube to Audio</h4>
            <p className="text-gray-600 mb-4">
              Convert your favorite video content into audio podcasts for listening on the go.
            </p>
            <a href="/guides#youtube" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1">
              Learn how <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Research Digests */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-green-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Research Digests</h4>
            <p className="text-gray-600 mb-4">
              Use Deep Research to create topic-based podcast series on any subject you're exploring.
            </p>
            <a href="/guides#research" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1">
              Learn how <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Newsletter to Audio */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-purple-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Newsletter Audio</h4>
            <p className="text-gray-600 mb-4">
              Transform written newsletters into audio format for subscribers who prefer listening.
            </p>
            <a href="/guides#newsletter" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1">
              Learn how <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Learning Playlists */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <GraduationCap className="w-7 h-7 text-orange-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Learning Playlists</h4>
            <p className="text-gray-600 mb-4">
              Create educational podcast series from course materials, study guides, or training content.
            </p>
            <a href="/guides#learning" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1">
              Learn how <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Traditional Podcasts */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Mic className="w-7 h-7 text-blue-600" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Traditional Podcasts</h4>
            <p className="text-gray-600 mb-4">
              Of course, you can still publish traditional recorded podcasts the easy way.
            </p>
            <a href="/guides#traditional" className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center gap-1">
              Learn how <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Start?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join podcasters who've simplified their publishing workflow with poddio.
          </p>
          <button
            onClick={() => signIn('google')}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 text-lg rounded-xl font-semibold transition-colors shadow-lg"
          >
            Get Started for Free
          </button>
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
              <a href="/guides" className="text-gray-600 hover:text-gray-900 transition-colors">
                Guides
              </a>
              <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
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
