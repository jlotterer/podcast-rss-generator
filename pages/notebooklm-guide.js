import { Brain, Sparkles, Target, Lightbulb, CheckCircle, ExternalLink, ArrowRight, TrendingUp, BookOpen, Microscope, Newspaper, Code, Users, Building2, Heart } from 'lucide-react';
import Link from 'next/link';
import PublicPageLayout from '../components/PublicPageLayout';

export default function NotebookLMGuide() {
  return (
    <PublicPageLayout showCTA={true}>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full mb-6">
            <Brain className="w-6 h-6" />
            <span className="font-semibold">NotebookLM Master Guide</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Amazing Podcasts<br />with Google NotebookLM
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The complete guide to crafting high-quality AI-generated podcasts. Learn the best prompts,
            strategies, and content types to create engaging audio that sounds professional and insightful.
          </p>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Jump to Section:</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a href="#getting-started" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Brain className="w-4 h-4" /> Getting Started
            </a>
            <a href="#podcast-types" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Target className="w-4 h-4" /> Podcast Types
            </a>
            <a href="#prompting-strategies" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Sparkles className="w-4 h-4" /> Prompting Strategies
            </a>
            <a href="#poddio-integration" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <ArrowRight className="w-4 h-4" /> Poddio Integration
            </a>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Getting Started with NotebookLM</h3>
              <p className="text-gray-600">Understanding the basics for podcast creation</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">What is NotebookLM Audio Overview?</h4>
            <p className="text-gray-700 mb-6">
              Google's NotebookLM can transform any written content into engaging podcast-style conversations
              between two AI hosts. The Audio Overview feature analyzes your source materials and creates
              natural, informative discussions that make complex topics accessible and entertaining.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" /> Why NotebookLM + Poddio is Powerful
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>No recording equipment needed</strong> - Create professional audio without a microphone</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Instant publishing</strong> - Upload to Drive, auto-publish to podcast platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Consistent quality</strong> - Every episode sounds professional and well-produced</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Scale effortlessly</strong> - Create multiple episodes from research you've already done</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Focus on content</strong> - Spend time on research, not audio production</span>
                </li>
              </ul>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">The Basic Workflow</h4>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">1</div>
                <h5 className="font-semibold text-gray-900 mb-2">Add Sources</h5>
                <p className="text-sm text-gray-700">Upload documents, PDFs, or URLs to NotebookLM</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">2</div>
                <h5 className="font-semibold text-gray-900 mb-2">Generate Audio</h5>
                <p className="text-sm text-gray-700">Click "Audio Overview" and let AI create the podcast</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">3</div>
                <h5 className="font-semibold text-gray-900 mb-2">Upload to Drive</h5>
                <p className="text-sm text-gray-700">Download MP3 and upload to your Poddio folder</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">4</div>
                <h5 className="font-semibold text-gray-900 mb-2">Auto-Publish</h5>
                <p className="text-sm text-gray-700">Poddio updates your RSS feed automatically</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Types Section */}
      <section id="podcast-types" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Best Podcast Types for NotebookLM</h3>
              <p className="text-gray-600">Proven formats that work exceptionally well</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Research Digests */}
            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Microscope className="w-6 h-6 text-blue-600" />
                <h4 className="text-xl font-semibold text-gray-900">Research Digests & Academic Reviews</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Perfect for summarizing academic papers, industry research, or scientific studies. NotebookLM
                excels at making complex research accessible.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Best Sources:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Academic papers (PDF format works great)</li>
                  <li>• Multiple related research papers for comprehensive coverage</li>
                  <li>• Industry whitepapers and reports</li>
                  <li>• Google Deep Research outputs</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Upload 3-5 related papers on the same topic. NotebookLM will synthesize insights across
                  all sources, creating a richer discussion than any single paper could provide.
                </p>
              </div>
            </div>

            {/* Industry News */}
            <div className="border-l-4 border-green-600 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Newspaper className="w-6 h-6 text-green-600" />
                <h4 className="text-xl font-semibold text-gray-900">Industry News & Trend Analysis</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Create weekly or monthly digests of industry trends. Great for keeping up with fast-moving fields
                like tech, finance, or healthcare.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Best Sources:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Collection of news articles (paste URLs directly)</li>
                  <li>• Company announcements and press releases</li>
                  <li>• Blog posts from industry leaders</li>
                  <li>• Market analysis reports</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Create a consistent schedule (e.g., "AI Weekly Digest") by collecting articles each week.
                  Your audience will appreciate regular, curated insights.
                </p>
              </div>
            </div>

            {/* Educational Content */}
            <div className="border-l-4 border-orange-600 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-orange-600" />
                <h4 className="text-xl font-semibold text-gray-900">Educational Series & Course Content</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Transform textbooks, course materials, or tutorial content into audio lessons. Perfect for
                students who prefer audio learning or want to study while commuting.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Best Sources:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Textbook chapters (upload PDFs or copy text)</li>
                  <li>• Lecture notes and slides</li>
                  <li>• Tutorial documentation</li>
                  <li>• Course syllabi with reading materials</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Break complex topics into bite-sized episodes (10-15 minutes each). Number them sequentially
                  so learners can follow the progression.
                </p>
              </div>
            </div>

            {/* Technical Deep Dives */}
            <div className="border-l-4 border-purple-600 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-purple-600" />
                <h4 className="text-xl font-semibold text-gray-900">Technical Documentation & Deep Dives</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Make technical documentation accessible. NotebookLM can explain complex APIs, frameworks,
                or technical concepts in conversational language.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Best Sources:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• API documentation pages</li>
                  <li>• GitHub README files and wikis</li>
                  <li>• Technical blog posts</li>
                  <li>• Software architecture documents</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Include both official docs AND blog posts about the technology. The mix creates more
                  practical, real-world oriented discussions.
                </p>
              </div>
            </div>

            {/* Business & Entrepreneurship */}
            <div className="border-l-4 border-red-600 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-6 h-6 text-red-600" />
                <h4 className="text-xl font-semibold text-gray-900">Business Case Studies & Strategy</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Analyze business strategies, case studies, or entrepreneurship topics. Great for MBA students,
                entrepreneurs, or business professionals.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Best Sources:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• Harvard Business Review articles</li>
                  <li>• Company case studies</li>
                  <li>• Annual reports and investor presentations</li>
                  <li>• Business strategy frameworks</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Combine multiple perspectives on the same company or strategy. NotebookLM will create
                  a balanced discussion incorporating different viewpoints.
                </p>
              </div>
            </div>

            {/* Personal Interest */}
            <div className="border-l-4 border-pink-600 pl-6 py-2">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-6 h-6 text-pink-600" />
                <h4 className="text-xl font-semibold text-gray-900">Personal Interest & Hobby Learning</h4>
              </div>
              <p className="text-gray-700 mb-4">
                Create podcasts about your hobbies, interests, or personal learning journeys. Share knowledge
                about gardening, cooking, fitness, history, or any passion.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="font-semibold text-gray-900 mb-2">Best Sources:</p>
                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                  <li>• How-to guides and tutorials</li>
                  <li>• Historical documents or biographies</li>
                  <li>• Recipe collections or cooking science</li>
                  <li>• Fitness research or training programs</li>
                </ul>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">💡 Pro Tip:</p>
                <p className="text-sm text-gray-700">
                  Document your learning journey. Upload sources as you discover them, creating a personal
                  audio library of your growth in any subject.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prompting Strategies Section */}
      <section id="prompting-strategies" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Prompting Strategies for Better Podcasts</h3>
              <p className="text-gray-600">Get the best results with these proven techniques</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">🎯 The Golden Rule</h4>
              <p className="text-gray-700">
                NotebookLM works best with <strong>high-quality, focused source material</strong>. The better
                your input, the better your podcast output. Garbage in, garbage out applies here!
              </p>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">1. Source Material Quality</h4>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h5 className="font-semibold text-green-900 mb-3">✅ Do This:</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Use authoritative, well-written sources</li>
                  <li>• Provide 3-5 complementary documents on the topic</li>
                  <li>• Include different perspectives when relevant</li>
                  <li>• Use recent, up-to-date information</li>
                  <li>• Add primary sources for depth</li>
                  <li>• Include data, statistics, and examples</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h5 className="font-semibold text-red-900 mb-3">❌ Avoid This:</h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Single short article as only source</li>
                  <li>• Low-quality or poorly written content</li>
                  <li>• Too many unrelated sources (&gt;10)</li>
                  <li>• Outdated information when currency matters</li>
                  <li>• Purely promotional or sales content</li>
                  <li>• Extremely technical jargon without context</li>
                </ul>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">2. Using Custom Instructions</h4>
            <p className="text-gray-700 mb-4">
              NotebookLM allows you to add custom instructions to guide the Audio Overview. This is your
              secret weapon for creating exactly the podcast style you want.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Example: Research Digest</h5>
                <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-800">
                    "Create an audio overview that summarizes the key findings from these research papers.
                    Focus on practical implications and real-world applications. Use examples to illustrate
                    complex concepts. The target audience is professionals who want to stay informed but
                    may not have technical backgrounds."
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Example: Technical Tutorial</h5>
                <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-800">
                    "Discuss these technical docs in a way that intermediate developers would understand.
                    Include code examples when relevant, explain the 'why' behind design decisions, and
                    compare different approaches. Focus on practical implementation tips."
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Example: News Digest</h5>
                <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-800">
                    "Create a weekly digest that connects these news stories into a coherent narrative.
                    Identify the common themes and trends. Discuss implications for the industry. Keep
                    the tone informative but conversational, like a discussion between two knowledgeable
                    colleagues."
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Example: Educational Series</h5>
                <div className="bg-white border border-gray-200 rounded-lg p-4 font-mono text-sm">
                  <p className="text-gray-800">
                    "Explain these concepts as if teaching a student who is new to the subject. Start with
                    fundamentals, build up complexity gradually. Use analogies and real-world examples.
                    Highlight key terms to remember. This is episode 3 of 10 in a series, so reference
                    concepts from previous episodes when relevant."
                  </p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">3. Optimal Content Length & Detail</h4>
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <p className="text-gray-700 mb-4">
                <strong>Sweet Spot:</strong> Each Audio Overview works best with content totaling roughly
                <strong> 5,000-15,000 words</strong>. This creates a 15-25 minute podcast episode.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Too Little (&lt;3,000 words)</p>
                  <p className="text-sm text-gray-700">
                    Results in surface-level discussion, hosts may repeat points, episode feels thin
                  </p>
                </div>
                <div className="bg-green-100 border-2 border-green-600 rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Just Right (5k-15k words)</p>
                  <p className="text-sm text-gray-700">
                    Rich discussion with depth, natural conversation flow, comprehensive coverage
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="font-semibold text-gray-900 mb-2">Too Much (&gt;20,000 words)</p>
                  <p className="text-sm text-gray-700">
                    Important details may be skipped, inconsistent depth, better to split into multiple episodes
                  </p>
                </div>
              </div>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mb-4">4. Research & Preparation Tips</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Use Google Deep Research</h5>
                <p className="text-gray-700">
                  For comprehensive topic coverage, start with Google's Deep Research feature (in Gemini Advanced).
                  It will compile authoritative sources, which you can then feed into NotebookLM for podcast creation.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Curate Complementary Sources</h5>
                <p className="text-gray-700">
                  Don't just dump random articles. Choose sources that complement each other—perhaps one theoretical
                  paper, one case study, one practical guide. This creates richer discussions.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Include Data & Examples</h5>
                <p className="text-gray-700">
                  Sources with statistics, charts, case studies, and concrete examples produce more engaging
                  podcasts than purely theoretical content.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Think in Series</h5>
                <p className="text-gray-700">
                  Plan multi-episode series rather than one-offs. Break large topics into logical chunks.
                  Create episode outlines before gathering sources for each.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" /> Advanced Strategy: The Content Matrix
              </h4>
              <p className="text-gray-700 mb-4">
                For maximum impact, plan your podcast series using a content matrix:
              </p>
              <div className="bg-white rounded-lg p-4">
                <ol className="space-y-3 text-sm text-gray-700">
                  <li><strong>1. Choose a theme</strong> - e.g., "AI in Healthcare"</li>
                  <li><strong>2. Identify 8-12 subtopics</strong> - e.g., diagnostics, drug discovery, patient care, ethics</li>
                  <li><strong>3. Gather 3-5 sources per subtopic</strong> - mix of papers, articles, case studies</li>
                  <li><strong>4. Create custom instructions for each episode</strong> - maintain consistent style</li>
                  <li><strong>5. Generate sequentially</strong> - can reference earlier episodes in later prompts</li>
                  <li><strong>6. Upload to Drive in order</strong> - listeners get a coherent learning journey</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Poddio Integration Section */}
      <section id="poddio-integration" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Seamless Poddio Integration</h3>
              <p className="text-gray-600">From NotebookLM to published podcast in minutes</p>
            </div>
          </div>

          <div className="prose max-w-none">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Complete Publishing Workflow</h4>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Step 1: Set Up Your Podcast in Poddio</h5>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Sign up at poddio and connect your Google Drive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Create a new podcast with title, description, and cover art</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Select or create a Google Drive folder for your episodes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Get your RSS feed URL to submit to podcast platforms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Step 2: Generate Audio in NotebookLM</h5>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Add your curated sources to a NotebookLM notebook</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Add custom instructions if desired (highly recommended)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Click "Generate Audio Overview" and wait 3-5 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Download the generated MP3 file</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Step 3: Upload to Google Drive</h5>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Rename the file with a clear, descriptive name (e.g., "Episode 01 - Introduction to AI Ethics.mp3")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Upload to your podcast's Google Drive folder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Poddio automatically detects the new file within minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Your RSS feed updates automatically—no manual work needed!</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h5 className="font-semibold text-gray-900 mb-3">Step 4: Distribute to Podcast Platforms</h5>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Submit your Poddio RSS feed to Apple Podcasts, Spotify, etc. (one-time setup)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Future episodes automatically appear in all platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Listeners subscribe once, get all new episodes automatically</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-8 mt-8">
              <h4 className="text-xl font-semibold mb-4">🚀 The Magic: Set It and Forget It</h4>
              <p className="text-blue-100 mb-4">
                After initial setup, your workflow is incredibly simple:
              </p>
              <ol className="space-y-2 text-blue-50">
                <li><strong>1.</strong> Create content in NotebookLM</li>
                <li><strong>2.</strong> Download MP3</li>
                <li><strong>3.</strong> Upload to Drive</li>
                <li><strong>4.</strong> Done! 🎉</li>
              </ol>
              <p className="text-blue-100 mt-4">
                No RSS editing, no file hosting configuration, no manual updates to podcast platforms.
                Focus on creating great content—Poddio handles the rest.
              </p>
            </div>

            <h4 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Best Practices for Consistent Publishing</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Use Consistent File Naming</h5>
                <p className="text-gray-700 mb-2">
                  Create a naming convention and stick to it. This helps with organization and makes your
                  podcast look professional.
                </p>
                <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                  <p className="text-gray-800">Episode 001 - Topic Title.mp3</p>
                  <p className="text-gray-800">Episode 002 - Another Topic.mp3</p>
                  <p className="text-gray-800">...</p>
                </div>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Batch Create for Consistency</h5>
                <p className="text-gray-700">
                  Create 3-5 episodes in one session, then schedule uploads over time. This ensures consistent
                  quality and gives you a publishing buffer.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Create a Cover Image</h5>
                <p className="text-gray-700">
                  Design a professional cover image (3000x3000px recommended). Upload it to your Drive folder
                  and select it in Poddio for instant brand recognition.
                </p>
              </div>

              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h5 className="font-semibold text-gray-900 mb-2">Maintain Publishing Schedule</h5>
                <p className="text-gray-700">
                  Even if episodes are AI-generated, consistency matters. Weekly, biweekly, or monthly—pick
                  a schedule and stick to it. Your audience will appreciate the reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Tips Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Final Tips for Success</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" /> Quality Over Quantity
              </h4>
              <p className="text-gray-700 text-sm">
                One well-researched, thoughtfully-crafted episode per week beats daily low-effort content.
                Your listeners will appreciate depth and insight.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Know Your Audience
              </h4>
              <p className="text-gray-700 text-sm">
                Tailor your custom instructions to your target audience's knowledge level. What's obvious
                to experts needs explanation for beginners, and vice versa.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-red-600" /> Stay Focused
              </h4>
              <p className="text-gray-700 text-sm">
                Each episode should tackle one clear topic. Trying to cover too much creates superficial
                discussions. Go deep on fewer topics instead.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" /> Iterate and Improve
              </h4>
              <p className="text-gray-700 text-sm">
                Listen to your generated episodes. Adjust your source selection and custom instructions
                based on what works. You'll get better with each episode.
              </p>
            </div>
          </div>
        </div>
      </section>

    </PublicPageLayout>
  );
}
