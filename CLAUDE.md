# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HG Automation - Industrial automation company website built with React 19 + Tailwind CSS 3 (frontend) and Node.js + Express (backend). Single-page application with hash-based navigation (#services, #about, #contact). Deployed to GitHub Pages (frontend only); backend requires separate hosting.

## Commands

### Frontend (React + Tailwind)
```bash
npm install              # Install all dependencies
npm start                # Run React dev server (localhost:3000)
npm test                 # Run tests in interactive watch mode
npm test -- --watchAll=false  # Run tests once (CI mode)
npm run build            # Create production build
npm run build:secure     # Production build + JS obfuscation (scripts/obfuscate.js)
npm run deploy           # Build and deploy to GitHub Pages
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

### How Frontend and Backend Connect
- React dev server proxies `/api` requests to `localhost:5000` (configured in `package.json` `proxy` field)
- `src/services/api.js` provides a `fetchApi()` wrapper that all API modules use — handles Content-Type, error extraction, and network error messages
- API modules exported: `serviceApi`, `contactApi`, `otpApi`, `healthCheck`

### Frontend (`src/`)
- **App.js** — Single-page layout: SEO, ScrollProgress, Header, then section components (Hero, Services, About, Testimonials, Contact), Footer, WhatsAppButton, CookieConsent
- **components/sections/** — Each section is a standalone component rendered in order on the page
- **components/common/** — Reusable UI: Logo (3 variants), ServiceCard, ServiceModal, ScrollAnimation, SEO, GoogleAnalytics, WhatsAppButton, CookieConsent, ScrollProgress
- **components/layout/** — Header, Footer
- **services/api.js** — All backend API calls
- **hooks/** — `useAnimatedCounter` (number animation with IntersectionObserver), `useScrollAnimation` (simple scroll reveal), `useScrollEffects` (exports `useScrollReveal`, `useParallax`, `useScrollProgress`, `useScrollDirection`, `useScrollScale`)
- **data/countries.js** — Country dial code list used by Contact form phone field
- No router — navigation is hash-based smooth scrolling with `scroll-margin-top: 80px` on sections
- No state management library — React hooks only, component-level state

### Backend (`server/`)
- **server.js** — Express entry with Helmet, CORS (comma-separated origins from env), rate limiting, body parsing (10KB limit), route mounting, error handling. Sets `trust proxy 1`.
- **routes/** — `serviceRoutes.js`, `contactRoutes.js`, `otpRoutes.js`
- **controllers/** — `serviceController.js`, `contactController.js`, `otpController.js`
- **services/** — `emailService.js` (Nodemailer/Gmail SMTP), `otpService.js` (in-memory OTP with crypto, auto-cleanup every 10 min), `smsService.js` (Twilio, lazy-initialized)
- **middleware/** — `validation.js` (express-validator rules, blocklist of 31 disposable email domains), `errorHandler.js`
- **data/** — `services.js` exports service objects array and `contactSubmissions` array
- **No database** — all data is in-memory; server restart loses contact submissions and OTP state
- **No nodemon** — server `dev` script uses plain `node server.js`; restart manually on changes

### API Endpoints
- `GET /api/services` — All services (optional `?featured=true`)
- `GET /api/services/:id` — Service by ID
- `GET /api/services/summaries` — Service card summaries
- `POST /api/otp/send-email` — Send email OTP
- `POST /api/otp/verify-email` — Verify email OTP
- `POST /api/otp/send-phone` — Send SMS OTP via Twilio
- `POST /api/otp/verify-phone` — Verify phone OTP
- `POST /api/contact` — Submit contact form
- `GET /api/health` — Health check

### Contact Form Flow
The contact form requires dual OTP verification before submission:
1. User enters email → sends email OTP → verifies
2. User enters phone → sends SMS OTP → verifies
3. Only after both verified, form submission is allowed
4. OTP config: 5-min expiry, 60s cooldown between sends, max 5 verification attempts
5. **Note**: OTP verification is enforced UI-side only — the backend `/api/contact` route does not call `isVerified()` to check OTP status server-side

### Rate Limiting
- General API: 100 requests / 15 minutes
- Contact form: 5 submissions / hour
- OTP endpoints: 10 requests / 15 minutes

## Testing

Only one test file exists: `src/App.test.js` (4 tests using `@testing-library/react` — checks that key sections render). It mocks `global.fetch`. Jest config comes from `react-scripts` defaults; ESLint uses `react-app` + `react-app/jest` (configured in root `package.json`).

## Environment Variables

### Frontend (`.env` in root)
```
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Backend (`server/.env`)
```
PORT=5000
CORS_ORIGIN=http://localhost:3000
EMAIL_USER=<gmail address>
EMAIL_APP_PASSWORD=<gmail app password>
CONTACT_EMAIL_RECIPIENT=<admin email>
TWILIO_ACCOUNT_SID=<twilio sid>
TWILIO_AUTH_TOKEN=<twilio token>
TWILIO_PHONE_NUMBER=<twilio number>
NODE_ENV=development
```

Note: `server/.env.example` only covers email vars — it is missing PORT, CORS_ORIGIN, Twilio, and NODE_ENV.

## Tailwind Configuration

Custom theme in `tailwind.config.js`:
- **Colors**: `primary` (dark slate), `accent` (blue #2da0d4), `success` (green), `steel` (gray scale)
- **Animations**: `float`, `pulse-slow`, `spin-slow`, `bounce-slow`, `fade-in`, `fade-in-up`, `scale-in`, `slide-up`, `gradient`
- **Shadows**: `industrial`, `industrial-lg`

Custom component classes in `index.css`:
- `.btn-primary` / `.btn-outline` — Button styles
- `.input-field` — Form input styling (supports `.error` state)
- `.section-title` / `.section-subtitle` — Section headers
- `.text-gradient` — Accent gradient text
- `.bg-industrial-pattern` — SVG background pattern
- Animation classes: `.animate-fadeInUp`, `.animate-scaleIn`, `.animate-float`, `.hover-lift`, plus many more animation utilities
- Delay utilities: `.delay-100` through `.delay-700`
- `prefers-reduced-motion` is respected — animations are disabled globally for users who prefer reduced motion

## Known Quirks

- `react-router-dom` is listed as a dependency but is **not used** — the app uses hash-based smooth scrolling only
- Some dependencies (`cors`, `dotenv`, `express`, `express-rate-limit`, `express-validator`, `helmet`, `nodemailer`) appear in **both** root and server `package.json` with different version ranges — the server has its own `package.json` with its own `node_modules`
- `contactController.js` exports `getAllSubmissions` and `getSubmissionById` but these are **not mounted in any route** (dead code)
- `scripts/obfuscate.js` skips files > 500KB (vendor chunks); domain lock is commented out
