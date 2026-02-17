/**
 * Hero Section Component
 * Industrial automation theme with animated logo and counters
 */

import React, { useEffect, useState, useRef } from 'react';
import logoImage from '../../images/Logo.png';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import { scrollToElement } from '../../utils/smoothScroll';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Animated counters for stats
  const yearsCounter = useAnimatedCounter('10+', 2000);
  const projectsCounter = useAnimatedCounter('500+', 2500);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    scrollToElement(sectionId, 80);
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className={`transition-all duration-1000 text-center lg:text-left ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-white/80 text-sm font-medium">Industrial Automation Experts</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Powering Industry
              <br />
              <span className="text-gradient">with Smart</span>
              <br />
              Automation
            </h1>

            <p className="text-base sm:text-lg text-white/70 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              We design, program, and integrate industrial automation systems that
              optimize your manufacturing processes with precision and reliability.
            </p>

            <div className="flex flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
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
                Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>

            {/* Stats with Animated Counters */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
              <div ref={yearsCounter.ref} className="group">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400 counter-animate group-hover:scale-110 transition-transform duration-300">
                  {yearsCounter.count}
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">Years Experience</div>
              </div>
              <div ref={projectsCounter.ref} className="group">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400 counter-animate group-hover:scale-110 transition-transform duration-300">
                  {projectsCounter.count}
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">Projects Done</div>
              </div>
              <div className="group">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center lg:justify-start gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* 3D Holographic Display */}
          <div className={`hidden lg:flex justify-center items-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className={`relative w-[500px] h-[500px] flex items-center justify-center transition-all duration-700 ${isVisible ? 'animate-holoReveal' : ''}`} style={{ transitionDelay: '500ms' }}>

              {/* Layer 1: Particle Field */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1400ms' }}>
                {[
                  { w: 2, top: '8%', left: '15%', dur: '10s', del: '0s' },
                  { w: 1, top: '22%', left: '80%', dur: '12s', del: '1s' },
                  { w: 3, top: '35%', left: '5%', dur: '9s', del: '2s' },
                  { w: 1, top: '60%', left: '90%', dur: '11s', del: '0.5s' },
                  { w: 2, top: '75%', left: '70%', dur: '14s', del: '3s' },
                  { w: 1, top: '85%', left: '25%', dur: '8s', del: '1.5s' },
                  { w: 2, top: '12%', left: '55%', dur: '13s', del: '4s' },
                  { w: 1, top: '45%', left: '12%', dur: '10s', del: '2.5s' },
                  { w: 3, top: '50%', left: '85%', dur: '15s', del: '0.8s' },
                  { w: 1, top: '90%', left: '50%', dur: '9s', del: '3.5s' },
                  { w: 2, top: '30%', left: '40%', dur: '11s', del: '1.2s' },
                  { w: 1, top: '65%', left: '30%', dur: '12s', del: '2.8s' },
                  { w: 2, top: '18%', left: '68%', dur: '10s', del: '4.5s' },
                  { w: 1, top: '70%', left: '55%', dur: '13s', del: '1.8s' },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-accent/60 animate-particleDrift"
                    style={{
                      width: `${p.w}px`, height: `${p.w}px`,
                      top: p.top, left: p.left,
                      animationDuration: p.dur, animationDelay: p.del,
                    }}
                  />
                ))}
              </div>

              {/* Layer 2: Circuit Board Lines */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
                <svg viewBox="0 0 500 500" className="w-full h-full" fill="none">
                  <defs>
                    <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(45,160,212,0.1)" />
                      <stop offset="100%" stopColor="rgba(45,160,212,0.3)" />
                    </linearGradient>
                  </defs>
                  {/* PCB traces */}
                  <path d="M50 100 L120 100 L120 180 L200 180" stroke="url(#circuitGrad)" strokeWidth="1" />
                  <path d="M450 80 L380 80 L380 150 L320 150" stroke="url(#circuitGrad)" strokeWidth="1" />
                  <path d="M60 350 L130 350 L130 300 L190 300" stroke="url(#circuitGrad)" strokeWidth="1" />
                  <path d="M440 400 L370 400 L370 340 L310 340" stroke="url(#circuitGrad)" strokeWidth="1" />
                  <path d="M100 450 L100 420 L180 420" stroke="url(#circuitGrad)" strokeWidth="1" />
                  <path d="M400 450 L400 420 L330 420" stroke="url(#circuitGrad)" strokeWidth="1" />
                  {/* Junction dots */}
                  <circle cx="120" cy="100" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" />
                  <circle cx="380" cy="80" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '0.5s' }} />
                  <circle cx="130" cy="350" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '1s' }} />
                  <circle cx="370" cy="400" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '1.5s' }} />
                  {/* Traveling data pulse dot 1 */}
                  <circle r="2" fill="rgba(45,160,212,0.9)">
                    <animateMotion dur="4s" repeatCount="indefinite" path="M50 100 L120 100 L120 180 L200 180" />
                  </circle>
                  {/* Traveling data pulse dot 2 */}
                  <circle r="2" fill="rgba(45,160,212,0.9)">
                    <animateMotion dur="5s" repeatCount="indefinite" path="M450 80 L380 80 L380 150 L320 150" begin="1s" />
                  </circle>
                </svg>
              </div>

              {/* Layer 3: Holographic Base Platform */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                <svg viewBox="0 0 320 60" className="w-full animate-holoPlatformPulse">
                  <defs>
                    <linearGradient id="platformGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(45,160,212,0.4)" />
                      <stop offset="100%" stopColor="rgba(45,160,212,0.05)" />
                    </linearGradient>
                  </defs>
                  <polygon points="60,0 260,0 320,60 0,60" fill="url(#platformGrad)" />
                  <line x1="60" y1="0" x2="260" y2="0" stroke="rgba(45,160,212,0.8)" strokeWidth="2">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>

              {/* Layer 4: Projection Cone Lines */}
              <div className={`absolute inset-0 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
                <svg viewBox="0 0 500 500" className="w-full h-full" fill="none">
                  <defs>
                    <linearGradient id="coneGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="rgba(45,160,212,0.6)" />
                      <stop offset="100%" stopColor="rgba(45,160,212,0)" />
                    </linearGradient>
                  </defs>
                  <line x1="150" y1="490" x2="200" y2="200" stroke="url(#coneGrad)" strokeWidth="1" strokeDasharray="6 4" className="animate-holoBeamShimmer" />
                  <line x1="350" y1="490" x2="300" y2="200" stroke="url(#coneGrad)" strokeWidth="1" strokeDasharray="6 4" className="animate-holoBeamShimmer" style={{ animationDelay: '0.5s' }} />
                </svg>
              </div>

              {/* Layer 5: Hexagonal Frames */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: '1000ms' }}>
                {/* Outer hexagon - clockwise */}
                <div className="absolute w-[320px] h-[320px] animate-spin-slow" style={{ animationDuration: '20s' }}>
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon
                      points="100,10 178,55 178,145 100,190 22,145 22,55"
                      fill="none" stroke="rgba(45,160,212,0.2)" strokeWidth="1"
                    />
                  </svg>
                </div>
                {/* Inner hexagon - counter-clockwise */}
                <div className="absolute w-[260px] h-[260px] animate-spin-slow" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <polygon
                      points="100,20 170,60 170,140 100,180 30,140 30,60"
                      fill="none" stroke="rgba(45,160,212,0.15)" strokeWidth="1" strokeDasharray="8 4"
                    />
                  </svg>
                </div>
              </div>

              {/* Layer 6: Scan Line */}
              <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1500ms' }}>
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent/60 to-transparent animate-scan" />
              </div>

              {/* Layer 7: Perspective Grid */}
              <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-[280px] h-[80px] overflow-hidden transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '700ms', perspective: '200px' }}>
                <div
                  className="w-full h-full animate-gridScroll"
                  style={{
                    transform: 'rotateX(60deg)',
                    transformOrigin: 'center bottom',
                    backgroundImage: `
                      linear-gradient(rgba(45,160,212,0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(45,160,212,0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                  }}
                />
              </div>

              {/* Layer 8: Logo - Center Focal Point */}
              <div className={`relative z-10 group cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '1100ms' }}>
                {/* Glow backdrop */}
                <div className="absolute -inset-10 bg-accent/15 rounded-full blur-3xl animate-pulse-slow" />

                {/* Logo with float animation */}
                <div className="relative animate-heroFloat">
                  <img
                    src={logoImage}
                    alt="HG Automation"
                    className="w-44 h-auto drop-shadow-[0_0_25px_rgba(45,160,212,0.6)] group-hover:drop-shadow-[0_0_50px_rgba(45,160,212,1)] transition-all duration-700"
                  />
                </div>
              </div>

              {/* Layer 9: Holographic Glitch Overlay */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '2000ms' }}>
                <div className="absolute inset-0 animate-holoGlitch" />
              </div>

              {/* Layer 10: HUD Corner Brackets */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1200ms' }}>
                {/* Top-left */}
                <svg className="absolute top-4 left-4 w-8 h-8 animate-cornerFadeIn" viewBox="0 0 32 32" fill="none">
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(45,160,212,0.6)" strokeWidth="2" />
                </svg>
                {/* Top-right */}
                <svg className="absolute top-4 right-4 w-8 h-8 animate-cornerFadeIn" viewBox="0 0 32 32" fill="none" style={{ animationDelay: '0.1s' }}>
                  <path d="M20 0 L32 0 L32 12" stroke="rgba(45,160,212,0.6)" strokeWidth="2" />
                </svg>
                {/* Bottom-left */}
                <svg className="absolute bottom-4 left-4 w-8 h-8 animate-cornerFadeIn" viewBox="0 0 32 32" fill="none" style={{ animationDelay: '0.2s' }}>
                  <path d="M0 20 L0 32 L12 32" stroke="rgba(45,160,212,0.6)" strokeWidth="2" />
                </svg>
                {/* Bottom-right */}
                <svg className="absolute bottom-4 right-4 w-8 h-8 animate-cornerFadeIn" viewBox="0 0 32 32" fill="none" style={{ animationDelay: '0.3s' }}>
                  <path d="M20 32 L32 32 L32 20" stroke="rgba(45,160,212,0.6)" strokeWidth="2" />
                </svg>
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
