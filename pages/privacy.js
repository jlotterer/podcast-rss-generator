import { Shield, Lock, Eye, Database, UserX, Mail } from 'lucide-react';
import PublicPageLayout from '../components/PublicPageLayout';

export default function Privacy() {
  return (
    <PublicPageLayout showCTA={false}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: December 29, 2024</p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            At poddio, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            and protect your personal information when you use our podcast publishing platform. By using
            poddio, you consent to the data practices described in this policy.
          </p>
          <p className="text-gray-600 mt-4">
            This policy complies with applicable data protection laws and regulations, including GDPR
            for users in the European Economic Area.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Information We Collect */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
                <p>
                  When you sign up using Google OAuth, we collect your name, email address, and profile
                  information from your Google account.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Google Drive Access</h3>
                <p>
                  We request read-only access to your Google Drive to retrieve audio files from folders
                  you designate for your podcasts. We only access the specific folders you configure and
                  do not access any other Drive content.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Podcast Metadata</h3>
                <p>
                  We store information about your podcasts, including podcast names, descriptions, cover
                  images, author information, and Google Drive folder IDs.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
                <p>
                  We collect information about how you use poddio, including when you last accessed your
                  account and which features you use.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>To provide and maintain the poddio service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>To generate RSS feeds from your Google Drive audio files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>To authenticate your account and maintain security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>To send you service-related notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold mt-1">•</span>
                <span>To improve and optimize our service</span>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>All data transmissions are encrypted using HTTPS/TLS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>OAuth tokens are stored securely and encrypted at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>We use secure database practices with PostgreSQL</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">✓</span>
                  <span>Access to user data is limited to essential operations only</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                poddio integrates with the following third-party services:
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Google OAuth & Drive API</h3>
                  <p className="text-sm">
                    For authentication and accessing your designated Google Drive folders. Subject to
                    Google's Privacy Policy.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hosting Provider</h3>
                  <p className="text-sm">
                    Our application and database are hosted securely by our infrastructure provider.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                poddio uses cookies and similar tracking technologies to improve your experience and
                analyze how our service is used.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                  <p className="text-sm">
                    Required for authentication and basic functionality. These cannot be disabled as
                    the service would not function properly without them.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                  <p className="text-sm">
                    Help us understand how users interact with poddio so we can improve the service.
                    These collect anonymized data about page visits and feature usage.
                  </p>
                </div>
              </div>
              <p className="text-sm bg-gray-50 p-4 rounded-lg">
                You can manage cookie preferences through your browser settings. Note that disabling
                certain cookies may limit functionality.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <UserX className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Rights (GDPR)</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                Under GDPR and other data protection laws, you have the following rights regarding your
                personal data:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right of Access:</strong> Request access to your personal data stored in poddio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right to Rectification:</strong> Update or correct your profile information at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right to Erasure:</strong> Request deletion of your account and all associated data ("right to be forgotten")</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right to Restriction:</strong> Request limitation of processing of your personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right to Data Portability:</strong> Export your podcast RSS feed URLs and metadata in a structured format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right to Object:</strong> Object to processing of your personal data for direct marketing or other purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">→</span>
                  <span><strong>Right to Withdraw Consent:</strong> Revoke Google Drive access at any time through your Google account settings</span>
                </li>
              </ul>
              <p className="text-sm bg-blue-50 p-4 rounded-lg mt-4">
                To exercise any of these rights, please contact us through the poddio platform or via email.
                We will respond to your request within 30 days as required by GDPR.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Data Retention</h2>
            </div>

            <p className="text-gray-700">
              We retain your personal information for as long as your account is active. If you delete
              your account, we will delete all associated personal data and podcast information. Note
              that RSS feeds that have already been distributed to podcast platforms may remain cached
              by those platforms according to their own retention policies.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>

            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or how we handle your data,
              please contact us through the poddio platform or via email.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
              We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>
        </div>
      </div>
    </PublicPageLayout>
  );
}
