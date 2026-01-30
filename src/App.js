/**
 * Main Application Component
 * HG Automation - Industrial Automation Company Website
 * Built with React + Tailwind CSS
 */

import React from 'react';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section components
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

// Utility components
import SEO from './components/common/SEO';
import WhatsAppButton from './components/common/WhatsAppButton';
import CookieConsent from './components/common/CookieConsent';
import GoogleAnalytics from './components/common/GoogleAnalytics';
import ScrollProgress from './components/common/ScrollProgress';

// Google Analytics Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

function App() {
  return (
    <>
      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* SEO Meta Tags */}
      <SEO
        title="HG Automation - Industrial Automation Solutions | PLC, SCADA, Control Panels"
        description="HG Automation provides expert industrial automation solutions including PLC programming, SCADA systems, HMI development, control panels, and Industry 4.0 integration in Gujarat, India."
        keywords="industrial automation, PLC programming, SCADA, HMI, control panels, Industry 4.0, IIoT, machine vision, Gujarat, India, HG Automation, Kheda"
      />

      {/* Google Analytics */}
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <div className="App min-h-screen flex flex-col page-enter">
        {/* Fixed navigation header */}
        <Header />

        {/* Main content sections */}
        <main id="main-content" className="flex-1">
          <Hero />
          <Services />
          <About />
          <Testimonials />
          <Contact />
        </main>

        {/* Site footer */}
        <Footer />

        {/* WhatsApp Floating Button */}
        <WhatsAppButton
          phoneNumber="918320049749"
          message="Hello! I'm interested in your industrial automation services. Can you provide more information?"
        />

        {/* Cookie Consent Banner */}
        <CookieConsent />
      </div>
    </>
  );
}

export default App;
