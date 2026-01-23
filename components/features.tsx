'use client'

import { Check, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    id: 'fake-news',
    icon: '📰',
    title: 'Fake News & Misinformation',
    color: 'from-indigo-500 to-blue-600',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    capabilities: [
      'Claim extraction & analysis',
      'Semantic similarity detection',
      'Source credibility scoring',
      'Virality vs trust anomaly detection'
    ],
    platforms: ['📱 Mobile App', '🧩 Browser Extension', '💬 WhatsApp Bot']
  },
  {
    id: 'deepfake',
    icon: '🎬',
    title: 'Deepfake Detection',
    color: 'from-pink-500 to-rose-600',
    textColor: 'text-pink-600 dark:text-pink-400',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    capabilities: [
      'Face landmark inconsistency detection',
      'Blink rate & lip-sync analysis',
      'GAN artifact detection',
      'Metadata & compression forensics'
    ],
    platforms: ['🎥 Video Analysis', '📸 Image Detection', '⚡ Real-time API']
  },
  {
    id: 'documents',
    icon: '📄',
    title: 'Document Verification',
    color: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    borderColor: 'border-amber-200 dark:border-amber-800',
    capabilities: [
      'OCR & layout fingerprinting',
      'Signature & seal validation',
      'Font & spacing anomaly detection',
      'Issuer authority verification'
    ],
    platforms: ['🏢 Enterprise API', '📋 Document Upload', '🔒 Blockchain Cert']
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
              Three Layers of Verification
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive detection across text, video, and documents with AI + secondary verification APIs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-2xl animate-slide-in-up ${feature.borderColor}`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Top Color Accent */}
              <div className={`h-1 bg-gradient-to-r ${feature.color}`} />
              
              <div className="relative p-8 bg-white dark:bg-slate-800">
                {/* Icon */}
                <div className={`text-5xl mb-4 ${feature.textColor}`}>{feature.icon}</div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                {/* Capabilities */}
                <div className="mb-6 space-y-3">
                  {feature.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Check size={18} className={feature.textColor} />
                      <span className="text-slate-700 dark:text-slate-300">{cap}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-6" />

                {/* Platforms */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase">Delivered As:</p>
                  <div className="space-y-2">
                    {feature.platforms.map((platform, i) => (
                      <div key={i} className="text-sm text-slate-600 dark:text-slate-400">
                        {platform}
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link 
                  href={`/${feature.id}`}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${feature.bgColor} ${feature.textColor} hover:shadow-lg group/btn`}
                >
                  Explore {feature.title.split(' ')[0]}
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 animate-slide-in-up">
          <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
            🏗️ Architecture Highlights
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">AI Models</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✓ Transformer-based claim detection (NLP)</li>
                <li>✓ Vision Transformers (deepfake analysis)</li>
                <li>✓ Frequency + temporal models (video)</li>
                <li>✓ Layout-aware OCR (documents)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-pink-600 dark:text-pink-400 mb-3">Integrations</h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>✓ Persona-like ID verification API</li>
                <li>✓ Public fact-check databases</li>
                <li>✓ Media fingerprinting services</li>
                <li>✓ Blockchain verification (certificates)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
