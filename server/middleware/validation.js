/**
 * Validation Middleware
 * Input validation using express-validator
 * Enhanced with disposable email blocking and Indian phone validation
 */

const { body, validationResult } = require('express-validator');

/**
 * Disposable/temporary email domains to block
 */
const DISPOSABLE_EMAIL_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'yopmail.com',
  'throwaway.email', 'temp-mail.org', 'fakeinbox.com', 'sharklasers.com',
  'guerrillamailblock.com', 'grr.la', 'dispostable.com', 'mailnesia.com',
  'maildrop.cc', 'discard.email', 'trashmail.com', 'trashmail.net',
  'mytemp.email', 'getnada.com', 'tempail.com', 'mohmal.com',
  'burnermail.io', 'mailcatch.com', 'tempr.email', 'tempinbox.com',
  'trash-mail.com', 'harakirimail.com', 'tmail.ws', 'mailnull.com',
  'jetable.org', 'spam4.me', 'greymail.com'
];

/**
 * Validation rules for contact form submission
 */
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .custom((value) => {
      // Check for consecutive dots
      if (/\.{2,}/.test(value)) {
        throw new Error('Email contains invalid characters');
      }
      // Extract and check domain
      const domain = value.split('@')[1].toLowerCase();
      const tld = domain.split('.').pop();
      // TLD must be at least 2 chars and not numbers-only
      if (tld.length < 2 || /^\d+$/.test(tld)) {
        throw new Error('Email has an invalid domain');
      }
      // Block disposable email domains
      if (DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
        throw new Error('Disposable/temporary emails are not allowed. Please use your business or personal email.');
      }
      return true;
    }),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .custom((value) => {
      // Strip formatting characters
      const stripped = value.replace(/[\s\-\(\)\.]/g, '');

      // Must contain only digits (country code handled separately)
      if (!/^\d+$/.test(stripped)) {
        throw new Error('Phone number must contain only digits');
      }

      // Must be between 4 and 15 digits (international range)
      if (stripped.length < 4 || stripped.length > 15) {
        throw new Error('Please provide a valid phone number');
      }

      // Block all same digits (e.g., 9999999999)
      if (/^(\d)\1+$/.test(stripped)) {
        throw new Error('Please provide a real phone number');
      }

      return true;
    }),

  body('countryCode')
    .trim()
    .notEmpty()
    .withMessage('Country code is required')
    .matches(/^\+\d{1,4}$/)
    .withMessage('Invalid country code format'),

  body('company')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  next();
};

module.exports = {
  contactValidationRules,
  validate
};
