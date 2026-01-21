<?php
/**
 * Front Page Template
 *
 * @package HG_Automation
 */

get_header();
?>

<!-- Hero Section -->
<section id="home" class="hero-section">
    <!-- Background Pattern -->
    <div class="hero-bg-pattern bg-industrial-pattern"></div>

    <!-- Animated Background Blobs -->
    <div class="hero-bg-blobs">
        <div class="hero-blob hero-blob-1"></div>
        <div class="hero-blob hero-blob-2"></div>
    </div>

    <div class="hero-content container">
        <div class="hero-grid">
            <!-- Text Content -->
            <div class="hero-text">
                <div class="hero-badge">
                    <div class="dot"></div>
                    <span>Industrial Automation Experts</span>
                </div>

                <h1 class="hero-title">
                    Powering Industry<br>
                    <span class="text-gradient">with Smart</span><br>
                    Automation
                </h1>

                <p class="hero-description">
                    We design, program, and integrate industrial automation systems that
                    optimize your manufacturing processes with precision and reliability.
                </p>

                <div class="hero-buttons">
                    <a href="#services" class="btn-primary">
                        Explore Services
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                    <a href="#contact" class="btn-outline">
                        Get a Quote
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                    </a>
                </div>

                <!-- Stats -->
                <div class="hero-stats">
                    <div class="hero-stat">
                        <div class="value">10+</div>
                        <div class="label">Years Experience</div>
                    </div>
                    <div class="hero-stat">
                        <div class="value">500+</div>
                        <div class="label">Projects Done</div>
                    </div>
                    <div class="hero-stat">
                        <div class="value">24/7</div>
                        <div class="label">Support</div>
                    </div>
                </div>
            </div>

            <!-- Logo Animation Area -->
            <div class="hero-logo-area">
                <div class="hero-logo-container">
                    <!-- Breathing rings -->
                    <div class="hero-logo-rings"></div>
                    <div class="hero-logo-rings"></div>
                    <div class="hero-logo-rings"></div>

                    <!-- Glow effect -->
                    <div class="hero-logo-glow"></div>

                    <!-- Logo wrapper -->
                    <div class="hero-logo-wrapper">
                        <?php if (has_custom_logo()): ?>
                            <?php
                            $custom_logo_id = get_theme_mod('custom_logo');
                            $logo_url = wp_get_attachment_image_url($custom_logo_id, 'full');
                            ?>
                            <img src="<?php echo esc_url($logo_url); ?>" alt="<?php bloginfo('name'); ?>">
                        <?php else: ?>
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/Logo.png" alt="<?php bloginfo('name'); ?>">
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scroll Indicator -->
    <a href="#services" class="scroll-indicator">
        <span>Scroll</span>
        <div class="scroll-mouse">
            <div class="scroll-dot"></div>
        </div>
    </a>
</section>

<!-- Services Section -->
<section id="services" class="services-section">
    <!-- Gradient Background -->
    <div class="services-gradient-bg"></div>

    <!-- Decorative Orbs -->
    <div class="services-decor-orb orb-1"></div>
    <div class="services-decor-orb orb-2"></div>
    <div class="services-decor-orb orb-3"></div>

    <!-- Floating Shapes -->
    <div class="services-floating-shape shape-1"></div>
    <div class="services-floating-shape shape-2"></div>

    <!-- Additional Floating Bubbles -->
    <div class="services-bubble bubble-1"></div>
    <div class="services-bubble bubble-2"></div>
    <div class="services-bubble bubble-3"></div>
    <div class="services-bubble bubble-4"></div>
    <div class="services-bubble bubble-5"></div>
    <div class="services-bubble bubble-6"></div>
    <div class="services-bubble bubble-7"></div>
    <div class="services-bubble bubble-8"></div>
    <div class="services-bubble bubble-9"></div>
    <div class="services-bubble bubble-10"></div>
    <div class="services-bubble bubble-11"></div>
    <div class="services-bubble bubble-12"></div>

    <!-- Grid Lines -->
    <div class="services-grid-line line-1"></div>
    <div class="services-grid-line line-2"></div>

    <div class="container">
        <!-- Section Header -->
        <div class="section-header">
            <span class="section-badge">What We Offer</span>
            <h2 class="section-title">Our <span class="gradient-text">Services</span></h2>
            <div class="section-divider gradient-divider"></div>
            <p class="section-subtitle">
                Comprehensive industrial automation solutions tailored to optimize your
                manufacturing processes and maximize operational efficiency.
            </p>
        </div>

        <!-- Services Grid - Horizontal scroll on mobile -->
        <div class="services-scroll-container">
            <div class="services-scroll-wrapper">
                <?php
                $services = hg_get_services();
                foreach ($services as $index => $service):
                ?>
                <div class="service-scroll-item">
                    <div class="service-card" style="animation-delay: <?php echo $index * 100; ?>ms;" onclick="openServiceModal(<?php echo $service['id']; ?>)" data-service-id="<?php echo $service['id']; ?>">
                        <div class="service-card-image">
                            <img src="<?php echo esc_url($service['image']); ?>" alt="<?php echo esc_attr($service['title']); ?>">
                            <div class="service-card-icon">
                                <?php echo hg_get_service_icon($service['icon']); ?>
                            </div>
                            <div class="service-card-overlay">
                                <span class="view-details">View Details</span>
                            </div>
                        </div>
                        <div class="service-card-content">
                            <h3 class="service-card-title"><?php echo esc_html($service['title']); ?></h3>
                            <p class="service-card-description"><?php echo esc_html($service['description']); ?></p>
                            <span class="service-card-link">
                                View Gallery
                                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <!-- Scroll indicator for mobile -->
            <div class="scroll-indicator">
                <span>Swipe to explore</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </div>
        </div>

        <!-- Service Modal -->
        <div id="service-modal" class="service-modal">
            <div class="service-modal-overlay" onclick="closeServiceModal()"></div>
            <div class="service-modal-content">
                <button class="service-modal-close" onclick="closeServiceModal()">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div class="service-modal-body">
                    <!-- Gallery Section -->
                    <div class="service-modal-gallery">
                        <div class="gallery-main">
                            <img id="modal-main-image" src="" alt="">
                            <div class="gallery-caption" id="modal-image-caption"></div>
                            <button class="gallery-nav gallery-prev" onclick="changeImage(-1)">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                            <button class="gallery-nav gallery-next" onclick="changeImage(1)">
                                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="gallery-thumbnails" id="modal-thumbnails"></div>
                    </div>

                    <!-- Info Section -->
                    <div class="service-modal-info">
                        <div class="service-modal-header">
                            <div class="service-modal-icon" id="modal-icon"></div>
                            <h2 id="modal-title"></h2>
                        </div>
                        <p class="service-modal-description" id="modal-description"></p>

                        <div class="service-modal-features">
                            <h4>Key Features</h4>
                            <ul id="modal-features"></ul>
                        </div>

                        <div class="service-modal-cta">
                            <a href="#contact" class="btn-primary" onclick="closeServiceModal()">
                                Get a Quote
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </a>
                            <a href="https://wa.me/918320049749?text=Hi! I'm interested in your <?php echo urlencode(''); ?> services." class="btn-whatsapp" id="modal-whatsapp">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Services Data for JavaScript -->
        <script>
        var servicesData = <?php echo json_encode($services); ?>;
        </script>

        <!-- CTA -->
        <div class="services-cta">
            <p>Need a custom automation solution?</p>
            <a href="#contact" class="btn-primary">
                Discuss Your Project
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
            </a>
        </div>
    </div>
</section>

<!-- About Section -->
<section id="about" class="about-section">
    <!-- Gradient Background -->
    <div class="about-gradient-bg"></div>

    <!-- Mesh Gradient Overlay -->
    <div class="about-mesh-gradient"></div>

    <!-- Decorative Orbs -->
    <div class="about-decor-orb orb-1"></div>
    <div class="about-decor-orb orb-2"></div>

    <!-- Floating Elements -->
    <div class="about-floating-dot dot-1"></div>
    <div class="about-floating-dot dot-2"></div>
    <div class="about-floating-dot dot-3"></div>

    <!-- Grid Lines -->
    <div class="about-grid-line line-1"></div>
    <div class="about-grid-line line-2"></div>

    <div class="container">
        <div class="about-grid">
            <!-- Visual Column -->
            <div class="about-visual">
                <!-- Outer Glow Container -->
                <div class="about-visual-glow"></div>

                <div class="about-logo-box">
                    <!-- Corner Accents -->
                    <div class="about-corner-accent corner-tl"></div>
                    <div class="about-corner-accent corner-br"></div>

                    <!-- Decorative circles -->
                    <div class="about-decor-circle about-decor-circle-1"></div>
                    <div class="about-decor-circle about-decor-circle-2"></div>

                    <!-- Animated Gradient Overlay -->
                    <div class="about-logo-gradient-overlay"></div>

                    <div class="about-logo-wrapper">
                        <div class="about-logo-glow"></div>
                        <?php if (has_custom_logo()): ?>
                            <?php
                            $custom_logo_id = get_theme_mod('custom_logo');
                            $logo_url = wp_get_attachment_image_url($custom_logo_id, 'full');
                            ?>
                            <img src="<?php echo esc_url($logo_url); ?>" alt="<?php bloginfo('name'); ?>">
                        <?php else: ?>
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/Logo.png" alt="<?php bloginfo('name'); ?>">
                        <?php endif; ?>
                    </div>
                </div>

                <!-- Experience Badge with Gradient -->
                <div class="about-experience-badge">
                    <span class="value">10+</span>
                    <span class="label">Years Experience</span>
                </div>
            </div>

            <!-- Content Column -->
            <div class="about-content">
                <span class="about-badge">About Us</span>
                <h2>Engineering Excellence in <span class="gradient-text">Industrial Automation</span></h2>

                <p>
                    HG Automation has been at the forefront of industrial automation since 2024.
                    We partner with manufacturers across diverse industries to design, implement,
                    and maintain automation systems that drive productivity and reduce operational costs.
                </p>

                <p>
                    Our team of certified control systems engineers brings deep expertise in PLC
                    programming, SCADA development, and control panel design. We pride ourselves on
                    delivering solutions that are not just technically excellent, but also practical,
                    maintainable, and scalable.
                </p>

                <!-- Feature list -->
                <ul class="about-features">
                    <li>
                        <span class="check-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                        <span>Certified engineers with 10+ years of experience</span>
                    </li>
                    <li>
                        <span class="check-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                        <span>UL508A certified panel shop</span>
                    </li>
                    <li>
                        <span class="check-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                        <span>24/7 emergency support services</span>
                    </li>
                    <li>
                        <span class="check-icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                        <span>Projects completed across 50+ industries</span>
                    </li>
                </ul>

                <!-- Stats row -->
                <div class="about-stats">
                    <div class="about-stat">
                        <div class="value">500+</div>
                        <div class="label">Projects Delivered</div>
                    </div>
                    <div class="about-stat">
                        <div class="value">98%</div>
                        <div class="label">Client Satisfaction</div>
                    </div>
                    <div class="about-stat">
                        <div class="value">50+</div>
                        <div class="label">Industries Served</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section id="contact" class="contact-section">
    <div class="container">
        <!-- Section Header -->
        <div class="section-header">
            <h2 class="section-title">Get In Touch</h2>
            <div class="section-divider"></div>
            <p class="section-subtitle">
                Ready to optimize your manufacturing processes? Contact us for a free
                consultation and discover how our automation solutions can transform your operations.
            </p>
        </div>

        <div class="contact-grid">
            <!-- Contact Info -->
            <div class="contact-info">
                <div class="contact-info-item">
                    <div class="contact-info-icon">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="contact-info-label">Contact Person</span>
                        <span class="contact-info-value">Bakarali Momin<br>Founder & Proprietor</span>
                    </div>
                </div>

                <div class="contact-info-item">
                    <div class="contact-info-icon">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="contact-info-label">Phone</span>
                        <span class="contact-info-value"><a href="tel:+918320049749">+91 83200 49749</a></span>
                    </div>
                </div>

                <div class="contact-info-item">
                    <div class="contact-info-icon">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="contact-info-label">Email</span>
                        <span class="contact-info-value"><a href="mailto:bakarali@hgautomationindia.com">bakarali@hgautomationindia.com</a></span>
                    </div>
                </div>

                <div class="contact-info-item">
                    <div class="contact-info-icon">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="contact-info-label">Website</span>
                        <span class="contact-info-value"><a href="https://www.hgautomationindia.com" target="_blank" rel="noopener noreferrer">www.hgautomationindia.com</a></span>
                    </div>
                </div>

                <div class="contact-info-item">
                    <div class="contact-info-icon">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div>
                        <span class="contact-info-label">Address</span>
                        <span class="contact-info-value">Building No. 70, Mominvad<br>Vaso, Kheda, Gujarat 387710</span>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="contact-form-wrapper">
                <h3>
                    <svg width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" style="position: absolute; left: 12px;">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <span style="margin-left: 60px;">Send Us a Message</span>
                </h3>
                <p style="color: #64748b; font-size: 14px; margin-top: -20px; margin-bottom: 25px;">We'll get back to you within 24 hours</p>

                <div id="form-message"></div>

                <form id="contact-form" class="form-grid">
                    <?php wp_nonce_field('hg_automation_nonce', 'contact_nonce'); ?>

                    <div class="form-group">
                        <label for="contact-name">Full Name <span class="required">*</span></label>
                        <svg class="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <input type="text" id="contact-name" name="name" class="input-field" placeholder="John Doe" required>
                        <span class="field-error" id="error-name"></span>
                    </div>

                    <div class="form-group">
                        <label for="contact-email">Email Address <span class="required">*</span></label>
                        <svg class="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <input type="email" id="contact-email" name="email" class="input-field" placeholder="john@company.com" required>
                        <span class="field-error" id="error-email"></span>
                    </div>

                    <div class="form-group">
                        <label for="contact-phone">Phone Number</label>
                        <svg class="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <input type="tel" id="contact-phone" name="phone" class="input-field" placeholder="+91 98765 43210">
                    </div>

                    <div class="form-group">
                        <label for="contact-company">Company Name</label>
                        <svg class="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <input type="text" id="contact-company" name="company" class="input-field" placeholder="Your Company Ltd.">
                    </div>

                    <div class="form-group full-width">
                        <label for="contact-subject">Subject <span class="required">*</span></label>
                        <svg class="form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                        <input type="text" id="contact-subject" name="subject" class="input-field" placeholder="How can we help you?" required>
                        <span class="field-error" id="error-subject"></span>
                    </div>

                    <div class="form-group full-width">
                        <label for="contact-message">Message <span class="required">*</span></label>
                        <svg class="form-icon" style="top: 46px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h7"></path>
                        </svg>
                        <textarea id="contact-message" name="message" class="input-field" rows="5" placeholder="Tell us about your project requirements, automation needs, or any questions you have..." required></textarea>
                        <span class="field-error" id="error-message"></span>
                    </div>

                    <div class="form-group full-width">
                        <button type="submit">
                            <span class="btn-text">Send Message</span>
                            <span class="btn-loading" style="display: none;">
                                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="31.4" stroke-linecap="round">
                                        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                                    </circle>
                                </svg>
                                Sending...
                            </span>
                            <svg class="btn-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<?php get_footer(); ?>

<?php
/**
 * Helper function to get service icon SVG
 */
function hg_get_service_icon($icon) {
    $icons = array(
        'cpu' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3V1h2v2h2V1h2v2h2V1h2v2h1a2 2 0 012 2v1h2v2h-2v2h2v2h-2v2h2v2h-2v1a2 2 0 01-2 2h-1v2h-2v-2h-2v2h-2v-2H9v2H7v-2H6a2 2 0 01-2-2v-1H2v-2h2v-2H2v-2h2V9H2V7h2V6a2 2 0 012-2h1V2h2v2h2zm-3 5a1 1 0 00-1 1v6a1 1 0 001 1h6a1 1 0 001-1V9a1 1 0 00-1-1H6z"/></svg>',
        'diagram' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>',
        'vision' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',
        'layers' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
        'industry' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H8v-2h2V9h2v2h2v2h-2v4zm5-10h-1.5v4.5h-2V7H12l2.5-3 2.5 3z"/></svg>',
        'network' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M4 2a2 2 0 00-2 2v4a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h16v4H4V4zm1 1a1 1 0 100 2 1 1 0 000-2zm3 0a1 1 0 100 2 1 1 0 000-2zm4 7v2H8v-2h4zm-1 4v8h-2v-8h2z"/></svg>',
        'cloud' => '<svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/></svg>',
    );

    return isset($icons[$icon]) ? $icons[$icon] : $icons['cpu'];
}
?>
