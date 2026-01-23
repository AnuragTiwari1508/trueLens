'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, Moon, Sun, Download, MessageCircle } from 'lucide-react'

export default function Navbar() {
  const [isDark, setIsDark] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-slate-950 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              trueLens
            </span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Fake News */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 hover:bg-indigo-50 dark:hover:bg-slate-800">
                <span className="text-indigo-600 dark:text-indigo-400">📰</span>
                Fake News
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200 dark:border-slate-800">
                <Link href="/fake-news" className="block px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-slate-800 first:rounded-t-lg">
                  Claim Extraction
                </Link>
                <Link href="/fake-news" className="block px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-slate-800">
                  Source Credibility
                </Link>
                <Link href="/fake-news" className="block px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-slate-800 last:rounded-b-lg">
                  Anomaly Detection
                </Link>
              </div>
            </div>

            {/* Deepfake */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 hover:bg-pink-50 dark:hover:bg-slate-800">
                <span className="text-pink-600 dark:text-pink-400">🎬</span>
                Deepfake
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200 dark:border-slate-800">
                <Link href="/deepfake" className="block px-4 py-2 text-sm hover:bg-pink-50 dark:hover:bg-slate-800 first:rounded-t-lg">
                  Detection
                </Link>
                <Link href="/deepfake" className="block px-4 py-2 text-sm hover:bg-pink-50 dark:hover:bg-slate-800">
                  Face Analysis
                </Link>
                <Link href="/deepfake" className="block px-4 py-2 text-sm hover:bg-pink-50 dark:hover:bg-slate-800 last:rounded-b-lg">
                  Artifacts & Forensics
                </Link>
              </div>
            </div>

            {/* Documents */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 hover:bg-amber-50 dark:hover:bg-slate-800">
                <span className="text-amber-600 dark:text-amber-400">📄</span>
                Verify Docs
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200 dark:border-slate-800">
                <Link href="/documents" className="block px-4 py-2 text-sm hover:bg-amber-50 dark:hover:bg-slate-800 first:rounded-t-lg">
                  OCR & Analysis
                </Link>
                <Link href="/documents" className="block px-4 py-2 text-sm hover:bg-amber-50 dark:hover:bg-slate-800">
                  Signature Validation
                </Link>
                <Link href="/documents" className="block px-4 py-2 text-sm hover:bg-amber-50 dark:hover:bg-slate-800 last:rounded-b-lg">
                  Authority Check
                </Link>
              </div>
            </div>

            {/* Community & Bots */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 hover:bg-teal-50 dark:hover:bg-slate-800">
                <span className="text-teal-600 dark:text-teal-400">🤖</span>
                Tools
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-200 dark:border-slate-800">
                <Link href="/bots" className="block px-4 py-2 text-sm hover:bg-teal-50 dark:hover:bg-slate-800 first:rounded-t-lg">
                  Download Bots
                </Link>
                <Link href="/apis" className="block px-4 py-2 text-sm hover:bg-teal-50 dark:hover:bg-slate-800">
                  API Docs
                </Link>
                <Link href="/community" className="block px-4 py-2 text-sm hover:bg-teal-50 dark:hover:bg-slate-800 last:rounded-b-lg">
                  Community
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-slate-700" />
              )}
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-sm font-medium">
              <MessageCircle size={16} />
              Chat with Bot
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
              <Download size={16} />
              Get API
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
