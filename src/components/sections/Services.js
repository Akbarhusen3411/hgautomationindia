/**
 * Services Section Component
 * Dark futuristic tech theme with circuit decorations
 */

import React, { useState, useEffect } from 'react';
import ServiceCard from '../common/ServiceCard';
import ServiceModal from '../common/ServiceModal';
import { ScrollReveal, StaggerContainer } from '../common/ScrollAnimation';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const servicesData = [
    {
      id: 1,
      title: 'Industrial Automation',
      shortDescription: 'Complete automation solutions for manufacturing processes using PLC, HMI, and SCADA systems.',
      fullDescription: 'We provide end-to-end industrial automation solutions that transform your manufacturing operations. Our expertise spans PLC programming, HMI development, SCADA implementation, and complete system integration. We work with leading brands like Siemens, Allen Bradley, Mitsubishi, and Delta to deliver reliable, scalable automation systems that improve productivity and reduce operational costs.',
      icon: 'cpu',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop', caption: 'PLC - Programmable Logic Controller' },
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop', caption: 'PLC Control Panel Wiring' },
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', caption: 'HMI - Human Machine Interface' },
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', caption: 'SCADA Monitoring Dashboard' },
        { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop', caption: 'SCADA Data Visualization' },
        { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=500&fit=crop', caption: 'Industrial Control Systems' },
      ],
      features: ['PLC Programming (Siemens, Allen Bradley, Mitsubishi)', 'HMI/SCADA Development', 'Motion Control Systems', 'Process Automation', 'Legacy System Upgrades'],
    },
    {
      id: 2,
      title: 'Control Panels',
      shortDescription: 'Custom control panel design, fabrication, and wiring meeting industry standards.',
      fullDescription: 'Our control panel solutions are designed and manufactured to meet the highest industry standards. From initial concept to final installation, we handle every aspect including electrical design, component selection, panel fabrication, wiring, and testing. All panels comply with relevant safety standards and are built for reliability in demanding industrial environments.',
      icon: 'diagram-3',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop', caption: 'Control Panel Design' },
        { url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=500&fit=crop', caption: 'Panel Assembly & Fabrication' },
        { url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&h=500&fit=crop', caption: 'Professional Wire Management' },
        { url: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=500&fit=crop', caption: 'Testing & Quality Assurance' },
      ],
      features: ['Custom Panel Design', 'MCC & PCC Panels', 'VFD & Soft Starter Panels', 'PLC Control Panels', 'UL/CE Certified Options'],
    },
    {
      id: 3,
      title: 'Machine Vision Solutions',
      shortDescription: 'Advanced vision systems for quality inspection, measurement, and automated guidance.',
      fullDescription: 'Implement cutting-edge machine vision systems that enhance quality control and automate visual inspection tasks. Our solutions include 2D/3D vision systems, barcode reading, OCR verification, dimensional measurement, and defect detection. We integrate with leading vision platforms to deliver accurate, high-speed inspection capabilities.',
      icon: 'vision',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop', caption: 'Vision System Integration' },
        { url: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=500&fit=crop', caption: 'Camera Inspection System' },
        { url: 'https://images.unsplash.com/photo-1632406898426-f0bdd7ce648f?w=800&h=500&fit=crop', caption: 'Quality Control Analysis' },
        { url: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&h=500&fit=crop', caption: 'Automated Defect Detection' },
      ],
      features: ['2D/3D Vision Systems', 'Quality Inspection', 'Barcode & OCR Reading', 'Dimensional Measurement', 'AI-Based Defect Detection'],
    },
    {
      id: 4,
      title: 'Project Design & Development',
      shortDescription: 'End-to-end project planning, design, and development for industrial automation needs.',
      fullDescription: 'From concept to commissioning, we provide comprehensive project management and engineering services. Our team handles feasibility studies, system architecture design, detailed engineering, procurement, installation supervision, and commissioning. We ensure projects are delivered on time, within budget, and to specification.',
      icon: 'layers',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=500&fit=crop', caption: 'Engineering Design Process' },
        { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop', caption: 'Project Planning & Analysis' },
        { url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop', caption: 'Technical Documentation' },
        { url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=500&fit=crop', caption: 'On-site Implementation' },
      ],
      features: ['Feasibility Studies', 'System Architecture Design', 'Detailed Engineering', 'Project Management', 'Commissioning & Support'],
    },
    {
      id: 5,
      title: 'Industry 4.0 & 5.0 Projects',
      shortDescription: 'Smart factory solutions with advanced connectivity, AI, and human-centric automation.',
      fullDescription: 'Transform your facility into a smart factory with Industry 4.0 and 5.0 technologies. We implement digital twins, predictive maintenance, AI-driven optimization, and collaborative robotics. Our solutions focus on sustainable manufacturing while keeping human workers at the center of operations.',
      icon: 'industry',
      image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=500&fit=crop', caption: 'Smart Factory Solutions' },
        { url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop', caption: 'Collaborative Robot Arms' },
        { url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=500&fit=crop', caption: 'AI-Powered Analytics' },
        { url: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=500&fit=crop', caption: 'Digital Twin Technology' },
      ],
      features: ['Digital Twin Implementation', 'Predictive Maintenance', 'AI & Machine Learning', 'Collaborative Robotics', 'Sustainable Manufacturing'],
    },
    {
      id: 6,
      title: 'Industrial IoT (IIoT) Integration',
      shortDescription: 'Connect machines and sensors for real-time data monitoring and predictive analytics.',
      fullDescription: 'Unlock the power of your industrial data with our IIoT solutions. We connect your machines, sensors, and systems to enable real-time monitoring, data analytics, and predictive insights. Our solutions integrate with cloud platforms and on-premise systems to provide actionable intelligence for better decision-making.',
      icon: 'hdd-network',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop', caption: 'IoT Sensor Networks' },
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', caption: 'Real-time Data Dashboard' },
        { url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop', caption: 'Predictive Analytics Platform' },
        { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop', caption: 'Connected Factory Floor' },
      ],
      features: ['Sensor Integration', 'Real-time Data Monitoring', 'Predictive Analytics', 'Cloud Connectivity', 'Custom Dashboards'],
    },
    {
      id: 7,
      title: 'Cloud & Edge Automation',
      shortDescription: 'Cloud-based monitoring and edge computing solutions for distributed automation systems.',
      fullDescription: 'Leverage cloud and edge computing for flexible, scalable automation solutions. We design hybrid architectures that combine the power of cloud analytics with the responsiveness of edge computing. Monitor and control your operations from anywhere while ensuring data security and low-latency performance.',
      icon: 'cloud',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
      gallery: [
        { url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop', caption: 'Cloud Infrastructure' },
        { url: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?w=800&h=500&fit=crop', caption: 'Server & Data Center' },
        { url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop', caption: 'Remote Monitoring System' },
        { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop', caption: 'Global Network Connectivity' },
      ],
      features: ['Cloud-based SCADA', 'Edge Computing Solutions', 'Remote Access & Control', 'Data Security & Backup', 'Scalable Architecture'],
    },
  ];

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

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  return (
    <>
      <section id="services" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-primary-dark"></div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(45,160,212,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,160,212,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Gradient orbs with parallax */}
        <div
          className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-accent/10 to-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.1}px))` }}
        ></div>
        <div
          className="absolute top-1/2 right-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-bl from-primary/8 to-accent/10 rounded-full blur-3xl"
          style={{ transform: `translate(33%, ${scrollY * -0.05}px)` }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-56 sm:w-72 h-56 sm:h-72 bg-gradient-to-tr from-accent/5 to-cyan-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(calc(50% + ${scrollY * 0.08}px))` }}
        ></div>

        {/* Circuit line decorations - left side */}
        <div className="absolute top-24 left-0 w-48 opacity-20 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 200 300" fill="none" className="w-full">
            <path d="M0 40 L60 40 L60 100 L120 100" stroke="rgba(45,160,212,0.5)" strokeWidth="1" />
            <path d="M0 120 L40 120 L40 180 L100 180" stroke="rgba(45,160,212,0.4)" strokeWidth="1" />
            <path d="M0 220 L80 220 L80 260 L140 260" stroke="rgba(45,160,212,0.3)" strokeWidth="1" />
            <circle cx="60" cy="40" r="3" fill="rgba(45,160,212,0.6)" className="animate-dataPulse" />
            <circle cx="40" cy="120" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '0.7s' }} />
            <circle cx="80" cy="220" r="3" fill="rgba(45,160,212,0.4)" className="animate-dataPulse" style={{ animationDelay: '1.4s' }} />
          </svg>
        </div>

        {/* Circuit line decorations - right side */}
        <div className="absolute top-40 right-0 w-48 opacity-20 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 200 300" fill="none" className="w-full">
            <path d="M200 60 L140 60 L140 120 L80 120" stroke="rgba(45,160,212,0.5)" strokeWidth="1" />
            <path d="M200 180 L160 180 L160 240 L100 240" stroke="rgba(45,160,212,0.4)" strokeWidth="1" />
            <circle cx="140" cy="60" r="3" fill="rgba(45,160,212,0.6)" className="animate-dataPulse" style={{ animationDelay: '0.3s' }} />
            <circle cx="160" cy="180" r="3" fill="rgba(45,160,212,0.5)" className="animate-dataPulse" style={{ animationDelay: '1s' }} />
          </svg>
        </div>

        {/* Chevron arrows decoration - right */}
        <div className="absolute top-1/4 right-6 sm:right-12 opacity-15 pointer-events-none hidden md:flex flex-row gap-1">
          {[...Array(6)].map((_, i) => (
            <svg key={i} className="w-3 h-4 text-accent" fill="currentColor" viewBox="0 0 12 16" style={{ animationDelay: `${i * 0.1}s` }}>
              <path d="M2 0 L10 8 L2 16 L4 8 Z" opacity={1 - i * 0.12} />
            </svg>
          ))}
        </div>

        {/* Dot grid patterns */}
        <div className="absolute top-32 left-1/4 grid grid-cols-4 gap-2 opacity-10 pointer-events-none hidden lg:grid">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-accent rounded-full" />
          ))}
        </div>
        <div className="absolute bottom-32 right-1/4 grid grid-cols-3 gap-2 opacity-10 pointer-events-none hidden lg:grid">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-accent rounded-full" />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14 lg:mb-16">
            <ScrollReveal animation="fade-down" duration={600}>
              <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
                What We Offer
              </span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100} duration={700}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Services</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="scale-up" delay={200} duration={600}>
              <div className="w-20 h-1 bg-gradient-to-r from-accent to-cyan-400 mx-auto mb-6 rounded-full" />
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300} duration={700}>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                Comprehensive industrial automation solutions tailored to optimize your
                manufacturing processes and maximize operational efficiency.
              </p>
            </ScrollReveal>
          </div>

          {/* Services Grid / Scroll */}
          <div className="services-scroll-container">
            <StaggerContainer animation="fade-up" staggerDelay={120} className="services-scroll-wrapper">
              {servicesData.map((service) => (
                <div key={service.id} className="service-scroll-item">
                  <ServiceCard service={service} onClick={() => openModal(service)} />
                </div>
              ))}
            </StaggerContainer>
            {/* Scroll indicator for mobile */}
            <ScrollReveal animation="fade-up" delay={800}>
              <div className="scroll-indicator">
                <span>Swipe to explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA */}
          <ScrollReveal animation="fade-up" delay={400} duration={700}>
            <div className="text-center mt-12 sm:mt-16">
              <p className="text-slate-400 mb-6">
                Need a custom automation solution?
              </p>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90
                         text-white font-semibold rounded-lg border border-accent/50
                         hover:shadow-[0_0_30px_rgba(45,160,212,0.3)]
                         transition-all duration-300 group"
              >
                Discuss Your Project
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default Services;
