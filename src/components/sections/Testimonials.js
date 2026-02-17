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
      name: 'Ansar Ali Shekh',
      role: 'Director',
      company: 'IK Controls Private Limited',
      content: 'HG Automation delivered outstanding PLC programming and control panel solutions for our facility. Their technical expertise and commitment to quality helped us achieve seamless automation across our production lines. Truly a reliable partner for industrial automation.',
      rating: 5,
      image: null,
    },
    {
      id: 2,
      name: 'Bharghav Patel',
      role: 'Director',
      company: 'Venus Automation',
      content: 'Working with HG Automation has been an excellent experience. Their team understood our requirements perfectly and delivered a robust automation system on time. The after-sales support and technical guidance they provide is unmatched in the industry.',
      rating: 5,
      image: null,
    },
    {
      id: 3,
      name: 'Mahedi Ali Momin',
      role: 'Founder',
      company: 'SPLENDENT AUTOMATION',
      content: 'HG Automation\'s expertise in SCADA systems and industrial control solutions is exceptional. They transformed our operations with real-time monitoring and efficient automation, significantly improving our productivity and reducing downtime.',
      rating: 5,
      image: null,
    },
    {
      id: 4,
      name: 'Chirag Patel',
      role: 'Proprietor',
      company: 'CS Techno Engineers',
      content: 'We have been consistently impressed with HG Automation\'s professional approach and deep knowledge of industrial automation. Their control panel designs and PLC solutions are top-notch, and they always deliver beyond expectations.',
      rating: 5,
      image: null,
    },
    {
      id: 5,
      name: 'Rakesh Sharma',
      role: 'Plant Manager',
      company: 'Shree Industries',
      content: 'HG Automation upgraded our entire production line with advanced VFD and PLC-based automation. The energy savings alone justified the investment within months. Their team is highly skilled and always available for support when needed.',
      rating: 5,
      image: null,
    },
    {
      id: 6,
      name: 'Nikunj Desai',
      role: 'Technical Director',
      company: 'Apex Control Systems',
      content: 'From initial consultation to final commissioning, HG Automation handled our project with complete professionalism. Their expertise in HMI programming and panel wiring is remarkable. We look forward to continuing this partnership on future projects.',
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
      className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50"
    >
      {/* Top divider: About(dark) → Testimonials(light) */}
      <div className="section-divider-top dark-to-light" />
      <div className="section-glow-top" />
      {/* Bottom divider: Testimonials(light) → Contact(dark) */}
      <div className="section-divider-bottom light-to-dark" />
      <div className="section-glow-bottom" />

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/6 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Floating Particles */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-accent/30 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-slate-400/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-4 h-4 border border-accent/30 rounded-full animate-pulse hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 bg-accent/10 backdrop-blur-sm text-accent rounded-full text-sm font-semibold mb-4 border border-accent/20">
            Client Success Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            What Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
              Clients Say
            </span>
          </h2>
          <div className={`w-20 h-1 bg-gradient-to-r from-accent to-cyan-400 mx-auto mb-6 rounded-full transition-all duration-700 delay-200 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Trusted by leading manufacturers across Gujarat for reliable automation solutions.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative px-2 sm:px-8 md:px-16" ref={carouselRef}>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            onKeyDown={(e) => e.key === ' ' && (e.preventDefault(), goToPrev())}
            className="carousel-arrow carousel-arrow-left"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            onKeyDown={(e) => e.key === ' ' && (e.preventDefault(), goToNext())}
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
        <div className={`mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: '100+', label: 'Happy Clients' },
            { value: '500+', label: 'Projects Completed' },
            { value: '50+', label: 'Industries Served' },
            { value: '10+', label: 'Years Experience' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">
                {stat.value}
              </div>
              <div className="text-slate-600 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
