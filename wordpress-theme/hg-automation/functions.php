<?php
/**
 * HG Automation Theme Functions
 *
 * @package HG_Automation
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Theme Setup
 */
function hg_automation_setup() {
    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Custom logo support
    add_theme_support('custom-logo', array(
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ));

    // HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => esc_html__('Primary Menu', 'hg-automation'),
        'footer'  => esc_html__('Footer Menu', 'hg-automation'),
    ));
}
add_action('after_setup_theme', 'hg_automation_setup');

/**
 * Enqueue styles and scripts
 */
function hg_automation_scripts() {
    // Main stylesheet
    wp_enqueue_style('hg-automation-style', get_stylesheet_uri(), array(), '1.0.0');

    // Google Fonts (Segoe UI fallback)
    wp_enqueue_style('hg-automation-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null);

    // Main JavaScript
    wp_enqueue_script('hg-automation-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);

    // Localize script for AJAX
    wp_localize_script('hg-automation-main', 'hgAutomation', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('hg_automation_nonce'),
    ));
}
add_action('wp_enqueue_scripts', 'hg_automation_scripts');

/**
 * Handle Contact Form Submission via AJAX
 */
function hg_automation_contact_form() {
    // Verify nonce
    if (!wp_verify_nonce($_POST['nonce'], 'hg_automation_nonce')) {
        wp_send_json_error(array('message' => 'Security check failed.'));
    }

    // Sanitize form data
    $name    = sanitize_text_field($_POST['name']);
    $email   = sanitize_email($_POST['email']);
    $phone   = sanitize_text_field($_POST['phone']);
    $company = sanitize_text_field($_POST['company']);
    $subject = sanitize_text_field($_POST['subject']);
    $message = sanitize_textarea_field($_POST['message']);

    // Validate required fields
    $errors = array();

    if (empty($name)) {
        $errors['name'] = 'Name is required';
    }

    if (empty($email) || !is_email($email)) {
        $errors['email'] = 'Valid email is required';
    }

    if (empty($subject)) {
        $errors['subject'] = 'Subject is required';
    }

    if (empty($message) || strlen($message) < 20) {
        $errors['message'] = 'Message must be at least 20 characters';
    }

    if (!empty($errors)) {
        wp_send_json_error(array('errors' => $errors));
    }

    // Get recipient email from customizer or use default
    $to = get_theme_mod('hg_contact_recipient', 'akbarhusain.momin2000@gmail.com');
    if (empty($to)) {
        $to = get_option('admin_email');
    }

    $email_subject = 'New Contact Form: ' . $subject;
    $submitted_at = current_time('F j, Y \a\t g:i a');

    // Build HTML email body
    $email_body = hg_build_contact_email_html($name, $email, $phone, $company, $subject, $message, $submitted_at);

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'Reply-To: ' . $name . ' <' . $email . '>',
    );

    // Send email
    $sent = wp_mail($to, $email_subject, $email_body, $headers);

    if ($sent) {
        wp_send_json_success(array('message' => 'Thank you! Your message has been sent successfully. We will get back to you within 24 hours.'));
    } else {
        wp_send_json_error(array('message' => 'Failed to send message. Please try again later.'));
    }
}
add_action('wp_ajax_hg_contact_form', 'hg_automation_contact_form');
add_action('wp_ajax_nopriv_hg_contact_form', 'hg_automation_contact_form');

/**
 * Build HTML email template for contact form
 */
function hg_build_contact_email_html($name, $email, $phone, $company, $subject, $message, $submitted_at) {
    $phone_row = '';
    if (!empty($phone)) {
        $phone_row = '
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                    <a href="tel:' . esc_attr($phone) . '" style="color: #2da0d4;">' . esc_html($phone) . '</a>
                </td>
            </tr>';
    }

    $company_row = '';
    if (!empty($company)) {
        $company_row = '
            <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Company:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">' . esc_html($company) . '</td>
            </tr>';
    }

    $message_formatted = nl2br(esc_html($message));

    $html = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 20px; text-align: center;">
            <h1 style="color: #2da0d4; margin: 0;">HG Automation India</h1>
            <p style="color: #94a3b8; margin: 5px 0 0;">New Contact Form Submission</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">' . esc_html($name) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Email:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                        <a href="mailto:' . esc_attr($email) . '" style="color: #2da0d4;">' . esc_html($email) . '</a>
                    </td>
                </tr>
                ' . $phone_row . '
                ' . $company_row . '
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Subject:</strong></td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">' . esc_html($subject) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #64748b;"><strong>Submitted:</strong></td>
                    <td style="padding: 10px 0; color: #1e293b;">' . esc_html($submitted_at) . '</td>
                </tr>
            </table>

            <div style="margin-top: 20px;">
                <h3 style="color: #1e293b; margin-bottom: 10px;">Message:</h3>
                <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6;">
                    ' . $message_formatted . '
                </div>
            </div>

            <div style="margin-top: 25px; text-align: center;">
                <a href="mailto:' . esc_attr($email) . '?subject=Re: ' . rawurlencode($subject) . '"
                   style="display: inline-block; background: #2da0d4; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Reply to ' . esc_html($name) . '
                </a>
            </div>
        </div>

        <div style="background: #1e293b; padding: 15px; text-align: center;">
            <p style="color: #64748b; margin: 0; font-size: 12px;">
                This email was sent from the HG Automation India website contact form.
            </p>
        </div>
    </div>';

    return $html;
}

/**
 * Add custom image sizes
 */
function hg_automation_image_sizes() {
    add_image_size('service-card', 400, 250, true);
    add_image_size('hero-logo', 200, 200, false);
}
add_action('after_setup_theme', 'hg_automation_image_sizes');

/**
 * Customize excerpt length
 */
function hg_automation_excerpt_length($length) {
    return 20;
}
add_filter('excerpt_length', 'hg_automation_excerpt_length');

/**
 * Remove WordPress version from head
 */
remove_action('wp_head', 'wp_generator');

/**
 * Add preconnect for Google Fonts
 */
function hg_automation_resource_hints($urls, $relation_type) {
    if ('preconnect' === $relation_type) {
        $urls[] = array(
            'href' => 'https://fonts.googleapis.com',
            'crossorigin',
        );
        $urls[] = array(
            'href' => 'https://fonts.gstatic.com',
            'crossorigin',
        );
    }
    return $urls;
}
add_filter('wp_resource_hints', 'hg_automation_resource_hints', 10, 2);

/**
 * Theme Customizer additions
 */
function hg_automation_customize_register($wp_customize) {
    // Company Info Section
    $wp_customize->add_section('hg_company_info', array(
        'title'    => __('Company Information', 'hg-automation'),
        'priority' => 30,
    ));

    // Phone Number
    $wp_customize->add_setting('hg_phone', array(
        'default'           => '+91 83200 49749',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hg_phone', array(
        'label'   => __('Phone Number', 'hg-automation'),
        'section' => 'hg_company_info',
        'type'    => 'text',
    ));

    // Email
    $wp_customize->add_setting('hg_email', array(
        'default'           => 'bakarali@hgautomationindia.com',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('hg_email', array(
        'label'   => __('Email Address', 'hg-automation'),
        'section' => 'hg_company_info',
        'type'    => 'email',
    ));

    // Address
    $wp_customize->add_setting('hg_address', array(
        'default'           => "Building No. 70, Mominvad\nVaso, Kheda, Gujarat 387710",
        'sanitize_callback' => 'sanitize_textarea_field',
    ));

    $wp_customize->add_control('hg_address', array(
        'label'   => __('Address', 'hg-automation'),
        'section' => 'hg_company_info',
        'type'    => 'textarea',
    ));

    // Social Media Section
    $wp_customize->add_section('hg_social_media', array(
        'title'    => __('Social Media Links', 'hg-automation'),
        'priority' => 35,
    ));

    $social_platforms = array('linkedin', 'twitter', 'facebook');

    foreach ($social_platforms as $platform) {
        $wp_customize->add_setting('hg_' . $platform, array(
            'default'           => 'https://' . $platform . '.com',
            'sanitize_callback' => 'esc_url_raw',
        ));

        $wp_customize->add_control('hg_' . $platform, array(
            'label'   => ucfirst($platform) . ' URL',
            'section' => 'hg_social_media',
            'type'    => 'url',
        ));
    }

    // Contact Form Settings Section
    $wp_customize->add_section('hg_contact_settings', array(
        'title'    => __('Contact Form Settings', 'hg-automation'),
        'priority' => 40,
    ));

    // Contact Form Recipient Email
    $wp_customize->add_setting('hg_contact_recipient', array(
        'default'           => 'akbarhusain.momin2000@gmail.com',
        'sanitize_callback' => 'sanitize_email',
    ));

    $wp_customize->add_control('hg_contact_recipient', array(
        'label'       => __('Contact Form Recipient Email', 'hg-automation'),
        'description' => __('Email address where contact form submissions will be sent.', 'hg-automation'),
        'section'     => 'hg_contact_settings',
        'type'        => 'email',
    ));

    // WhatsApp Number
    $wp_customize->add_setting('hg_whatsapp', array(
        'default'           => '918320049749',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hg_whatsapp', array(
        'label'       => __('WhatsApp Number', 'hg-automation'),
        'description' => __('Phone number for WhatsApp button (with country code, no spaces).', 'hg-automation'),
        'section'     => 'hg_contact_settings',
        'type'        => 'text',
    ));

    // Analytics Section
    $wp_customize->add_section('hg_analytics', array(
        'title'    => __('Analytics & Tracking', 'hg-automation'),
        'priority' => 45,
    ));

    // Google Analytics ID
    $wp_customize->add_setting('hg_ga_id', array(
        'default'           => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));

    $wp_customize->add_control('hg_ga_id', array(
        'label'       => __('Google Analytics Measurement ID', 'hg-automation'),
        'description' => __('Enter your GA4 Measurement ID (e.g., G-XXXXXXXXXX)', 'hg-automation'),
        'section'     => 'hg_analytics',
        'type'        => 'text',
    ));
}
add_action('customize_register', 'hg_automation_customize_register');

/**
 * Get services data with gallery images
 */
function hg_get_services() {
    return array(
        array(
            'id'          => 1,
            'title'       => 'Industrial Automation',
            'description' => 'Complete automation solutions for manufacturing processes using PLC, HMI, and SCADA systems.',
            'full_description' => 'We provide comprehensive industrial automation solutions that transform your manufacturing processes. Our expertise includes PLC programming (Siemens, Allen Bradley, Mitsubishi), HMI development, and SCADA system integration. We help you achieve higher productivity, reduced downtime, and improved quality control.',
            'icon'        => 'cpu',
            'image'       => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop', 'caption' => 'PLC - Programmable Logic Controller'),
                array('url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'caption' => 'PLC Control Panel Wiring'),
                array('url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'caption' => 'HMI - Human Machine Interface'),
                array('url' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 'caption' => 'SCADA Monitoring Dashboard'),
                array('url' => 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop', 'caption' => 'SCADA Data Visualization'),
                array('url' => 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop', 'caption' => 'Industrial Control Systems'),
            ),
            'features'    => array('PLC Programming', 'HMI Development', 'SCADA Integration', 'Process Optimization'),
        ),
        array(
            'id'          => 2,
            'title'       => 'Control Panels',
            'description' => 'Custom control panel design, fabrication, and wiring meeting industry standards.',
            'full_description' => 'Our control panel solutions are designed and manufactured to meet the highest industry standards. From concept to commissioning, we deliver UL508A certified panels with precision wiring, comprehensive testing, and full documentation. Every panel is built for reliability, safety, and ease of maintenance.',
            'icon'        => 'diagram',
            'image'       => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop', 'caption' => 'Custom Control Panel Design'),
                array('url' => 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop', 'caption' => 'Panel Assembly & Fabrication'),
                array('url' => 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&h=600&fit=crop', 'caption' => 'Professional Wire Management'),
                array('url' => 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&h=600&fit=crop', 'caption' => 'Testing & Quality Assurance'),
            ),
            'features'    => array('UL508A Certified', 'Custom Design', 'Quality Wiring', 'Full Documentation'),
        ),
        array(
            'id'          => 3,
            'title'       => 'Machine Vision Solutions',
            'description' => 'Advanced vision systems for quality inspection, measurement, and automated guidance.',
            'full_description' => 'Our machine vision solutions leverage cutting-edge camera technology and AI-powered image processing to automate quality inspection, precise measurements, and robotic guidance. We implement solutions that detect defects in real-time, ensuring 100% quality control while reducing manual inspection costs.',
            'icon'        => 'vision',
            'image'       => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop', 'caption' => 'Vision System Integration'),
                array('url' => 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800&h=600&fit=crop', 'caption' => 'Camera Inspection System'),
                array('url' => 'https://images.unsplash.com/photo-1632406898426-f0bdd7ce648f?w=800&h=600&fit=crop', 'caption' => 'Quality Control Analysis'),
                array('url' => 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&h=600&fit=crop', 'caption' => 'Automated Defect Detection'),
            ),
            'features'    => array('Defect Detection', 'Precise Measurement', 'Robotic Guidance', 'AI Integration'),
        ),
        array(
            'id'          => 4,
            'title'       => 'Project Design & Development',
            'description' => 'End-to-end project planning, design, and development for industrial automation needs.',
            'full_description' => 'From initial concept to final deployment, we provide complete project lifecycle management. Our team of experienced engineers handles requirements analysis, system design, development, testing, and commissioning. We ensure projects are delivered on time, within budget, and exceed performance expectations.',
            'icon'        => 'layers',
            'image'       => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop', 'caption' => 'Engineering Design Process'),
                array('url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', 'caption' => 'Project Planning & Analysis'),
                array('url' => 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop', 'caption' => 'Technical Documentation'),
                array('url' => 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop', 'caption' => 'On-site Implementation'),
            ),
            'features'    => array('Requirements Analysis', 'System Design', 'Development & Testing', 'Commissioning'),
        ),
        array(
            'id'          => 5,
            'title'       => 'Industry 4.0 & 5.0 Projects',
            'description' => 'Smart factory solutions with advanced connectivity, AI, and human-centric automation.',
            'full_description' => 'Embrace the future of manufacturing with our Industry 4.0 and 5.0 solutions. We implement smart factory technologies including digital twins, predictive maintenance, AI-driven analytics, and collaborative robotics. Our human-centric approach ensures technology enhances worker capabilities while maximizing efficiency.',
            'icon'        => 'industry',
            'image'       => 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop', 'caption' => 'Smart Factory Solutions'),
                array('url' => 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop', 'caption' => 'Collaborative Robot Arms'),
                array('url' => 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop', 'caption' => 'AI-Powered Analytics'),
                array('url' => 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=600&fit=crop', 'caption' => 'Digital Twin Technology'),
            ),
            'features'    => array('Digital Twins', 'Predictive Maintenance', 'AI Analytics', 'Collaborative Robots'),
        ),
        array(
            'id'          => 6,
            'title'       => 'Industrial IoT (IIoT) Integration',
            'description' => 'Connect machines and sensors for real-time data monitoring and predictive analytics.',
            'full_description' => 'Transform your operations with Industrial IoT solutions. We connect your machines, sensors, and systems to collect real-time data, enabling predictive maintenance, performance optimization, and data-driven decision making. Our secure IIoT platforms provide actionable insights accessible from anywhere.',
            'icon'        => 'network',
            'image'       => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop', 'caption' => 'IoT Sensor Networks'),
                array('url' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'caption' => 'Real-time Data Dashboard'),
                array('url' => 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop', 'caption' => 'Predictive Analytics Platform'),
                array('url' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop', 'caption' => 'Connected Factory Floor'),
            ),
            'features'    => array('Sensor Integration', 'Real-time Monitoring', 'Predictive Analytics', 'Remote Access'),
        ),
        array(
            'id'          => 7,
            'title'       => 'Cloud & Edge Automation',
            'description' => 'Cloud-based monitoring and edge computing solutions for distributed automation systems.',
            'full_description' => 'Leverage the power of cloud computing combined with edge processing for your automation needs. Our solutions provide centralized monitoring, remote access, and scalable data storage while ensuring low-latency local processing for time-critical operations. Perfect for multi-site operations and distributed systems.',
            'icon'        => 'cloud',
            'image'       => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
            'gallery'     => array(
                array('url' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop', 'caption' => 'Cloud Infrastructure'),
                array('url' => 'https://images.unsplash.com/photo-1560732488-6b0df240254a?w=800&h=600&fit=crop', 'caption' => 'Server & Data Center'),
                array('url' => 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=600&fit=crop', 'caption' => 'Remote Monitoring System'),
                array('url' => 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop', 'caption' => 'Global Network Connectivity'),
            ),
            'features'    => array('Cloud Monitoring', 'Edge Computing', 'Remote Access', 'Multi-site Support'),
        ),
    );
}

/**
 * Send auto-reply email to customer
 */
function hg_send_auto_reply($name, $email, $subject, $message) {
    $site_name = get_bloginfo('name');

    $auto_reply_subject = "Thank you for contacting {$site_name} - {$subject}";

    $auto_reply_body = '
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 20px; text-align: center;">
            <h1 style="color: #2da0d4; margin: 0;">HG Automation India</h1>
            <p style="color: #94a3b8; margin: 5px 0 0;">Thank You for Reaching Out!</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e293b; margin-top: 0;">Dear ' . esc_html($name) . ',</h2>

            <p style="color: #334155; line-height: 1.6;">
                Thank you for contacting <strong>HG Automation India</strong>. We have received your message and our team will review it shortly.
            </p>

            <p style="color: #334155; line-height: 1.6;">
                We typically respond within <strong>24 hours</strong> during business days.
            </p>

            <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                <h3 style="color: #1e293b; margin-top: 0; font-size: 14px;">Your Message Summary:</h3>
                <p style="color: #64748b; margin: 5px 0;"><strong>Subject:</strong> ' . esc_html($subject) . '</p>
                <p style="color: #64748b; margin: 5px 0;"><strong>Message:</strong></p>
                <p style="color: #334155; font-style: italic; margin: 5px 0;">"' . esc_html(substr($message, 0, 200)) . (strlen($message) > 200 ? '...' : '') . '"</p>
            </div>

            <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #2da0d4; margin-top: 0;">Contact Information</h3>
                <p style="color: #94a3b8; margin: 5px 0;">
                    <strong style="color: #fff;">Phone:</strong> +91 83200 49749
                </p>
                <p style="color: #94a3b8; margin: 5px 0;">
                    <strong style="color: #fff;">Email:</strong> bakarali@hgautomationindia.com
                </p>
            </div>

            <p style="color: #334155; line-height: 1.6;">
                Best regards,<br>
                <strong>HG Automation India Team</strong>
            </p>
        </div>

        <div style="background: #1e293b; padding: 15px; text-align: center;">
            <p style="color: #475569; margin: 0; font-size: 11px;">
                &copy; ' . date('Y') . ' HG Automation India. All rights reserved.
            </p>
        </div>
    </div>';

    $headers = array(
        'Content-Type: text/html; charset=UTF-8',
        'From: HG Automation India <noreply@hgautomationindia.com>',
    );

    wp_mail($email, $auto_reply_subject, $auto_reply_body, $headers);
}

/**
 * Hook into contact form submission to send auto-reply
 */
add_action('wp_ajax_hg_contact_form', 'hg_send_auto_reply_on_submit', 5);
add_action('wp_ajax_nopriv_hg_contact_form', 'hg_send_auto_reply_on_submit', 5);

function hg_send_auto_reply_on_submit() {
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['subject']) && isset($_POST['message'])) {
        $name = sanitize_text_field($_POST['name']);
        $email = sanitize_email($_POST['email']);
        $subject = sanitize_text_field($_POST['subject']);
        $message = sanitize_textarea_field($_POST['message']);

        if (is_email($email)) {
            hg_send_auto_reply($name, $email, $subject, $message);
        }
    }
}

/**
 * Add WhatsApp floating button to footer
 */
function hg_add_whatsapp_button() {
    $whatsapp = get_theme_mod('hg_whatsapp', '918320049749');
    $message = urlencode("Hello! I'm interested in your industrial automation services.");
    ?>
    <div class="whatsapp-container" id="whatsapp-container">
        <!-- Tooltip -->
        <div class="whatsapp-tooltip" id="whatsapp-tooltip">
            <span>Chat with us</span>
            <div class="tooltip-arrow"></div>
        </div>

        <!-- Main Button -->
        <a href="https://wa.me/<?php echo esc_attr($whatsapp); ?>?text=<?php echo $message; ?>"
           target="_blank"
           rel="noopener noreferrer"
           class="whatsapp-btn"
           aria-label="Chat on WhatsApp"
           onmouseenter="document.getElementById('whatsapp-tooltip').classList.add('show')"
           onmouseleave="document.getElementById('whatsapp-tooltip').classList.remove('show')">
            <!-- Ripple Effects -->
            <span class="whatsapp-ripple ripple-1"></span>
            <span class="whatsapp-ripple ripple-2"></span>
            <span class="whatsapp-ripple ripple-3"></span>

            <!-- Icon Wrapper -->
            <span class="whatsapp-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="currentColor" class="whatsapp-icon">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </span>

            <!-- Shine Effect -->
            <span class="whatsapp-shine"></span>
        </a>
    </div>
    <script>
    // Show WhatsApp button with delay
    setTimeout(function() {
        document.getElementById('whatsapp-container').classList.add('visible');
    }, 2000);
    </script>
    <?php
}
add_action('wp_footer', 'hg_add_whatsapp_button');

/**
 * Add Cookie Consent Banner
 */
function hg_add_cookie_consent() {
    ?>
    <div id="cookie-consent" class="cookie-consent">
        <div class="cookie-consent-content">
            <div class="cookie-consent-text">
                <h4>We Value Your Privacy</h4>
                <p>
                    We use cookies to enhance your browsing experience and analyze site traffic.
                    By clicking "Accept", you consent to our use of cookies.
                </p>
            </div>
            <div class="cookie-consent-buttons">
                <button class="cookie-btn cookie-btn-accept" onclick="acceptCookies()">Accept All</button>
                <button class="cookie-btn cookie-btn-decline" onclick="declineCookies()">Decline</button>
            </div>
        </div>
    </div>
    <script>
    (function() {
        var consent = localStorage.getItem('hg_cookie_consent');
        if (!consent) {
            setTimeout(function() {
                document.getElementById('cookie-consent').classList.add('show');
            }, 1500);
        }
    })();

    function acceptCookies() {
        localStorage.setItem('hg_cookie_consent', 'accepted');
        document.getElementById('cookie-consent').classList.remove('show');
        // Enable analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', { 'analytics_storage': 'granted' });
        }
    }

    function declineCookies() {
        localStorage.setItem('hg_cookie_consent', 'declined');
        document.getElementById('cookie-consent').classList.remove('show');
    }
    </script>
    <?php
}
add_action('wp_footer', 'hg_add_cookie_consent');

/**
 * Add Google Analytics
 */
function hg_add_google_analytics() {
    $ga_id = get_theme_mod('hg_ga_id', '');
    if (empty($ga_id)) return;
    ?>
    <script async src="https://www.googletagmanager.com/gtag/js?id=<?php echo esc_attr($ga_id); ?>"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        // Check consent before tracking
        var consent = localStorage.getItem('hg_cookie_consent');
        gtag('consent', 'default', {
            'analytics_storage': consent === 'accepted' ? 'granted' : 'denied'
        });

        gtag('config', '<?php echo esc_attr($ga_id); ?>', {
            'anonymize_ip': true
        });
    </script>
    <?php
}
add_action('wp_head', 'hg_add_google_analytics', 1);

/**
 * Add SEO Structured Data
 */
function hg_add_structured_data() {
    $phone = get_theme_mod('hg_phone', '+91 83200 49749');
    $email = get_theme_mod('hg_email', 'bakarali@hgautomationindia.com');
    ?>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HG Automation India",
        "url": "<?php echo esc_url(home_url()); ?>",
        "logo": "<?php echo esc_url(get_template_directory_uri()); ?>/assets/images/Logo.png",
        "description": "Industrial automation solutions provider specializing in PLC programming, SCADA systems, control panels, and Industry 4.0 integration.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Building No. 70, Mominvad",
            "addressLocality": "Vaso",
            "addressRegion": "Gujarat",
            "postalCode": "387710",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "<?php echo esc_attr($phone); ?>",
            "contactType": "customer service",
            "email": "<?php echo esc_attr($email); ?>"
        },
        "sameAs": [
            "<?php echo esc_url(get_theme_mod('hg_linkedin', 'https://linkedin.com')); ?>",
            "<?php echo esc_url(get_theme_mod('hg_twitter', 'https://twitter.com')); ?>",
            "<?php echo esc_url(get_theme_mod('hg_facebook', 'https://facebook.com')); ?>"
        ]
    }
    </script>
    <?php
}
add_action('wp_head', 'hg_add_structured_data');

/**
 * Add inline styles for WhatsApp and Cookie Consent
 */
function hg_add_inline_styles() {
    ?>
    <style>
    /* WhatsApp Floating Button - Professional */
    .whatsapp-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 12px;
        opacity: 0;
        transform: scale(0) translateY(20px);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .whatsapp-container.visible {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
    .whatsapp-tooltip {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        color: white;
        padding: 10px 18px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        transform: translateX(20px) scale(0.8);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        pointer-events: none;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        position: relative;
    }
    .whatsapp-tooltip.show {
        opacity: 1;
        transform: translateX(0) scale(1);
    }
    .tooltip-arrow {
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-left-color: #334155;
    }
    .whatsapp-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        background: linear-gradient(145deg, #25D366 0%, #20BA5C 50%, #128C7E 100%);
        border-radius: 50%;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4), 0 8px 30px rgba(37, 211, 102, 0.2), inset 0 -3px 10px rgba(0, 0, 0, 0.1), inset 0 3px 10px rgba(255, 255, 255, 0.2);
        cursor: pointer;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: whatsappFloat 3s ease-in-out infinite;
    }
    .whatsapp-btn:hover {
        transform: scale(1.15) rotate(5deg);
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.5), 0 15px 50px rgba(37, 211, 102, 0.3), inset 0 -3px 10px rgba(0, 0, 0, 0.1), inset 0 3px 10px rgba(255, 255, 255, 0.3);
        animation: none;
    }
    .whatsapp-btn:active {
        transform: scale(1.05);
    }
    .whatsapp-icon-wrapper {
        position: relative;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }
    .whatsapp-btn:hover .whatsapp-icon-wrapper {
        transform: scale(1.1) rotate(-5deg);
    }
    .whatsapp-icon {
        width: 34px;
        height: 34px;
        color: white;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }
    .whatsapp-ripple {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid rgba(37, 211, 102, 0.6);
        animation: rippleWave 3s ease-out infinite;
    }
    .ripple-1 { animation-delay: 0s; }
    .ripple-2 { animation-delay: 1s; }
    .ripple-3 { animation-delay: 2s; }
    @keyframes rippleWave {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(2.5); opacity: 0; }
    }
    .whatsapp-shine {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.6s ease;
        border-radius: 50%;
    }
    .whatsapp-btn:hover .whatsapp-shine {
        left: 100%;
    }
    @keyframes whatsappFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }
    @media (max-width: 640px) {
        .whatsapp-container { bottom: 20px; right: 20px; }
        .whatsapp-btn { width: 56px; height: 56px; }
        .whatsapp-icon { width: 30px; height: 30px; }
        .whatsapp-tooltip { display: none; }
    }

    /* Cookie Consent */
    .cookie-consent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        color: white;
        padding: 20px;
        z-index: 10000;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
        transform: translateY(100%);
        transition: transform 0.5s ease;
    }
    .cookie-consent.show {
        transform: translateY(0);
    }
    .cookie-consent-content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        flex-wrap: wrap;
    }
    .cookie-consent-text {
        flex: 1;
        min-width: 300px;
    }
    .cookie-consent-text h4 {
        color: #2da0d4;
        margin: 0 0 8px 0;
        font-size: 16px;
    }
    .cookie-consent-text p {
        color: #94a3b8;
        margin: 0;
        font-size: 14px;
    }
    .cookie-consent-buttons {
        display: flex;
        gap: 12px;
    }
    .cookie-btn {
        padding: 10px 24px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
    }
    .cookie-btn-accept {
        background: #2da0d4;
        color: white;
    }
    .cookie-btn-accept:hover {
        background: #2589b5;
    }
    .cookie-btn-decline {
        background: transparent;
        color: #94a3b8;
        border: 1px solid #475569;
    }
    .cookie-btn-decline:hover {
        background: #475569;
        color: white;
    }
    @media (max-width: 640px) {
        .whatsapp-float-container { bottom: 20px; right: 20px; }
        .whatsapp-float { width: 55px; height: 55px; }
        .whatsapp-icon { width: 28px; height: 28px; }
        .cookie-consent-content { flex-direction: column; text-align: center; }
        .cookie-consent-buttons { width: 100%; justify-content: center; }
    }

    /* Services Horizontal Scroll - Mobile */
    .services-scroll-container {
        position: relative;
    }
    .services-scroll-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }
    .service-scroll-item {
        min-width: 0;
    }
    .scroll-indicator {
        display: none;
    }
    @media (max-width: 1280px) {
        .services-scroll-wrapper {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media (max-width: 1024px) {
        .services-scroll-wrapper {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 768px) {
        .services-scroll-container {
            margin: 0 -1rem;
            padding: 0 1rem;
        }
        .services-scroll-wrapper {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 1rem;
            padding: 0.5rem 0 1.5rem;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        .services-scroll-wrapper::-webkit-scrollbar {
            display: none;
        }
        .service-scroll-item {
            flex: 0 0 280px;
            scroll-snap-align: start;
        }
        .scroll-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: #64748b;
            font-size: 14px;
            padding: 10px 0;
            animation: fadeInOut 2s ease-in-out infinite;
        }
        .scroll-indicator svg {
            animation: slideRight 1s ease-in-out infinite;
        }
    }
    @media (max-width: 480px) {
        .service-scroll-item {
            flex: 0 0 260px;
        }
    }
    @keyframes slideRight {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(5px); }
    }
    @keyframes fadeInOut {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }

    /* Service Card Hover Overlay */
    .service-card {
        cursor: pointer;
        transition: all 0.7s ease;
    }
    .service-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 50px rgba(45,160,212,0.2);
    }
    .service-card-image {
        position: relative;
        overflow: hidden;
    }
    .service-card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(45, 160, 212, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    .service-card:hover .service-card-overlay {
        opacity: 1;
    }
    .view-details {
        color: white;
        font-weight: 600;
        font-size: 16px;
        padding: 12px 24px;
        border: 2px solid white;
        border-radius: 8px;
        transition: all 0.5s ease;
        transform: translateY(10px);
    }
    .service-card:hover .view-details {
        background: white;
        color: #2da0d4;
        transform: translateY(0);
    }
    .service-card-image img {
        transition: transform 1s ease;
    }
    .service-card:hover .service-card-image img {
        transform: scale(1.1);
    }
    .service-card .service-card-title {
        transition: color 0.5s ease;
    }
    .service-card:hover .service-card-title {
        color: #2da0d4;
    }

    /* Service Modal */
    .service-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    .service-modal.active {
        opacity: 1;
        visibility: visible;
    }
    .service-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    .service-modal-content {
        position: relative;
        background: white;
        border-radius: 16px;
        max-width: 1000px;
        width: 95%;
        max-height: 90vh;
        overflow: hidden;
        transform: scale(0.9) translateY(20px);
        transition: transform 0.3s ease;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
    }
    .service-modal.active .service-modal-content {
        transform: scale(1) translateY(0);
    }
    .service-modal-close {
        position: absolute;
        top: 15px;
        right: 15px;
        z-index: 10;
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .service-modal-close:hover {
        background: #2da0d4;
        color: white;
    }
    .service-modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        max-height: 90vh;
    }

    /* Gallery Section */
    .service-modal-gallery {
        background: #1e293b;
        padding: 20px;
    }
    .gallery-main {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 15px;
    }
    .gallery-main img {
        width: 100%;
        height: 350px;
        object-fit: cover;
    }
    .gallery-caption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 20px 15px 15px;
        font-size: 14px;
        font-weight: 500;
    }
    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    .gallery-nav:hover {
        background: #2da0d4;
        color: white;
    }
    .gallery-prev { left: 10px; }
    .gallery-next { right: 10px; }
    .gallery-thumbnails {
        display: flex;
        gap: 10px;
    }
    .gallery-thumb {
        width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        opacity: 0.6;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    .gallery-thumb:hover,
    .gallery-thumb.active {
        opacity: 1;
        border-color: #2da0d4;
    }
    .gallery-thumb img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Info Section */
    .service-modal-info {
        padding: 30px;
        overflow-y: auto;
        max-height: 90vh;
    }
    .service-modal-header {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
    }
    .service-modal-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #2da0d4 0%, #1e293b 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    .service-modal-icon svg {
        width: 28px;
        height: 28px;
    }
    .service-modal-info h2 {
        color: #1e293b;
        font-size: 24px;
        margin: 0;
    }
    .service-modal-description {
        color: #64748b;
        line-height: 1.7;
        margin-bottom: 25px;
    }
    .service-modal-features h4 {
        color: #1e293b;
        margin-bottom: 15px;
        font-size: 16px;
    }
    .service-modal-features ul {
        list-style: none;
        padding: 0;
        margin: 0 0 25px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .service-modal-features li {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #334155;
        font-size: 14px;
    }
    .service-modal-features li::before {
        content: '';
        width: 8px;
        height: 8px;
        background: #2da0d4;
        border-radius: 50%;
        flex-shrink: 0;
    }
    .service-modal-cta {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
    }
    .btn-whatsapp {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #25D366;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
    }
    .btn-whatsapp:hover {
        background: #128C7E;
        transform: translateY(-2px);
    }
    .btn-whatsapp svg {
        width: 20px;
        height: 20px;
    }

    /* Modal Responsive */
    @media (max-width: 768px) {
        .service-modal-body {
            grid-template-columns: 1fr;
        }
        .service-modal-gallery {
            padding: 15px;
        }
        .gallery-main img {
            height: 250px;
        }
        .service-modal-info {
            padding: 20px;
            max-height: 50vh;
        }
        .service-modal-features ul {
            grid-template-columns: 1fr;
        }
        .service-modal-cta {
            flex-direction: column;
        }
        .service-modal-cta a {
            text-align: center;
            justify-content: center;
        }
    }

    /* ============================================
       Professional Contact Form Styles
       ============================================ */
    .contact-form-wrapper {
        background: white;
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        transition: all 0.4s ease;
    }
    .contact-form-wrapper:hover {
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 30px rgba(45, 160, 212, 0.08);
    }
    .contact-form-wrapper::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 150px;
        height: 150px;
        background: linear-gradient(135deg, rgba(45, 160, 212, 0.1) 0%, transparent 100%);
        border-radius: 0 0 0 100%;
    }
    .contact-form-wrapper h3 {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 30px;
        position: relative;
    }
    .contact-form-wrapper h3::before {
        content: '';
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #2da0d4 0%, #1e7898 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 20px rgba(45, 160, 212, 0.3);
    }
    .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
    .form-group {
        position: relative;
    }
    .form-group.full-width {
        grid-column: span 2;
    }
    .form-group label {
        display: block;
        font-size: 14px;
        font-weight: 600;
        color: #334155;
        margin-bottom: 8px;
    }
    .form-group label .required {
        color: #2da0d4;
    }
    .form-group .input-field {
        width: 100%;
        padding: 14px 16px 14px 48px;
        border: 2px solid #e2e8f0;
        border-radius: 12px;
        font-size: 15px;
        color: #1e293b;
        background: #f8fafc;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        outline: none;
    }
    .form-group .input-field:focus {
        border-color: #2da0d4;
        background: white;
        box-shadow: 0 0 0 4px rgba(45, 160, 212, 0.1), 0 4px 15px rgba(45, 160, 212, 0.1);
    }
    .form-group .input-field::placeholder {
        color: #94a3b8;
    }
    .form-group .input-field.error {
        border-color: #ef4444;
        background: #fef2f2;
    }
    .form-group textarea.input-field {
        min-height: 140px;
        resize: none;
        padding-top: 16px;
    }
    .form-icon {
        position: absolute;
        left: 16px;
        top: 42px;
        width: 20px;
        height: 20px;
        color: #94a3b8;
        transition: color 0.3s ease;
        pointer-events: none;
    }
    .form-group:focus-within .form-icon {
        color: #2da0d4;
    }
    .field-error {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
        font-size: 13px;
        color: #ef4444;
        animation: shakeError 0.4s ease;
    }
    @keyframes shakeError {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-5px); }
        40% { transform: translateX(5px); }
        60% { transform: translateX(-3px); }
        80% { transform: translateX(3px); }
    }
    .form-group button[type="submit"] {
        position: relative;
        width: 100%;
        padding: 16px 32px;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        background: linear-gradient(135deg, #2da0d4 0%, #1e7898 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .form-group button[type="submit"]:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(45, 160, 212, 0.4), 0 5px 15px rgba(45, 160, 212, 0.2);
    }
    .form-group button[type="submit"]:active {
        transform: translateY(0);
    }
    .form-group button[type="submit"]::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.6s ease;
    }
    .form-group button[type="submit"]:hover::before {
        left: 100%;
    }
    #form-message {
        margin-bottom: 20px;
    }
    #form-message .success-message {
        padding: 20px;
        background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        border: 1px solid #a7f3d0;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 15px;
    }
    #form-message .success-message::before {
        content: '';
        width: 40px;
        height: 40px;
        background: #10b981;
        border-radius: 50%;
        flex-shrink: 0;
    }
    #form-message .error-message {
        padding: 20px;
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        border: 1px solid #fecaca;
        border-radius: 12px;
    }
    /* Contact Info Cards */
    .contact-info-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        margin-bottom: 16px;
        transition: all 0.3s ease;
    }
    .contact-info-item:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(45, 160, 212, 0.3);
        transform: translateX(8px);
    }
    .contact-info-icon {
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #2da0d4 0%, #1e7898 100%);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
        box-shadow: 0 8px 20px rgba(45, 160, 212, 0.3);
        transition: transform 0.3s ease;
    }
    .contact-info-item:hover .contact-info-icon {
        transform: scale(1.1);
    }
    .contact-info-icon svg {
        width: 24px;
        height: 24px;
    }
    .contact-info-label {
        display: block;
        font-size: 12px;
        color: #2da0d4;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 600;
        margin-bottom: 4px;
    }
    .contact-info-value {
        display: block;
        color: white;
        font-size: 16px;
        font-weight: 500;
    }
    .contact-info-value a {
        color: white;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    .contact-info-value a:hover {
        color: #2da0d4;
    }
    @media (max-width: 768px) {
        .contact-form-wrapper {
            padding: 24px;
            border-radius: 20px;
        }
        .form-grid {
            grid-template-columns: 1fr;
        }
        .form-group.full-width {
            grid-column: span 1;
        }
        .form-group .input-field {
            font-size: 16px;
            padding: 12px 14px 12px 44px;
        }
        .form-icon {
            top: 40px;
            left: 14px;
        }
    }

    /* ============================================
       Services Section Gradient Styles
       ============================================ */
    .services-section {
        position: relative;
        overflow: hidden;
    }
    .services-gradient-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff);
    }
    .services-decor-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
    }
    .services-decor-orb.orb-1 {
        top: 0;
        left: 0;
        width: 400px;
        height: 400px;
        background: linear-gradient(to bottom right, rgba(45, 160, 212, 0.1), rgba(34, 211, 238, 0.05));
        transform: translate(-50%, -50%);
    }
    .services-decor-orb.orb-2 {
        top: 50%;
        right: 0;
        width: 350px;
        height: 350px;
        background: linear-gradient(to bottom left, rgba(30, 41, 59, 0.05), rgba(45, 160, 212, 0.1));
        transform: translateX(33%);
    }
    .services-decor-orb.orb-3 {
        bottom: 0;
        left: 33%;
        width: 300px;
        height: 300px;
        background: linear-gradient(to top right, rgba(59, 130, 246, 0.05), rgba(45, 160, 212, 0.1));
        transform: translateY(50%);
    }
    .services-floating-shape {
        position: absolute;
        border-radius: 16px;
        animation: float 4s ease-in-out infinite;
    }
    .services-floating-shape.shape-1 {
        top: 80px;
        right: 80px;
        width: 80px;
        height: 80px;
        border: 1px solid rgba(45, 160, 212, 0.2);
        transform: rotate(12deg);
    }
    .services-floating-shape.shape-2 {
        bottom: 120px;
        left: 60px;
        width: 60px;
        height: 60px;
        border: 1px solid rgba(30, 41, 59, 0.1);
        border-radius: 50%;
        animation-delay: 1s;
    }
    /* Additional Floating Bubbles */
    .services-bubble {
        position: absolute;
        border-radius: 50%;
    }
    .services-bubble.bubble-1 {
        top: 160px;
        left: 25%;
        width: 24px;
        height: 24px;
        background: linear-gradient(to bottom right, rgba(45, 160, 212, 0.25), rgba(34, 211, 238, 0.2));
        animation: float 8s ease-in-out infinite;
        animation-delay: 0.3s;
        filter: blur(1px);
    }
    .services-bubble.bubble-2 {
        top: 25%;
        right: 33%;
        width: 20px;
        height: 20px;
        background: linear-gradient(to bottom right, rgba(34, 211, 238, 0.2), rgba(45, 160, 212, 0.15));
        animation: float 7s ease-in-out infinite;
        animation-delay: 1.5s;
    }
    .services-bubble.bubble-3 {
        bottom: 33%;
        left: 20%;
        width: 12px;
        height: 12px;
        background: rgba(45, 160, 212, 0.4);
        animation: pulse 4s ease-in-out infinite;
        animation-delay: 2s;
    }
    .services-bubble.bubble-4 {
        top: 66%;
        right: 60px;
        width: 32px;
        height: 32px;
        border: 1px solid rgba(34, 211, 238, 0.15);
        animation: float 9s ease-in-out infinite;
        animation-delay: 0.8s;
    }
    .services-bubble.bubble-5 {
        bottom: 80px;
        right: 25%;
        width: 16px;
        height: 16px;
        background: linear-gradient(to top right, rgba(30, 41, 59, 0.15), rgba(45, 160, 212, 0.2));
        animation: float 6s ease-in-out infinite;
        animation-delay: 2.5s;
    }
    .services-bubble.bubble-6 {
        top: 60px;
        left: 33%;
        width: 8px;
        height: 8px;
        background: rgba(34, 211, 238, 0.3);
        animation: pulse 3s ease-in-out infinite;
        animation-delay: 1.2s;
    }
    .services-bubble.bubble-7 {
        bottom: 50%;
        left: 30px;
        width: 20px;
        height: 20px;
        border: 1px solid rgba(45, 160, 212, 0.25);
        animation: float 8s ease-in-out infinite;
        animation-delay: 3s;
    }
    .services-bubble.bubble-8 {
        top: 50%;
        right: 30px;
        width: 12px;
        height: 12px;
        background: linear-gradient(to bottom left, rgba(45, 160, 212, 0.3), transparent);
        animation: pulse 4s ease-in-out infinite;
        animation-delay: 0.7s;
    }
    .services-bubble.bubble-9 {
        bottom: 160px;
        left: 50%;
        width: 24px;
        height: 24px;
        border: 1px solid rgba(30, 41, 59, 0.1);
        border-radius: 6px;
        transform: rotate(45deg);
        animation: float 10s ease-in-out infinite;
        animation-delay: 1.8s;
    }
    .services-bubble.bubble-10 {
        top: 75%;
        left: 80px;
        width: 8px;
        height: 8px;
        background: rgba(45, 160, 212, 0.35);
        animation: pulse 3.5s ease-in-out infinite;
        animation-delay: 2.2s;
    }
    .services-bubble.bubble-11 {
        top: 110px;
        right: 25%;
        width: 16px;
        height: 16px;
        background: linear-gradient(to right, rgba(34, 211, 238, 0.2), rgba(45, 160, 212, 0.25));
        animation: float 7s ease-in-out infinite;
        animation-delay: 0.5s;
    }
    .services-bubble.bubble-12 {
        bottom: 60px;
        right: 33%;
        width: 12px;
        height: 12px;
        background: rgba(30, 41, 59, 0.15);
        animation: pulse 4s ease-in-out infinite;
        animation-delay: 1.7s;
    }
    .services-grid-line {
        position: absolute;
        width: 1px;
        height: 100%;
        top: 0;
    }
    .services-grid-line.line-1 {
        left: 25%;
        background: linear-gradient(to bottom, transparent, rgba(45, 160, 212, 0.1), transparent);
    }
    .services-grid-line.line-2 {
        right: 25%;
        background: linear-gradient(to bottom, transparent, rgba(30, 41, 59, 0.05), transparent);
    }
    .section-badge {
        display: inline-block;
        padding: 8px 16px;
        background: rgba(45, 160, 212, 0.1);
        color: #2da0d4;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    .gradient-text {
        background: linear-gradient(to right, #2da0d4, #22d3ee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .gradient-divider {
        background: linear-gradient(to right, #2da0d4, #22d3ee) !important;
    }
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(12deg); }
        50% { transform: translateY(-15px) rotate(12deg); }
    }

    /* ============================================
       About Section Gradient Styles
       ============================================ */
    .about-section {
        position: relative;
        overflow: hidden;
    }
    .about-gradient-bg {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top left, #f1f5f9, #ffffff, rgba(236, 254, 255, 0.3));
    }
    .about-mesh-gradient {
        position: absolute;
        inset: 0;
        opacity: 0.5;
        background: radial-gradient(ellipse at 20% 80%, rgba(45, 160, 212, 0.08) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 20%, rgba(30, 41, 59, 0.05) 0%, transparent 50%);
    }
    .about-decor-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
    }
    .about-decor-orb.orb-1 {
        top: 25%;
        right: 0;
        width: 500px;
        height: 500px;
        background: linear-gradient(to bottom left, rgba(45, 160, 212, 0.08), rgba(34, 211, 238, 0.05), transparent);
        transform: translateX(33%);
    }
    .about-decor-orb.orb-2 {
        bottom: 0;
        left: 0;
        width: 400px;
        height: 400px;
        background: linear-gradient(to top right, rgba(30, 41, 59, 0.05), rgba(45, 160, 212, 0.08));
        transform: translate(-50%, 25%);
    }
    .about-floating-dot {
        position: absolute;
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
    }
    .about-floating-dot.dot-1 {
        top: 120px;
        left: 80px;
        width: 12px;
        height: 12px;
        background: rgba(45, 160, 212, 0.4);
    }
    .about-floating-dot.dot-2 {
        top: 50%;
        right: 120px;
        width: 8px;
        height: 8px;
        background: rgba(30, 41, 59, 0.3);
        animation-delay: 1s;
    }
    .about-floating-dot.dot-3 {
        bottom: 160px;
        left: 33%;
        width: 16px;
        height: 16px;
        border: 1px solid rgba(45, 160, 212, 0.3);
        animation: float 4s ease-in-out infinite;
    }
    .about-grid-line {
        position: absolute;
        width: 1px;
    }
    .about-grid-line.line-1 {
        top: 0;
        left: 33%;
        height: 66%;
        background: linear-gradient(to bottom, rgba(45, 160, 212, 0.1), rgba(45, 160, 212, 0.05), transparent);
    }
    .about-grid-line.line-2 {
        bottom: 0;
        right: 33%;
        height: 50%;
        background: linear-gradient(to top, rgba(30, 41, 59, 0.05), rgba(30, 41, 59, 0.03), transparent);
    }
    .about-visual {
        position: relative;
    }
    .about-visual-glow {
        position: absolute;
        inset: -4px;
        background: linear-gradient(to bottom right, rgba(45, 160, 212, 0.2), rgba(34, 211, 238, 0.1), rgba(30, 41, 59, 0.2));
        border-radius: 24px;
        filter: blur(15px);
        opacity: 0.6;
        transition: opacity 0.5s ease;
    }
    .about-visual:hover .about-visual-glow {
        opacity: 1;
    }
    .about-logo-box {
        position: relative;
    }
    .about-corner-accent {
        position: absolute;
        width: 80px;
        height: 80px;
    }
    .about-corner-accent.corner-tl {
        top: 0;
        left: 0;
        border-top: 2px solid rgba(45, 160, 212, 0.3);
        border-left: 2px solid rgba(45, 160, 212, 0.3);
        border-radius: 16px 0 0 0;
    }
    .about-corner-accent.corner-br {
        bottom: 0;
        right: 0;
        border-bottom: 2px solid rgba(45, 160, 212, 0.3);
        border-right: 2px solid rgba(45, 160, 212, 0.3);
        border-radius: 0 0 16px 0;
    }
    .about-logo-gradient-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top right, rgba(45, 160, 212, 0.1), transparent, rgba(34, 211, 238, 0.1));
        border-radius: 16px;
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    .about-logo-box:hover .about-logo-gradient-overlay {
        opacity: 1;
    }
    .about-experience-badge {
        background: linear-gradient(to bottom right, #2da0d4, #0891b2) !important;
        box-shadow: 0 10px 25px rgba(45, 160, 212, 0.3) !important;
    }
    .about-badge {
        display: inline-block;
        padding: 8px 16px;
        background: linear-gradient(to right, rgba(45, 160, 212, 0.1), rgba(34, 211, 238, 0.1));
        color: #2da0d4;
        border-radius: 9999px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 16px;
    }
    .about-features li {
        padding: 12px;
        border-radius: 12px;
        transition: all 0.3s ease;
    }
    .about-features li:hover {
        background: linear-gradient(to right, rgba(45, 160, 212, 0.05), transparent);
    }
    .about-features .check-icon {
        background: linear-gradient(to bottom right, #2da0d4, #0891b2) !important;
        box-shadow: 0 4px 12px rgba(45, 160, 212, 0.2);
    }
    .about-stats .about-stat {
        background: linear-gradient(to bottom right, #ffffff, #f8fafc);
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 16px;
        transition: all 0.3s ease;
    }
    .about-stats .about-stat:hover {
        border-color: rgba(45, 160, 212, 0.3);
        box-shadow: 0 10px 25px rgba(45, 160, 212, 0.05);
    }
    .about-stats .about-stat .value {
        background: linear-gradient(to right, #2da0d4, #0891b2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    @media (max-width: 1024px) {
        .services-floating-shape,
        .services-grid-line,
        .about-floating-dot,
        .about-grid-line {
            display: none;
        }
    }
    </style>
    <?php
}
add_action('wp_head', 'hg_add_inline_styles');
