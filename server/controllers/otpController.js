/**
 * OTP Controller
 * Handles OTP send and verify requests for email and phone
 */

const { storeOTP, verifyOTP } = require('../services/otpService');
const { sendOTPEmail } = require('../services/emailService');
const { sendOTPSms } = require('../services/smsService');

/**
 * Send email OTP
 * @route POST /api/otp/send-email
 */
const sendEmailOTP = async (req, res) => {
  const { email } = req.body;

  const result = storeOTP('email', email);

  if (result.error) {
    return res.status(429).json({
      success: false,
      error: result.error,
      cooldownRemaining: result.cooldownRemaining,
    });
  }

  try {
    await sendOTPEmail(email, result.otp);
    console.log(`Email OTP sent to ${email}`);

    res.json({
      success: true,
      message: 'OTP sent to your email address',
    });
  } catch (err) {
    console.error('Failed to send email OTP:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP email. Please try again.',
    });
  }
};

/**
 * Verify email OTP
 * @route POST /api/otp/verify-email
 */
const verifyEmailOTP = (req, res) => {
  const { email, otp } = req.body;

  const result = verifyOTP('email', email, otp);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.message,
    });
  }

  res.json({
    success: true,
    message: result.message,
  });
};

/**
 * Send phone OTP
 * @route POST /api/otp/send-phone
 */
const sendPhoneOTP = async (req, res) => {
  const { phone, dialCode } = req.body;

  // Build E.164 format phone number
  const fullPhone = `${dialCode}${phone}`;

  const result = storeOTP('phone', fullPhone);

  if (result.error) {
    return res.status(429).json({
      success: false,
      error: result.error,
      cooldownRemaining: result.cooldownRemaining,
    });
  }

  try {
    await sendOTPSms(fullPhone, result.otp);
    console.log(`Phone OTP sent to ${fullPhone}`);

    res.json({
      success: true,
      message: 'OTP sent to your phone number',
    });
  } catch (err) {
    console.error('Failed to send phone OTP:', err.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send SMS OTP. Please try again.',
    });
  }
};

/**
 * Verify phone OTP
 * @route POST /api/otp/verify-phone
 */
const verifyPhoneOTP = (req, res) => {
  const { phone, dialCode, otp } = req.body;

  const fullPhone = `${dialCode}${phone}`;
  const result = verifyOTP('phone', fullPhone, otp);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: result.message,
    });
  }

  res.json({
    success: true,
    message: result.message,
  });
};

module.exports = {
  sendEmailOTP,
  verifyEmailOTP,
  sendPhoneOTP,
  verifyPhoneOTP,
};
