/**
 * ServiceModal Component
 * Premium full-screen mobile experience with dark glassmorphism theme
 * Slide-up bottom sheet, swipeable gallery, staggered animations
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

const ServiceModal = ({ service, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animateContent, setAnimateContent] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const galleryRef = useRef(null);

  // Reset state when service changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [service]);

  // Animate content in after modal opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      const timer = setTimeout(() => setAnimateContent(true), 150);
      return () => clearTimeout(timer);
    } else {
      setAnimateContent(false);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') handleClose();
    else if (e.key === 'ArrowLeft') navigateImage(-1);
    else if (e.key === 'ArrowRight') navigateImage(1);
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navigateImage = (direction) => {
    if (!service?.gallery) return;
    const totalImages = service.gallery.length;
    setCurrentImageIndex((prev) => (prev + direction + totalImages) % totalImages);
  };

  // Touch swipe for gallery
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) navigateImage(1);
      else navigateImage(-1);
    }
  };

  // Animated close
  const handleClose = () => {
    setAnimateContent(false);
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  };

  if (!isOpen || !service) return null;

  const currentImage = service.gallery?.[currentImageIndex];
  const totalImages = service.gallery?.length || 0;

  // Only close on overlay click if it's a direct click (not after scroll)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`service-modal-overlay ${isClosing ? 'modal-closing' : ''}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`service-modal ${isClosing ? 'modal-slide-out' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== MOBILE LAYOUT (shown on small screens) ===== */}
        <div className="mobile-modal-layout md:hidden">
          {/* Floating Close Button */}
          <button
            className="mobile-modal-close"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Scrollable area — gallery + content */}
          <div className="mobile-modal-scroll">
            {/* Hero Image Gallery with Swipe */}
            <div
              className="mobile-hero-gallery"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              ref={galleryRef}
            >
              {/* Image with transition */}
              <div className="mobile-gallery-image-wrapper">
                <img
                  src={currentImage?.url || service.image}
                  alt={currentImage?.caption || service.title}
                  loading="lazy"
                  className={`mobile-gallery-image ${animateContent ? 'animate-in' : ''}`}
                  key={currentImageIndex}
                />

                {/* Dark gradient overlay */}
                <div className="mobile-gallery-overlay" />

                {/* Glowing accent line at bottom of image */}
                <div className="mobile-gallery-glow" />
              </div>

              {/* Service Icon Badge - floating on image */}
              <div className={`mobile-service-badge ${animateContent ? 'badge-animate' : ''}`}>
                <div className="mobile-badge-icon">
                  {getIcon(service.icon)}
                </div>
                <div className="mobile-badge-glow" />
              </div>

              {/* Gallery Dots */}
              {totalImages > 1 && (
                <div className="mobile-gallery-dots">
                  {service.gallery.map((_, index) => (
                    <button
                      key={index}
                      className={`mobile-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              )}

              {/* Image counter */}
              {totalImages > 1 && (
                <div className="mobile-image-counter">
                  {currentImageIndex + 1} / {totalImages}
                </div>
              )}
            </div>

            {/* Content Area - Dark glass theme */}
            <div className="mobile-modal-content">
              {/* Title with glow underline */}
              <div className={`mobile-modal-title-wrap ${animateContent ? 'content-animate delay-1' : ''}`}>
                <h2 className="mobile-modal-title">{service.title}</h2>
                <div className="mobile-title-glow-line" />
              </div>

              {/* Caption */}
              {currentImage?.caption && (
                <div className={`mobile-image-caption ${animateContent ? 'content-animate delay-2' : ''}`}>
                  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{currentImage.caption}</span>
                </div>
              )}

              {/* Description */}
              <p className={`mobile-modal-desc ${animateContent ? 'content-animate delay-3' : ''}`}>
                {service.fullDescription || service.shortDescription}
              </p>

              {/* Features as glowing chips */}
              {service.features && service.features.length > 0 && (
                <div className={`mobile-features-section ${animateContent ? 'content-animate delay-4' : ''}`}>
                  <h3 className="mobile-features-heading">
                    <span className="mobile-features-heading-icon">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Key Features
                  </h3>
                  <div className="mobile-features-chips">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className={`mobile-feature-chip ${animateContent ? 'chip-animate' : ''}`}
                        style={{ animationDelay: `${(index * 80) + 400}ms` }}
                      >
                        <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons — outside scroll, always at bottom */}
          <div className={`mobile-sticky-cta ${animateContent ? 'cta-animate' : ''}`}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                setTimeout(() => {
                  const section = document.getElementById('contact');
                  if (section) {
                    window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
                  }
                }, 450);
              }}
              className="mobile-cta-primary"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Get Quote
            </a>
            <a
              href={`https://wa.me/918320049749?text=${encodeURIComponent(`Hi! I'm interested in your ${service.title} services. Can you provide more information?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-cta-whatsapp"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* ===== DESKTOP LAYOUT (hidden on small screens) ===== */}
        <div className="desktop-modal-layout hidden md:block">
          {/* Close Button */}
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="modal-content">
            {/* Gallery Section */}
            <div className="modal-gallery">
              <div className="gallery-main">
                <img
                  src={currentImage?.url || service.image}
                  alt={currentImage?.caption || service.title}
                  loading="lazy"
                  className="gallery-main-image"
                />
                {service.gallery && service.gallery.length > 1 && (
                  <>
                    <button className="gallery-nav gallery-nav-prev" onClick={() => navigateImage(-1)} aria-label="Previous image">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="gallery-nav gallery-nav-next" onClick={() => navigateImage(1)} aria-label="Next image">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                {currentImage?.caption && (
                  <div className="gallery-caption">{currentImage.caption}</div>
                )}
              </div>
              {service.gallery && service.gallery.length > 1 && (
                <div className="gallery-thumbnails">
                  {service.gallery.map((img, index) => (
                    <button
                      key={index}
                      className={`gallery-thumb ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={img.url} alt={img.caption} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="modal-info">
              <div className="modal-header">
                <div className="modal-icon">{getIcon(service.icon)}</div>
                <h2 className="modal-title">{service.title}</h2>
              </div>
              <p className="modal-description">
                {service.fullDescription || service.shortDescription}
              </p>
              {service.features && service.features.length > 0 && (
                <div className="modal-features">
                  <h3 className="features-title">Key Features</h3>
                  <ul className="features-list">
                    {service.features.map((feature, index) => (
                      <li key={index}>
                        <svg className="feature-check" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="modal-cta">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClose();
                    setTimeout(() => {
                      const section = document.getElementById('contact');
                      if (section) {
                        window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
                      }
                    }, 450);
                  }}
                  className="btn-primary"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Get Quote
                </a>
                <a
                  href={`https://wa.me/918320049749?text=${encodeURIComponent(`Hi! I'm interested in your ${service.title} services. Can you provide more information?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon components
const getIcon = (iconName) => {
  const icons = {
    cpu: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 3V1h2v2h2V1h2v2h2V1h2v2h1a2 2 0 012 2v1h2v2h-2v2h2v2h-2v2h2v2h-2v1a2 2 0 01-2 2h-1v2h-2v-2h-2v2h-2v-2H9v2H7v-2H6a2 2 0 01-2-2v-1H2v-2h2v-2H2v-2h2V9H2V7h2V6a2 2 0 012-2h1V2h2v2h2zm-3 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V9a1 1 0 00-1-1H6z"/>
      </svg>
    ),
    'diagram-3': (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
      </svg>
    ),
    vision: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    ),
    layers: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    industry: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm5-10h-1.5v4.5h-2V7H12l2.5-3 2.5 3z"/>
      </svg>
    ),
    'hdd-network': (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h16v4H4V4zm1 1a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm4 7v2H8v-2h4zm-1 4v8h-2v-8h2z"/>
      </svg>
    ),
    cloud: (
      <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
      </svg>
    ),
  };

  return icons[iconName] || icons.cpu;
};

export default ServiceModal;
