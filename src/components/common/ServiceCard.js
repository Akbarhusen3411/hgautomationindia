/**
 * ServiceCard Component
 * Dark futuristic tech-themed card with hexagonal accents,
 * circuit decorations, and smooth hover animations
 */

import React, { useState, useRef } from 'react';

const icons = {
  cpu: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 3V1h2v2h2V1h2v2h2V1h2v2h1a2 2 0 012 2v1h2v2h-2v2h2v2h-2v2h2v2h-2v1a2 2 0 01-2 2h-1v2h-2v-2h-2v2h-2v-2H9v2H7v-2H6a2 2 0 01-2-2v-1H2v-2h2v-2H2v-2h2V9H2V7h2V6a2 2 0 012-2h1V2h2v2h2zm-3 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V9a1 1 0 00-1-1H6z"/>
    </svg>
  ),
  'diagram-3': (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
    </svg>
  ),
  'hdd-network': (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h16v4H4V4zm1 1a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm4 7v2H8v-2h4zm-1 4v8h-2v-8h2z"/>
    </svg>
  ),
  layers: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  vision: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  ),
  industry: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm5-10h-1.5v4.5h-2V7H12l2.5-3 2.5 3z"/>
    </svg>
  ),
  cloud: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
    </svg>
  ),
};

const defaultIcon = (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

/* Small hexagon SVG used for icon badge background */
const HexBadge = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>
    <svg viewBox="0 0 56 64" className="w-full h-full absolute inset-0">
      <polygon
        points="28,2 54,18 54,46 28,62 2,46 2,18"
        fill="none"
        stroke="rgba(45,160,212,0.5)"
        strokeWidth="2"
      />
      <polygon
        points="28,2 54,18 54,46 28,62 2,46 2,18"
        fill="rgba(45,160,212,0.08)"
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-accent">
      {children}
    </div>
  </div>
);

const ServiceCard = ({ service, onClick }) => {
  const { title, shortDescription, icon, image } = service;
  const IconComponent = icons[icon] || defaultIcon;
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({ x: (y - centerY) / 25, y: (centerX - x) / 25 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const isTouchDevice = 'ontouchstart' in window;
  const handleClick = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX || rect.width / 2) - rect.left;
    const y = (e.clientY || rect.height / 2) - rect.top;
    setRipple({ x, y, key: Date.now() });
    if (isTouchDevice) {
      setTimeout(() => onClick?.(), 250);
    } else {
      onClick?.();
    }
  };

  return (
    <div
      ref={cardRef}
      className="service-card group relative rounded-2xl overflow-hidden cursor-pointer
                 flex flex-col w-full
                 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                 border border-slate-700/50 hover:border-accent/50
                 shadow-lg hover:shadow-[0_20px_60px_rgba(45,160,212,0.2)]
                 transition-all duration-700 ease-out
                 active:scale-[0.97] md:active:scale-100"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-8px)`
          : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: 'transform 0.3s ease-out, box-shadow 0.7s ease-out',
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Tap ripple */}
      {ripple && (
        <span
          key={ripple.key}
          className="absolute rounded-full bg-accent/20 pointer-events-none animate-ripple-out z-50"
          style={{ left: ripple.x - 50, top: ripple.y - 50, width: 100, height: 100 }}
          onAnimationEnd={() => setRipple(null)}
        />
      )}

      {/* Circuit line decorations (top-right) */}
      <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity duration-700">
        <svg viewBox="0 0 96 96" fill="none" className="w-full h-full">
          <path d="M96 8 L72 8 L72 32 L56 32" stroke="rgba(45,160,212,0.6)" strokeWidth="1" />
          <path d="M80 0 L80 16 L64 16" stroke="rgba(45,160,212,0.4)" strokeWidth="1" />
          <circle cx="72" cy="8" r="2" fill="rgba(45,160,212,0.8)" />
          <circle cx="56" cy="32" r="2" fill="rgba(45,160,212,0.6)" />
        </svg>
      </div>

      {/* Circuit line decorations (bottom-left) */}
      <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none opacity-20 group-hover:opacity-50 transition-opacity duration-700">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <path d="M0 72 L24 72 L24 48 L40 48" stroke="rgba(45,160,212,0.5)" strokeWidth="1" />
          <circle cx="24" cy="72" r="2" fill="rgba(45,160,212,0.6)" />
          <circle cx="40" cy="48" r="2" fill="rgba(45,160,212,0.5)" />
        </svg>
      </div>

      {/* Animated border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-[-1px] rounded-2xl"
             style={{
               background: 'linear-gradient(135deg, rgba(45,160,212,0.3), transparent 40%, transparent 60%, rgba(45,160,212,0.2))',
             }} />
      </div>

      {/* Scan line on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-scan" />
      </div>

      {/* Image Section */}
      <div className="relative h-[150px] sm:h-[160px] min-h-[150px] sm:min-h-[160px] overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />

        {/* Shine sweep on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out
                      bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />

        {/* View Details overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 border border-accent/40 px-4 py-2 rounded-lg bg-accent/10">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Details
          </span>
        </div>

        {/* Hexagonal icon badge */}
        <div className="absolute -bottom-5 left-4 sm:left-5 z-10
                        group-hover:scale-110 group-hover:-translate-y-1
                        transition-all duration-500">
          <HexBadge className="w-11 h-12 sm:w-12 sm:h-14">
            {IconComponent}
          </HexBadge>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4 sm:p-5 pt-7 sm:pt-8 flex flex-col flex-grow">
        {/* Dot grid decoration */}
        <div className="absolute top-3 right-4 grid grid-cols-3 gap-1 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-accent rounded-full" />
          ))}
        </div>

        {/* Title */}
        <div className="relative mb-2">
          <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-accent transition-colors duration-500 line-clamp-2 pr-8">
            {title}
          </h3>
          <div className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent to-transparent group-hover:w-3/4 transition-all duration-700" />
        </div>

        {/* Description */}
        <p className="text-slate-400 leading-relaxed text-xs sm:text-sm line-clamp-3 flex-grow
                    group-hover:text-slate-300 transition-colors duration-500">
          {shortDescription}
        </p>

        {/* Learn More / Know More link */}
        <div className="flex items-center justify-between mt-3 sm:mt-4 pt-3 border-t border-slate-700/50 group-hover:border-accent/20 transition-colors duration-500">
          <span className="inline-flex items-center gap-2 text-accent font-medium text-xs sm:text-sm">
            <span>Know More</span>
            <span className="flex items-center">
              {/* Chevron arrows that animate */}
              <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 -ml-2 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </span>

          {/* Small hex accent */}
          <div className="w-6 h-6 opacity-30 group-hover:opacity-70 transition-opacity duration-500">
            <svg viewBox="0 0 24 28" fill="none">
              <polygon points="12,1 23,8 23,20 12,27 1,20 1,8" stroke="rgba(45,160,212,0.6)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
  );
};

export default ServiceCard;
