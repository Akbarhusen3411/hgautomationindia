/**
 * Logo Component
 * Original logo with premium animations and enhanced typography
 */

import React from 'react';
import logoImage from '../../images/Logo.png';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  // Size configurations
  const sizes = {
    small: { icon: 'h-10 sm:h-11', text: 'text-lg sm:text-xl', tagline: 'text-[8px] sm:text-[9px]' },
    default: { icon: 'h-12 sm:h-14', text: 'text-xl sm:text-2xl', tagline: 'text-[9px] sm:text-[10px]' },
    large: { icon: 'h-16 sm:h-20', text: 'text-2xl sm:text-3xl', tagline: 'text-[10px] sm:text-xs' },
    hero: { icon: 'h-24 sm:h-32', text: 'text-3xl sm:text-4xl', tagline: 'text-xs sm:text-sm' },
  };

  const { icon: iconSize, text: textSize, tagline: taglineSize } = sizes[size] || sizes.default;

  return (
    <div className={`group flex items-center gap-3 ${className}`}>
      {/* Logo Image with Premium Animations */}
      <div className="relative">
        {/* Outer glow ring on hover */}
        <div className="absolute -inset-2 rounded-full bg-accent/0 group-hover:bg-accent/20
                      blur-xl transition-all duration-700 opacity-0 group-hover:opacity-100" />

        {/* Rotating border ring */}
        <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full border border-accent/30 animate-spin-slow"
               style={{ animationDuration: '8s' }} />
        </div>

        {/* Pulse ring effect */}
        <div className="absolute -inset-1 rounded-full border-2 border-accent/0
                      group-hover:border-accent/40 group-hover:scale-125
                      transition-all duration-700 opacity-0 group-hover:opacity-100" />

        {/* Logo container with glass effect */}
        <div className="relative p-1 rounded-full bg-white/5 border border-white/10
                      group-hover:bg-accent/10 group-hover:border-accent/30
                      group-hover:shadow-[0_0_30px_rgba(45,160,212,0.3)]
                      transition-all duration-500 backdrop-blur-sm">

          {/* The original logo image */}
          <img
            src={logoImage}
            alt="HG Automation"
            className={`${iconSize} w-auto relative z-10
                       group-hover:scale-105 transition-all duration-500
                       drop-shadow-[0_0_8px_rgba(45,160,212,0.3)]
                       group-hover:drop-shadow-[0_0_15px_rgba(45,160,212,0.6)]`}
          />
        </div>

        {/* Orbiting particle on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute -inset-2 animate-spin" style={{ animationDuration: '4s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5
                          bg-accent rounded-full shadow-[0_0_8px_rgba(45,160,212,0.8)]" />
          </div>
        </div>
      </div>

      {/* Company name with enhanced typography */}
      {showText && (
        <div className="flex flex-col">
          {/* Main title */}
          <h1 className={`font-bold ${textSize} leading-tight tracking-wide flex items-center`}>
            <span className="text-white font-extrabold
                           group-hover:text-white transition-colors duration-300
                           drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              HG
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r
                           from-accent via-cyan-400 to-accent
                           font-bold ml-2 tracking-wider
                           group-hover:from-cyan-300 group-hover:via-accent group-hover:to-cyan-300
                           transition-all duration-500
                           drop-shadow-[0_0_20px_rgba(45,160,212,0.3)]"
                  style={{
                    textShadow: '0 0 30px rgba(45, 160, 212, 0.3)',
                    fontFamily: "'Segoe UI', 'Inter', system-ui, sans-serif"
                  }}>
              AUTOMATION
            </span>
          </h1>

          {/* Tagline */}
          <span className={`${taglineSize} text-white/50 tracking-[0.2em] uppercase font-medium
                         group-hover:text-accent/70 transition-colors duration-500 mt-0.5`}
                style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            Industrial Excellence
          </span>
        </div>
      )}
    </div>
  );
};

// Compact logo icon version
export const LogoIcon = ({ size = 48, className = '' }) => (
  <div className="group relative">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Logo */}
    <img
      src={logoImage}
      alt="HG Automation"
      style={{ width: size, height: 'auto' }}
      className={`relative z-10 group-hover:scale-110 transition-transform duration-500
                 drop-shadow-[0_0_10px_rgba(45,160,212,0.4)] ${className}`}
    />
  </div>
);

// Animated logo for hero section
export const LogoAnimated = ({ className = '' }) => (
  <div className={`relative group ${className}`}>
    {/* Background glow pulse */}
    <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl animate-pulse"
         style={{ animationDuration: '3s' }} />

    {/* Rotating outer ring */}
    <div className="absolute -inset-8 animate-spin-slow" style={{ animationDuration: '20s' }}>
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30" />
    </div>

    {/* Counter-rotating ring */}
    <div className="absolute -inset-4 animate-spin-slow"
         style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
      <div className="absolute inset-0 rounded-full border border-cyan-400/20" />
    </div>

    {/* Main logo */}
    <img
      src={logoImage}
      alt="HG Automation"
      className="relative z-10 w-32 h-auto animate-pulse-slow
                drop-shadow-[0_0_30px_rgba(45,160,212,0.5)]
                group-hover:drop-shadow-[0_0_50px_rgba(45,160,212,0.8)]
                transition-all duration-700"
    />

    {/* Orbiting dots */}
    {[0, 120, 240].map((angle, i) => (
      <div
        key={i}
        className="absolute inset-0 animate-spin"
        style={{
          animationDuration: `${6 + i}s`,
          animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
        }}
      >
        <div
          className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(45,160,212,0.8)]"
          style={{
            top: '50%',
            left: '50%',
            transform: `rotate(${angle}deg) translateX(80px) translateY(-50%)`
          }}
        />
      </div>
    ))}
  </div>
);

export default Logo;
