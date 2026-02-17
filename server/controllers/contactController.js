/**
 * Contact Controller
 * Handles business logic for contact form submissions
 */

const { contactSubmissions } = require('../data/services');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');

/**
 * Submit contact form
 * @route POST /api/contact
 */
const submitContact = async (req, res) => {
  const { name, email, phone, countryCode, company, subject, message } = req.body;

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
