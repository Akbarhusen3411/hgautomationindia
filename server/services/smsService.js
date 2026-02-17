/**
 * SMS Service
 * Handles sending OTP via Twilio SMS
 */

let twilioClient = null;

/**
 * Lazy-initialize Twilio client
 */
const getClient = () => {
  if (!twilioClient) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env');
    }

    const twilio = require('twilio');
    twilioClient = twilio(accountSid, authToken);
  }
  return twilioClient;
};

/**
 * Send OTP via SMS
 * @param {string} phoneNumber - Phone number in E.164 format (e.g., +919876543210)
 * @param {string} otp - The OTP code to send
 */
const sendOTPSms = async (phoneNumber, otp) => {
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!fromNumber) {
    throw new Error('TWILIO_PHONE_NUMBER not configured in .env');
  }

  const client = getClient();

  const message = await client.messages.create({
    body: `Your HG Automation verification code is: ${otp}. This code expires in 5 minutes. Do not share this code with anyone.`,
    from: fromNumber,
    to: phoneNumber,
  });

  console.log(`SMS sent to ${phoneNumber}, SID: ${message.sid}`);
  return message;
};

module.exports = {
  sendOTPSms,
};
