/**
 * About Section Component
 * Light theme design with scroll animations
 */

import React from 'react';
import logoImage from '../../images/Logo.png';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const About = () => {
  const [imageRef, imageVisible] = useScrollAnimation({ threshold: 0.2 });
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.2 });
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.3 });

  const features = [
    'Certified engineers with 10+ years of experience',
    'UL508A certified panel shop',
    '24/7 emergency support services',
    'Projects completed across 50+ industries',
  ];

  const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Industries Served' },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-slate-100 via-white to-cyan-50/30"></div>

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-50" style={{
        background: 'radial-gradient(ellipse at 20% 80%, rgba(45, 160, 212, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(30, 41, 59, 0.05) 0%, transparent 50%)'
      }}></div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-accent/8 via-cyan-400/5 to-transparent rounded-full blur-3xl translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-accent/8 rounded-full blur-3xl -translate-x-1/2 translate-y-1/4"></div>

      {/* Floating Elements */}
      <div className="absolute top-32 left-20 w-3 h-3 bg-accent/40 rounded-full animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary/30 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-1/3 w-4 h-4 border border-accent/30 rounded-full animate-float hidden lg:block"></div>

      {/* Grid Line Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute top-0 left-1/3 w-px h-2/3 bg-gradient-to-b from-accent/10 via-accent/5 to-transparent"></div>
        <div className="absolute bottom-0 right-1/3 w-px h-1/2 bg-gradient-to-t from-primary/5 via-primary/3 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Column */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            {/* Main Card with Enhanced Gradient */}
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-cyan-500/10 to-primary/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative bg-gradient-to-br from-primary-dark via-primary to-slate-800 rounded-2xl p-12 hover:shadow-2xl transition-all duration-500">
                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-industrial-pattern opacity-20 rounded-2xl" />

                {/* Shine Effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine"></div>
                </div>

                {/* Logo display */}
                <div className="relative flex items-center justify-center py-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-cyan-500/30 blur-3xl rounded-full animate-pulse" />
                    <img
                      src={logoImage}
                      alt="HG Automation"
                      className={`relative w-48 h-auto transition-all duration-700 delay-300 drop-shadow-2xl ${
                        imageVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={`absolute top-6 left-6 w-16 h-16 border border-white/20 rounded-full transition-all duration-700 delay-500 ${
                  imageVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`} />
                <div className={`absolute bottom-6 right-6 w-24 h-24 border border-white/10 rounded-full transition-all duration-700 delay-700 ${
                  imageVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`} />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-accent/30 rounded-br-2xl"></div>
              </div>
            </div>

            {/* Floating badge with Gradient */}
            <div className={`absolute -bottom-6 -right-6 bg-gradient-to-br from-accent to-cyan-600 text-white p-6 rounded-2xl shadow-xl shadow-accent/30 transition-all duration-700 delay-500 ${
              imageVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <span className="text-4xl font-bold block">10+</span>
              <span className="text-sm uppercase tracking-wider opacity-90">Years Experience</span>
            </div>
          </div>

          {/* Content Column */}
          <div
            ref={contentRef}
            className={`transition-all duration-1000 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-accent/10 to-cyan-500/10 text-accent rounded-full text-sm font-semibold mb-4">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
              Engineering Excellence in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-600">
                Industrial Automation
              </span>
            </h2>

            <p className="text-steel-500 mb-4 leading-relaxed">
              HG Automation has been at the forefront of industrial automation since 2024.
              We partner with manufacturers across diverse industries to design, implement,
              and maintain automation systems that drive productivity and reduce operational costs.
            </p>

            <p className="text-steel-500 mb-8 leading-relaxed">
              Our team of certified control systems engineers brings deep expertise in PLC
              programming, SCADA development, and control panel design. We pride ourselves on
              delivering solutions that are not just technically excellent, but also practical,
              maintainable, and scalable.
            </p>

            {/* Feature list with gradient hover */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent ${
                    contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent to-cyan-600 rounded-lg flex items-center justify-center shadow-md shadow-accent/20">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-steel-600 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Stats row with gradient cards */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-gradient-to-r from-transparent via-steel-200 to-transparent"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-steel-100 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 ${
                    statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-600">{stat.value}</div>
                  <div className="text-sm text-steel-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
