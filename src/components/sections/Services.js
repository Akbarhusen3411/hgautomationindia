/**
 * Services Section Component
 * Displays automation services with animations
 */

import React, { useState, useEffect, useRef } from 'react';
import ServiceCard from '../common/ServiceCard';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const servicesData = [
    {
      id: 1,
      title: 'Industrial Automation',
      shortDescription: 'Complete automation solutions for manufacturing processes using PLC, HMI, and SCADA systems.',
      icon: 'cpu',
      image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=400&h=250&fit=crop',
    },
    {
      id: 2,
      title: 'Control Panels',
      shortDescription: 'Custom control panel design, fabrication, and wiring meeting industry standards.',
      icon: 'diagram-3',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    },
    {
      id: 3,
      title: 'Machine Vision Solutions',
      shortDescription: 'Advanced vision systems for quality inspection, measurement, and automated guidance.',
      icon: 'vision',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    },
    {
      id: 4,
      title: 'Project Design & Development',
      shortDescription: 'End-to-end project planning, design, and development for industrial automation needs.',
      icon: 'layers',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
    },
    {
      id: 5,
      title: 'Industry 4.0 & 5.0 Projects',
      shortDescription: 'Smart factory solutions with advanced connectivity, AI, and human-centric automation.',
      icon: 'industry',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=250&fit=crop',
    },
    {
      id: 6,
      title: 'Industrial IoT (IIoT) Integration',
      shortDescription: 'Connect machines and sensors for real-time data monitoring and predictive analytics.',
      icon: 'hdd-network',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
    },
    {
      id: 7,
      title: 'Cloud & Edge Automation',
      shortDescription: 'Cloud-based monitoring and edge computing solutions for distributed automation systems.',
      icon: 'cloud',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    const section = document.getElementById('contact');
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-steel-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">Our Services</h2>
          <div className={`w-20 h-1 bg-accent mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          }`} />
          <p className="text-steel-500 text-lg max-w-2xl mx-auto">
            Comprehensive industrial automation solutions tailored to optimize your
            manufacturing processes and maximize operational efficiency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '800ms' }}>
          <p className="text-steel-500 mb-6">
            Need a custom automation solution?
          </p>
          <a
            href="#contact"
            onClick={scrollToContact}
            className="btn-primary inline-flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Discuss Your Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
