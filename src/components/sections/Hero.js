/**
 * Hero Section Component
 * Industrial automation theme with animated logo
 */

import React, { useEffect, useState } from 'react';
import logoImage from '../../images/Logo.png';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden
                 bg-gradient-to-br from-primary-dark via-primary to-primary-light"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-industrial-pattern opacity-30" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={`transition-all duration-1000 text-center lg:text-left ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Industrial Automation Experts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Powering Industry
              <br />
              <span className="text-gradient">with Smart</span>
              <br />
              Automation
            </h1>

            <p className="text-lg text-white/70 mb-8 max-w-lg mx-auto lg:mx-0">
              We design, program, and integrate industrial automation systems that
              optimize your manufacturing processes with precision and reliability.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('services')}
                className="btn-primary flex items-center gap-2"
              >
                Explore Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="btn-outline flex items-center gap-2"
              >
                Get a Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">10+</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">500+</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">24/7</div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Logo Animation - Attractive & Smooth */}
          <div className={`hidden lg:flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">

              {/* Animated gradient background blob */}
              <div className="absolute w-80 h-80 animate-morphBlob">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/30 via-accent/10 to-accent/30 rounded-full blur-[60px] animate-pulse" style={{ animationDuration: '4s' }} />
              </div>

              {/* Breathing rings */}
              <div className="absolute w-[420px] h-[420px] rounded-full border border-accent/20 animate-breathe" />
              <div className="absolute w-[380px] h-[380px] rounded-full border border-accent/30 animate-breathe" style={{ animationDelay: '0.5s' }} />
              <div className="absolute w-[340px] h-[340px] rounded-full border border-accent/40 animate-breathe" style={{ animationDelay: '1s' }} />

              {/* Rotating gradient ring */}
              <div className="absolute w-[300px] h-[300px] animate-spin-slow" style={{ animationDuration: '12s' }}>
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(45,160,212,0)" />
                      <stop offset="50%" stopColor="rgba(45,160,212,0.8)" />
                      <stop offset="100%" stopColor="rgba(45,160,212,0)" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="95" fill="none" stroke="url(#ringGradient)" strokeWidth="2" />
                </svg>
              </div>

              {/* Glowing arc */}
              <div className="absolute w-[260px] h-[260px] animate-spin-slow" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(45,160,212,0)" />
                      <stop offset="50%" stopColor="rgba(45,160,212,1)" />
                      <stop offset="100%" stopColor="rgba(45,160,212,0)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M 100 10 A 90 90 0 0 1 190 100" fill="none" stroke="url(#arcGradient)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
                </svg>
              </div>

              {/* Floating particles */}
              <div className="absolute w-2 h-2 bg-accent rounded-full animate-floatSmooth" style={{ top: '15%', left: '25%' }} />
              <div className="absolute w-1.5 h-1.5 bg-white/70 rounded-full animate-floatSmooth" style={{ top: '75%', left: '20%', animationDelay: '1s' }} />
              <div className="absolute w-2 h-2 bg-accent/70 rounded-full animate-floatSmooth" style={{ top: '20%', right: '20%', animationDelay: '2s' }} />
              <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full animate-floatSmooth" style={{ top: '80%', right: '25%', animationDelay: '1.5s' }} />
              <div className="absolute w-1 h-1 bg-accent/60 rounded-full animate-floatSmooth" style={{ top: '50%', left: '10%', animationDelay: '0.5s' }} />
              <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-floatSmooth" style={{ top: '45%', right: '12%', animationDelay: '2.5s' }} />

              {/* Center logo with glass effect */}
              <div className="relative z-10 group cursor-pointer">
                {/* Glow behind logo - intensifies on hover */}
                <div className="absolute -inset-8 bg-accent/20 rounded-full blur-2xl animate-pulse group-hover:bg-accent/40 group-hover:blur-3xl group-hover:-inset-12 transition-all duration-700" style={{ animationDuration: '3s' }} />

                {/* Premium rotating arcs on hover */}
                <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Arc 1 */}
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '3s' }}>
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <defs>
                        <linearGradient id="arcGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(45,160,212,0)" />
                          <stop offset="50%" stopColor="rgba(45,160,212,1)" />
                          <stop offset="100%" stopColor="rgba(45,160,212,0)" />
                        </linearGradient>
                      </defs>
                      <path d="M 100 15 A 85 85 0 0 1 185 100" fill="none" stroke="url(#arcGrad1)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Arc 2 - opposite */}
                  <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '3s', animationDirection: 'reverse' }}>
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <path d="M 100 185 A 85 85 0 0 1 15 100" fill="none" stroke="url(#arcGrad1)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Orbiting dot */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_15px_rgba(45,160,212,1)]" />
                  </div>
                </div>

                {/* Glass container */}
                <div className="relative bg-white/5 backdrop-blur-sm p-10 rounded-full border border-white/10 group-hover:border-accent/60 group-hover:bg-white/15 group-hover:shadow-[0_0_60px_rgba(45,160,212,0.4)] transition-all duration-700">

                  {/* Shine sweep on hover */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000" style={{ transform: 'skewX(-20deg) translateX(-100%)' }} />
                  </div>

                  {/* Logo with animations */}
                  <img
                    src={logoImage}
                    alt="HG Automation"
                    className="w-44 h-auto drop-shadow-[0_0_20px_rgba(45,160,212,0.5)] group-hover:drop-shadow-[0_0_50px_rgba(45,160,212,1)] transition-all duration-700 group-hover:scale-[1.15] group-hover:rotate-3"
                  />
                </div>

                {/* Ripple effects on hover - smooth expansion */}
                <div className="absolute inset-0 rounded-full border-2 border-accent/0 group-hover:border-accent/50 group-hover:scale-[1.15] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/30 group-hover:scale-[1.3] transition-all duration-700 ease-out delay-100 opacity-0 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/15 group-hover:scale-[1.5] transition-all duration-1000 ease-out delay-200 opacity-0 group-hover:opacity-100" />

                {/* Floating dots appear on hover */}
                <div className="absolute -top-4 left-1/2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:-top-8 transition-all duration-700 shadow-[0_0_10px_rgba(45,160,212,0.8)]" />
                <div className="absolute -bottom-4 left-1/2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-700 delay-100 shadow-[0_0_10px_rgba(45,160,212,0.8)]" />
                <div className="absolute top-1/2 -left-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:-left-8 transition-all duration-700 delay-200 shadow-[0_0_10px_rgba(45,160,212,0.8)]" />
                <div className="absolute top-1/2 -right-4 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:-right-8 transition-all duration-700 delay-300 shadow-[0_0_10px_rgba(45,160,212,0.8)]" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Unique Animation */}
      <div className="absolute bottom-3 sm:bottom-8 left-1/2 -translate-x-1/2">
        <button
          onClick={() => scrollToSection('services')}
          className="group flex flex-col items-center gap-1 sm:gap-2 text-white/50 hover:text-white transition-colors"
        >
          <span className="text-[10px] sm:text-xs tracking-widest uppercase animate-pulse">Scroll</span>

          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-2 rounded-full bg-accent/20 blur-md animate-ping opacity-50"
                 style={{ animationDuration: '2s' }} />

            {/* Pulsing rings */}
            <div className="absolute -inset-1 rounded-full border border-accent/30 animate-ping"
                 style={{ animationDuration: '1.5s' }} />

            {/* Mouse container */}
            <div className="relative w-5 h-8 sm:w-6 sm:h-10 border-2 border-current rounded-full
                          group-hover:border-accent group-hover:shadow-[0_0_15px_rgba(45,160,212,0.5)]
                          transition-all duration-300 overflow-hidden">
              {/* Scrolling dot with trail effect */}
              <div className="absolute left-1/2 -translate-x-1/2 top-1.5 sm:top-2 flex flex-col items-center">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full animate-scrollDown
                              shadow-[0_0_8px_rgba(45,160,212,0.8)]" />
              </div>

              {/* Gradient trail */}
              <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-accent/20 via-transparent to-transparent
                            animate-scrollTrail opacity-50" />
            </div>

            {/* Floating arrows below */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <svg className="w-3 h-3 text-accent/60 animate-bounceArrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   style={{ animationDelay: '0s' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <svg className="w-3 h-3 text-accent/40 -mt-1.5 animate-bounceArrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   style={{ animationDelay: '0.15s' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
