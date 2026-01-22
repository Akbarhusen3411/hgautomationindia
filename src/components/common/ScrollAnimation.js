/**
 * Scroll Animation Components
 * Reusable components for scroll-triggered animations
 */

import React, { useEffect, useRef, useState } from 'react';

// Main ScrollReveal Component
export const ScrollReveal = ({
  children,
  animation = 'fade-up', // fade-up, fade-down, fade-left, fade-right, scale-up, blur-in, bounce-up, flip-in, zoom-in
  delay = 0,
  duration = 700,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold, triggerOnce]);

  const animationClass = `scroll-${animation} ${isVisible ? 'visible' : ''}`;

  return (
    <Component
      ref={ref}
      className={`${animationClass} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
};

// Staggered Children Animation
export const StaggerContainer = ({
  children,
  animation = 'fade-up',
  staggerDelay = 100,
  threshold = 0.1,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`stagger-children ${className}`} {...props}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`scroll-${animation} ${isVisible ? 'visible' : ''}`}
          style={{ transitionDelay: `${index * staggerDelay}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Parallax Component
export const Parallax = ({
  children,
  speed = 0.3,
  className = '',
  ...props
}) => {
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

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Fade on Scroll (opacity changes based on scroll position)
export const FadeOnScroll = ({
  children,
  fadeOut = false,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [opacity, setOpacity] = useState(fadeOut ? 1 : 0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;

      if (fadeOut) {
        // Fade out as element scrolls up
        const progress = Math.max(0, Math.min(1, elementCenter / windowHeight));
        setOpacity(progress);
      } else {
        // Fade in as element comes into view
        const progress = Math.max(0, Math.min(1, 1 - (rect.top / windowHeight)));
        setOpacity(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fadeOut]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity, transition: 'opacity 0.1s ease-out' }}
      {...props}
    >
      {children}
    </div>
  );
};

// Scale on Scroll
export const ScaleOnScroll = ({
  children,
  minScale = 0.9,
  maxScale = 1,
  className = '',
  ...props
}) => {
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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `scale(${scale})`,
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Text Reveal Animation
export const TextReveal = ({
  children,
  delay = 0,
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={`text-reveal ${isVisible ? 'visible' : ''} ${className}`} {...props}>
      <span>{children}</span>
    </span>
  );
};

// Counter Animation on Scroll
export const CounterOnScroll = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span ref={ref} className={`counter-scroll ${hasStarted ? 'visible' : ''} ${className}`} {...props}>
      {prefix}{count}{suffix}
    </span>
  );
};

export default ScrollReveal;
