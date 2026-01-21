<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="HG Automation - Industrial automation experts. PLC programming, SCADA systems, control panels, and Industry 4.0 solutions.">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Professional Sticky Header -->
<header class="header-main" id="site-header">
    <!-- Animated gradient background -->
    <div class="header-bg-gradient"></div>

    <!-- Glass reflection line -->
    <div class="header-glass-line"></div>

    <div class="header-container">
        <!-- Logo Section -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="header-logo-link">
            <div class="header-logo-container">
                <!-- Orbit ring with particles -->
                <div class="logo-orbit-ring">
                    <div class="logo-orbit-particle particle-1"></div>
                    <div class="logo-orbit-particle particle-2"></div>
                </div>

                <!-- Glow effect -->
                <div class="logo-glow"></div>

                <!-- Logo image -->
                <?php if (has_custom_logo()): ?>
                    <?php
                    $custom_logo_id = get_theme_mod('custom_logo');
                    $logo_url = wp_get_attachment_image_url($custom_logo_id, 'full');
                    ?>
                    <img src="<?php echo esc_url($logo_url); ?>" alt="<?php bloginfo('name'); ?>" class="logo-image">
                <?php else: ?>
                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/Logo.png" alt="<?php bloginfo('name'); ?>" class="logo-image">
                <?php endif; ?>

                <!-- Hover ring -->
                <div class="logo-hover-ring"></div>
            </div>

            <!-- Brand text -->
            <div class="header-brand">
                <h1 class="brand-title">
                    <span class="brand-hg">HG</span>
                    <span class="brand-automation">AUTOMATION</span>
                </h1>
                <p class="brand-tagline">
                    <span class="tagline-text">Precision Control</span>
                    <span class="tagline-dot"></span>
                    <span class="tagline-text">Optimized Performance</span>
                </p>
            </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="header-nav">
            <a href="#home" class="nav-item active" data-section="home">
                <span class="nav-item-bg"></span>
                <span class="nav-item-text">Home</span>
                <span class="nav-item-underline"></span>
            </a>
            <a href="#services" class="nav-item" data-section="services">
                <span class="nav-item-bg"></span>
                <span class="nav-item-text">Services</span>
                <span class="nav-item-underline"></span>
            </a>
            <a href="#about" class="nav-item" data-section="about">
                <span class="nav-item-bg"></span>
                <span class="nav-item-text">About</span>
                <span class="nav-item-underline"></span>
            </a>
            <a href="#contact" class="nav-item" data-section="contact">
                <span class="nav-item-bg"></span>
                <span class="nav-item-text">Contact</span>
                <span class="nav-item-underline"></span>
            </a>

            <!-- CTA Button -->
            <a href="#contact" class="nav-cta-btn">
                <span class="cta-bg"></span>
                <span class="cta-content">
                    <span>Get Quote</span>
                    <svg class="cta-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </span>
            </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
            <div class="menu-btn-inner">
                <span class="menu-line line-1"></span>
                <span class="menu-line line-2"></span>
                <span class="menu-line line-3"></span>
            </div>
            <div class="menu-btn-ring"></div>
        </button>
    </div>
</header>

<!-- Mobile Menu Overlay -->
<div class="mobile-menu-overlay" id="mobile-menu">
    <!-- Background -->
    <div class="mobile-menu-bg"></div>

    <!-- Decorative elements -->
    <div class="mobile-menu-decor">
        <div class="decor-circle circle-1"></div>
        <div class="decor-circle circle-2"></div>
        <div class="decor-grid"></div>
    </div>

    <!-- Menu Content -->
    <div class="mobile-menu-content">
        <!-- Navigation Items -->
        <nav class="mobile-nav">
            <a href="#home" class="mobile-nav-item active" data-section="home">
                <div class="mobile-nav-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                </div>
                <div class="mobile-nav-text">
                    <span class="mobile-nav-label">Home</span>
                    <span class="mobile-nav-desc">Back to top</span>
                </div>
                <div class="mobile-nav-arrow">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </a>
            <a href="#services" class="mobile-nav-item" data-section="services">
                <div class="mobile-nav-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <div class="mobile-nav-text">
                    <span class="mobile-nav-label">Services</span>
                    <span class="mobile-nav-desc">What we offer</span>
                </div>
                <div class="mobile-nav-arrow">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </a>
            <a href="#about" class="mobile-nav-item" data-section="about">
                <div class="mobile-nav-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div class="mobile-nav-text">
                    <span class="mobile-nav-label">About</span>
                    <span class="mobile-nav-desc">Our story</span>
                </div>
                <div class="mobile-nav-arrow">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </a>
            <a href="#contact" class="mobile-nav-item" data-section="contact">
                <div class="mobile-nav-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <div class="mobile-nav-text">
                    <span class="mobile-nav-label">Contact</span>
                    <span class="mobile-nav-desc">Get in touch</span>
                </div>
                <div class="mobile-nav-arrow">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </div>
            </a>
        </nav>

        <!-- Quick Actions -->
        <div class="mobile-quick-actions">
            <a href="tel:+918320049749" class="quick-action-btn">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>Call</span>
            </a>
            <a href="https://wa.me/918320049749" target="_blank" rel="noopener noreferrer" class="quick-action-btn whatsapp">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
            </a>
            <a href="mailto:bakarali@hgautomationindia.com" class="quick-action-btn">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>Email</span>
            </a>
        </div>

        <!-- Footer -->
        <div class="mobile-menu-footer">
            <p>&copy; 2024 HG Automation India</p>
        </div>
    </div>
</div>

<main>
