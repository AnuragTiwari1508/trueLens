'use client'

import { Download, Copy, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'

const tools = [
  {
    category: 'Bots',
    icon: '🤖',
    items: [
      {
        name: 'WhatsApp Bot',
        description: 'Send media to verify directly on WhatsApp',
        size: '2.4 MB',
        downloads: '12.5K',
        features: ['Real-time detection', 'Instant reports']
      },
      {
        name: 'Telegram Bot',
        description: 'Powerful bot for Telegram channels & groups',
        size: '1.8 MB',
        downloads: '8.2K',
        features: ['Batch processing', 'Admin dashboard']
      },
      {
        name: 'Discord Bot',
        description: 'Community moderation & verification',
        size: '1.5 MB',
        downloads: '5.1K',
        features: ['Auto-moderation', 'Reports']
      }
    ]
  },
  {
    category: 'APIs',
    icon: '⚙️',
    items: [
      {
        name: 'REST API',
        description: 'Standard REST endpoints for all services',
        size: 'Documentation',
        downloads: '15.8K',
        features: ['JSON responses', 'Rate limited']
      },
      {
        name: 'WebSocket API',
        description: 'Real-time streaming for live detection',
        size: 'Documentation',
        downloads: '6.3K',
        features: ['Low latency', 'Event-based']
      },
      {
        name: 'Python SDK',
        description: 'Easy integration for Python developers',
        size: '340 KB',
        downloads: '9.7K',
        features: ['Type hints', 'Async support']
      }
    ]
  }
]

export default function ToolsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (id: string) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Download Tools & APIs
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Integrate verification into your platform with bots, APIs, and SDKs
          </p>
        </div>

        {/* Tools Grid */}
        <div className="space-y-16">
          {tools.map((toolCategory, catIdx) => (
            <div key={toolCategory.category} className="animate-slide-in-up" style={{ animationDelay: `${catIdx * 100}ms` }}>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">{toolCategory.icon}</span>
                <h3 className="text-3xl font-bold">{toolCategory.category}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {toolCategory.items.map((item, idx) => (
                  <div
                    key={`${toolCategory.category}-${idx}`}
                    className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                    
                    <div className="relative">
                      {/* Title & Description */}
                      <h4 className="text-xl font-bold mb-2 text-white">{item.name}</h4>
                      <p className="text-slate-400 text-sm mb-6">{item.description}</p>

                      {/* Metadata */}
                      <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-slate-700">
                        <div>
                          <div className="text-xs text-slate-500 uppercase">Size</div>
                          <div className="font-semibold text-slate-200">{item.size}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 uppercase">Downloads</div>
                          <div className="font-semibold text-slate-200">{item.downloads}</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <div className="text-xs text-slate-500 uppercase mb-2">Features</div>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopy(`${toolCategory.category}-${idx}`)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors font-semibold text-sm"
                        >
                          {copiedId === `${toolCategory.category}-${idx}` ? (
                            <>
                              <Check size={16} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Download size={16} />
                              Download
                            </>
                          )}
                        </button>
                        <button className="flex items-center justify-center p-2 rounded-lg border border-slate-600 hover:border-indigo-500 transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="mt-20 grid md:grid-cols-2 gap-8 animate-slide-in-up">
          <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-4">Quick Start</h4>
            <div className="space-y-4">
              <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300">
                <div>npm install truelens-sdk</div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-slate-300">
                <div>import trueLens from 'truelens-sdk'</div>
              </div>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-colors">
                View Full Docs
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/20 border border-pink-500/30 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-4">Rate Limits</h4>
            <ul className="space-y-3 text-slate-300">
              <li className="flex justify-between">
                <span>Free Tier:</span>
                <span className="font-semibold">100 requests/day</span>
              </li>
              <li className="flex justify-between">
                <span>Pro:</span>
                <span className="font-semibold">10K requests/day</span>
              </li>
              <li className="flex justify-between">
                <span>Enterprise:</span>
                <span className="font-semibold">Unlimited</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
