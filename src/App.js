/**
 * Main Application Component
 * HG Automation - Industrial Automation Company Website
 * Built with React + Tailwind CSS
 */

import React from 'react';

// Security Provider
import SecurityProvider from './components/common/SecurityProvider';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Section components
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

function App() {
  return (
    <SecurityProvider>
      <div className="App min-h-screen flex flex-col">
        {/* Fixed navigation header */}
        <Header />

        {/* Main content sections */}
        <main className="flex-1">
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>

        {/* Site footer */}
        <Footer />
      </div>
    </SecurityProvider>
  );
}

export default App;
