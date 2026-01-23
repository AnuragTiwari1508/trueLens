'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Hero() {
  const [isDark, setIsDark] = useState(false)
  const [jokerPos, setJokerPos] = useState(0)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setJokerPos(prev => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`relative min-h-screen pt-20 overflow-hidden ${
      isDark ? 'galaxy-bg' : 'nature-bg'
    }`}>
      {/* Animated Background Elements */}
      {isDark && (
        <>
          <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000" />
          <div className="absolute bottom-40 right-40 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)]">
          
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <div className="inline-block mb-6 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-300 dark:border-indigo-700">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">✨ AI-Powered Verification</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Detect Fake News,
              </span>
              <br />
              <span className="text-slate-900 dark:text-white">
                Deepfakes & Forged Docs
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 text-balance leading-relaxed">
              Unified verification platform that catches misinformation, detects deepfakes, and validates documents with AI + blockchain. Works on WhatsApp, APIs, extensions, and more.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 group">
                Start Verifying
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                View Documentation
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-indigo-600">98%</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Accuracy Rate</div>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-pink-600">Real-time</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Detection</div>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-purple-600">3 Layers</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Verification</div>
              </div>
            </div>
          </div>

          {/* Right Visual - Animated Wheel */}
          <div className="relative h-96 md:h-full" style={{ animation: 'slide-in-up 0.8s ease-out 0.2s both' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outer Rotating Ring */}
              <div className="absolute w-64 h-64 border-4 border-transparent border-t-indigo-500 border-r-pink-500 rounded-full animate-spin-slow" />
              
              {/* Middle Ring */}
              <div className="absolute w-48 h-48 border-3 border-transparent border-l-purple-500 border-b-amber-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '6s' }} />
              
              {/* Core */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center shadow-2xl shadow-indigo-500/50 animate-pulse-glow">
                <div className="text-center">
                  <Sparkles size={40} className="text-white mx-auto mb-2" />
                  <span className="text-white font-bold text-sm">trueLens</span>
                </div>
              </div>

              {/* Feature Circles around wheel */}
              {[
                { icon: '📰', label: 'Fake News', angle: 0 },
                { icon: '🎬', label: 'Deepfakes', angle: 120 },
                { icon: '📄', label: 'Documents', angle: 240 }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="absolute w-20 h-20 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center"
                  style={{
                    transform: `rotate(${feature.angle}deg) translateY(-140px) rotate(-${feature.angle}deg)`
                  }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="text-xs font-semibold text-center text-slate-900 dark:text-white">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Joker Character Moving */}
            <div 
              className="absolute bottom-0 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-2xl shadow-lg transition-all duration-100 animate-bounce-smooth"
              style={{ left: `${jokerPos}%` }}
            >
              🃏
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-slate-400 dark:bg-slate-600 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
