</main>

<!-- Footer -->
<footer class="site-footer">
    <div class="footer-content">
        <div class="container">
            <div class="footer-grid">
                <!-- Company Info -->
                <div class="footer-company">
                    <?php if (has_custom_logo()): ?>
                        <?php the_custom_logo(); ?>
                    <?php else: ?>
                        <div class="logo-svg-fallback footer-svg-logo">
                            <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#1e293b"/>
                                        <stop offset="100%" style="stop-color:#0f172a"/>
                                    </linearGradient>
                                </defs>
                                <path d="M30 5L52.5 17.5V42.5L30 55L7.5 42.5V17.5L30 5Z" fill="url(#footerLogoGrad)" stroke="#2da0d4" stroke-width="2"/>
                                <text x="30" y="36" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="Arial, sans-serif">HG</text>
                            </svg>
                        </div>
                    <?php endif; ?>
                    <p>Leading provider of industrial automation solutions. Transforming manufacturing with innovative PLC programming and SCADA systems.</p>
                    <div class="social-links">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Twitter">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
                            <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="footer-links">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                <!-- Services -->
                <div class="footer-links">
                    <h5>Our Services</h5>
                    <ul>
                        <li><a href="#services">Industrial Automation</a></li>
                        <li><a href="#services">Control Panels</a></li>
                        <li><a href="#services">Machine Vision Solutions</a></li>
                        <li><a href="#services">Industry 4.0 & 5.0</a></li>
                    </ul>
                </div>

                <!-- Contact Info -->
                <div class="footer-contact">
                    <h5>Contact Us</h5>
                    <ul>
                        <li class="name">Bakarali Momin</li>
                        <li>Founder & Proprietor</li>
                        <li style="padding-top: 0.5rem;">
                            <a href="tel:+918320049749">+91 83200 49749</a>
                        </li>
                        <li>
                            <a href="mailto:bakarali@hgautomationindia.com">bakarali@hgautomationindia.com</a>
                        </li>
                        <li>
                            <a href="https://www.hgautomationindia.com" target="_blank" rel="noopener noreferrer">www.hgautomationindia.com</a>
                        </li>
                        <li style="padding-top: 0.5rem;">
                            Building No. 70, Mominvad<br>
                            Vaso, Kheda, Gujarat 387710
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
        <div class="container">
            <p>&copy; <?php echo date('Y'); ?> HG Automation India. All rights reserved.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
