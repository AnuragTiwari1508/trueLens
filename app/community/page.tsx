import Navbar from '@/components/navbar'
import Community from '@/components/community'
import Footer from '@/components/footer'
import { Users, MessageCircle, TrendingUp, Award } from 'lucide-react'

export default function CommunityPage() {
  const stats = [
    { icon: Users, label: 'Active Members', value: '50K+' },
    { icon: MessageCircle, label: 'Discussions', value: '125K+' },
    { icon: TrendingUp, label: 'Cases Solved', value: '500K+' },
    { icon: Award, label: 'Verified Experts', value: '2.5K+' }
  ]

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      <section className="pt-24 bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950">
        {/* Header Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12 animate-slide-in-up">
            <h1 className="text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Join Our Verification Community
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Connect with fact-checkers, researchers, and verification experts
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 text-center hover:shadow-lg transition-all animate-slide-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Icon size={32} className="text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Community Feed */}
      <Community />

      {/* Additional Sections */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white text-center">
            Community Categories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                category: 'Expert Verification',
                emoji: '🔬',
                desc: 'Deep dives into verification methodologies',
                members: '8.5K'
              },
              {
                category: 'API Integration Help',
                emoji: '⚙️',
                desc: 'Technical discussions for developers',
                members: '12.3K'
              },
              {
                category: 'Case Studies',
                emoji: '📚',
                desc: 'Real-world verification success stories',
                members: '6.1K'
              },
              {
                category: 'Misinformation Reports',
                emoji: '⚠️',
                desc: 'Report and discuss active campaigns',
                members: '15.8K'
              },
              {
                category: 'Research & Articles',
                emoji: '📖',
                desc: 'Share latest research on deepfakes',
                members: '9.4K'
              },
              {
                category: 'General Discussion',
                emoji: '💬',
                desc: 'Off-topic and community chat',
                members: '20.2K'
              }
            ].map((cat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group animate-slide-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{cat.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  {cat.category}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{cat.desc}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{cat.members} members</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-white text-center">
            Community Guidelines
          </h2>

          <div className="space-y-6">
            {[
              {
                title: '🤝 Be Respectful',
                desc: 'Treat all members with respect. Disagreements are okay, but keep discussions constructive.'
              },
              {
                title: '📋 Fact-Check Before Sharing',
                desc: 'Use our tools to verify claims before posting. Misinformation reports should include evidence.'
              },
              {
                title: '🔐 Protect Privacy',
                desc: 'Never share personal information or identifying details about individuals in posts.'
              },
              {
                title: '📢 No Spam or Promotion',
                desc: 'Avoid excessive self-promotion. Focus on adding value to the community.'
              },
              {
                title: '🎯 Stay On Topic',
                desc: 'Keep discussions relevant to the category. Use General Discussion for off-topic chat.'
              },
              {
                title: '📚 Report Violations',
                desc: 'See something inappropriate? Use the report button or contact moderators.'
              }
            ].map((guideline, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-r from-indigo-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{guideline.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{guideline.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Create an account to start participating in discussions, sharing findings, and learning from experts
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
              Create Account
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
