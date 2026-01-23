import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Features from '@/components/features'
import ToolsSection from '@/components/tools-section'
import Community from '@/components/community'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <ToolsSection />
      <Community />
      <Footer />
    </main>
  )
}
