/**
 * Animated Counter Hook
 * Smoothly animates numbers from 0 to target value
 */

import { useState, useEffect, useRef } from 'react';

const useAnimatedCounter = (end, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnView);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  // Parse the end value to handle strings like "500+" or "98%"
  const parseValue = (value) => {
    if (typeof value === 'number') return value;
    const numericPart = parseFloat(value.replace(/[^0-9.]/g, ''));
    return isNaN(numericPart) ? 0 : numericPart;
  };

  // Get the suffix (like "+" or "%")
  const getSuffix = (value) => {
    if (typeof value === 'number') return '';
    const match = value.match(/[^0-9.]+$/);
    return match ? match[0] : '';
  };

  const numericEnd = parseValue(end);
  const suffix = getSuffix(end);

  // Intersection Observer for viewport detection
  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [startOnView]);

  // Animation logic
  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);

      const currentCount = Math.floor(easeOutCubic * numericEnd);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, numericEnd, duration]);

  // Format the count with suffix
  const formattedCount = `${count}${suffix}`;

  return { count: formattedCount, ref, isVisible };
};

export default useAnimatedCounter;
