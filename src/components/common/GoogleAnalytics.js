import { useEffect } from 'react';

/**
 * Google Analytics Component
 * Initializes GA4 tracking with consent management
 */
const GoogleAnalytics = ({ measurementId }) => {
  useEffect(() => {
    if (!measurementId) {
      console.warn('Google Analytics: No measurement ID provided');
      return;
    }

    // Check if user has given consent
    const consent = localStorage.getItem('hg_cookie_consent');

    // Load Google Analytics script
    const loadGA = () => {
      // Check if already loaded
      if (window.gtag) return;

      // Create script element
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());

      // Configure with consent mode
      window.gtag('consent', 'default', {
        'analytics_storage': consent === 'accepted' ? 'granted' : 'denied',
        'ad_storage': 'denied'
      });

      window.gtag('config', measurementId, {
        send_page_view: consent === 'accepted',
        anonymize_ip: true
      });
    };

    loadGA();

    // Track page views on route changes (for SPA)
    const trackPageView = () => {
      if (window.gtag && consent === 'accepted') {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname
        });
      }
    };

    // Listen for route changes
    window.addEventListener('popstate', trackPageView);

    return () => {
      window.removeEventListener('popstate', trackPageView);
    };
  }, [measurementId]);

  return null;
};

/**
 * Track custom events
 * @param {string} eventName - Name of the event
 * @param {object} parameters - Event parameters
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (window.gtag && localStorage.getItem('hg_cookie_consent') === 'accepted') {
    window.gtag('event', eventName, parameters);
  }
};

/**
 * Track contact form submission
 */
export const trackContactFormSubmission = (formData) => {
  trackEvent('contact_form_submission', {
    event_category: 'engagement',
    event_label: formData.subject || 'Contact Form',
    value: 1
  });
};

/**
 * Track service card click
 */
export const trackServiceClick = (serviceName) => {
  trackEvent('service_click', {
    event_category: 'engagement',
    event_label: serviceName
  });
};

/**
 * Track WhatsApp button click
 */
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Button'
  });
};

export default GoogleAnalytics;
