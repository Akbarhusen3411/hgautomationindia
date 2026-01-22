/**
 * Testimonials Section Component
 * Displays client testimonials with smooth carousel animation
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.2 });
  const carouselRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Patel',
      role: 'Plant Manager',
      company: 'Gujarat Chemicals Ltd.',
      content: 'HG Automation transformed our manufacturing process with their PLC programming expertise. We saw a 40% increase in production efficiency within the first quarter. Their team\'s dedication and technical knowledge is exceptional.',
      rating: 5,
      image: null,
    },
    {
      id: 2,
      name: 'Amit Shah',
      role: 'Operations Director',
      company: 'Pharma Industries',
      content: 'The SCADA system implemented by HG Automation gave us complete visibility into our operations. Real-time monitoring and analytics have been game-changers for our quality control processes.',
      rating: 5,
      image: null,
    },
    {
      id: 3,
      name: 'Priya Mehta',
      role: 'Technical Head',
      company: 'AutoParts Manufacturing',
      content: 'We partnered with HG Automation for our Industry 4.0 upgrade. Their expertise in IoT integration and predictive maintenance has significantly reduced our downtime. Highly recommended!',
      rating: 5,
      image: null,
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Factory Owner',
      company: 'Singh Textiles',
      content: 'The control panel design and installation by HG Automation exceeded our expectations. Professional service, timely delivery, and excellent after-sales support. A trusted partner for automation needs.',
      rating: 5,
      image: null,
    },
    {
      id: 5,
      name: 'Sneha Desai',
      role: 'Production Manager',
      company: 'Food Processing Co.',
      content: 'HG Automation\'s machine vision solution for quality inspection has eliminated manual errors and improved our product consistency by 95%. Their team understands industrial challenges perfectly.',
      rating: 5,
      image: null,
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible, testimonials.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [testimonials.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [testimonials.length]);

  // Get visible testimonials for carousel (show 3 on desktop)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  const StarIcon = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const QuoteIcon = () => (
    <svg className="w-12 h-12 text-accent/20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-slate-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-industrial-pattern opacity-10" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Floating Particles */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-accent/40 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-white/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 border border-accent/30 rounded-full animate-pulse hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm text-accent rounded-full text-sm font-semibold mb-4">
            Client Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              Clients Say
            </span>
          </h2>
          <div className={`w-20 h-1 bg-gradient-to-r from-accent to-cyan-400 mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Trusted by leading manufacturers across Gujarat for reliable automation solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative px-8 md:px-16" ref={carouselRef}>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="carousel-arrow carousel-arrow-left"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="carousel-arrow carousel-arrow-right"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div className="flex justify-center items-stretch gap-6 transition-all duration-500">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <div
                  key={`${testimonial.id}-${idx}`}
                  className={`testimonial-card flex-shrink-0 w-full md:w-[400px] transition-all duration-500 ${
                    testimonial.position === 0
                      ? 'opacity-100 scale-100 z-10'
                      : 'opacity-40 scale-95 hidden md:block'
                  }`}
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4">
                    <QuoteIcon />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} filled={i < testimonial.rating} />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-steel-600 leading-relaxed mb-6 text-base">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-4 border-t border-steel-100">
                      <div className="testimonial-avatar">
                        {testimonial.image ? (
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          testimonial.name.split(' ').map(n => n[0]).join('')
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-dark">{testimonial.name}</h4>
                        <p className="text-steel-500 text-sm">{testimonial.role}</p>
                        <p className="text-accent text-sm font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="carousel-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: '100+', label: 'Happy Clients' },
            { value: '500+', label: 'Projects Completed' },
            { value: '50+', label: 'Industries Served' },
            { value: '10+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
