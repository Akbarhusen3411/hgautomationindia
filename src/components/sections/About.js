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
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Column */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
          >
            <div className="relative bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-12 hover:shadow-2xl transition-shadow duration-500">
              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-industrial-pattern opacity-20 rounded-2xl" />

              {/* Logo display */}
              <div className="relative flex items-center justify-center py-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full animate-pulse" />
                  <img
                    src={logoImage}
                    alt="HG Automation"
                    className={`relative w-48 h-auto transition-all duration-700 delay-300 ${
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
            </div>

            {/* Floating badge */}
            <div className={`absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl transition-all duration-700 delay-500 ${
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
              Engineering Excellence in Industrial Automation
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

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-steel-600">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-steel-200"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-500 ${
                    statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="text-3xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-steel-500">{stat.label}</div>
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
