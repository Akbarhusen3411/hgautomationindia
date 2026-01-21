/**
 * Header Component
 * Fixed navigation bar with full-screen mobile drawer
 */

import React, { useState, useEffect } from 'react';
import logoImage from '../../images/Logo.png';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'services', label: 'Services', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'about', label: 'About', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'contact', label: 'Contact', icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          bg-gradient-to-r from-primary-dark via-primary to-primary-light
          ${isScrolled ? 'shadow-industrial-lg' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="flex-shrink-0 z-50 flex items-center gap-3"
            >
              <div className={`relative ${isMenuOpen ? 'hidden' : 'block'} md:block group/logo cursor-pointer`}>
                {/* Orbiting dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(45,160,212,0.8)] animate-orbitHeader" />
                </div>

                {/* Outer glow ring on hover */}
                <div className="absolute -inset-3 rounded-full opacity-0 group-hover/logo:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 rounded-full border border-accent/40" />
                  <div className="absolute inset-1 rounded-full border border-accent/20" />
                </div>

                {/* Rotating gradient ring */}
                <div className="absolute -inset-1 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
                  <svg className="w-full h-full" viewBox="0 0 50 50">
                    <defs>
                      <linearGradient id="headerRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(45,160,212,0)" />
                        <stop offset="50%" stopColor="rgba(45,160,212,0.8)" />
                        <stop offset="100%" stopColor="rgba(45,160,212,0)" />
                      </linearGradient>
                    </defs>
                    <circle cx="25" cy="25" r="23" fill="none" stroke="url(#headerRingGrad)" strokeWidth="1" />
                  </svg>
                </div>

                {/* Breathing glow background */}
                <div className="absolute -inset-0.5 bg-accent/25 rounded-full blur-md animate-pulse" style={{ animationDuration: '2.5s' }} />

                {/* Logo container */}
                <div className="relative">
                  <img src={logoImage} alt="HG Automation"
                       className="relative h-10 sm:h-12 w-auto animate-logoHeaderPulse
                                  group-hover/logo:scale-110 transition-transform duration-300" />
                </div>

                {/* Hover ripple effect */}
                <div className="absolute inset-0 rounded-full border border-accent/0 group-hover/logo:border-accent/50
                               group-hover/logo:scale-150 transition-all duration-700 opacity-0 group-hover/logo:opacity-100" />
              </div>
              <div className={`${isMenuOpen ? 'hidden' : 'block'} md:block`}>
                <h1 className="text-white font-bold text-sm sm:text-lg leading-tight tracking-wide">HG <span style={{ color: '#2da0d4' }}>AUTOMATION</span></h1>
                <p className="text-white/70 text-[8px] sm:text-[10px] tracking-widest uppercase">Precision Control. Optimized Performance</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative px-5 py-2 text-sm font-medium rounded-md transition-all duration-200
                    ${activeSection === item.id
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-accent transition-all duration-300
                      ${activeSection === item.id ? 'w-4/5' : 'w-0'}`}
                  />
                </a>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center
                       rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center
                  ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300
                  ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center
                  ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500
          ${isMenuOpen ? 'visible' : 'invisible'}`}
      >
        <div
          className={`absolute inset-0 bg-primary-dark/95 backdrop-blur-lg transition-opacity duration-500
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute inset-0 transition-all duration-500
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -left-20 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl" />
          </div>

          {/* Centered navigation - accounting for header (80px) and footer space */}
          <div className="absolute inset-0 flex items-center justify-center pt-20 pb-32 px-8">
            <nav className="w-full max-w-sm space-y-3">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-500
                    ${activeSection === item.id
                      ? 'bg-accent text-white shadow-lg shadow-accent/30'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                    }
                    ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <span className={`p-2 rounded-lg transition-all duration-300
                    ${activeSection === item.id
                      ? 'bg-white/20'
                      : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <span className="text-base font-semibold block">{item.label}</span>
                    <span className="text-xs text-white/50">
                      {item.id === 'home' && 'Back to top'}
                      {item.id === 'services' && 'What we offer'}
                      {item.id === 'about' && 'Our story'}
                      {item.id === 'contact' && 'Get in touch'}
                    </span>
                  </div>
                </a>
              ))}
            </nav>
          </div>

          {/* Footer section - fixed at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 pb-6 pt-4 text-center transition-all duration-700 delay-500
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-center gap-6 mb-6">
                <a href="tel:+918320049749" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">Call Us</span>
                </a>
                <a href="mailto:bakarali@hgautomationindia.com" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Email Us</span>
                </a>
              </div>

              <p className="text-white/30 text-xs mt-6">
                © 2024 HG Automation India. All rights reserved.
              </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
