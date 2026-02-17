/**
 * OTP Service
 * Handles OTP generation, storage, and verification
 * Uses in-memory Map for storage with automatic expiry cleanup
 */

const crypto = require('crypto');

// In-memory OTP store: key -> { otp, expiresAt, attempts, cooldownUntil, verified }
const otpStore = new Map();

const OTP_EXPIRY_MS = 5 * 60 * 1000;      // 5 minutes
const COOLDOWN_MS = 60 * 1000;             // 60 seconds between sends
const MAX_ATTEMPTS = 5;

/**
 * Generate a secure 6-digit OTP
 */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

/**
 * Build storage key from type and identifier
 * @param {'email'|'phone'} type
 * @param {string} identifier - email address or phone number (E.164)
 */
const buildKey = (type, identifier) => `${type}:${identifier.toLowerCase().trim()}`;

/**
 * Store a new OTP for a given type and identifier
 * Returns { otp, cooldownRemaining } or throws error
 */
const storeOTP = (type, identifier) => {
  const key = buildKey(type, identifier);
  const existing = otpStore.get(key);

  // Check cooldown
  if (existing && existing.cooldownUntil && Date.now() < existing.cooldownUntil) {
    const remaining = Math.ceil((existing.cooldownUntil - Date.now()) / 1000);
    return { error: `Please wait ${remaining} seconds before requesting a new OTP`, cooldownRemaining: remaining };
  }

  const otp = generateOTP();

  otpStore.set(key, {
    otp,
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    cooldownUntil: Date.now() + COOLDOWN_MS,
    attempts: 0,
    verified: false,
  });

  return { otp };
};

/**
 * Verify an OTP
 * Returns { success, message }
 */
const verifyOTP = (type, identifier, userOtp) => {
  const key = buildKey(type, identifier);
  const record = otpStore.get(key);

  if (!record) {
    return { success: false, message: 'No OTP found. Please request a new one.' };
  }

  if (record.verified) {
    return { success: true, message: 'Already verified' };
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(key);
    return { success: false, message: 'OTP has expired. Please request a new one.' };
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(key);
    return { success: false, message: 'Too many failed attempts. Please request a new OTP.' };
  }

  record.attempts += 1;

  if (record.otp !== userOtp.toString().trim()) {
    const remaining = MAX_ATTEMPTS - record.attempts;
    return { success: false, message: `Incorrect OTP. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.` };
  }

  // OTP matches
  record.verified = true;
  return { success: true, message: 'Verification successful' };
};

/**
 * Check if a type+identifier is verified
 */
const isVerified = (type, identifier) => {
  const key = buildKey(type, identifier);
  const record = otpStore.get(key);
  return record ? record.verified === true : false;
};

/**
 * Clear verification for a type+identifier
 */
const clearVerification = (type, identifier) => {
  const key = buildKey(type, identifier);
  otpStore.delete(key);
};

// Periodic cleanup of expired entries (every 10 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of otpStore) {
    if (now > record.expiresAt + 60000) {
      otpStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

module.exports = {
  storeOTP,
  verifyOTP,
  isVerified,
  clearVerification,
};
