# trueLens - Quick Start Guide

## 🚀 Running the Project

### 1. Installation
```bash
# Clone or open the project
cd trueLens

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Open browser**: http://localhost:3000

---

## 📖 Project Pages

### 🏠 Homepage (`/`)
- **What you see**: Hero section with animated rotating wheel
- **Features**: 
  - Dark/Light theme toggle (top-right)
  - Animated Joker character moving along bottom
  - Three feature cards (Fake News, Deepfake, Documents)
  - Community feed
  - Tools section with bots & APIs

### 📰 Fake News (`/fake-news`)
- Upload text or URL
- Analyze claims
- Get authenticity scores
- Use cases section

### 🎬 Deepfake (`/deepfake`)
- Upload image or video
- Analyze facial landmarks
- Detect GAN artifacts
- View detection metrics

### 📄 Documents (`/documents`)
- Upload document (PDF, JPG, PNG)
- Verify signature & seals
- Check issuer authority
- Blockchain certification info

### 🤖 Bots (`/bots`)
- Download WhatsApp, Telegram, Discord bots
- View features & ratings
- Get setup instructions

### ⚙️ APIs (`/apis`)
- REST API documentation
- WebSocket API info
- Code examples (Python, JavaScript, cURL)
- Rate limits & pricing

### 👥 Community (`/community`)
- Browse community posts
- Like, reply, share
- Report misinformation
- View guidelines

---

## 🎨 Theme Features

### Dark Mode (Default)
- Galaxy gradient background
- Animated colored blobs
- Perfect for demo/presentation

### Light Mode
- Nature background (sky, sunrise, mountains)
- Clean, bright interface
- Toggle with Sun/Moon icon

---

## 🎬 Demo Flow (5 Minutes)

1. **Start on Homepage** (30s)
   - Show animated hero
   - Highlight three features
   - Toggle theme (dark ↔ light)

2. **Navigate Navbar** (30s)
   - Click "Fake News" dropdown
   - Show hover effects
   - Mention Google Developers-style design

3. **Fake News Page** (1m)
   - Paste sample text
   - Show "Analyze Now" button
   - Explain verification features

4. **Deepfake Page** (1m)
   - Show upload area
   - Explain detection methods
   - Display sample metrics

5. **Community Page** (30s)
   - Show posts
   - Demonstrate like/share/report
   - Highlight engagement

6. **APIs & Bots** (1m)
   - Show code examples
   - Display download options
   - Explain quick start

---

## 🔧 Key Components

### Navigation
- **File**: `components/navbar.tsx`
- Features dropdown menus
- Theme toggle
- Chat & API buttons

### Hero Section
- **File**: `components/hero.tsx`
- Animated rotating wheel with feature circles
- Moving Joker character
- Smooth scroll indicator

### Features
- **File**: `components/features.tsx`
- Three color-coded cards
- Capabilities list
- Architecture highlights

### Tools Section
- **File**: `components/tools-section.tsx`
- Bot showcase
- API documentation
- Download links

### Community
- **File**: `components/community.tsx`
- Interactive posts
- Like/share/report buttons
- Category filters

### Footer
- **File**: `components/footer.tsx`
- Links to all sections
- Newsletter signup
- Social media

---

## 🎨 Customization

### Change Colors
**File**: `app/globals.css`

```css
:root {
  --primary: #6366f1;      /* Indigo */
  --secondary: #ec4899;    /* Pink */
  --accent: #f59e0b;       /* Amber */
}
```

### Add More Animations
**File**: `app/globals.css`

```css
@keyframes custom-animation {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Modify Text
- Edit page files in `/app` directory
- Update navbar links in `components/navbar.tsx`
- Change feature descriptions in `components/features.tsx`

---

## 📱 Responsive Design

All pages are **mobile-first responsive**:
- Tested on mobile, tablet, desktop
- Touch-friendly buttons
- Adaptive layouts
- Hamburger menu ready (can be added)

---

## 🔐 Security Notes

Current state:
- ✅ Frontend-only
- ✅ No data storage
- ✅ No authentication
- ✅ No backend required (for demo)

For production, you'll need:
- [ ] Backend API (Node.js, FastAPI, etc.)
- [ ] Database (Supabase, Neon, PostgreSQL)
- [ ] Authentication (Auth.js, Supabase Auth)
- [ ] API rate limiting
- [ ] HTTPS encryption

---

## 📊 File Structure

```
trueLens/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles + animations
│   ├── fake-news/page.tsx         # Fake news section
│   ├── deepfake/page.tsx          # Deepfake section
│   ├── documents/page.tsx         # Document verification
│   ├── bots/page.tsx              # Bots download
│   ├── apis/page.tsx              # API docs
│   └── community/page.tsx         # Community feed
│
├── components/
│   ├── navbar.tsx                  # Navigation with theme toggle
│   ├── hero.tsx                    # Hero section with animations
│   ├── features.tsx                # Three verification features
│   ├── tools-section.tsx          # Bots & APIs showcase
│   ├── community.tsx              # Community feed
│   └── footer.tsx                 # Footer
│
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── README.md                       # Project documentation
├── HACKATHON_GUIDE.md             # PPT slide guide
└── QUICKSTART.md                  # This file
```

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Animations Not Working
- Check `app/globals.css` is imported
- Ensure Tailwind CSS v4 is installed
- Clear browser cache

### Theme Not Persisting
- Currently uses immediate class changes
- For persistence, add localStorage (see commented code in navbar.tsx)

---

## 📚 Tech Stack Quick Reference

| Tech | Version | Purpose |
|------|---------|---------|
| Next.js | 16 | Framework |
| React | 19 | UI Library |
| TypeScript | Latest | Type Safety |
| Tailwind CSS | v4 | Styling |
| Lucide Icons | Latest | Icons |

---

## 🎯 Next Steps (Post-Hackathon)

1. **Backend API**
   - Create FastAPI/Node.js server
   - Implement verification engines
   - Set up database

2. **Database**
   - Connect Supabase or Neon
   - Migrate schema
   - Set up authentication

3. **AI Models**
   - Deploy ML verification models
   - Integrate external APIs (Persona)
   - Add blockchain integration

4. **Bots**
   - Implement WhatsApp API
   - Connect Telegram Bot
   - Deploy Discord integration

5. **Scaling**
   - Add CI/CD pipeline
   - Set up monitoring
   - Implement caching
   - Scale to production

---

## 💬 Questions?

- Check `README.md` for architecture
- See `HACKATHON_GUIDE.md` for presentation info
- Review component files for implementation details

---

**Happy Hacking! 🚀**
