import Link from 'next/link';

/**
 * Shared footer component for all pages
 * Provides consistent branding and navigation links
 */
export default function Footer() {
  return (
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
            <Link href="/notebooklm-guide" className="text-gray-600 hover:text-gray-900 transition-colors">
              NotebookLM Guide
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <a href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} poddio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
