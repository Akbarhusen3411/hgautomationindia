<?php
/**
 * Main Template File
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 *
 * @package HG_Automation
 */

get_header();
?>

<!-- Fallback to front page content -->
<?php get_template_part('front-page'); ?>

<?php get_footer(); ?>
