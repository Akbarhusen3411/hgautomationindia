/**
 * OTP Routes
 * Handles OTP send/verify endpoints for email and phone
 */

const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validation');
const {
  sendEmailOTP,
  verifyEmailOTP,
  sendPhoneOTP,
  verifyPhoneOTP,
} = require('../controllers/otpController');

const router = express.Router();

// Send email OTP
router.post(
  '/send-email',
  [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email address'),
  ],
  validate,
  sendEmailOTP
);

// Verify email OTP
router.post(
  '/verify-email',
  [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email address'),
    body('otp')
      .trim()
      .notEmpty().withMessage('OTP is required')
      .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
      .isNumeric().withMessage('OTP must contain only digits'),
  ],
  validate,
  verifyEmailOTP
);

// Send phone OTP
router.post(
  '/send-phone',
  [
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^\d{4,15}$/).withMessage('Phone number must contain only digits'),
    body('dialCode')
      .trim()
      .notEmpty().withMessage('Country dial code is required')
      .matches(/^\+\d{1,4}$/).withMessage('Invalid country dial code'),
  ],
  validate,
  sendPhoneOTP
);

// Verify phone OTP
router.post(
  '/verify-phone',
  [
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required')
      .matches(/^\d{4,15}$/).withMessage('Phone number must contain only digits'),
    body('dialCode')
      .trim()
      .notEmpty().withMessage('Country dial code is required')
      .matches(/^\+\d{1,4}$/).withMessage('Invalid country dial code'),
    body('otp')
      .trim()
      .notEmpty().withMessage('OTP is required')
      .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
      .isNumeric().withMessage('OTP must contain only digits'),
  ],
  validate,
  verifyPhoneOTP
);

module.exports = router;
