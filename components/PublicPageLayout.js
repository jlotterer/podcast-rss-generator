import { useSession } from 'next-auth/react';
import PageLayout from './PageLayout';
import Footer from './Footer';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

/**
 * Layout wrapper for public pages (guides, landing, etc.)
 * Shows authenticated header when logged in, public header when logged out
 */
export default function PublicPageLayout({ children, showCTA = false }) {
  const { data: session, status } = useSession();

  // If authenticated, use the standard PageLayout
  if (status === 'authenticated') {
    return <PageLayout>{children}</PageLayout>;
  }

  // Public header for logged-out users
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Public Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-3xl font-[700] text-blue-600 font-logo cursor-pointer">poddio</h1>
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/pricing" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Pricing
              </Link>
              <Link href="/guides" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Guides
              </Link>
              {status === 'loading' ? (
                <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* CTA Section - Only for logged-out users */}
      {showCTA && status !== 'authenticated' && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-xl text-blue-100 mb-8">
              Create your first podcast in minutes with poddio
            </p>
            <button
              onClick={() => signIn('google')}
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 text-lg rounded-xl font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Sign Up Free
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
