'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Download, MessageCircle, Users, Zap } from 'lucide-react'

const bots = [
  {
    name: 'WhatsApp Bot',
    icon: '💬',
    description: 'Send images, videos, or news articles directly on WhatsApp to get instant verification',
    features: ['Real-time detection', 'Instant reports', 'Group verification', 'Confidence scoring'],
    size: '2.4 MB',
    downloads: '12.5K+',
    rating: 4.8,
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'Telegram Bot',
    icon: '📱',
    description: 'Powerful bot for channels and group verification with batch processing',
    features: ['Batch processing', 'Channel monitoring', 'Admin dashboard', 'Report exports'],
    size: '1.8 MB',
    downloads: '8.2K+',
    rating: 4.7,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    name: 'Discord Bot',
    icon: '🎮',
    description: 'Community moderation and verification for Discord servers',
    features: ['Auto-moderation', 'Member reports', 'Admin commands', 'Logging system'],
    size: '1.5 MB',
    downloads: '5.1K+',
    rating: 4.6,
    color: 'from-indigo-500 to-purple-600'
  },
  {
    name: 'Slack Integration',
    icon: '⚙️',
    description: 'Verify content within your Slack workspace for team collaboration',
    features: ['Workspace integration', 'Channel threads', 'Shared reports', 'Team analytics'],
    size: '1.2 MB',
    downloads: '3.8K+',
    rating: 4.5,
    color: 'from-pink-500 to-rose-600'
  }
]

export default function BotsPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full border border-indigo-300 dark:border-indigo-700">
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold">🤖 Download Bots</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Integrate Verification Into Your Platform
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Deploy our bots on messaging platforms, communities, and workspaces
            </p>
          </div>

          {/* Bots Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {bots.map((bot, idx) => (
              <div
                key={bot.name}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300 animate-slide-in-up group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top Color Bar */}
                <div className={`h-2 bg-gradient-to-r ${bot.color}`} />

                <div className="p-8">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{bot.icon}</div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end mb-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{bot.rating}</span>
                        <span className="text-lg">⭐</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{bot.downloads} downloads</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">
                    {bot.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {bot.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 space-y-2">
                    {bot.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-600 to-pink-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="flex gap-4 mb-6 py-4 border-y border-slate-200 dark:border-slate-700">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Size</p>
                      <p className="font-semibold text-slate-900 dark:text-white">{bot.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Platform</p>
                      <p className="font-semibold text-slate-900 dark:text-white">API Ready</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                      <Download size={18} />
                      Download
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <MessageCircle size={18} />
                      Docs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Setup Guide */}
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700">
            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
              Quick Setup Guide
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { num: '1', title: 'Download', desc: 'Choose your bot and download' },
                { num: '2', title: 'Install', desc: 'Add to your platform/workspace' },
                { num: '3', title: 'Configure', desc: 'Set API keys and preferences' },
                { num: '4', title: 'Deploy', desc: 'Start verifying content!' }
              ].map((step) => (
                <div key={step.num} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 text-white flex items-center justify-center text-xl font-bold">
                    {step.num}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support */}
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-12 border border-slate-200 dark:border-slate-700 text-center">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Need Help?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Check our comprehensive documentation, join the community, or contact support for integration assistance
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                View Documentation
              </button>
              <button className="px-6 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
