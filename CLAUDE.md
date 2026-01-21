# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HG Automation - Industrial automation company website built with React 19 + Tailwind CSS (frontend) and Node.js + Express (backend).

## Commands

### Frontend (React + Tailwind)
```bash
npm install              # Install all dependencies
npm start                # Run React dev server (localhost:3000)
npm test                 # Run tests in interactive watch mode
npm run build            # Create production build
npm run build:secure     # Production build + JS obfuscation
```

### Backend (Express)
```bash
cd server && npm install # Install server dependencies
npm run server           # Run Express server (localhost:5000)
```

### Development (Both)
```bash
npm run dev              # Run both frontend and backend concurrently
```

## Architecture

### Frontend Structure (`src/`)
- **App.js** - Main component wrapped in `SecurityProvider`
- **components/layout/** - Header, Footer
- **components/sections/** - Hero, Services, About, Contact (page sections)
- **components/common/** - Logo, ServiceCard, SecurityProvider
- **services/api.js** - API client (`serviceApi`, `contactApi`, `healthCheck`)
- **index.css** - Tailwind directives + custom animations

### Backend Structure (`server/`)
- **server.js** - Express entry point with CORS, routes, error handling
- **routes/** - serviceRoutes, contactRoutes
- **controllers/** - Business logic handlers
- **middleware/** - validation.js, errorHandler.js
- **data/** - Simulated data store

### API Endpoints
- `GET /api/services` - Get all services (optional `?featured=true`)
- `GET /api/services/:id` - Get service by ID
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

### Frontend-Backend Proxy
React dev server proxies `/api` requests to `localhost:5000` (configured in package.json `proxy` field).

## Tailwind Configuration

Custom theme in `tailwind.config.js`:
- **Colors**: `primary` (dark slate), `accent` (blue #2da0d4), `success` (green), `steel` (gray scale)
- **Animations**: `float`, `pulse-slow`, `spin-slow`
- **Shadows**: `industrial`, `industrial-lg`

Custom component classes in `index.css`:
- `.btn-primary` / `.btn-outline` - Button styles
- `.input-field` - Form input styling (supports `.error` state)
- `.section-title` / `.section-subtitle` - Section headers
- `.text-gradient` - Accent gradient text
- Animation classes: `.animate-fadeInUp`, `.animate-scaleIn`, `.animate-float`, `.hover-lift`, etc.

## Logo Component

`src/components/common/Logo.js` exports:
- `Logo` - Main logo with text (sizes: small, default, large, hero)
- `LogoIcon` - Compact hexagonal logo
- `LogoAnimated` - Animated version for hero section
