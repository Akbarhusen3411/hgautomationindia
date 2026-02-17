# HG Automation - Industrial Automation Website

A professional single-page website for **HG Automation India** — an industrial automation company specializing in PLC programming, SCADA systems, HMI development, control panels, and Industry 4.0 integration. Built with **React 19 + Tailwind CSS 3** (frontend) and **Node.js + Express** (backend).

---

## Tech Stack

### Frontend
- React 19, JavaScript (ES6+), Tailwind CSS 3
- Single-page app with hash-based smooth scrolling
- Custom hooks for animated counters, scroll effects, parallax
- Deployed to GitHub Pages

### Backend
- Node.js, Express
- Nodemailer (Gmail SMTP) for contact notifications
- Twilio SMS for phone OTP verification
- In-memory data storage (no database)

### Security & Build
- JavaScript obfuscation with domain lock (production)
- Helmet CSP headers
- Source protection (DevTools, right-click, copy disabled in production)
- Error boundary for graceful crash recovery
- Rate limiting on all API endpoints

---

## Features

- Responsive design optimized for mobile (402px+), tablet, and desktop
- Animated hero section with 3D holographic logo display
- Service cards with modal details, 3D tilt effects
- Testimonials carousel with touch/swipe support
- Contact form with dual OTP verification (email + phone)
- Google Maps embed, WhatsApp floating button
- Cookie consent with 6-month expiry
- WCAG accessibility: skip links, aria-live, 44px touch targets
- Google Analytics integration (consent-based)
- Custom scrollbar, scroll progress indicator

---

## Quick Start

```bash
# Install dependencies
npm install

# Run frontend dev server (localhost:3000)
npm start

# Run backend server (localhost:5000)
npm run server

# Run both concurrently
npm run dev

# Run tests
npm test -- --watchAll=false

# Production build with obfuscation
npm run build:secure

# Deploy to GitHub Pages
npm run deploy
```

---

## Project Structure

```text
hg_automation_web/
├── public/                    # Static files, index.html
├── src/
│   ├── components/
│   │   ├── common/            # ErrorBoundary, Logo, ServiceCard, ServiceModal,
│   │   │                        ScrollAnimation, SEO, WhatsAppButton, CookieConsent,
│   │   │                        CustomScrollbar, GoogleAnalytics, ScrollProgress
│   │   ├── layout/            # Header, Footer
│   │   └── sections/          # Hero, Services, About, Testimonials, Contact
│   ├── hooks/                 # useAnimatedCounter, useScrollAnimation,
│   │                            useScrollEffects, useSourceProtection
│   ├── services/              # api.js (fetchApi, serviceApi, contactApi, otpApi)
│   ├── data/                  # countries.js (dial codes for phone field)
│   ├── utils/                 # smoothScroll.js
│   ├── App.js                 # Main app with ErrorBoundary wrapper
│   ├── App.test.js            # 4 render tests
│   └── index.css              # Tailwind layers + custom animations
├── server/
│   ├── controllers/           # serviceController, contactController, otpController
│   ├── routes/                # serviceRoutes, contactRoutes, otpRoutes
│   ├── services/              # emailService, otpService, smsService
│   ├── middleware/             # validation, errorHandler
│   ├── data/                  # services.js (service data + in-memory store)
│   └── server.js              # Express entry point
├── scripts/
│   ├── obfuscate.js           # Post-build JS obfuscation with domain lock
│   └── set-version.js         # Injects version into build
├── package.json
├── tailwind.config.js
├── CLAUDE.md                  # AI assistant instructions
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | All services (optional `?featured=true`) |
| GET | `/api/services/:id` | Service by ID |
| GET | `/api/services/summaries` | Service card summaries |
| POST | `/api/otp/send-email` | Send email OTP |
| POST | `/api/otp/verify-email` | Verify email OTP |
| POST | `/api/otp/send-phone` | Send SMS OTP (Twilio) |
| POST | `/api/otp/verify-phone` | Verify phone OTP |
| POST | `/api/contact` | Submit contact form (requires OTP) |
| GET | `/api/health` | Health check |

---

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

---

## Latest Update — v1.0.3 (Feb 2026)

### Security
- Error boundary prevents blank page on component crashes
- Source protection hook disables DevTools, right-click, copy in production
- Image download protection via CSS
- Server-side OTP enforcement on contact form (was UI-only)
- PII logging suppressed in production
- Helmet Content Security Policy headers added
- Deploy uses obfuscated build with domain lock enabled
- Removed unused `react-router-dom` dependency

### Responsive
- Hero buttons stack vertically on mobile, stats grid 2-col on small screens
- About stats grid responsive (2-col mobile, 3-col tablet+)
- Contact info labels bumped to minimum readable size (11px)
- Reduced mobile gaps across Contact section, Footer grid
- WCAG-compliant 44px touch targets on carousel and mobile dots
- WhatsApp button optimized for mobile (52px, tighter positioning)
- ServiceModal CTA buttons stack below 900px

### Quality
- `aria-live` regions on form success/error messages for screen readers
- Cookie consent expires after 6 months, re-prompts user
- Privacy policy link fixed (was returning 404)
- Dead code removed from contact controller
- Test suite fixed: IntersectionObserver mock + updated assertions, all 4 tests pass

---

## License

All rights reserved. HG Automation India.
