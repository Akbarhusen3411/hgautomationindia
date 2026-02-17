import React, { useState, useEffect } from 'react';

/**
 * Cookie Consent Banner Component
 * GDPR compliant cookie consent with analytics integration
 */
const CookieConsent = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('hg_cookie_consent');
    const consentDate = localStorage.getItem('hg_cookie_consent_date');

    // Check if consent has expired (6 months)
    if (consent && consentDate) {
      const sixMonthsMs = 6 * 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - new Date(consentDate).getTime() > sixMonthsMs) {
        localStorage.removeItem('hg_cookie_consent');
        localStorage.removeItem('hg_cookie_consent_date');
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    }

    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hg_cookie_consent', 'accepted');
    localStorage.setItem('hg_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);

    // Initialize analytics if accepted
    if (onAccept) onAccept();

    // Enable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('hg_cookie_consent', 'declined');
    localStorage.setItem('hg_cookie_consent_date', new Date().toISOString());
    setIsVisible(false);

    if (onDecline) onDecline();

    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`cookie-consent ${isVisible ? 'show' : ''}`}>
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h4>We Value Your Privacy</h4>
          <p>
            We use cookies to enhance your browsing experience, analyze site traffic, and
            personalize content. By clicking "Accept", you consent to our use of cookies.
            Read our <a href="mailto:bakarali@hgautomationindia.com?subject=Privacy%20Policy%20Inquiry" rel="noopener noreferrer">Privacy Policy</a> to learn more.
          </p>
        </div>
        <div className="cookie-consent-buttons">
          <button
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
          >
            Accept All
          </button>
          <button
            className="cookie-btn cookie-btn-decline"
            onClick={handleDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
