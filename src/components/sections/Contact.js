/**
 * Contact Section Component
 * Dark futuristic theme with glassmorphism form and animated contact icons
 */

import React, { useState, useEffect, useRef } from 'react';
import { contactApi } from '../../services/api';
import { ScrollReveal, StaggerContainer } from '../common/ScrollAnimation';
import countries from '../../data/countries';

// Disposable/temporary email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'yopmail.com',
  'throwaway.email', 'temp-mail.org', 'fakeinbox.com', 'sharklasers.com',
  'guerrillamailblock.com', 'grr.la', 'dispostable.com', 'mailnesia.com',
  'maildrop.cc', 'discard.email', 'trashmail.com', 'trashmail.net',
  'mytemp.email', 'getnada.com', 'tempail.com', 'mohmal.com',
  'burnermail.io', 'mailcatch.com', 'tempr.email', 'tempinbox.com',
  'trash-mail.com', 'harakirimail.com', 'tmail.ws', 'mailnull.com',
  'jetable.org', 'spam4.me', 'greymail.com'
];

/**
 * Validate email: format + disposable domain check + TLD check
 */
const validateEmail = (email) => {
  if (!email.trim()) return 'Email is required';

  const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';

  if (/\.{2,}/.test(email)) return 'Email contains invalid characters';

  const domain = email.split('@')[1].toLowerCase();
  const tld = domain.split('.').pop();

  if (tld.length < 2 || /^\d+$/.test(tld)) return 'Email has an invalid domain';

  if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return 'Disposable/temporary emails are not allowed. Please use your business or personal email.';
  }

  return null;
};

/**
 * Validate phone number based on selected country
 */
const validatePhone = (phone, selectedCountry) => {
  if (!phone.trim()) return 'Phone number is required';

  const stripped = phone.replace(/[\s\-().]/g, '');

  if (!/^\d+$/.test(stripped)) return 'Phone number must contain only digits';

  if (stripped.length < selectedCountry.minDigits || stripped.length > selectedCountry.maxDigits) {
    if (selectedCountry.minDigits === selectedCountry.maxDigits) {
      return `Phone number must be exactly ${selectedCountry.minDigits} digits for ${selectedCountry.name}`;
    }
    return `Phone number must be ${selectedCountry.minDigits}-${selectedCountry.maxDigits} digits for ${selectedCountry.name}`;
  }

  if (/^(\d)\1+$/.test(stripped)) return 'Please enter a real phone number';

  return null;
};


const Contact = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    countryCode: '+91',
    website: '',
  });

  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [fieldValidated, setFieldValidated] = useState({});

  // Country dropdown state
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // India default
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef(null);

  // Close country dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(e.target)) {
        setCountryDropdownOpen(false);
        setCountrySearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: null }));
      setFieldValidated(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, countryCode: country.dialCode }));
    setCountryDropdownOpen(false);
    setCountrySearch('');
  };

  const filteredCountries = countries.filter(c => {
    const search = countrySearch.toLowerCase();
    return c.name.toLowerCase().includes(search) ||
           c.dialCode.includes(search) ||
           c.code.toLowerCase().includes(search);
  });

  // Real-time validation on blur
  const handleBlur = (fieldName) => {
    setFocusedField(null);
    let fieldError = null;

    if (fieldName === 'email') {
      fieldError = validateEmail(formData.email);
    } else if (fieldName === 'phone') {
      fieldError = validatePhone(formData.phone, selectedCountry);
    } else if (fieldName === 'name') {
      if (!formData.name.trim()) fieldError = 'Name is required';
    } else if (fieldName === 'subject') {
      if (!formData.subject.trim()) fieldError = 'Subject is required';
    } else if (fieldName === 'message') {
      if (!formData.message.trim()) fieldError = 'Message is required';
      else if (formData.message.length < 20) fieldError = 'Message must be at least 20 characters';
    }

    if (fieldError) {
      setValidationErrors(prev => ({ ...prev, [fieldName]: fieldError }));
      setFieldValidated(prev => ({ ...prev, [fieldName]: false }));
    } else if (formData[fieldName] && formData[fieldName].trim()) {
      setValidationErrors(prev => ({ ...prev, [fieldName]: null }));
      setFieldValidated(prev => ({ ...prev, [fieldName]: true }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(formData.phone, selectedCountry);
    if (phoneErr) errors.phone = phoneErr;

    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.length < 20) errors.message = 'Message must be at least 20 characters';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    // Honeypot: if filled, silently fake success (bot detected)
    if (formData.website) {
      setSuccess('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', countryCode: '+91', website: '' });
      setFieldValidated({});
      setSelectedCountry(countries[0]);
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { website, ...cleanData } = formData;
      const submitData = {
        ...cleanData,
        phone: cleanData.phone.replace(/[\s\-().]/g, ''),
        countryCode: selectedCountry.dialCode,
      };
      const response = await contactApi.submit(submitData);
      setSuccess(response.message);
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', countryCode: '+91', website: '' });
      setFieldValidated({});
      setSelectedCountry(countries[0]);
    } catch (err) {
      setError(err.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
      label: 'Contact Person',
      value: 'Bakarali Momin',
      subValue: 'Founder & Proprietor',
      animClass: 'contact-icon-breathe',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      label: 'Phone',
      value: '+91 83200 49749',
      href: 'tel:+918320049749',
      animClass: 'contact-icon-ring',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      label: 'Email',
      value: 'bakarali@hgautomationindia.com',
      href: 'mailto:bakarali@hgautomationindia.com',
      animClass: 'contact-icon-envelope',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      label: 'Address',
      value: 'Building No. 70, Mominvad',
      subValue: 'Vaso, Kheda, Gujarat 387710',
      animClass: 'contact-icon-pin',
    },
  ];


  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#0a0f1e] via-slate-950 to-[#0d1526] relative overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(45,160,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,160,212,1) 1px, transparent 1px)`,
          backgroundSize: '45px 45px',
        }}
      />

      {/* Gradient Orbs with Parallax */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s', transform: `translateY(${scrollY * -0.03}px)` }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />

      {/* Circuit Line Decorations */}
      <svg className="absolute left-0 top-1/4 w-32 h-64 hidden lg:block" viewBox="0 0 128 256" fill="none">
        <path d="M0 128h40l20-20h28" stroke="rgba(45,160,212,0.08)" strokeWidth="1"/>
        <path d="M0 160h60l15 15h13" stroke="rgba(45,160,212,0.06)" strokeWidth="1"/>
        <path d="M0 96h30l25 25h33" stroke="rgba(45,160,212,0.05)" strokeWidth="1"/>
        <circle cx="88" cy="108" r="2" fill="rgba(45,160,212,0.15)"/>
        <circle cx="88" cy="175" r="2" fill="rgba(45,160,212,0.12)"/>
        <circle cx="88" cy="121" r="1.5" fill="rgba(45,160,212,0.1)"/>
      </svg>
      <svg className="absolute right-0 bottom-1/4 w-32 h-64 hidden lg:block" viewBox="0 0 128 256" fill="none">
        <path d="M128 128h-40l-20 20h-28" stroke="rgba(45,160,212,0.08)" strokeWidth="1"/>
        <path d="M128 96h-60l-15-15h-13" stroke="rgba(45,160,212,0.06)" strokeWidth="1"/>
        <path d="M128 160h-30l-25-25h-33" stroke="rgba(45,160,212,0.05)" strokeWidth="1"/>
        <circle cx="40" cy="148" r="2" fill="rgba(45,160,212,0.15)"/>
        <circle cx="40" cy="81" r="2" fill="rgba(45,160,212,0.12)"/>
        <circle cx="40" cy="135" r="1.5" fill="rgba(45,160,212,0.1)"/>
      </svg>

      {/* Dot Grid Decoration */}
      <div className="absolute top-16 right-20 grid grid-cols-4 gap-3 hidden lg:grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-[1.5px] h-[1.5px] rounded-full bg-accent/20" />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-accent/30 rounded-full animate-particleDrift"
          style={{
            top: `${20 + i * 20}%`,
            left: `${10 + i * 25}%`,
            animationDelay: `${i * 2.5}s`,
            animationDuration: `${10 + i * 3}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <ScrollReveal animation="fade-down" duration={600}>
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4 border border-accent/20 backdrop-blur-sm">
              Contact Us
            </span>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={100} duration={700}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Let's Start a <span className="text-accent">Conversation</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="scale-up" delay={200} duration={600}>
            <div className="w-20 h-1 bg-accent mx-auto mb-6 rounded-full" />
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300} duration={700}>
            <p className="text-white/70 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Ready to optimize your manufacturing processes? Contact us for a free
              consultation and discover how our automation solutions can transform your operations.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Contact Info — Left Column */}
          <div className="lg:col-span-2">
            <ScrollReveal animation="fade-right" duration={600}>
              <StaggerContainer animation="fade-up" staggerDelay={100} className="space-y-2">
                {contactInfo.map((item, index) => (
                  <div key={index} className="group relative">
                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/30
                                  hover:bg-slate-800/70 hover:border-accent/40 transition-all duration-300 hover:translate-x-2
                                  hover:shadow-lg hover:shadow-accent/5">
                      {/* Icon with unique animation */}
                      <div className={`flex-shrink-0 w-9 h-9 bg-gradient-to-br from-accent/15 to-cyan-500/10 border border-accent/20 rounded-xl
                                    flex items-center justify-center text-accent
                                    group-hover:border-accent/40 transition-all duration-300`}>
                        <span className={`[&>svg]:w-4 [&>svg]:h-4 ${item.animClass}`}>{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] text-accent uppercase tracking-wider font-semibold block leading-tight">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a href={item.href} className="text-white hover:text-accent transition-colors text-[13px] font-medium truncate block">
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-white text-[13px] font-medium block truncate">{item.value}</span>
                        )}
                        {item.subValue && (
                          <span className="text-white/60 text-[11px] block truncate">{item.subValue}</span>
                        )}
                      </div>
                    </div>
                    {/* Bottom glow line on hover */}
                    <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/30 transition-all duration-300" />
                  </div>
                ))}
              </StaggerContainer>
            </ScrollReveal>

            {/* Quick Connect */}
            <ScrollReveal animation="fade-up" delay={500} duration={700}>
              <div className="mt-3 p-3 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/30">
                <h4 className="text-white font-medium text-[13px] mb-2">Quick Connect</h4>
                <div className="flex gap-2">
                  <a href="https://wa.me/918320049749" target="_blank" rel="noopener noreferrer"
                     className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-green-500/10 border border-green-500/30
                              text-green-400 text-[13px] rounded-md transition-all duration-300 hover:scale-105
                              hover:shadow-lg hover:shadow-green-500/20 hover:bg-green-500/20 hover:border-green-500/50">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="font-medium">WhatsApp</span>
                  </a>
                  <a href="tel:+918320049749"
                     className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 bg-accent/10 border border-accent/30
                              text-accent text-[13px] rounded-md transition-all duration-300 hover:scale-105
                              hover:shadow-lg hover:shadow-accent/20 hover:bg-accent/20 hover:border-accent/50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">Call Us</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact Form — Right Column */}
          <ScrollReveal animation="fade-left" delay={200} duration={800} className="lg:col-span-3">
            <div className="contact-form-card bg-white/95 backdrop-blur-md border border-sky-100 shadow-xl shadow-accent/5 rounded-2xl p-4 md:p-5 relative overflow-hidden">
              {/* Top accent gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              {/* Corner accent SVGs */}
              <svg className="absolute top-3 right-3 w-6 h-6 text-accent/15" viewBox="0 0 24 24" fill="none">
                <path d="M24 0v8h-2V2h-6V0h8z" fill="currentColor"/>
              </svg>
              <svg className="absolute bottom-3 left-3 w-6 h-6 text-accent/15" viewBox="0 0 24 24" fill="none">
                <path d="M0 24v-8h2v6h6v2H0z" fill="currentColor"/>
              </svg>

              <div className="relative z-10">
                {success ? (
                  /* ─── Success Thank You Screen ─── */
                  <div className="flex flex-col items-center justify-center py-8 px-4 animate-fadeInUp">
                    {/* Animated checkmark circle */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 contact-success-ring">
                        <svg className="w-10 h-10 text-white animate-checkPop" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {/* Glow ring */}
                      <div className="absolute -inset-3 rounded-full bg-green-400/20 blur-xl animate-pulse" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-primary-dark mb-2">Thank You!</h3>
                    <p className="text-slate-500 text-sm text-center max-w-xs mb-6 leading-relaxed">
                      Your message has been sent successfully. We'll get back to you within <strong className="text-accent">24 hours</strong>.
                    </p>

                    {/* Info cards */}
                    <div className="w-full grid grid-cols-2 gap-3 mb-8">
                      <div className="bg-sky-50/80 border border-sky-100 rounded-xl p-3 text-center">
                        <svg className="w-5 h-5 text-accent mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-[11px] text-slate-500">Check your inbox for</p>
                        <p className="text-xs font-semibold text-primary-dark">Confirmation Email</p>
                      </div>
                      <div className="bg-sky-50/80 border border-sky-100 rounded-xl p-3 text-center">
                        <svg className="w-5 h-5 text-accent mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[11px] text-slate-500">Expected response</p>
                        <p className="text-xs font-semibold text-primary-dark">Within 24 Hours</p>
                      </div>
                    </div>

                    {/* Send Another Message button */}
                    <button
                      onClick={() => { setSuccess(null); setError(null); }}
                      className="group flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-xl
                                 text-sm font-medium text-slate-600 hover:text-accent hover:border-accent/30
                                 hover:shadow-md hover:shadow-accent/10 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* ─── Form View ─── */
                  <>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center shadow-md shadow-accent/30">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-dark">Send Us a Message</h3>
                    <p className="text-slate-500 text-[11px]">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl animate-fadeInUp">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-red-700 font-semibold text-sm">Something went wrong</h4>
                        <p className="text-red-600 text-xs">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot anti-spam field */}
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-2.5">
                    {/* Row 1: Name */}
                    <div className="form-field-group">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-accent">*</span>
                      </label>
                      <div className={`form-input-wrapper ${focusedField === 'name' ? 'focused' : ''} ${validationErrors.name ? 'error' : ''} ${fieldValidated.name ? 'valid' : ''}`}>
                        <span className="form-input-icon">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => handleBlur('name')}
                          className="form-input-field"
                          placeholder="John Doe"
                          disabled={loading}
                        />
                        {fieldValidated.name && !validationErrors.name && (
                          <span className="form-input-valid">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                      {validationErrors.name && (
                        <p className="form-error-message">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {validationErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Row 1: Company */}
                    <div className="form-field-group">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Company Name
                      </label>
                      <div className={`form-input-wrapper ${focusedField === 'company' ? 'focused' : ''} ${fieldValidated.company ? 'valid' : ''}`}>
                        <span className="form-input-icon">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          className="form-input-field"
                          placeholder="Your Company Ltd."
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Row 2: Email */}
                    <div className="form-field-group">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <div className={`form-input-wrapper ${focusedField === 'email' ? 'focused' : ''} ${validationErrors.email ? 'error' : ''} ${fieldValidated.email ? 'valid' : ''}`}>
                        <span className="form-input-icon">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => handleBlur('email')}
                          className="form-input-field"
                          placeholder="john@company.com"
                          disabled={loading}
                        />
                        {fieldValidated.email && !validationErrors.email && (
                          <span className="form-input-valid">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                      {validationErrors.email && (
                        <p className="form-error-message">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {validationErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Row 2: Phone */}
                    <div className="form-field-group">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-accent">*</span>
                      </label>
                      <div className={`form-input-wrapper ${focusedField === 'phone' ? 'focused' : ''} ${validationErrors.phone ? 'error' : ''} ${fieldValidated.phone ? 'valid' : ''}`}>
                        {/* Country Code Selector (inline) */}
                        <div className="relative" ref={countryDropdownRef}>
                          <div
                            className={`country-selector-inline ${countryDropdownOpen ? 'open' : ''}`}
                            onClick={() => !loading && setCountryDropdownOpen(!countryDropdownOpen)}
                          >
                            <span className="flag">{selectedCountry.flag}</span>
                            <span className="dial-code">{selectedCountry.dialCode}</span>
                            <span className="arrow">&#9662;</span>
                          </div>

                          {countryDropdownOpen && (
                            <div className="country-dropdown">
                              <div className="country-dropdown-search">
                                <input
                                  type="text"
                                  placeholder="Search country..."
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  autoFocus
                                />
                              </div>
                              <div className="country-dropdown-list">
                                {filteredCountries.map((country) => (
                                  <div
                                    key={country.code}
                                    className={`country-dropdown-item ${country.code === selectedCountry.code ? 'selected' : ''}`}
                                    onClick={() => handleCountrySelect(country)}
                                  >
                                    <span className="flag">{country.flag}</span>
                                    <span className="name">{country.name}</span>
                                    <span className="code">{country.dialCode}</span>
                                  </div>
                                ))}
                                {filteredCountries.length === 0 && (
                                  <div className="country-dropdown-item" style={{ justifyContent: 'center', color: '#94a3b8', cursor: 'default' }}>
                                    No countries found
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <span className="country-divider" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => handleBlur('phone')}
                          className="form-input-field"
                          placeholder={`${selectedCountry.minDigits} digit number`}
                          disabled={loading}
                        />
                        {fieldValidated.phone && !validationErrors.phone && (
                          <span className="form-input-valid">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                      {validationErrors.phone && (
                        <p className="form-error-message">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {validationErrors.phone}
                        </p>
                      )}

                    </div>

                    {/* Row 4: Subject - Full Width */}
                    <div className="md:col-span-2 form-field-group">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject <span className="text-accent">*</span>
                      </label>
                      <div className={`form-input-wrapper ${focusedField === 'subject' ? 'focused' : ''} ${validationErrors.subject ? 'error' : ''} ${fieldValidated.subject ? 'valid' : ''}`}>
                        <span className="form-input-icon">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('subject')}
                          onBlur={() => handleBlur('subject')}
                          className="form-input-field"
                          placeholder="How can we help you?"
                          disabled={loading}
                        />
                        {fieldValidated.subject && !validationErrors.subject && (
                          <span className="form-input-valid">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                      {validationErrors.subject && (
                        <p className="form-error-message">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {validationErrors.subject}
                        </p>
                      )}
                    </div>

                    {/* Row 5: Message - Full Width */}
                    <div className="md:col-span-2 form-field-group">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message <span className="text-accent">*</span>
                      </label>
                      <div className={`form-textarea-wrapper ${focusedField === 'message' ? 'focused' : ''} ${validationErrors.message ? 'error' : ''}`}>
                        <span className="form-textarea-icon">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                        </span>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => handleBlur('message')}
                          rows={3}
                          className="form-textarea-field"
                          placeholder="Tell us about your project requirements, automation needs, or any questions you have..."
                          disabled={loading}
                        />
                        <div className="form-textarea-counter">
                          <span className={formData.message.length >= 20 ? 'text-green-500' : 'text-slate-500'}>
                            {formData.message.length}
                          </span>
                          <span className="text-slate-500">/20 min</span>
                        </div>
                      </div>
                      {validationErrors.message && (
                        <p className="form-error-message">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {validationErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Row 6: Submit Button */}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="form-submit-btn group"
                        disabled={loading}
                      >
                        <span className="form-submit-bg"></span>
                        <span className="form-submit-content">
                          {loading ? (
                            <>
                              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Message</span>
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
