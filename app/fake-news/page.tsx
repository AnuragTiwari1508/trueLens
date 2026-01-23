'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Loader2, AlertTriangle, CheckCircle, XCircle, TrendingUp, Search, FileText } from 'lucide-react'

interface Citation {
  quote: string
  url: string
  source_title: string
}

interface Claim {
  claim: {
    original_text: string
    atomic_claim: string
    search_queries: string[]
  }
  verdict: 'True' | 'False' | 'Unverified' | 'Misleading'
  support_score: number
  rationale: string
  citations: Citation[]
}

interface FactCheckResponse {
  original_text: string
  claims: Claim[]
  summary: string
  claim_reviews: any[]
}

export default function FakeNewsPage() {
  const [text, setText] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<FactCheckResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'claims' | 'summary'>('claims')

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90
        return prev + 10
      })
    }, 500)

    try {
      const response = await fetch('/api/fact-check/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      setProgress(100)
      setResult(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze text')
    } finally {
      clearInterval(progressInterval)
      setTimeout(() => {
        setIsAnalyzing(false)
        setProgress(0)
      }, 500)
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
      case 'False':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
      case 'Misleading':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-gray-300 dark:border-gray-700'
    }
  }

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'True':
        return <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
      case 'False':
        return <XCircle size={24} className="text-red-600 dark:text-red-400" />
      case 'Misleading':
        return <AlertTriangle size={24} className="text-orange-600 dark:text-orange-400" />
      default:
        return <AlertTriangle size={24} className="text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-300 dark:border-indigo-700">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">📰 Fake News Detection</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              AI-Powered Fact Checking & Claim Extraction
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Analyze text for factual claims, verify credibility, and detect misinformation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={24} className="text-indigo-600 dark:text-indigo-400" />
                Enter Text to Analyze
              </h2>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste article, social media post, or any text you want to fact-check..."
                className="w-full h-64 p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              />

              <div className="mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={!text.trim() || isAnalyzing}
                  className="w-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Analyzing {progress}%
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Analyze & Fact Check
                    </>
                  )}
                </button>

                {/* Progress Bar */}
                {isAnalyzing && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-indigo-600 border-r-indigo-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out rounded-full shadow-lg"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                      🔍 Extracting claims, verifying facts, and checking sources...
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Analysis Results</h2>
              
              {result ? (
                <div className="space-y-6">
                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setActiveTab('claims')}
                      className={`px-4 py-2 font-medium transition-all ${
                        activeTab === 'claims'
                          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Claims ({result.claims.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('summary')}
                      className={`px-4 py-2 font-medium transition-all ${
                        activeTab === 'summary'
                          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Summary
                    </button>
                  </div>

                  {/* Claims Tab */}
                  {activeTab === 'claims' && (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                      {result.claims.map((claim, idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl p-6 border-2 ${getVerdictColor(claim.verdict)}`}
                        >
                          <div className="flex items-start gap-4 mb-4">
                            {getVerdictIcon(claim.verdict)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getVerdictColor(claim.verdict)}`}>
                                  {claim.verdict.toUpperCase()}
                                </span>
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                                  {claim.support_score}% Support
                                </span>
                              </div>
                              <p className="font-semibold text-slate-900 dark:text-white mb-2">
                                {claim.claim.atomic_claim}
                              </p>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                {claim.rationale}
                              </p>
                            </div>
                          </div>

                          {/* Citations */}
                          {claim.citations.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                                SOURCES ({claim.citations.length})
                              </p>
                              <div className="space-y-2">
                                {claim.citations.map((citation, cidx) => (
                                  <a
                                    key={cidx}
                                    href={citation.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                                  >
                                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                                      {citation.source_title}
                                    </p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                      {citation.quote}
                                    </p>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Search Queries */}
                          {claim.claim.search_queries.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {claim.claim.search_queries.map((query, qidx) => (
                                <span
                                  key={qidx}
                                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 rounded"
                                >
                                  🔍 {query}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary Tab */}
                  {activeTab === 'summary' && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                          Overall Assessment
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {result.summary}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                          <p className="text-xs text-green-600 dark:text-green-400 mb-1">True Claims</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {result.claims.filter(c => c.verdict === 'True').length}
                          </p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                          <p className="text-xs text-red-600 dark:text-red-400 mb-1">False Claims</p>
                          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {result.claims.filter(c => c.verdict === 'False').length}
                          </p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
                          <p className="text-xs text-orange-600 dark:text-orange-400 mb-1">Misleading</p>
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {result.claims.filter(c => c.verdict === 'Misleading').length}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search className="h-16 w-16 text-slate-400 mb-4" />
                  <p className="text-base font-medium text-slate-900 dark:text-white mb-2">No Analysis Yet</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                    Enter text in the input field and click "Analyze & Fact Check" to extract claims, verify facts, and detect misinformation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle className="text-indigo-600 dark:text-indigo-400" size={20} />
                Claim Extraction
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Automatically identifies and extracts factual claims from text using advanced NLP
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Search className="text-blue-600 dark:text-blue-400" size={20} />
                Source Verification
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Cross-references claims with credible sources and provides evidence-based verdicts
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <TrendingUp className="text-purple-600 dark:text-purple-400" size={20} />
                Anomaly Detection
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Detects unusual patterns, sensational language, and potential misinformation indicators
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
