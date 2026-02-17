/**
 * Header Component
 * Premium glassmorphism navigation with smooth animations
 */

import React, { useState, useEffect, useCallback } from 'react';
import Logo from '../common/Logo';
import { scrollToElement } from '../../utils/smoothScroll';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { id: 'home', label: 'Home', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { id: 'services', label: 'Services', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'about', label: 'About', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'contact', label: 'Contact', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )},
  ];

  // Track mouse position for glow effect
  const handleMouseMove = useCallback((e) => {
    const header = document.getElementById('main-header');
    if (header) {
      const rect = header.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

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
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);

      setIsScrolled(currentScrollY > 20);

      // Update active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = currentScrollY + 100;

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    scrollToElement(sectionId, 80);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Header - Always Sticky */}
      <header
        id="main-header"
        onMouseMove={handleMouseMove}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out group/header
          ${isScrolled ? 'py-2' : 'py-3'}`}
      >
        {/* Dark Glassmorphism Background - Works on both light and dark backgrounds */}
        <div className={`absolute inset-0 transition-all duration-500
          ${isScrolled
            ? 'bg-slate-900/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
            : 'bg-slate-900/60 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)]'
          }
          group-hover/header:bg-slate-900/90 group-hover/header:backdrop-blur-2xl
          group-hover/header:shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}
        >
          {/* Glass refraction effect - subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-cyan-500/5 opacity-50" />

          {/* Subtle top highlight for depth */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Mouse follow glow effect */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-opacity duration-500 opacity-0 group-hover/header:opacity-100"
            style={{
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              background: 'radial-gradient(circle, rgba(45,160,212,0.15) 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Animated bottom divider glow */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          {/* Main glow line */}
          <div className={`h-[2px] transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-60'}`}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(45,160,212,0.2) 10%, rgba(45,160,212,0.6) 30%, rgba(34,211,238,0.9) 50%, rgba(45,160,212,0.6) 70%, rgba(45,160,212,0.2) 90%, transparent 100%)',
              boxShadow: '0 0 8px rgba(45,160,212,0.4), 0 0 20px rgba(45,160,212,0.15), 0 2px 8px rgba(45,160,212,0.1)',
            }}
          />
          {/* Shimmer sweep */}
          <div className="absolute top-0 left-0 right-0 h-[2px] header-divider-shimmer" />
          {/* Soft glow spread below */}
          <div className={`h-[12px] -mt-[1px] transition-opacity duration-500 ${isScrolled ? 'opacity-80' : 'opacity-40'}`}
            style={{
              background: 'radial-gradient(ellipse at 50% 0%, rgba(45,160,212,0.2) 0%, rgba(45,160,212,0.05) 50%, transparent 80%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo Section */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="flex-shrink-0 z-50 transition-all duration-300"
            >
              <Logo size="small" showText={true} />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-3">
              {/* Navigation Tabs Container */}
              <div className="relative flex items-center gap-0.5 p-1 rounded-2xl
                            bg-gradient-to-b from-white/[0.07] to-white/[0.03]
                            border border-white/[0.08]
                            shadow-[0_2px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]
                            backdrop-blur-xl">

                {/* Sliding active indicator */}
                <div
                  className="absolute top-1 bottom-1 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
                  style={{
                    left: `${navItems.findIndex(i => i.id === activeSection) * (100 / navItems.length)}%`,
                    width: `${100 / navItems.length}%`,
                    paddingLeft: 2,
                    paddingRight: 2,
                  }}
                >
                  <div className="w-full h-full rounded-xl bg-gradient-to-b from-accent/25 to-accent/10
                                  border border-accent/30
                                  shadow-[0_0_15px_rgba(45,160,212,0.2),0_4px_12px_rgba(45,160,212,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]" />
                </div>

                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="group/nav relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl
                              text-sm font-medium transition-all duration-300 select-none"
                  >
                    {/* Icon */}
                    <span className={`w-4 h-4 transition-all duration-300
                      ${activeSection === item.id
                        ? 'text-accent scale-110'
                        : 'text-white/40 group-hover/nav:text-white/70 scale-100'}`}>
                      {item.icon}
                    </span>

                    {/* Label */}
                    <span className={`transition-all duration-300
                      ${activeSection === item.id
                        ? 'text-white'
                        : 'text-white/50 group-hover/nav:text-white/80'}`}>
                      {item.label}
                    </span>

                    {/* Active dot indicator */}
                    <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent
                                    transition-all duration-300 shadow-[0_0_6px_rgba(45,160,212,0.8)]
                      ${activeSection === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                  </a>
                ))}
              </div>

              {/* Separator */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/15 to-transparent" />

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="group/btn relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-xl
                         bg-gradient-to-r from-accent to-cyan-500 text-white text-sm font-semibold
                         shadow-[0_4px_20px_rgba(45,160,212,0.35)]
                         hover:shadow-[0_6px_30px_rgba(45,160,212,0.5)]
                         hover:-translate-y-0.5 active:translate-y-0
                         transition-all duration-400"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full
                               transition-transform duration-700 ease-out
                               bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                {/* Top highlight */}
                <span className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative">Get Quote</span>
                <svg className="relative w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </nav>

            {/* Mobile Menu Button - Glass with accent */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center
                       rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm
                       hover:bg-accent/20 hover:border-accent/30
                       active:bg-accent/30 transition-all duration-300
                       group"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center
                  ${isMenuOpen
                    ? 'rotate-45 translate-y-[9px] bg-accent w-full'
                    : 'bg-white/80 group-hover:bg-accent w-full'}`}
                />
                <span className={`block h-0.5 bg-white/80 rounded-full transition-all duration-300
                  ${isMenuOpen
                    ? 'opacity-0 scale-0'
                    : 'group-hover:bg-accent w-3/4'}`}
                />
                <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center
                  ${isMenuOpen
                    ? '-rotate-45 -translate-y-[9px] bg-accent w-full'
                    : 'bg-white/80 group-hover:bg-accent w-1/2 ml-auto'}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Optimized for Physical Devices */}
      <div
        className={`fixed inset-0 z-40 md:hidden
          ${isMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}
        style={{ willChange: 'visibility' }}
      >
        {/* Solid backdrop - NO blur for performance */}
        <div
          className={`absolute inset-0 bg-primary-dark transition-opacity duration-200 ease-out
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ willChange: 'opacity' }}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Simple gradient overlay instead of blur */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-200
          ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{
            background: 'radial-gradient(circle at 80% 20%, rgba(45,160,212,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(34,211,238,0.1) 0%, transparent 50%)',
            willChange: 'opacity'
          }}
        />

        {/* Menu Content - GPU accelerated */}
        <div
          className={`absolute inset-0 flex flex-col justify-center px-6 transition-transform duration-200 ease-out
            ${isMenuOpen ? 'translate-y-0' : '-translate-y-4'}`}
          style={{ willChange: 'transform' }}
        >
          {/* Navigation Links with Icons - Glass with accent */}
          <nav className="space-y-3 max-w-sm mx-auto w-full">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border backdrop-blur-sm
                  transition-all duration-500 ease-out
                  ${isMenuOpen
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-8'}
                  ${activeSection === item.id
                    ? 'bg-accent/20 border-accent/40 shadow-[0_4px_20px_rgba(45,160,212,0.2)]'
                    : 'bg-white/5 border-white/10 active:bg-white/15'
                  }`}
                style={{ transitionDelay: isMenuOpen ? `${index * 80 + 100}ms` : '0ms' }}
              >
                {/* Active indicator line - accent */}
                {activeSection === item.id && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full shadow-[0_0_10px_rgba(45,160,212,0.6)]" />
                )}

                <div className="flex items-center gap-4">
                  {/* Icon - glass with accent */}
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-sm
                    ${activeSection === item.id
                      ? 'bg-accent/30 text-white border border-accent/50'
                      : 'bg-white/10 text-white/60 border border-white/10'
                    }`}>
                    {item.icon}
                  </span>

                  <span className={`text-lg font-semibold
                    ${activeSection === item.id ? 'text-white' : 'text-white/80'}`}>
                    {item.label}
                  </span>
                </div>

                {/* Arrow */}
                <svg className={`w-5 h-5 ${activeSection === item.id ? 'text-accent' : 'text-white/30'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
          </nav>

          {/* Contact Actions - Glass with accent for mobile */}
          <div className={`flex justify-center gap-4 mt-10 transition-all duration-500 ease-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: isMenuOpen ? `${navItems.length * 80 + 200}ms` : '0ms' }}
          >
            <a
              href="tel:+918320049749"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-white/20
                       text-white active:bg-accent/30 backdrop-blur-sm
                       hover:bg-accent/20 hover:border-accent/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-semibold">Call</span>
            </a>
            <a
              href="mailto:bakarali@hgautomationindia.com"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-accent/30 border border-accent/50
                       text-white active:bg-accent/50 backdrop-blur-sm
                       hover:bg-accent hover:border-accent transition-all duration-300
                       shadow-[0_4px_15px_rgba(45,160,212,0.3)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold">Email</span>
            </a>
          </div>

          {/* Footer */}
          <div className={`absolute bottom-8 left-0 right-0 text-center transition-all duration-500 ease-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isMenuOpen ? `${navItems.length * 80 + 300}ms` : '0ms' }}
          >
            <p className="text-white text-xs tracking-wider">
              &copy; 2026 HG Automation India
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
