/**
 * Email Service
 * Handles sending emails using Nodemailer
 */

const nodemailer = require('nodemailer');

// Create reusable transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

/**
 * Send contact form notification email
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Email send result
 */
const sendContactNotification = async (contactData) => {
  const { name, email, phone, company, subject, message, createdAt } = contactData;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"HG Automation Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL_RECIPIENT,
    replyTo: `"${name}" <${email}>`,
    headers: {
      'Reply-To': `"${name}" <${email}>`
    },
    subject: `New Contact Form: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 20px; text-align: center;">
          <h1 style="color: #2da0d4; margin: 0;">HG Automation</h1>
          <p style="color: #94a3b8; margin: 5px 0 0;">New Contact Form Submission</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 120px;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                <a href="mailto:${email}" style="color: #2da0d4;">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                <a href="tel:${phone}" style="color: #2da0d4;">${phone}</a>
              </td>
            </tr>
            ` : ''}
            ${company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Company:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${company}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;"><strong>Subject:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;"><strong>Submitted:</strong></td>
              <td style="padding: 10px 0; color: #1e293b;">${new Date(createdAt).toLocaleString()}</td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <h3 style="color: #1e293b; margin-bottom: 10px;">Message:</h3>
            <div style="background: #fff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 25px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
               style="display: inline-block; background: #2da0d4; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reply to ${name}
            </a>
          </div>
        </div>

        <div style="background: #1e293b; padding: 15px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            This email was sent from the HG Automation website contact form.
          </p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission - HG Automation

Contact Details:
----------------
Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}
Subject: ${subject}
Submitted: ${new Date(createdAt).toLocaleString()}

Message:
--------
${message}

---
Reply to this message by emailing ${email}
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send auto-reply confirmation email to customer
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Email send result
 */
const sendAutoReply = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const transporter = createTransporter();

  const mailOptions = {
    from: `"HG Automation" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for contacting HG Automation - ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 20px; text-align: center;">
          <h1 style="color: #2da0d4; margin: 0;">HG Automation</h1>
          <p style="color: #94a3b8; margin: 5px 0 0;">Thank You for Reaching Out!</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin-top: 0;">Dear ${name},</h2>

          <p style="color: #334155; line-height: 1.6;">
            Thank you for contacting <strong>HG Automation</strong>. We have received your message and our team will review it shortly.
          </p>

          <p style="color: #334155; line-height: 1.6;">
            We typically respond within <strong>24 hours</strong> during business days. If your matter is urgent, please feel free to call us directly.
          </p>

          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0; font-size: 14px;">Your Message Summary:</h3>
            <p style="color: #64748b; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="color: #64748b; margin: 5px 0;"><strong>Message:</strong></p>
            <p style="color: #334155; font-style: italic; margin: 5px 0;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
          </div>

          <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2da0d4; margin-top: 0;">Contact Information</h3>
            <p style="color: #94a3b8; margin: 5px 0;">
              <strong style="color: #fff;">Phone:</strong> +91 83200 49749
            </p>
            <p style="color: #94a3b8; margin: 5px 0;">
              <strong style="color: #fff;">Email:</strong> bakarali@hgautomationindia.com
            </p>
            <p style="color: #94a3b8; margin: 5px 0;">
              <strong style="color: #fff;">Address:</strong> Building No. 70, Mominvad, Vaso, Kheda, Gujarat 387710
            </p>
          </div>

          <p style="color: #334155; line-height: 1.6;">
            Best regards,<br>
            <strong>HG Automation Team</strong>
          </p>
        </div>

        <div style="background: #1e293b; padding: 15px; text-align: center;">
          <p style="color: #64748b; margin: 0 0 10px; font-size: 12px;">
            Follow us on social media
          </p>
          <p style="margin: 0;">
            <a href="https://linkedin.com" style="color: #2da0d4; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            <a href="https://twitter.com" style="color: #2da0d4; text-decoration: none; margin: 0 10px;">Twitter</a>
            <a href="https://facebook.com" style="color: #2da0d4; text-decoration: none; margin: 0 10px;">Facebook</a>
          </p>
          <p style="color: #475569; margin: 15px 0 0; font-size: 11px;">
            &copy; ${new Date().getFullYear()} HG Automation. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `
Dear ${name},

Thank you for contacting HG Automation. We have received your message and our team will review it shortly.

We typically respond within 24 hours during business days. If your matter is urgent, please feel free to call us directly.

Your Message Summary:
Subject: ${subject}
Message: "${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"

Contact Information:
Phone: +91 83200 49749
Email: bakarali@hgautomationindia.com
Address: Building No. 70, Mominvad, Vaso, Kheda, Gujarat 387710

Best regards,
HG Automation Team
    `
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Send OTP verification email
 * @param {string} email - Recipient email address
 * @param {string} otp - The 6-digit OTP code
 * @returns {Promise} - Email send result
 */
const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"HG Automation" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your Verification Code - ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 20px; text-align: center;">
          <h1 style="color: #2da0d4; margin: 0;">HG Automation</h1>
          <p style="color: #94a3b8; margin: 5px 0 0;">Email Verification</p>
        </div>

        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0;">
          <h2 style="color: #1e293b; margin-top: 0;">Your Verification Code</h2>

          <p style="color: #334155; line-height: 1.6;">
            Use the following code to verify your email address. This code will expire in <strong>5 minutes</strong>.
          </p>

          <div style="background: #1e293b; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="color: #2da0d4; font-size: 36px; font-weight: bold; letter-spacing: 8px;">${otp}</span>
          </div>

          <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
            If you did not request this code, please ignore this email. Do not share this code with anyone.
          </p>
        </div>

        <div style="background: #1e293b; padding: 15px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 12px;">
            &copy; ${new Date().getFullYear()} HG Automation. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `Your HG Automation verification code is: ${otp}\n\nThis code will expire in 5 minutes.\nDo not share this code with anyone.`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactNotification,
  sendAutoReply,
  sendOTPEmail
};
