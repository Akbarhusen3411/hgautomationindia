/**
 * Footer Component
 * Dark footer with logo, links, and animations
 */

import React from 'react';
import Logo from '../common/Logo';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { scrollToElement, smoothScrollTo } from '../../utils/smoothScroll';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [footerRef, isVisible] = useScrollAnimation({ threshold: 0.1 });

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const serviceLinks = [
    { label: 'Industrial Automation', href: '#services' },
    { label: 'Control Panels', href: '#services' },
    { label: 'Machine Vision Solutions', href: '#services' },
    { label: 'Industry 4.0 & 5.0', href: '#services' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    scrollToElement(sectionId, 80);
  };

  return (
    <footer ref={footerRef} className="bg-primary-dark border-t border-white/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-industrial-pattern opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Company Info */}
          <div className={`col-span-2 md:col-span-1 lg:col-span-1 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Premium Logo with animations */}
            <div className="mb-6">
              <Logo size="small" showText={true} />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Leading provider of industrial automation solutions. Transforming manufacturing
              with innovative PLC programming and SCADA systems.
            </p>
            <div className="flex gap-3">
              {[
                { name: 'linkedin', url: 'https://www.linkedin.com/company/hgautomation' },
                { name: 'twitter', url: 'https://twitter.com/hgautomation' },
                { name: 'facebook', url: 'https://www.facebook.com/hgautomation' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center
                           text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
                >
                  {social.name === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {social.name === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  )}
                  {social.name === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h5 className="text-white font-semibold mb-5">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-accent transition-colors text-sm animated-underline inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h5 className="text-white font-semibold mb-5">Our Services</h5>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-accent transition-colors text-sm animated-underline inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h5 className="text-white font-semibold mb-5">Contact Us</h5>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="font-medium text-white">Bakarali Momin</li>
              <li>Founder & Proprietor</li>
              <li className="pt-2">
                <a href="tel:+918320049749" className="hover:text-accent transition-colors">
                  +91 83200 49749
                </a>
              </li>
              <li>
                <a href="mailto:bakarali@hgautomationindia.com" className="hover:text-accent transition-colors">
                  bakarali@hgautomationindia.com
                </a>
              </li>
              <li>
                <a href="https://www.hgautomationindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  www.hgautomationindia.com
                </a>
              </li>
              <li className="pt-2">
                Building No. 70, Mominvad<br />
                Vaso, Kheda, Gujarat 387710
              </li>
            </ul>
          </div>
        </div>

        {/* Map Section */}
        <div className={`mt-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            {/* Map Info */}
            <div className="lg:w-1/3 bg-white/5 rounded-xl p-4 sm:p-6 border border-white/10">
              <h5 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Our Location
              </h5>
              <p className="text-white/60 text-sm mb-4">
                Visit us at our facility in Gujarat, India. We're always happy to meet with clients and discuss your automation needs.
              </p>
              <div className="text-white/80 text-sm">
                <p className="font-medium text-accent">HG Automation India</p>
                <p>Building No. 70, Mominvad</p>
                <p>Vaso, Kheda, Gujarat 387710</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="lg:w-2/3 rounded-xl overflow-hidden border border-white/10 h-[200px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9!2d72.6840!3d22.7524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVaso%2C%20Kheda%2C%20Gujarat%20387710!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HG Automation Location"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-white/40 text-sm">
            &copy; {currentYear} HG Automation India. All rights reserved.
            {process.env.REACT_APP_VERSION && (
              <span className="ml-2 text-white/20 text-xs">v{process.env.REACT_APP_VERSION}</span>
            )}
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={() => smoothScrollTo(0)}
            className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-accent rounded-full
                     text-white/60 hover:text-white text-sm transition-all duration-300
                     border border-white/10 hover:border-accent"
          >
            <span>Back to Top</span>
            <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
