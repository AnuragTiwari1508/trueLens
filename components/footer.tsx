'use client'

import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <span className="font-bold text-lg">trueLens</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Unified verification platform detecting misinformation at scale.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Fake News Detection</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Deepfake Analysis</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Document Verify</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Try our BOT */}
          <div>
            <h4 className="font-semibold mb-4">🤖 Try our BOT</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="https://wa.me/15551560710" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>💬</span> WhatsApp Bot
                </a>
              </li>
              <li>
                <a href="https://t.me/fact_cs_bot" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>✈️</span> Telegram Bot
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="grid md:grid-cols-2 gap-8 py-8 border-t border-slate-800 mb-8">
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                <Mail size={18} />
              </button>
            </div>
          </div>

          <div className="flex items-end justify-end gap-4">
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Github size={20} />
            </button>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Linkedin size={20} />
            </button>
            <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
              <Twitter size={20} />
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm border-t border-slate-800 pt-8">
          <p>© 2024 trueLens. Built for the Hackathon.</p>
          <p>Made with ❤️ by the verification team</p>
        </div>
      </div>
    </footer>
  )
}
