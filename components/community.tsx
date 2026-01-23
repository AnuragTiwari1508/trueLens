'use client'

import { Heart, MessageCircle, Share2, Flag, Users } from 'lucide-react'
import { useState } from 'react'

const communityPosts = [
  {
    id: 1,
    author: 'Sarah Khan',
    avatar: '👩‍💼',
    timestamp: '2 hours ago',
    content: 'Just tested the WhatsApp bot on a suspicious viral video. Caught a deepfake in seconds! 🎯',
    category: 'Success Story',
    likes: 234,
    replies: 12,
    verified: true
  },
  {
    id: 2,
    author: 'Raj Patel',
    avatar: '👨‍💻',
    timestamp: '4 hours ago',
    content: 'Found a potential misinformation network spreading health hoaxes. Reported through platform.',
    category: 'Misinformation Report',
    likes: 456,
    replies: 28,
    verified: false
  },
  {
    id: 3,
    author: 'Dr. Amira Hassan',
    avatar: '👨‍🔬',
    timestamp: '6 hours ago',
    content: 'The document verification feature just saved us from 5 forged certificates. Incredible accuracy!',
    category: 'Enterprise Use',
    likes: 789,
    replies: 45,
    verified: true
  },
  {
    id: 4,
    author: 'Media Check India',
    avatar: '🏢',
    timestamp: '8 hours ago',
    content: 'API integration completed. Now fact-checking 1000+ claims daily automatically.',
    category: 'API Integration',
    likes: 567,
    replies: 34,
    verified: true
  }
]

export default function Community() {
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [reportedPosts, setReportedPosts] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const toggleReport = (id: number) => {
    setReportedPosts(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 animate-slide-in-up">
          <div className="flex items-center gap-2 mb-4">
            <Users size={24} className="text-indigo-600" />
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
              Community Feed
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Share findings, verify claims together, and combat misinformation
          </p>
        </div>

        {/* Post Creation Box */}
        <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl border border-indigo-200 dark:border-slate-700 animate-slide-in-up">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Share your discovery or verification finding..."
              className="flex-1 bg-white dark:bg-slate-700 px-4 py-3 rounded-lg text-slate-900 dark:text-white placeholder-slate-500 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-2">
              <select className="px-4 py-2 bg-white dark:bg-slate-700 text-sm rounded-lg border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none">
                <option>Category...</option>
                <option>Success Story</option>
                <option>Misinformation Report</option>
                <option>API Integration</option>
                <option>Enterprise Use</option>
                <option>Technical Help</option>
              </select>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              Post Discovery
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {communityPosts.map((post, idx) => (
            <div
              key={post.id}
              className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 animate-slide-in-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Post Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3 flex-1">
                  <div className="text-3xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {post.author}
                      </h4>
                      {post.verified && (
                        <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{post.timestamp}</p>
                  </div>
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold">
                  {post.category}
                </div>
              </div>

              {/* Post Content */}
              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                {post.content}
              </p>

              {/* Post Stats */}
              <div className="flex gap-6 mb-4 text-sm text-slate-600 dark:text-slate-400 pb-4 border-b border-slate-200 dark:border-slate-700">
                <span>{post.likes} likes</span>
                <span>{post.replies} replies</span>
              </div>

              {/* Post Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    likedPosts.includes(post.id)
                      ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Heart
                    size={18}
                    className={likedPosts.includes(post.id) ? 'fill-current' : ''}
                  />
                  Like
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all">
                  <MessageCircle size={18} />
                  Reply
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all">
                  <Share2 size={18} />
                  Share
                </button>
                <button
                  onClick={() => toggleReport(post.id)}
                  className={`flex items-center justify-center py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    reportedPosts.includes(post.id)
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                  title="Report misinformation"
                >
                  <Flag size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 animate-slide-in-up">
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </section>
  )
}
