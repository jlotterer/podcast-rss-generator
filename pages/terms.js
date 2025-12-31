import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Shield } from 'lucide-react';
import PublicPageLayout from '../components/PublicPageLayout';

export default function Terms() {
  return (
    <PublicPageLayout showCTA={false}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: December 29, 2024</p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to poddio. By using our service, you agree to these Terms of Service. Please read
            them carefully before using the platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Acceptance of Terms */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>

            <p className="text-gray-700">
              By accessing and using poddio, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to these Terms of Service, please do not use our
              service.
            </p>
          </section>

          {/* Description of Service */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Description of Service</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                poddio provides an automated podcast RSS feed generation service that integrates with
                Google Drive. The service includes:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>RSS feed generation from Google Drive audio files</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Podcast metadata management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Public RSS feed URLs for podcast distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span>Integration with Google Drive for audio file storage</span>
                </li>
              </ul>
            </div>
          </section>

          {/* User Accounts */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                To use poddio, you must create an account using Google OAuth. You are responsible for:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Maintaining the security of your Google account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>All activities that occur under your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Notifying us immediately of any unauthorized use of your account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Ensuring your account information is accurate and up-to-date</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Acceptable Use</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">You agree to use poddio only for lawful purposes:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Publishing podcasts you own or have rights to distribute</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Creating original content or properly licensed audio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Respecting intellectual property rights of others</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Complying with all applicable laws and regulations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Prohibited Use */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Prohibited Use</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="font-semibold text-gray-900">You agree NOT to:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">✗</span>
                  <span>Upload or distribute copyrighted content without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">✗</span>
                  <span>Use the service for illegal, harmful, or fraudulent purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">✗</span>
                  <span>Attempt to gain unauthorized access to our systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">✗</span>
                  <span>Interfere with or disrupt the service or servers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">✗</span>
                  <span>Use the service to distribute spam, malware, or harmful content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">✗</span>
                  <span>Violate any applicable laws or regulations</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Content Rights */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Content and Intellectual Property</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Your Content Ownership</h3>
                <p>
                  You retain all ownership rights to the podcasts and content you upload and distribute
                  through poddio. You represent and warrant that:
                </p>
                <ul className="space-y-2 ml-6 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>You are the sole owner or have obtained all necessary rights and permissions for the content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>You have cleared all necessary licenses for music, sound effects, and third-party materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>You have obtained consent from all contributors and guests featured in your podcasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>Your content does not infringe on any third-party intellectual property rights</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">License You Grant to poddio</h3>
                <p>
                  By using our service, you grant poddio a non-exclusive, worldwide, royalty-free license to:
                </p>
                <ul className="space-y-2 ml-6 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>Host, store, and reproduce your podcast files</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>Make your content publicly accessible through RSS feeds and podcast platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>Process and encode audio files for distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span>Display podcast metadata and artwork in the platform</span>
                  </li>
                </ul>
                <p className="text-sm mt-3 bg-orange-50 p-3 rounded-lg">
                  This license exists solely to enable us to provide the service and terminates when you
                  delete your content or account.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Our Platform</h3>
                <p>
                  The poddio platform, including all software, design, text, graphics, logos, and other
                  materials, is owned by poddio and protected by intellectual property laws. You may not
                  copy, modify, distribute, or create derivative works without our express permission.
                </p>
              </div>
            </div>
          </section>

          {/* Google Drive Integration */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Google Drive Integration</h2>
            </div>

            <div className="space-y-3 text-gray-700">
              <p>
                By using poddio, you grant us read-only access to specific Google Drive folders you
                designate. You acknowledge that:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span>You have the right to share the content in those folders</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span>You can revoke access at any time through your Google account settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span>We will only access folders you explicitly configure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span>Your use is subject to Google's Terms of Service</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Service Availability */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Service Availability</h2>
            </div>

            <p className="text-gray-700">
              We strive to provide reliable service, but we do not guarantee that poddio will be
              available at all times. We may experience downtime for maintenance, updates, or unforeseen
              issues. We are not liable for any disruption of service.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Disclaimer of Warranties</h2>
            </div>

            <div className="space-y-3 text-gray-700">
              <p className="font-semibold uppercase text-sm">
                poddio is provided "as is" and "as available" without warranties of any kind, either
                express or implied.
              </p>
              <p>
                We do not warrant that the service will be uninterrupted, error-free, or secure. You
                use the service at your own risk.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>

            <p className="text-gray-700">
              To the maximum extent permitted by law, poddio shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues,
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other
              intangible losses resulting from your use of the service.
            </p>
          </section>

          {/* Termination */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Termination by You</h3>
                <p>
                  You may terminate your account at any time by deleting it through the settings page.
                  Upon termination:
                </p>
                <ul className="space-y-2 ml-6 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Your RSS feed will remain accessible for <strong>30 days</strong> to allow for transition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>After 30 days, all podcast data and RSS feeds will be permanently deleted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>You should back up any content you wish to retain before termination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Your audio files remain in your Google Drive and are not affected</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Termination by poddio</h3>
                <p>
                  We reserve the right to suspend or terminate your account immediately and without notice
                  for conduct that:
                </p>
                <ul className="space-y-2 ml-6 mt-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Violates these Terms of Service or applicable laws</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Infringes on third-party intellectual property rights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Is harmful to other users, us, or third parties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-1">•</span>
                    <span>Endangers the security or stability of our servers</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <p className="text-sm">
                  <strong>Important:</strong> Podcast platforms (Spotify, Apple Podcasts, etc.) may cache
                  your RSS feed according to their own policies. Deletion from poddio does not guarantee
                  immediate removal from all platforms.
                </p>
              </div>
            </div>
          </section>

          {/* Indemnification */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Indemnification</h2>
            </div>

            <p className="text-gray-700">
              You agree to indemnify, defend, and hold harmless poddio, its officers, directors, employees,
              and agents from and against any and all claims, damages, obligations, losses, liabilities,
              costs, and expenses (including reasonable attorneys' fees) arising from:
            </p>
            <ul className="space-y-2 ml-6 mt-4 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Your use of the poddio service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Your violation of these Terms of Service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Your violation of any third-party rights, including intellectual property rights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Content you upload, distribute, or make available through the service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-1">•</span>
                <span>Your violation of any applicable laws or regulations</span>
              </li>
            </ul>
          </section>

          {/* Changes to Terms */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
            </div>

            <p className="text-gray-700">
              We may modify these Terms of Service at any time. We will notify users of significant
              changes by posting a notice on the platform or via email. Your continued use of poddio
              after such modifications constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Governing Law */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Scale className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
            </div>

            <p className="text-gray-700">
              These Terms of Service shall be governed by and construed in accordance with applicable
              laws. Any disputes arising from these terms or your use of poddio shall be resolved in
              accordance with those laws.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions?</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us through the
              poddio platform.
            </p>
          </section>
        </div>
      </div>
    </PublicPageLayout>
  );
}
