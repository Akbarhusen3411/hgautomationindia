import { useEffect } from 'react';

/**
 * SEO Component
 * Manages document head meta tags for SEO and social sharing
 */
const SEO = ({
  title = 'HG Automation - Industrial Automation Solutions',
  description = 'HG Automation provides industrial automation solutions including PLC programming, SCADA systems, control panels, and Industry 4.0 integration in Gujarat, India.',
  keywords = 'industrial automation, PLC programming, SCADA, HMI, control panels, Industry 4.0, IoT, Gujarat, India, HG Automation',
  image = '/og-image.jpg',
  url = 'https://www.hgautomationindia.com',
  type = 'website'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'HG Automation');
    updateMetaTag('robots', 'index, follow');

    // Open Graph meta tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'HG Automation', true);
    updateMetaTag('og:locale', 'en_IN', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('geo.region', 'IN-GJ');
    updateMetaTag('geo.placename', 'Kheda, Gujarat');
    updateMetaTag('geo.position', '22.7524;72.6840');
    updateMetaTag('ICBM', '22.7524, 72.6840');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;
