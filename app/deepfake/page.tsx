'use client'

import React, { useState, useCallback } from "react"
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Upload, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'

interface DeepfakeResult {
  label: string
  confidence: number
  frame_count: number
  frame_probs: number[]
}

export default function DeepfakePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<DeepfakeResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime']
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mov|avi|webm)$/i)) {
      setError('Please upload a valid video file (MP4, MOV, AVI, WebM)')
      return
    }
    
    setUploadedFile(file)
    setError(null)
    setResult(null)
    
    const url = URL.createObjectURL(file)
    setVideoPreview(url)
  }, [])

  const analyzeVideo = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setError(null)
    setResult(null)
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95
        return prev + 5
      })
    }, 500)

    try {
      const formData = new FormData()
      formData.append('video', uploadedFile)

      const response = await fetch('/api/deepfake/detect', {
        method: 'POST',
        body: formData,
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Server error: ${text.substring(0, 100)}`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      // Parse result
      let resultData = data.detectionResult
      if (Array.isArray(resultData) && resultData.length > 0) {
        resultData = Array.isArray(resultData[0]) ? resultData[0][0] : resultData[0]
      }

      setProgress(100)
      setResult(resultData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze video')
    } finally {
      clearInterval(progressInterval)
      setTimeout(() => {
        setIsAnalyzing(false)
        setProgress(0)
      }, 500)
    }
  }

  const calculateStability = (frameProbs: number[]) => {
    if (!frameProbs || frameProbs.length < 2) return 'Unknown'
    const mean = frameProbs.reduce((sum, val) => sum + val, 0) / frameProbs.length
    const variance = frameProbs.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / frameProbs.length
    const std = Math.sqrt(variance)
    
    if (std < 0.08) return 'High'
    if (std < 0.18) return 'Moderate'
    return 'Low'
  }

  const isFake = result?.label?.toUpperCase() === 'FAKE' || (result?.confidence ?? 0) > 0.5
  const confidencePercent = result ? (result.confidence * 100).toFixed(1) : '0.0'

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full border border-pink-300 dark:border-pink-700">
              <span className="text-pink-600 dark:text-pink-400 text-sm font-semibold">🎬 Deepfake Detection Studio</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">
              Upload a video and get a forensic-level authenticity score
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Powered by AI to detect deepfakes, face manipulations, and synthetic content
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Video Upload</h2>
              
              {videoPreview ? (
                <div className="mb-6">
                  <video 
                    src={videoPreview} 
                    controls 
                    className="max-h-64 w-full rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                <div className="mb-6 flex justify-center">
                  <div className="text-6xl">🎥</div>
                </div>
              )}

              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center mb-6 hover:border-pink-500 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <label htmlFor="file-input" className="cursor-pointer">
                  <p className="text-sm font-medium mb-1 text-slate-900 dark:text-white">
                    {uploadedFile ? uploadedFile.name : 'Click to select a video file'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {uploadedFile 
                      ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis`
                      : 'MP4, MOV, AVI, WebM (Max: 2 minutes recommended)'}
                  </p>
                  <input
                    id="file-input"
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={analyzeVideo}
                disabled={!uploadedFile || isAnalyzing}
                className="w-full px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Analyzing {progress}%
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Run Deepfake Detection
                  </>
                )}
              </button>

              {/* Progress Bar */}
              {isAnalyzing && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-pink-200 dark:border-pink-800 rounded-full"></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-600 border-r-pink-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-pink-600 dark:text-pink-400">{progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 transition-all duration-300 ease-out rounded-full shadow-lg"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    🔍 Scanning for facial artifacts and frequency-domain anomalies...
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

            {/* Results Section */}
            <div className={`bg-white dark:bg-slate-800 rounded-2xl p-8 border-2 ${
              result && isFake ? 'border-red-500 dark:border-red-600' : 
              result && !isFake ? 'border-green-500 dark:border-green-600' : 
              'border-slate-200 dark:border-slate-700'
            }`}>
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Detection Insights</h2>
              
              {result ? (
                <div className="space-y-6">
                  {/* Result Header */}
                  <div className="flex items-start justify-between pb-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      {isFake ? (
                        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-4xl animate-pulse">
                          ☠️
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                          <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
                        </div>
                      )}
                      <div>
                        <h3 className={`text-3xl font-bold ${isFake ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                          {result.label?.toUpperCase() || 'UNKNOWN'}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                          {isFake ? '☠️ High Fraud Risk - Potential Deepfake' : '✅ Authentic - Low Fraud Risk'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-5xl font-bold ${isFake ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {confidencePercent}%
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Deepfake Probability
                      </div>
                      {isFake && (
                        <div className="mt-2 text-2xl animate-bounce">💀</div>
                      )}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`rounded-xl p-4 border-2 ${isFake ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'}`}>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Deepfake Probability</p>
                      <p className={`text-2xl font-bold ${isFake ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {confidencePercent}%
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {isFake ? '☠️ High risk' : '✅ Low risk'}
                      </p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Frames Analyzed</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {result.frame_count}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sampled uniformly</p>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 border border-slate-200 dark:border-slate-600">
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Stability</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {calculateStability(result.frame_probs)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Confidence variance</p>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium text-slate-900 dark:text-white">Deepfake Confidence Sweep</span>
                      <span className={`font-bold ${isFake ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {confidencePercent}%
                      </span>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden shadow-inner relative">
                      <div 
                        className="absolute top-0 h-full w-1 bg-slate-900 dark:bg-white shadow-lg transition-all duration-500" 
                        style={{ left: `${confidencePercent}%`, transform: 'translateX(-50%)' }}
                      />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {isFake ? (
                        <>☠️ <strong className="text-red-600 dark:text-red-400">High Risk:</strong> This video shows strong signs of deepfake manipulation.</>
                      ) : (
                        <>✅ <strong className="text-green-600 dark:text-green-400">Low Risk:</strong> This video appears to be genuine.</>
                      )}
                    </p>
                  </div>

                  {/* Per-Frame Confidence */}
                  {result.frame_probs && result.frame_probs.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium text-slate-900 dark:text-white">Per-Frame Confidence</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{Math.min(24, result.frame_probs.length)} frames</span>
                      </div>
                      <div className="flex items-end gap-1 h-24 bg-slate-100 dark:bg-slate-700/50 rounded p-2">
                        {result.frame_probs.slice(0, 24).map((prob, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 rounded-sm transition-all hover:opacity-100 cursor-pointer ${
                              prob > 0.5 ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                            }`}
                            style={{ height: `${Math.max(10, prob * 100)}%` }}
                            title={`Frame ${idx + 1}: ${(prob * 100).toFixed(1)}%`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                        📊 <strong>Red bars</strong> = High manipulation • <strong>Green bars</strong> = Low manipulation
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <AlertTriangle className="h-16 w-16 text-slate-400 mb-4" />
                  <p className="text-base font-medium text-slate-900 dark:text-white mb-2">No Analysis Yet</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
                    Upload a video file and click "Run Deepfake Detection" to see detailed analysis including confidence scores and frame-by-frame breakdown.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
