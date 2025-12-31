import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Check, X, Sparkles, ArrowRight, Zap, Crown, Rocket, Star } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'annual'

  const handleGetStarted = (tier) => {
    if (session) {
      // If logged in, redirect to upgrade flow (will need to implement)
      router.push(`/upgrade?tier=${tier}`);
    } else {
      // If not logged in, sign in with Google
      signIn('google');
    }
  };

  const tiers = [
    {
      name: 'Free',
      icon: Star,
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-100',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying out poddio with NotebookLM',
      popular: false,
      cta: 'Get Started',
      features: [
        { text: '1 podcast', included: true },
        { text: 'Unlimited manual episodes', included: true },
        { text: 'Basic RSS feed', included: true },
        { text: 'NotebookLM integration', included: true },
        { text: '500 MB Google Drive storage', included: true },
        { text: 'Basic analytics', included: true },
        { text: '0 AI-generated episodes', included: false, highlight: true },
        { text: 'Custom branding', included: false },
        { text: 'Advanced analytics', included: false },
        { text: 'Priority support', included: false },
      ],
      highlights: [
        '1 podcast',
        'Basic RSS hosting',
        'NotebookLM workflow',
      ],
    },
    {
      name: 'Starter',
      icon: Zap,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      price: { monthly: 15, annual: 12 },
      description: 'For new podcasters testing AI generation',
      popular: false,
      cta: 'Start Free Trial',
      features: [
        { text: '3 podcasts', included: true },
        { text: 'Unlimited manual episodes', included: true },
        { text: '6 AI episodes/month (20 min each)', included: true, highlight: true },
        { text: 'Advanced RSS features', included: true },
        { text: '2 voice options', included: true },
        { text: '5 GB storage', included: true },
        { text: 'Remove poddio branding', included: true },
        { text: 'Source management (PDFs, URLs)', included: true },
        { text: 'Email support (48hr)', included: true },
        { text: 'Credits roll over', included: false },
        { text: 'Voice cloning', included: false },
        { text: 'API access', included: false },
      ],
      highlights: [
        '6 AI episodes/month',
        '20 minutes each',
        '120 min total AI content',
      ],
    },
    {
      name: 'Creator',
      icon: Sparkles,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      price: { monthly: 29, annual: 23.25 },
      description: 'Most popular for regular podcasters',
      popular: true,
      cta: 'Start Free Trial',
      features: [
        { text: 'Unlimited podcasts', included: true },
        { text: 'Unlimited manual episodes', included: true },
        { text: '10 AI episodes/month (30 min each)', included: true, highlight: true },
        { text: 'Credits roll over (max 15)', included: true },
        { text: '5 premium voice options', included: true },
        { text: '25 GB storage', included: true },
        { text: 'Script editing before generation', included: true },
        { text: 'AI artwork generator', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom domain support', included: true },
        { text: 'Priority email (24hr)', included: true },
        { text: 'Scheduled publishing', included: true },
        { text: 'Voice cloning', included: false },
        { text: 'API access', included: false },
        { text: 'White-label', included: false },
      ],
      highlights: [
        '10 AI episodes/month',
        '30 minutes each',
        '300 min total AI content',
        'Credits roll over',
      ],
    },
    {
      name: 'Pro',
      icon: Crown,
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-100',
      price: { monthly: 79, annual: 63.25 },
      description: 'For professional creators and teams',
      popular: false,
      cta: 'Start Free Trial',
      features: [
        { text: 'Everything in Creator, plus:', included: true, bold: true },
        { text: '15 AI episodes/month (45 min each)', included: true, highlight: true },
        { text: 'Credits roll over (max 25)', included: true },
        { text: '10 premium voice options', included: true },
        { text: '1 custom voice clone included', included: true },
        { text: '100 GB storage', included: true },
        { text: 'Multi-voice conversations (3 speakers)', included: true },
        { text: 'Background music integration', included: true },
        { text: 'API access (100 req/day)', included: true },
        { text: 'Team collaboration (3 seats)', included: true },
        { text: 'White-label option', included: true },
        { text: 'Priority chat support (4hr)', included: true },
        { text: 'Export analytics (CSV, PDF)', included: true },
      ],
      highlights: [
        '15 AI episodes/month',
        '45 minutes each',
        '675 min total AI content',
        'Custom voice cloning',
        'Team collaboration',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="text-3xl font-[700] text-blue-600 font-logo cursor-pointer">
              poddio
            </a>
            <div className="flex gap-3">
              {session ? (
                <button
                  onClick={() => router.push('/podcasts')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                >
                  Dashboard
                </button>
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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent
            <span className="block text-blue-600 mt-2">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start free, upgrade as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-md border border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                billingPeriod === 'annual'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const price = billingPeriod === 'monthly' ? tier.price.monthly : tier.price.annual;
            const annualSavings = billingPeriod === 'annual' && tier.price.monthly > 0
              ? (tier.price.monthly * 12 - tier.price.annual * 12).toFixed(0)
              : 0;

            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl ${
                  tier.popular
                    ? 'ring-2 ring-purple-600 scale-105 lg:scale-110'
                    : 'ring-1 ring-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 ${tier.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${tier.iconColor}`} />
                </div>

                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">${price}</span>
                    {tier.price.monthly > 0 && (
                      <span className="text-gray-500">/month</span>
                    )}
                  </div>
                  {billingPeriod === 'annual' && tier.price.monthly > 0 && (
                    <p className="text-sm text-green-600 font-medium mt-1">
                      Save ${annualSavings}/year
                    </p>
                  )}
                  {billingPeriod === 'annual' && tier.price.monthly > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Billed ${(price * 12).toFixed(0)} annually
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleGetStarted(tier.name.toLowerCase())}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all mb-8 flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {tier.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Key Highlights */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 mb-3">Key features:</p>
                  <ul className="space-y-2">
                    {tier.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* All Features */}
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3">Everything included:</p>
                  <ul className="space-y-2.5">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? feature.highlight
                                ? 'text-blue-600 font-semibold'
                                : feature.bold
                                ? 'text-gray-900 font-semibold'
                                : 'text-gray-700'
                              : 'text-gray-400'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 sm:p-12 text-center shadow-2xl">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Enterprise</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Custom solutions for large teams, agencies, and organizations with high-volume needs
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">Custom Allocation</h4>
              <p className="text-gray-300 text-sm">30-50+ AI episodes/month with custom duration limits up to 90 minutes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">White-Label Platform</h4>
              <p className="text-gray-300 text-sm">Rebrand poddio as your own with custom integrations and SSO</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-white font-semibold mb-2">Premium Support</h4>
              <p className="text-gray-300 text-sm">1-hour SLA, dedicated account manager, quarterly business reviews</p>
            </div>
          </div>
          <button
            onClick={() => window.location.href = 'mailto:sales@poddio.com?subject=Enterprise Inquiry'}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-gray-900 text-lg rounded-xl font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
          >
            Contact Sales
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Add-Ons & Extras</h3>
          <p className="text-xl text-gray-600">Customize your plan with additional features</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Extra Episodes */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Extra Episodes</h4>
            <p className="text-gray-600 mb-4">Need more AI-generated content this month?</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-700">5 additional episodes</span>
                <span className="font-semibold text-gray-900">$12</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">10 additional episodes</span>
                <span className="font-semibold text-gray-900">$20</span>
              </li>
            </ul>
          </div>

          {/* Extended Duration */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Extended Duration</h4>
            <p className="text-gray-600 mb-4">Need longer episodes?</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-700">Single 60-min episode</span>
                <span className="font-semibold text-gray-900">$8</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Single 90-min episode</span>
                <span className="font-semibold text-gray-900">$12</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">+15 min permanent upgrade</span>
                <span className="font-semibold text-gray-900">$15/mo</span>
              </li>
            </ul>
          </div>

          {/* Premium Features */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Premium Features</h4>
            <p className="text-gray-600 mb-4">Unlock advanced capabilities</p>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-700">Custom voice clone</span>
                <span className="font-semibold text-gray-900">$20/mo</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">API access</span>
                <span className="font-semibold text-gray-900">$15/mo</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">White-label branding</span>
                <span className="font-semibold text-gray-900">$25/mo</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">Team seats (each)</span>
                <span className="font-semibold text-gray-900">$10/mo</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">What happens to unused AI credits?</h4>
            <p className="text-gray-600">
              Starter tier credits expire monthly. Creator and Pro tiers allow rollover up to 1.5-1.67× your monthly allocation,
              with rollover credits expiring after 60-90 days.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h4>
            <p className="text-gray-600">
              Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features.
              When downgrading, changes take effect at the next billing cycle.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">What if I need more than my plan allows?</h4>
            <p className="text-gray-600">
              You can purchase add-ons for extra episodes or extended duration anytime. Alternatively, upgrade to a higher tier
              for better value if you consistently need more.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">How does the free tier work?</h4>
            <p className="text-gray-600">
              The free tier includes full podcast hosting and RSS feed generation for manually uploaded episodes. It's perfect
              for NotebookLM users who generate audio elsewhere. No credit card required.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial for paid plans?</h4>
            <p className="text-gray-600">
              Yes! All paid plans include a 14-day free trial with full access to features. No credit card required to start.
              Cancel anytime during the trial with no charges.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h4>
            <p className="text-gray-600">
              We accept all major credit cards (Visa, Mastercard, American Express) and debit cards. Enterprise customers
              can also pay via invoice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Join creators who are transforming content into podcasts with AI
          </p>
          <button
            onClick={() => signIn('google')}
            className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 text-lg rounded-xl font-semibold transition-colors shadow-lg inline-flex items-center gap-2"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-100 text-sm mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
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
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
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
