'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Upload, Zap, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function FakeNewsPage() {
  const [uploadedContent, setUploadedContent] = useState<string>('')

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-300 dark:border-indigo-700">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">📰 Fake News Detection</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Detect Misinformation & False Claims
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Analyze text, URLs, and claims using AI-powered semantic analysis and fact-checking
            </p>
          </div>

          {/* Main Upload Area */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 p-12 text-center mb-12 hover:border-indigo-500 transition-colors cursor-pointer group">
            <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-6xl">📝</div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Paste Content or URL
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Paste news article text, URL, or social media content to verify
            </p>
            <textarea
              value={uploadedContent}
              onChange={(e) => setUploadedContent(e.target.value)}
              placeholder="Paste content here... or drop a URL..."
              className="w-full h-32 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto">
              <Zap size={20} />
              Analyze Now
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">What We Detect</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Claim Extraction:</strong> Identifies core claims in text</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Semantic Similarity:</strong> Finds matching claims across platforms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Source Credibility:</strong> Scores reliability of sources</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-600 dark:text-indigo-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Anomaly Detection:</strong> Virality vs trust analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-8 border border-pink-200 dark:border-pink-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">How It Works</h4>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span className="text-slate-700 dark:text-slate-300">Submit content to analyze</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span className="text-slate-700 dark:text-slate-300">AI extracts and analyzes claims</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span className="text-slate-700 dark:text-slate-300">Cross-references with fact databases</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span className="text-slate-700 dark:text-slate-300">Generates explainable report</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700">
            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Popular Use Cases</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl mb-3">📱</div>
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Journalists</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Verify sources and spot false claims before publishing</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🏥</div>
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Healthcare</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Combat medical misinformation spreading online</p>
              </div>
              <div>
                <div className="text-4xl mb-3">🏛️</div>
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Governments</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Monitor election-related misinformation campaigns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
