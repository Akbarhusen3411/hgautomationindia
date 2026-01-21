/**
 * Logo Component
 * Unique HG Automation logo with gear and circuit design
 */

import React from 'react';

const Logo = ({ size = 'default', showText = true, className = '' }) => {
  // Size configurations
  const sizes = {
    small: { icon: 36, text: 'text-lg' },
    default: { icon: 48, text: 'text-xl' },
    large: { icon: 64, text: 'text-2xl' },
    hero: { icon: 120, text: 'text-4xl' },
  };

  const { icon: iconSize, text: textSize } = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Gear with HG integrated */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Outer gear teeth */}
        <g className="animate-spin-slow origin-center" style={{ transformOrigin: '50px 50px' }}>
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="45"
              y="5"
              width="10"
              height="12"
              rx="2"
              fill="#e67e22"
              transform={`rotate(${i * 45} 50 50)`}
            />
          ))}
        </g>

        {/* Main gear body */}
        <circle cx="50" cy="50" r="38" fill="url(#gearGradient)" />

        {/* Inner circle */}
        <circle cx="50" cy="50" r="30" fill="#1a2332" />

        {/* Circuit lines decoration */}
        <g stroke="#e67e22" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <path d="M25 50 L35 50" />
          <path d="M65 50 L75 50" />
          <path d="M50 25 L50 35" />
          <path d="M50 65 L50 75" />
          <circle cx="25" cy="50" r="2" fill="#e67e22" />
          <circle cx="75" cy="50" r="2" fill="#e67e22" />
          <circle cx="50" cy="25" r="2" fill="#e67e22" />
          <circle cx="50" cy="75" r="2" fill="#e67e22" />
        </g>

        {/* HG Letters */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          fontFamily="Segoe UI, sans-serif"
        >
          HG
        </text>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c3e50" />
            <stop offset="100%" stopColor="#34495e" />
          </linearGradient>
        </defs>
      </svg>

      {/* Company name text */}
      {showText && (
        <div className={`font-bold ${textSize} leading-tight`}>
          <span className="text-white">HG</span>
          <span className="text-accent ml-1">Automation</span>
        </div>
      )}
    </div>
  );
};

// Alternative compact logo for favicon or small spaces
export const LogoIcon = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Hexagonal background */}
    <polygon
      points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
      fill="url(#hexGradient)"
    />

    {/* Inner hexagon */}
    <polygon
      points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5"
      fill="#1a2332"
    />

    {/* Gear accent */}
    <circle cx="50" cy="50" r="25" fill="none" stroke="#e67e22" strokeWidth="3" strokeDasharray="8 4" />

    {/* HG Letters */}
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fill="white"
      fontSize="26"
      fontWeight="bold"
      fontFamily="Segoe UI, sans-serif"
    >
      HG
    </text>

    <defs>
      <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e67e22" />
        <stop offset="100%" stopColor="#d35400" />
      </linearGradient>
    </defs>
  </svg>
);

// Animated logo for hero section
export const LogoAnimated = ({ className = '' }) => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Outer rotating ring */}
    <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px' }}>
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="none"
        stroke="#e67e22"
        strokeWidth="2"
        strokeDasharray="20 10"
        opacity="0.5"
      />
    </g>

    {/* Middle pulsing ring */}
    <circle
      cx="100"
      cy="100"
      r="75"
      fill="none"
      stroke="white"
      strokeWidth="1"
      opacity="0.2"
      className="animate-pulse-slow"
    />

    {/* Main gear with teeth */}
    <g className="animate-spin-slow" style={{ transformOrigin: '100px 100px', animationDirection: 'reverse' }}>
      {[...Array(12)].map((_, i) => (
        <rect
          key={i}
          x="94"
          y="20"
          width="12"
          height="18"
          rx="3"
          fill="#e67e22"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
    </g>

    {/* Gear body */}
    <circle cx="100" cy="100" r="55" fill="url(#mainGearGradient)" />
    <circle cx="100" cy="100" r="45" fill="#1a2332" />

    {/* Circuit nodes */}
    <g>
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 65 * Math.cos(rad);
        const y = 100 + 65 * Math.sin(rad);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill="#34495e" stroke="#e67e22" strokeWidth="2" />
            <circle cx={x} cy={y} r="2" fill="#e67e22" className="animate-pulse" />
          </g>
        );
      })}
    </g>

    {/* Center HG */}
    <text
      x="100"
      y="112"
      textAnchor="middle"
      fill="white"
      fontSize="36"
      fontWeight="bold"
      fontFamily="Segoe UI, sans-serif"
    >
      HG
    </text>

    {/* Tagline arc */}
    <defs>
      <path id="arcPath" d="M 35,100 A 65,65 0 0,1 165,100" fill="none" />
      <linearGradient id="mainGearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2c3e50" />
        <stop offset="100%" stopColor="#34495e" />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
