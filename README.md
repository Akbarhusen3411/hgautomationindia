# HG Automation - Industrial Automation Website

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 3"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Deployed-GitHub_Pages-222?style=flat-square&logo=github-pages&logoColor=white" alt="GitHub Pages"/>
</p>

A professional single-page website for **[HG Automation India](https://akbarhusen3411.github.io/hgautomationindia)** — an industrial automation company specializing in PLC programming, SCADA systems, HMI development, control panels, and Industry 4.0 integration.

---

## Tech Stack

### Frontend
- React 19, JavaScript (ES6+), Tailwind CSS 3
- Single-page app with hash-based smooth scrolling
- Custom hooks for animated counters, scroll effects, parallax
- Deployed to GitHub Pages

### Backend
- Node.js, Express
- Nodemailer (Gmail SMTP) for contact form notifications
- Express-validator for input sanitization
- In-memory data storage

### Security & Build
- JavaScript obfuscation with domain lock (production)
- Helmet CSP headers, CORS, rate limiting
- Source protection (DevTools, right-click, copy disabled in production)
- Error boundary for graceful crash recovery

---

## Features

- Responsive design optimized for mobile (402px+), tablet, and desktop
- Animated hero section with 3D holographic logo display
- Service cards with modal details and 3D tilt effects
- Testimonials carousel with touch/swipe support
- Contact form with email notifications
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
├── public/                    # Static files, index.html, sitemap
├── src/
│   ├── components/
│   │   ├── common/            # ErrorBoundary, Logo, ServiceCard, ServiceModal,
│   │   │                        ScrollAnimation, SEO, WhatsAppButton, CookieConsent,
│   │   │                        CustomScrollbar, GoogleAnalytics, ScrollProgress
│   │   ├── layout/            # Header, Footer
│   │   └── sections/          # Hero, Services, About, Testimonials, Contact
│   ├── hooks/                 # useAnimatedCounter, useScrollAnimation,
│   │                            useScrollEffects, useSourceProtection
│   ├── services/              # api.js (fetchApi, serviceApi, contactApi)
│   ├── data/                  # countries.js (dial codes for phone field)
│   ├── utils/                 # smoothScroll.js
│   ├── App.js                 # Main app with ErrorBoundary wrapper
│   └── index.css              # Tailwind layers + custom animations
├── server/
│   ├── controllers/           # serviceController, contactController
│   ├── routes/                # serviceRoutes, contactRoutes
│   ├── services/              # emailService
│   ├── middleware/             # validation, errorHandler
│   ├── data/                  # services.js (service data)
│   └── server.js              # Express entry point
├── scripts/
│   ├── obfuscate.js           # Post-build JS obfuscation with domain lock
│   └── set-version.js         # Injects version into build
├── package.json
├── tailwind.config.js
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | All services (optional `?featured=true`) |
| GET | `/api/services/:id` | Service by ID |
| GET | `/api/services/summaries` | Service card summaries |
| POST | `/api/contact` | Submit contact form |
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
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EMAIL_USER=<gmail address>
EMAIL_APP_PASSWORD=<gmail app password>
CONTACT_EMAIL_RECIPIENT=<admin email>
```

---

## License

All rights reserved. HG Automation India.
