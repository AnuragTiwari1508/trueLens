'use client'

import React from "react"

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Upload, Zap } from 'lucide-react'
import { useState } from 'react'

export default function DeepfakePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setUploadedFile(file)
  }

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full border border-pink-300 dark:border-pink-700">
              <span className="text-pink-600 dark:text-pink-400 text-sm font-semibold">🎬 Deepfake Detection</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Detect AI-Generated & Manipulated Media
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Analyze images and videos for deepfakes, face manipulations, and synthetic content
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-pink-300 dark:border-pink-700 p-12 text-center mb-12 hover:border-pink-500 transition-colors cursor-pointer group">
            <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <div className="text-6xl">🎥</div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
              Upload Image or Video
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Drag & drop or click to upload media (JPG, PNG, MP4, MOV)
            </p>
            <input
              type="file"
              onChange={handleFileUpload}
              accept="image/*,video/*"
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="block">
              <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto">
                <Upload size={20} />
                Choose File
              </button>
            </label>
            {uploadedFile && (
              <p className="text-sm text-pink-600 dark:text-pink-400 mt-4">
                📁 {uploadedFile.name} selected
              </p>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-8 border border-pink-200 dark:border-pink-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Detection Methods</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-pink-600 dark:text-pink-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Face Landmarks:</strong> Detect inconsistent facial geometry</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-600 dark:text-pink-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Blink Detection:</strong> Analyze eye movement patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-600 dark:text-pink-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Lip Sync:</strong> Check audio-visual synchronization</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-600 dark:text-pink-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>GAN Artifacts:</strong> Identify AI generation signatures</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-600 dark:text-pink-400 text-lg">✓</span>
                  <span className="text-slate-700 dark:text-slate-300"><strong>Forensics:</strong> Analyze metadata & compression</span>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-8 border border-rose-200 dark:border-rose-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Analysis Metrics</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Authenticity Score</span>
                    <span className="text-sm text-rose-600 dark:text-rose-400">78%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-rose-400 to-pink-600" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Manipulation Probability</span>
                    <span className="text-sm text-pink-600 dark:text-pink-400">22%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 bg-gradient-to-r from-yellow-400 to-orange-600" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">AI Generation Likelihood</span>
                    <span className="text-sm text-red-600 dark:text-red-400">5%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/20 bg-gradient-to-r from-green-400 to-emerald-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700">
            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">AI Models Used</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="font-bold mb-3 text-slate-900 dark:text-white">Vision Transformers</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">State-of-the-art models for image analysis and manipulation detection</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="font-bold mb-3 text-slate-900 dark:text-white">Temporal Analysis</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">3D CNNs for video frame consistency and temporal anomalies</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="font-bold mb-3 text-slate-900 dark:text-white">Frequency Domain</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Fourier analysis to detect GAN artifacts in synthetic content</p>
              </div>
              <div className="bg-white dark:bg-slate-700 p-6 rounded-lg">
                <h4 className="font-bold mb-3 text-slate-900 dark:text-white">Multi-Modal Fusion</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Combines audio, video, and facial data for holistic analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
