/**
 * About Section Component
 * Dark futuristic tech theme — centered header, 4 image grid + text content
 */

import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import useAnimatedCounter from '../../hooks/useAnimatedCounter';
import { ScrollReveal, StaggerContainer } from '../common/ScrollAnimation';

const About = () => {
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.15 });
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.15 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projectsCounter = useAnimatedCounter('500+', 2000);
  const satisfactionCounter = useAnimatedCounter('98%', 2000);
  const industriesCounter = useAnimatedCounter('50+', 2000);

  const features = [
    { text: 'Certified engineers with 10+ years of experience', icon: 'engineer' },
    { text: 'UL508A certified panel shop', icon: 'certified' },
    { text: '24/7 emergency support services', icon: 'support' },
    { text: 'Projects completed across 50+ industries', icon: 'global' },
  ];

  const stats = [
    { counter: projectsCounter, label: 'Projects Delivered', icon: 'project' },
    { counter: satisfactionCounter, label: 'Client Satisfaction', icon: 'satisfaction' },
    { counter: industriesCounter, label: 'Industries Served', icon: 'industry' },
  ];

  // 4 images for the grid
  const aboutImages = [
    { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=350&fit=crop', caption: 'PLC Programming & Integration' },
    { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=350&fit=crop', caption: 'Control Panel Design' },
    { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=500&h=350&fit=crop', caption: 'Smart Factory Solutions' },
    { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=350&fit=crop', caption: 'IoT & Connected Systems' },
  ];

  const StatIcon = ({ type }) => {
    const icons = {
      project: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      satisfaction: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      industry: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  const FeatureIcon = ({ type }) => {
    const icons = {
      engineer: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      certified: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      support: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      global: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  return (
    <section id="about" className="py-10 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background — slightly different tone from Services */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#0a0f1e] via-[#0d1526] to-[#0f1a2e]"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(45,160,212,0.4) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,160,212,0.4) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Gradient orbs with parallax */}
      <div
        className="absolute top-0 right-0 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-gradient-to-bl from-accent/6 via-cyan-400/4 to-transparent rounded-full blur-3xl"
        style={{ transform: `translate(30%, ${scrollY * 0.06}px)` }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-accent/5 to-cyan-500/5 rounded-full blur-3xl"
        style={{ transform: `translate(-40%, calc(20% + ${scrollY * -0.05}px))` }}
      ></div>

      {/* Circuit line decorations - left */}
      <div className="absolute top-28 left-0 w-40 opacity-15 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 160 200" fill="none" className="w-full">
          <path d="M0 30 L50 30 L50 80 L100 80" stroke="rgba(45,160,212,0.5)" strokeWidth="1" />
          <path d="M0 130 L30 130 L30 170 L70 170" stroke="rgba(45,160,212,0.4)" strokeWidth="1" />
          <circle cx="50" cy="30" r="3" fill="rgba(45,160,212,0.6)" className="animate-dataPulse" />
          <circle cx="30" cy="130" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      {/* Circuit line decorations - right */}
      <div className="absolute bottom-28 right-0 w-40 opacity-15 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 160 200" fill="none" className="w-full">
          <path d="M160 40 L110 40 L110 90 L60 90" stroke="rgba(45,160,212,0.5)" strokeWidth="1" />
          <path d="M160 140 L130 140 L130 170 L90 170" stroke="rgba(45,160,212,0.4)" strokeWidth="1" />
          <circle cx="110" cy="40" r="3" fill="rgba(45,160,212,0.6)" className="animate-dataPulse" style={{ animationDelay: '0.5s' }} />
          <circle cx="130" cy="140" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '1.5s' }} />
        </svg>
      </div>

      {/* Dot grid decorations */}
      <div className="absolute top-24 left-8 grid grid-cols-4 gap-1.5 opacity-10 pointer-events-none hidden lg:grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-accent rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-40 right-12 grid grid-cols-3 gap-2 opacity-8 pointer-events-none hidden lg:grid">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-accent rounded-full" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ===== Centered Header ===== */}
        <div className="text-center mb-6 sm:mb-10 lg:mb-14">
          <ScrollReveal animation="fade-down" duration={600}>
            <span className="inline-block px-5 py-2 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              About Us
            </span>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100} duration={700}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Engineering Excellence in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                Industrial Automation
              </span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="scale-up" delay={200} duration={600}>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-cyan-400 mx-auto mb-6 rounded-full" />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300} duration={700}>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Partnering with manufacturers across industries to design, implement, and maintain
              automation systems that drive productivity and reduce operational costs.
            </p>
          </ScrollReveal>
        </div>

        {/* ===== Two-column: Images + Text ===== */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">

          {/* Left: 4-Image Grid */}
          <div
            ref={imageRef}
            className={`transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutImages.map((img, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden border border-slate-700/40 hover:border-accent/40 transition-all duration-500"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.caption}
                      loading="lazy"
                      className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
                        imageVisible ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                      }`}
                      style={{ transitionDelay: `${300 + index * 150}ms` }}
                    />
                  </div>

                  {/* Dark overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

                  {/* Hover scan line */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent animate-scan" />
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3">
                    <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow-lg">
                      {img.caption}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M10 0 L16 0 L16 6" stroke="rgba(45,160,212,0.6)" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M6 16 L0 16 L0 10" stroke="rgba(45,160,212,0.6)" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience badge below images */}
            <div className={`flex justify-center mt-5 sm:mt-6 transition-all duration-700 delay-700 ${
              imageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="inline-flex items-center gap-3 sm:gap-4 bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-2.5 sm:px-6 sm:py-4 backdrop-blur-sm">
                <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">10+</span>
                <div className="h-8 w-px bg-slate-600/50"></div>
                <span className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 leading-tight">Years of<br/>Experience</span>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div
            ref={contentRef}
            className={`transition-all duration-1000 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <ScrollReveal animation="fade-up" delay={100} duration={700}>
              <p className="text-slate-400 mb-4 leading-relaxed text-sm sm:text-base">
                HG Automation has been at the forefront of industrial automation since 2024.
                We partner with manufacturers across diverse industries to design, implement,
                and maintain automation systems that drive productivity and reduce operational costs.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={200} duration={700}>
              <p className="text-slate-400 mb-7 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Our team of certified control systems engineers brings deep expertise in PLC
                programming, SCADA development, and control panel design. We pride ourselves on
                delivering solutions that are not just technically excellent, but also practical,
                maintainable, and scalable.
              </p>
            </ScrollReveal>

            {/* Feature list */}
            <StaggerContainer animation="fade-left" staggerDelay={100} className="space-y-3 mb-8 sm:mb-10">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl
                    bg-slate-800/40 border border-slate-700/30
                    hover:border-accent/30 hover:bg-slate-800/70
                    transition-all duration-300 group cursor-default"
                >
                  {/* Hex icon badge */}
                  <span className="flex-shrink-0 relative w-8 h-9 sm:w-9 sm:h-10">
                    <svg viewBox="0 0 36 40" className="w-full h-full absolute inset-0">
                      <polygon
                        points="18,1 35,11 35,29 18,39 1,29 1,11"
                        fill="rgba(45,160,212,0.1)"
                        stroke="rgba(45,160,212,0.35)"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                      <FeatureIcon type={feature.icon} />
                    </span>
                  </span>
                  <span className="text-slate-300 text-sm sm:text-base font-medium group-hover:text-white transition-colors duration-300">
                    {feature.text}
                  </span>
                </li>
              ))}
            </StaggerContainer>

            {/* Stats row */}
            <ScrollReveal animation="fade-up" delay={400} duration={700}>
              <div
                ref={statsRef}
                className="pt-6 sm:pt-8 border-t border-slate-700/50"
              >
                <StaggerContainer animation="scale-up" staggerDelay={150} className="grid grid-cols-3 gap-3 sm:gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      ref={stat.counter.ref}
                      className="stat-card group"
                    >
                      <div className="stat-icon group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <StatIcon type={stat.icon} />
                      </div>
                      <div className="stat-value counter-animate">{stat.counter.count}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
