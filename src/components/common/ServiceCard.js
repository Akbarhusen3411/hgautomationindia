/**
 * ServiceCard Component
 * White card with hover effects for services
 */

import React from 'react';

const icons = {
  cpu: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 3V1h2v2h2V1h2v2h2V1h2v2h1a2 2 0 012 2v1h2v2h-2v2h2v2h-2v2h2v2h-2v1a2 2 0 01-2 2h-1v2h-2v-2h-2v2h-2v-2H9v2H7v-2H6a2 2 0 01-2-2v-1H2v-2h2v-2H2v-2h2V9H2V7h2V6a2 2 0 012-2h1V2h2v2h2zm-3 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V9a1 1 0 00-1-1H6z"/>
    </svg>
  ),
  'diagram-3': (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
    </svg>
  ),
  'hdd-network': (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h16v4H4V4zm1 1a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm4 7v2H8v-2h4zm-1 4v8h-2v-8h2z"/>
    </svg>
  ),
  layers: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  vision: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    </svg>
  ),
  industry: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm5-10h-1.5v4.5h-2V7H12l2.5-3 2.5 3z"/>
    </svg>
  ),
  cloud: (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
    </svg>
  ),
};

const defaultIcon = (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ServiceCard = ({ service }) => {
  const { title, shortDescription, icon, image } = service;
  const IconComponent = icons[icon] || defaultIcon;

  return (
    <div className="group relative bg-white rounded-2xl h-full shadow-industrial
                    hover:shadow-[0_20px_50px_rgba(45,160,212,0.2)] transition-all duration-500 ease-out
                    hover:-translate-y-3 border border-steel-100
                    hover:border-accent/50 overflow-hidden">

      {/* Animated border gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-2px] rounded-2xl bg-gradient-to-r from-accent via-accent-light to-accent animate-spin-slow opacity-30"
             style={{ animationDuration: '4s' }} />
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-accent/10 rounded-full
                      group-hover:scale-150 group-hover:bg-accent/20 transition-all duration-700" />
      </div>

      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Animated overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary-dark/20 to-transparent
                      group-hover:from-primary-dark/80 transition-all duration-500" />

        {/* Shine sweep effect on hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out
                      bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />

        {/* Floating particles on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-accent rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-8 right-8 w-1 h-1 bg-white/70 rounded-full animate-float" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-12 right-6 w-1 h-1 bg-accent/70 rounded-full animate-float" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Icon badge with premium animation */}
        <div className="absolute bottom-3 left-4 w-12 h-12 bg-white rounded-xl
                        flex items-center justify-center text-accent
                        shadow-lg group-hover:shadow-[0_8px_25px_rgba(45,160,212,0.4)]
                        group-hover:scale-110 group-hover:-translate-y-1
                        transition-all duration-500 overflow-hidden">
          {/* Icon glow */}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
          {/* Rotating border */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-[-2px] rounded-xl animate-spin"
                 style={{
                   background: 'conic-gradient(from 0deg, transparent 0%, rgba(45,160,212,0.5) 25%, transparent 50%)',
                   animationDuration: '2s'
                 }} />
          </div>
          <div className="relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {IconComponent}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5">
        {/* Animated underline for title */}
        <div className="relative inline-block mb-2">
          <h3 className="text-lg font-semibold text-primary-dark group-hover:text-accent transition-colors duration-300">
            {title}
          </h3>
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
        </div>

        <p className="text-steel-500 mb-4 leading-relaxed text-sm line-clamp-2
                    group-hover:text-steel-600 transition-colors duration-300">
          {shortDescription}
        </p>

        {/* Learn more link with arrow animation */}
        <a
          href="#contact"
          className="inline-flex items-center gap-2 text-accent font-medium text-sm
                     relative overflow-hidden"
        >
          <span className="relative z-10">Learn More</span>
          <div className="relative flex items-center">
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {/* Extra arrow that appears on hover */}
            <svg className="w-4 h-4 absolute -right-4 opacity-0 group-hover:opacity-100 group-hover:right-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
          {/* Underline animation */}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
        </a>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </div>
  );
};

export default ServiceCard;
