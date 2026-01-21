/**
 * Footer Component
 * Dark footer with logo and links
 */

import React from 'react';
import logoImage from '../../images/Logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-primary-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <img src={logoImage} alt="HG Automation" className="h-10 w-auto mb-6" />
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Leading provider of industrial automation solutions. Transforming manufacturing
              with innovative PLC programming and SCADA systems.
            </p>
            <div className="flex gap-3">
              {['linkedin', 'twitter', 'facebook'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center
                           text-white/60 hover:bg-accent hover:text-white transition-all duration-200"
                >
                  {social === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  {social === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  )}
                  {social === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-semibold mb-5">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-white font-semibold mb-5">Our Services</h5>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
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

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} HG Automation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
