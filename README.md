# TripBro ✈️ — AI Travel Planner PWA

A full-featured AI-powered travel planning Progressive Web App built with React + Vite + Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🔑 API Keys Setup

Create a `.env` file (copy from `.env.example`):

```env
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Where to get free API keys:

| Service | Link | Free Tier |
|---|---|---|
| **Anthropic (Claude AI)** | https://console.anthropic.com | $5 free credits |
| **Supabase** | https://supabase.com | Free tier (500MB DB) |

> **Note:** The app works fully without API keys using rich mock data.
> Add VITE_ANTHROPIC_API_KEY for real AI-generated itineraries.

## 📁 Project Structure

```
src/
├── context/       # Global state (AppContext)
├── services/      # AI itinerary generation (aiService.js)
├── pages/
│   ├── auth/      # Login, Register
│   ├── Landing.jsx
│   ├── Dashboard.jsx
│   ├── CreateTrip.jsx  # 4-step wizard
│   ├── Itinerary.jsx   # Trip detail + tabs
│   ├── Trips.jsx
│   ├── Explore.jsx
│   ├── Profile.jsx
│   └── Budget.jsx
└── components/
    └── layout/    # Header, BottomNav
```

## 🎨 Design System

- **Primary:** Ocean Blue `#0077BE`
- **Accent:** Sunset Orange `#FF6B35`  
- **Secondary:** Warm Sand `#F5E6D3`
- **Fonts:** Poppins (display) + Plus Jakarta Sans (body)

## ✨ Features

- 🤖 AI itinerary generation (Claude / mock fallback)
- 📅 4-step trip creation wizard
- 📊 Budget breakdown with charts (Recharts)
- 🗺️ Explore destinations
- 👤 User profile & settings
- 📱 PWA-optimized mobile-first design
- 💾 Local storage persistence
