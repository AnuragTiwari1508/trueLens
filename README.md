# trueLens - Unified Media Verification Platform

## 🎯 Project Overview

**trueLens** is a comprehensive, AI-powered verification platform designed to detect fake news, deepfakes, and forged documents. Built for the **PU Code Hackathon 3.0**, this platform combines advanced machine learning with user-friendly interfaces across multiple platforms.

## 🏗️ Architecture

### Three-Layer Verification System
1. **AI Detection Engine** (Custom ML Models)
2. **Secondary Verification Layer** (External APIs like Persona)
3. **Confidence Aggregator** (Double-verification for reliability)

### Tech Stack

**Frontend:**
- Next.js 16 (App Router)
- React 19 with Server Components
- Tailwind CSS v4 with custom animations
- TypeScript for type safety

**Features:**
- Dark mode (Galaxy background) + Light mode (Nature scenery)
- Smooth animations and transitions
- Animated character (Joker) on navbar
- Rotating wheels and interactive elements
- Responsive design (mobile-first)

**Backend Ready:**
- API routes for verification services
- Server actions for data processing
- Database integration ready (Supabase/Neon)

## 📁 Project Structure

```
app/
├── page.tsx                 # Main landing page
├── layout.tsx              # Root layout with metadata
├── globals.css             # Theme + animations
├── fake-news/
│   └── page.tsx           # Fake news detection page
├── deepfake/
│   └── page.tsx           # Deepfake detection page
├── documents/
│   └── page.tsx           # Document verification page
├── bots/
│   └── page.tsx           # Bot downloads page
├── apis/
│   └── page.tsx           # API documentation page
└── community/
    └── page.tsx           # Community feed page

components/
├── navbar.tsx              # Navigation with theme toggle
├── hero.tsx               # Hero section with animations
├── features.tsx           # Three verification features
├── tools-section.tsx      # Bots & APIs showcase
├── community.tsx          # Community feed component
└── footer.tsx             # Footer with links
```

## 🎨 Design Highlights

### Color Scheme
- **Primary:** Indigo (#6366f1)
- **Secondary:** Pink (#ec4899)
- **Accent:** Amber (#f59e0b)
- **Neutral:** Slate grays
- **Teal:** For tools/APIs (#14b8a6)

### Custom Animations
- `galaxy-bg`: Animated galaxy gradient (dark mode)
- `nature-bg`: Sky-to-earth gradient (light mode)
- `animate-float`: Floating elements
- `animate-spin-slow`: Rotating wheels
- `animate-pulse-glow`: Glowing effects
- `animate-slide-in-left/up`: Entrance animations
- `animate-bounce-smooth`: Smooth bouncing

### Key UI Elements
1. **Navbar**: Google Developers-style with dropdown menus
2. **Hero**: Rotating wheel with feature circles + moving Joker character
3. **Features**: Three color-coded verification cards
4. **Tools**: Bot and API showcases with download options
5. **Community**: Interactive feed with like/share/report features
6. **Theme Toggle**: Sun/Moon button for dark/light switch

## 🚀 Features

### 1. Fake News & Misinformation Detection
- Claim extraction
- Semantic similarity analysis
- Source credibility scoring
- Virality vs trust anomaly detection

### 2. Deepfake Detection
- Face landmark inconsistency
- Blink rate & lip-sync analysis
- GAN artifact detection
- Metadata & compression forensics

### 3. Document Verification
- OCR & layout fingerprinting
- Signature & seal validation
- Font & spacing anomaly detection
- Issuer authority verification

### 4. Multi-Platform Distribution
- **WhatsApp Bot**: Direct verification on messaging
- **Telegram Bot**: Channel monitoring
- **Discord Bot**: Community moderation
- **REST APIs**: For developers
- **WebSocket APIs**: Real-time streaming
- **Python/JavaScript SDKs**: Easy integration

### 5. Community Features
- Share verification findings
- Report misinformation
- Like, reply, and share posts
- Categorized discussions
- Expert verification badges

## 🔧 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
```env
NEXT_PUBLIC_API_BASE_URL=https://api.truelens.io
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

## 📊 Verification Flow

1. **User Input** → Upload content (text, image, video, document)
2. **AI Analysis** → Primary ML models analyze content
3. **External Verification** → Secondary API validation
4. **Confidence Aggregation** → Combine results for confidence score
5. **Report Generation** → Detailed, explainable results
6. **Blockchain Cert** (Optional) → Immutable verification proof

## 🎓 Use Cases

### Public Sector
- WhatsApp users checking viral forwards
- Journalists verifying media
- Students verifying certificates

### Enterprise
- HR departments preventing document fraud
- Media houses filtering fake visuals
- Educational institutions validating degrees

### Government
- Pandemic misinformation control
- Public advisory verification
- National security monitoring

## 📈 Hackathon Deliverables

✅ **Frontend**: Fully animated, multi-page application  
✅ **UI/UX**: Dark + Light themes with smooth transitions  
✅ **Navigation**: Google Developers-style with dropdowns  
✅ **Pages**: 6 main pages + community feed  
✅ **Components**: Modular, reusable React components  
✅ **Animations**: Custom CSS animations throughout  
✅ **Responsive**: Mobile-first design  
✅ **Documentation**: API pages with code examples  

## 🔐 Security & Privacy

- Encrypted media handling
- No permanent storage of user content
- Audit-ready logs for enterprises
- Explainable AI (transparency)
- Row-level security ready

## 📞 Support

- **Documentation**: `/apis` page with full reference
- **Community**: `/community` for discussions
- **Bots**: `/bots` for download & setup
- **APIs**: `/apis` for integration guides

## 🙌 Credits

Built with ❤️ for the **PU Code Hackathon 3.0**  
Powered by Next.js, React, Tailwind CSS, and TypeScript

---

**Idea**: Unified Misinformation & Media Verification Platform (API-First)  
**Status**: Hackathon MVP - Ready for Demo  
**Last Updated**: January 2024
