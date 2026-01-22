/**
 * Enhanced Scroll Effects Hook
 * Provides smooth scroll-triggered animations with multiple effects
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// Hook for scroll-triggered animations with various effects
export const useScrollReveal = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsVisible(true);
            setHasAnimated(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, delay, hasAnimated]);

  return [ref, isVisible];
};

// Hook for parallax scroll effect
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;
      setOffset(relativeScroll * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
};

// Hook for scroll progress within a section
export const useScrollProgress = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.max(0, rect.bottom - windowHeight);
      const visibleHeight = elementHeight - visibleTop - visibleBottom;
      const scrollProgress = Math.min(1, Math.max(0, visibleTop / (elementHeight - windowHeight)));

      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [ref, progress];
};

// Hook for scroll direction detection
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, scrollY };
};

// Hook for element scale on scroll
export const useScrollScale = (minScale = 0.8, maxScale = 1) => {
  const ref = useRef(null);
  const [scale, setScale] = useState(minScale);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = windowHeight / 2;
      const distance = Math.abs(elementCenter - windowCenter);
      const maxDistance = windowHeight / 2;
      const normalizedDistance = Math.min(1, distance / maxDistance);
      const newScale = maxScale - (normalizedDistance * (maxScale - minScale));

      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [minScale, maxScale]);

  return [ref, scale];
};

// Generate animation classes based on scroll state
export const getScrollAnimationClass = (isVisible, type = 'fadeUp', delay = 0) => {
  const baseClass = 'transition-all duration-700 ease-out';
  const delayClass = delay > 0 ? `delay-[${delay}ms]` : '';

  const animations = {
    fadeUp: isVisible
      ? `${baseClass} ${delayClass} opacity-100 translate-y-0`
      : `${baseClass} opacity-0 translate-y-10`,
    fadeDown: isVisible
      ? `${baseClass} ${delayClass} opacity-100 translate-y-0`
      : `${baseClass} opacity-0 -translate-y-10`,
    fadeLeft: isVisible
      ? `${baseClass} ${delayClass} opacity-100 translate-x-0`
      : `${baseClass} opacity-0 translate-x-10`,
    fadeRight: isVisible
      ? `${baseClass} ${delayClass} opacity-100 translate-x-0`
      : `${baseClass} opacity-0 -translate-x-10`,
    scaleUp: isVisible
      ? `${baseClass} ${delayClass} opacity-100 scale-100`
      : `${baseClass} opacity-0 scale-90`,
    blur: isVisible
      ? `${baseClass} ${delayClass} opacity-100 blur-0`
      : `${baseClass} opacity-0 blur-sm`,
  };

  return animations[type] || animations.fadeUp;
};

export default useScrollReveal;
