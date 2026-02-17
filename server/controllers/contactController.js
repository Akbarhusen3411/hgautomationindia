/**
 * Contact Controller
 * Handles business logic for contact form submissions
 */

const { contactSubmissions } = require('../data/services');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');
const { isVerified, clearVerification } = require('../services/otpService');

/**
 * Submit contact form
 * @route POST /api/contact
 */
const submitContact = async (req, res) => {
  const { name, email, phone, countryCode, company, subject, message } = req.body;

  // Server-side OTP verification enforcement
  if (!isVerified('email', email)) {
    return res.status(403).json({
      success: false,
      error: 'Email verification required. Please verify your email with OTP before submitting.'
    });
  }

  // Create submission record
  const submission = {
    id: contactSubmissions.length + 1,
    name,
    email,
    phone: phone || null,
    company: company || null,
    subject,
    message,
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  // Store in memory (simulated database)
  contactSubmissions.push(submission);

  if (process.env.NODE_ENV !== 'production') {
    console.log('New contact submission:', submission);
  } else {
    console.log('New contact submission:', { id: submission.id, createdAt: submission.createdAt });
  }

  // Send email notification to admin
  try {
    await sendContactNotification(submission);
    console.log('Email notification sent to admin');
  } catch (emailError) {
    console.error('Failed to send admin notification:', emailError.message);
  }

  // Send auto-reply to customer
  try {
    await sendAutoReply(submission);
    console.log('Auto-reply sent to customer');
  } catch (emailError) {
    console.error('Failed to send auto-reply:', emailError.message);
  }

  // Clear OTP verification after successful submission to prevent replay
  clearVerification('email', email);

  res.status(201).json({
    success: true,
    message: 'Thank you for your message. We will get back to you within 24 hours.',
    data: {
      id: submission.id,
      createdAt: submission.createdAt
    }
  });
};

module.exports = {
  submitContact
};
