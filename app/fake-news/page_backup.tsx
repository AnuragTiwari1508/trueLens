'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Upload, Zap, Loader2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface Claim {
  id: number
  text: string
  confidence: number
  type: string
  keywords?: string[]
}

interface Analysis {
  credibility_score: number
  factual_accuracy: number
  sentiment: string
  claims_count: number
  verified_claims: number
  disputed_claims: number
  unverified_claims: number
  risk_level: string
}

interface Anomaly {
  is_anomalous: boolean
  anomaly_score: number
  virality_score: number
  trust_score: number
  risk_factors: {
    high_virality: boolean
    low_trust: boolean
    sensational_language: boolean
    rapid_spread: boolean
  }
  recommendation: string
  shares: number
  engagement: number
}

export default function FakeNewsPage() {
  const [uploadedContent, setUploadedContent] = useState<string>('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [claims, setClaims] = useState<Claim[]>([])
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [anomaly, setAnomalyData] = useState<Anomaly | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'claims' | 'analysis' | 'anomaly'>('claims')

  const handleAnalyze = async () => {
    if (!uploadedContent.trim()) {
      setError('Please enter some content to analyze')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setClaims([])
    setAnalysis(null)
    setAnomalyData(null)

    try {
      const [claimsRes, analysisRes, anomalyRes] = await Promise.all([
        fetch('/api/fact-check/claims', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: uploadedContent }),
        }),
        fetch('/api/fact-check/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: uploadedContent }),
        }),
        fetch('/api/fact-check/anomaly', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: uploadedContent }),
        }),
      ])

      const claimsData = await claimsRes.json()
      const analysisData = await analysisRes.json()
      const anomalyData = await anomalyRes.json()

      if (claimsData.success) {
        setClaims(claimsData.claims || [])
      }
      if (analysisData.success) {
        setAnalysis(analysisData.analysis)
      }
      if (anomalyData.success) {
        setAnomalyData(anomalyData.anomaly)
      }

      setActiveTab('claims')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
      case 'high': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
    }
  }

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-300 dark:border-indigo-700">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">📰 Fake News Detection</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Detect Misinformation & False Claims
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              AI-powered claim extraction, fact-checking, and anomaly detection
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Content Input</h2>
                
                <textarea
                  value={uploadedContent}
                  onChange={(e) => setUploadedContent(e.target.value)}
                  placeholder="Paste news article, social media post, or any text..."
                  className="w-full h-64 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 resize-none"
                />

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !uploadedContent.trim()}
                  className="w-full px-8 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      Analyze Content
                    </>
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-300 flex items-center gap-2">
                      <AlertTriangle size={16} />
                      {error}
                    </p>
                  </div>
                )}
              </div>

              {analysis && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Credibility</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {(analysis.credibility_score * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Risk Level</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(analysis.risk_level)}`}>
                        {analysis.risk_level.toUpperCase()}
                      </span>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Claims</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {analysis.claims_count}
                      </p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Verified</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {analysis.verified_claims}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700 max-h-[800px] overflow-hidden flex flex-col">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Analysis Results</h2>

              {!claims.length && !analysis && !anomaly ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                  <Upload className="h-16 w-16 text-slate-400 mb-4" />
                  <p className="text-base font-medium text-slate-900 dark:text-white mb-2">No Analysis Yet</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                    Enter content and analyze to see results
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setActiveTab('claims')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === 'claims'
                          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Claims ({claims.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('analysis')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === 'analysis'
                          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Fact Check
                    </button>
                    <button
                      onClick={() => setActiveTab('anomaly')}
                      className={`px-4 py-2 font-medium transition-colors ${
                        activeTab === 'anomaly'
                          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Anomaly
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {activeTab === 'claims' && claims.length > 0 && (
                      <div className="space-y-4">
                        {claims.map((claim) => (
                          <div key={claim.id} className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                                CLAIM #{claim.id}
                              </span>
                              <span className="text-xs px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                                {(claim.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300">{claim.text}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'analysis' && analysis && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Overall Credibility</p>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">
                              {(analysis.factual_accuracy * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div className="text-5xl">
                            {analysis.factual_accuracy > 0.7 ? '✅' : analysis.factual_accuracy > 0.4 ? '⚠️' : '❌'}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {analysis.verified_claims}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Verified</p>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                              {analysis.unverified_claims}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Unverified</p>
                          </div>
                          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                              {analysis.disputed_claims}
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">Disputed</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'anomaly' && anomaly && (
                      <div className="space-y-6">
                        <div className={`p-6 rounded-lg border-2 ${
                          anomaly.is_anomalous
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                            : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                        }`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="text-4xl">
                              {anomaly.is_anomalous ? '🚨' : '✅'}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {anomaly.is_anomalous ? 'Anomaly Detected!' : 'Normal Pattern'}
                              </h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Score: {(anomaly.anomaly_score * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {anomaly.recommendation}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Virality</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                              {(anomaly.virality_score * 100).toFixed(0)}%
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Trust</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                              {(anomaly.trust_score * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
