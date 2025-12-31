import AuthHeader from './AuthHeader';
import Footer from './Footer';
import Link from 'next/link';

/**
 * Consistent page layout wrapper for authenticated pages
 * Provides unified header with logo and navigation across all screens
 * Header is always full width (max-w-7xl) for consistency
 * Content width can be customized via maxWidth prop
 */
export default function PageLayout({
  children,
  maxWidth = "max-w-7xl",
  onCreateClick
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Consistent Header - Always Full Width */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/podcasts">
              <h1 className="text-3xl font-[700] text-blue-600 font-logo cursor-pointer">poddio</h1>
            </Link>
            <AuthHeader onCreateClick={onCreateClick} />
          </div>
        </div>
      </div>

      {/* Content - Customizable Width */}
      <div className="flex-1">
        <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
