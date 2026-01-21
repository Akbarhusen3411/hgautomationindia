/**
 * HG Automation Theme JavaScript
 * Handles navigation, animations, and contact form
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('site-header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const contactForm = document.getElementById('contact-form');

    /**
     * Header scroll effect
     */
    function handleScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveSection();
    }

    /**
     * Update active navigation link based on scroll position
     */
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update desktop nav
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });

                // Update mobile nav
                document.querySelectorAll('.mobile-nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /**
     * Smooth scroll to section
     */
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Mobile menu toggle
     */
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded',
            mobileMenuToggle.classList.contains('active').toString()
        );

        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /**
     * Handle navigation link click
     */
    function handleNavClick(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section') || this.getAttribute('href').replace('#', '');
        scrollToSection(sectionId);
        closeMobileMenu();
    }

    /**
     * Handle contact form submission
     */
    function handleContactForm(e) {
        e.preventDefault();

        const formMessage = document.getElementById('form-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const btnIcon = submitBtn.querySelector('.btn-icon');

        // Clear previous errors
        document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
        document.querySelectorAll('.input-field').forEach(el => el.classList.remove('error'));
        formMessage.innerHTML = '';

        // Get form data
        const formData = new FormData(contactForm);
        formData.append('action', 'hg_contact_form');
        formData.append('nonce', typeof hgAutomation !== 'undefined' ? hgAutomation.nonce : '');

        // Client-side validation
        let hasErrors = false;
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!name || !name.trim()) {
            showFieldError('name', 'Name is required');
            hasErrors = true;
        }

        if (!email || !email.trim()) {
            showFieldError('email', 'Email is required');
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFieldError('email', 'Please enter a valid email');
            hasErrors = true;
        }

        if (!subject || !subject.trim()) {
            showFieldError('subject', 'Subject is required');
            hasErrors = true;
        }

        if (!message || !message.trim()) {
            showFieldError('message', 'Message is required');
            hasErrors = true;
        } else if (message.length < 20) {
            showFieldError('message', 'Message must be at least 20 characters');
            hasErrors = true;
        }

        if (hasErrors) return;

        // Show loading state
        btnText.style.display = 'none';
        btnIcon.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        // Send AJAX request
        const ajaxUrl = typeof hgAutomation !== 'undefined' ? hgAutomation.ajaxUrl : '/wp-admin/admin-ajax.php';

        fetch(ajaxUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.innerHTML = `
                    <div class="form-message success">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <p>${data.data.message}</p>
                    </div>
                `;
                contactForm.reset();
            } else {
                if (data.data && data.data.errors) {
                    Object.keys(data.data.errors).forEach(field => {
                        showFieldError(field, data.data.errors[field]);
                    });
                } else {
                    formMessage.innerHTML = `
                        <div class="form-message error">
                            <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                            </svg>
                            <p>${data.data.message || 'Something went wrong. Please try again.'}</p>
                        </div>
                    `;
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            formMessage.innerHTML = `
                <div class="form-message error">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    <p>Network error. Please check your connection and try again.</p>
                </div>
            `;
        })
        .finally(() => {
            // Reset button state
            btnText.style.display = '';
            btnIcon.style.display = '';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        });
    }

    /**
     * Show field error
     */
    function showFieldError(field, message) {
        const errorEl = document.getElementById(`error-${field}`);
        const inputEl = document.getElementById(`contact-${field}`);

        if (errorEl) {
            errorEl.textContent = message;
        }

        if (inputEl) {
            inputEl.classList.add('error');
        }
    }

    /**
     * Intersection Observer for animations
     */
    function setupAnimations() {
        const animatedElements = document.querySelectorAll('.service-card, .about-visual, .about-content, .contact-info, .contact-form-wrapper');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    /**
     * Initialize
     */
    function init() {
        // Scroll handler
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu when clicking overlay
        if (mobileMenu) {
            const overlay = mobileMenu.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.addEventListener('click', closeMobileMenu);
            }
        }

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });

        // Scroll indicator and other anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const sectionId = href.replace('#', '');
                    scrollToSection(sectionId);
                    closeMobileMenu();
                }
            });
        });

        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }

        // Setup animations
        setupAnimations();

        // Clear input errors on focus
        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
                const errorEl = document.getElementById(`error-${this.name}`);
                if (errorEl) {
                    errorEl.textContent = '';
                }
            });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

/**
 * Service Modal Functions
 * Handles the service gallery modal popup
 */
var currentService = null;
var currentImageIndex = 0;

// Service icons SVG
var serviceIcons = {
    'cpu': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3V1h2v2h2V1h2v2h2V1h2v2h1a2 2 0 012 2v1h2v2h-2v2h2v2h-2v2h2v2h-2v1a2 2 0 01-2 2h-1v2h-2v-2h-2v2h-2v-2H9v2H7v-2H6a2 2 0 01-2-2v-1H2v-2h2v-2H2v-2h2V9H2V7h2V6a2 2 0 012-2h1V2h2v2h2zm-3 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V9a1 1 0 00-1-1H6z"/></svg>',
    'diagram': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>',
    'vision': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',
    'layers': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    'industry': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm5-10h-1.5v4.5h-2V7H12l2.5-3 2.5 3z"/></svg>',
    'network': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M4 2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h16v4H4V4zm1 1a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm4 7v2H8v-2h4zm-1 4v8h-2v-8h2z"/></svg>',
    'cloud': '<svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>'
};

function openServiceModal(serviceId) {
    if (typeof servicesData === 'undefined') return;

    currentService = servicesData.find(function(s) { return s.id === serviceId; });
    if (!currentService) return;

    currentImageIndex = 0;

    // Set modal content
    document.getElementById('modal-title').textContent = currentService.title;
    document.getElementById('modal-description').textContent = currentService.full_description || currentService.description;
    document.getElementById('modal-icon').innerHTML = serviceIcons[currentService.icon] || serviceIcons['cpu'];

    // Set main image
    updateMainImage();

    // Build thumbnails
    var thumbnailsContainer = document.getElementById('modal-thumbnails');
    thumbnailsContainer.innerHTML = '';

    if (currentService.gallery && currentService.gallery.length > 0) {
        currentService.gallery.forEach(function(img, index) {
            var thumb = document.createElement('div');
            thumb.className = 'gallery-thumb' + (index === 0 ? ' active' : '');
            thumb.innerHTML = '<img src="' + img.url + '" alt="' + img.caption + '">';
            thumb.onclick = function() { setImage(index); };
            thumbnailsContainer.appendChild(thumb);
        });
    }

    // Build features list
    var featuresContainer = document.getElementById('modal-features');
    featuresContainer.innerHTML = '';

    if (currentService.features && currentService.features.length > 0) {
        currentService.features.forEach(function(feature) {
            var li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
    }

    // Update WhatsApp link
    var whatsappBtn = document.getElementById('modal-whatsapp');
    if (whatsappBtn) {
        var message = encodeURIComponent("Hi! I'm interested in your " + currentService.title + " services. Can you provide more information?");
        whatsappBtn.href = 'https://wa.me/918320049749?text=' + message;
    }

    // Show modal
    document.getElementById('service-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
    document.getElementById('service-modal').classList.remove('active');
    document.body.style.overflow = '';
    currentService = null;
}

function updateMainImage() {
    if (!currentService || !currentService.gallery) return;

    var gallery = currentService.gallery;
    var mainImg = document.getElementById('modal-main-image');
    var caption = document.getElementById('modal-image-caption');

    if (gallery[currentImageIndex]) {
        mainImg.src = gallery[currentImageIndex].url;
        mainImg.alt = gallery[currentImageIndex].caption;
        caption.textContent = gallery[currentImageIndex].caption;
    }

    // Update active thumbnail
    var thumbs = document.querySelectorAll('.gallery-thumb');
    thumbs.forEach(function(thumb, index) {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function changeImage(direction) {
    if (!currentService || !currentService.gallery) return;

    var totalImages = currentService.gallery.length;
    currentImageIndex = (currentImageIndex + direction + totalImages) % totalImages;
    updateMainImage();
}

function setImage(index) {
    currentImageIndex = index;
    updateMainImage();
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeServiceModal();
    }
});

// Close modal when clicking outside content
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('service-modal-overlay')) {
        closeServiceModal();
    }
});
