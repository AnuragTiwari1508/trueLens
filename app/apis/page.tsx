'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Copy, Code2, BookOpen, Zap } from 'lucide-react'
import { useState } from 'react'

const apis = [
  {
    name: 'REST API',
    icon: '⚙️',
    description: 'Standard REST endpoints for all verification services',
    endpoint: 'https://api.truelens.io/v1',
    methods: ['POST /verify/news', 'POST /verify/deepfake', 'POST /verify/document'],
    rateLimit: '10K requests/day (Pro)',
    latency: '~200ms',
    format: 'JSON'
  },
  {
    name: 'WebSocket API',
    icon: '⚡',
    description: 'Real-time streaming for live verification',
    endpoint: 'wss://stream.truelens.io/v1',
    methods: ['connect', 'subscribe', 'receive-events'],
    rateLimit: 'Unlimited streams',
    latency: '<50ms',
    format: 'Event-based'
  },
  {
    name: 'Python SDK',
    icon: '🐍',
    description: 'Easy integration for Python developers',
    endpoint: 'pip install truelens-sdk',
    methods: ['verify_news()', 'verify_deepfake()', 'verify_document()'],
    rateLimit: 'Auto-managed',
    latency: 'Optimized',
    format: 'Async support'
  },
  {
    name: 'JavaScript SDK',
    icon: '📜',
    description: 'Frontend and Node.js integration',
    endpoint: 'npm install @truelens/sdk',
    methods: ['verifyNews()', 'verifyDeepfake()', 'verifyDocument()'],
    rateLimit: 'Auto-managed',
    latency: 'Browser + Node.js',
    format: 'Promise-based'
  }
]

const codeExamples = {
  python: `import truelens

client = truelens.Client(api_key="your_key")

# Verify news
result = client.verify_news({
    "text": "Breaking: Scientists discover new element",
    "url": "https://news.com/article"
})

print(f"Authenticity: {result.confidence}%")
print(f"Risk Score: {result.risk_score}")`,

  javascript: `import { trueLens } from '@truelens/sdk';

const client = new trueLens.Client({
  apiKey: 'your_key'
});

// Verify news
const result = await client.verifyNews({
  text: 'Breaking: Scientists discover new element',
  url: 'https://news.com/article'
});

console.log(\`Authenticity: \${result.confidence}%\`);`,

  curl: `curl -X POST https://api.truelens.io/v1/verify/news \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "News content here",
    "url": "https://example.com"
  }'`
}

export default function APIsPage() {
  const [selectedLang, setSelectedLang] = useState<keyof typeof codeExamples>('python')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[selectedLang])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-slide-in-up">
            <div className="inline-block mb-4 px-4 py-2 bg-teal-100 dark:bg-teal-900/30 rounded-full border border-teal-300 dark:border-teal-700">
              <span className="text-teal-600 dark:text-teal-400 text-sm font-semibold">⚙️ API Documentation</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Developer APIs & SDKs
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Integrate verification directly into your application with our APIs and SDKs
            </p>
          </div>

          {/* APIs Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {apis.map((api, idx) => (
              <div
                key={api.name}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 hover:shadow-lg transition-all animate-slide-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl mb-4">{api.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{api.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{api.description}</p>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-6 font-mono text-sm text-slate-900 dark:text-white break-all">
                  {api.endpoint}
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">Methods</p>
                    <ul className="space-y-1">
                      {api.methods.map((method, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-700 mb-6 text-sm">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Rate Limit</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{api.rateLimit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Latency</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{api.latency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Format</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{api.format}</p>
                  </div>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Explore
                </button>
              </div>
            ))}
          </div>

          {/* Code Examples */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-16">
            <h3 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Quick Start</h3>

            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {(['python', 'javascript', 'curl'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      selectedLang === lang
                        ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {lang === 'python' ? '🐍 Python' : lang === 'javascript' ? '📜 JavaScript' : '🔗 cURL'}
                  </button>
                ))}
              </div>

              <div className="relative bg-slate-900 rounded-lg p-6 mb-4">
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <span className="text-green-400 text-sm">✓ Copied</span>
                  ) : (
                    <Copy size={16} className="text-slate-400" />
                  )}
                </button>
                <pre className="text-slate-300 font-mono text-sm overflow-x-auto">
                  <code>{codeExamples[selectedLang]}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Authentication</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Use API keys for secure access to all endpoints. Generate keys from your dashboard.
              </p>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg font-mono text-sm text-slate-900 dark:text-white mb-4 break-all">
                Authorization: Bearer YOUR_API_KEY
              </div>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                Get API Key
              </button>
            </div>

            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-2xl p-8 border border-pink-200 dark:border-pink-800">
              <h4 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Rate Limiting</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Free</span>
                  <span className="font-semibold text-slate-900 dark:text-white">100 req/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Pro</span>
                  <span className="font-semibold text-slate-900 dark:text-white">10K req/day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-700 dark:text-slate-300">Enterprise</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Unlimited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="grid md:grid-cols-3 gap-6">
            <a href="#" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group">
              <BookOpen size={24} className="text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Full Documentation</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Explore complete API reference and guides</p>
            </a>
            <a href="#" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group">
              <Code2 size={24} className="text-pink-600 dark:text-pink-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Code Examples</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Ready-to-use code snippets</p>
            </a>
            <a href="#" className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all group">
              <Zap size={24} className="text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Status & Support</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">System status and help center</p>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
