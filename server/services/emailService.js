/**
 * Email Service
 * Handles sending emails using Nodemailer with premium HTML templates
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
  const submittedDate = new Date(createdAt);
  const dateStr = submittedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const timeStr = submittedDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const firstName = name.split(' ')[0];

  const transporter = createTransporter();

  const mailOptions = {
    from: `"HG Automation Website" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL_RECIPIENT,
    replyTo: `"${name}" <${email}>`,
    headers: {
      'Reply-To': `"${name}" <${email}>`
    },
    subject: `New Inquiry: ${subject} — from ${name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 40px; text-align: center; border-radius: 16px 16px 0 0; border-bottom: 2px solid #2da0d4;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">
                      <span style="color: #ffffff;">HG</span>
                      <span style="color: #2da0d4;"> AUTOMATION</span>
                    </h1>
                    <p style="color: #64748b; margin: 6px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Precision Control, Optimized Performance</p>
                  </td>
                </tr>

                <!-- Alert Banner -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2da0d4 0%, #1e7898 100%); padding: 16px 40px; text-align: center;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr>
                        <td style="padding-right: 10px; vertical-align: middle;">
                          <div style="width: 32px; height: 32px; background: rgba(255,255,255,0.2); border-radius: 50%; text-align: center; line-height: 32px; font-size: 16px;">&#9993;</div>
                        </td>
                        <td style="vertical-align: middle;">
                          <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 700;">New Contact Form Submission</p>
                          <p style="margin: 2px 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">${dateStr} at ${timeStr}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background: #ffffff; padding: 0;">

                    <!-- Sender Quick Summary -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 28px 40px 20px;">
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="vertical-align: top; padding-right: 16px;">
                                <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #2da0d4, #1e7898); border-radius: 14px; text-align: center; line-height: 52px; font-size: 22px; font-weight: 700; color: #ffffff;">${firstName.charAt(0).toUpperCase()}</div>
                              </td>
                              <td style="vertical-align: center;">
                                <p style="margin: 0; font-size: 20px; font-weight: 700; color: #0f172a;">${name}</p>
                                ${company ? `<p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">${company}</p>` : ''}
                                <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;">Regarding: <strong style="color: #2da0d4;">${subject}</strong></p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding: 0 40px;"><div style="height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent);"></div></td></tr>
                    </table>

                    <!-- Contact Details Grid -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 40px;">
                      <tr>
                        <td width="50%" style="padding: 8px 8px 8px 0; vertical-align: top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 10px; border: 1px solid #f1f5f9;">
                            <tr>
                              <td style="padding: 14px 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 600;">Email</p>
                                <a href="mailto:${email}" style="color: #2da0d4; text-decoration: none; font-size: 13px; font-weight: 600; word-break: break-all;">${email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" style="padding: 8px 0 8px 8px; vertical-align: top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 10px; border: 1px solid #f1f5f9;">
                            <tr>
                              <td style="padding: 14px 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 600;">Phone</p>
                                ${phone
                                  ? `<a href="tel:${phone}" style="color: #0f172a; text-decoration: none; font-size: 13px; font-weight: 600;">${phone}</a>`
                                  : `<span style="color: #cbd5e1; font-size: 13px;">Not provided</span>`
                                }
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${company ? `
                      <tr>
                        <td colspan="2" style="padding: 0 0 0 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; border-radius: 10px; border: 1px solid #f1f5f9; margin-top: 4px;">
                            <tr>
                              <td style="padding: 14px 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 600;">Company</p>
                                <p style="margin: 0; color: #0f172a; font-size: 13px; font-weight: 600;">${company}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                    </table>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding: 0 40px;"><div style="height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent);"></div></td></tr>
                    </table>

                    <!-- Message -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 24px 40px 16px;">
                      <tr>
                        <td>
                          <p style="margin: 0 0 12px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 600;">Message</p>
                          <div style="background: #f8fafc; border-left: 3px solid #2da0d4; border-radius: 0 10px 10px 0; padding: 20px 24px;">
                            <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Action Buttons -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 20px 40px 32px;">
                      <tr>
                        <td align="center">
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-right: 10px;">
                                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                                   style="display: inline-block; background: linear-gradient(135deg, #2da0d4 0%, #1e7898 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">
                                  Reply to ${firstName} &rarr;
                                </a>
                              </td>
                              ${phone ? `
                              <td>
                                <a href="tel:${phone}"
                                   style="display: inline-block; background: #f1f5f9; color: #0f172a; padding: 14px 24px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 14px; border: 1px solid #e2e8f0;">
                                  &#9742; Call
                                </a>
                              </td>
                              ` : ''}
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #0f172a; padding: 24px 40px; border-radius: 0 0 16px 16px; border-top: 1px solid #1e293b;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #475569; font-size: 11px; line-height: 1.6;">
                            This notification was generated from the contact form on
                            <a href="https://hgautomationindia.com" style="color: #2da0d4; text-decoration: none;">hgautomationindia.com</a>
                          </p>
                          <p style="margin: 8px 0 0; color: #334155; font-size: 10px;">
                            &copy; ${new Date().getFullYear()} HG Automation India. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
NEW INQUIRY — HG Automation
============================

From: ${name}${company ? ` (${company})` : ''}
Subject: ${subject}
Date: ${dateStr} at ${timeStr}

Contact:
  Email: ${email}
  ${phone ? `Phone: ${phone}` : ''}

Message:
--------
${message}

---
Reply directly to ${email}
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
  const firstName = name.split(' ')[0];

  const transporter = createTransporter();

  const mailOptions = {
    from: `"HG Automation" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `We've received your message — ${subject}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 40px; text-align: center; border-radius: 16px 16px 0 0; border-bottom: 2px solid #2da0d4;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">
                      <span style="color: #ffffff;">HG</span>
                      <span style="color: #2da0d4;"> AUTOMATION</span>
                    </h1>
                    <p style="color: #64748b; margin: 6px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Precision Control, Optimized Performance</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background: #ffffff; padding: 36px 40px;">

                    <p style="margin: 0 0 6px; font-size: 22px; font-weight: 700; color: #0f172a;">Hi ${firstName},</p>
                    <p style="margin: 0 0 20px; font-size: 14px; color: #64748b;">Thank you for reaching out to us.</p>

                    <p style="color: #334155; font-size: 14px; line-height: 1.8; margin: 0 0 24px;">
                      We've received your inquiry about <strong style="color: #2da0d4;">${subject}</strong> and our team is already on it.
                      You can expect a detailed response within <strong>24 hours</strong> during business days.
                    </p>

                    <!-- Message Summary Card -->
                    <div style="background: #f8fafc; border-left: 3px solid #2da0d4; border-radius: 0 10px 10px 0; padding: 20px 24px; margin: 0 0 28px;">
                      <p style="margin: 0 0 8px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 600;">Your Message</p>
                      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.6; font-style: italic;">"${message.substring(0, 250)}${message.length > 250 ? '...' : ''}"</p>
                    </div>

                    <!-- Divider -->
                    <div style="height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent); margin: 0 0 28px;"></div>

                    <!-- Contact Info Cards -->
                    <p style="margin: 0 0 16px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; font-weight: 600;">Need Immediate Assistance?</p>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding: 0 6px 12px 0; vertical-align: top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #0f172a; border-radius: 10px;">
                            <tr>
                              <td style="padding: 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Phone</p>
                                <a href="tel:+918320049749" style="color: #2da0d4; text-decoration: none; font-size: 14px; font-weight: 700;">+91 83200 49749</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td width="50%" style="padding: 0 0 12px 6px; vertical-align: top;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #0f172a; border-radius: 10px;">
                            <tr>
                              <td style="padding: 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                                <a href="mailto:bakarali@hgautomationindia.com" style="color: #2da0d4; text-decoration: none; font-size: 12px; font-weight: 700;">bakarali@hgautomationindia.com</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 0;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #0f172a; border-radius: 10px;">
                            <tr>
                              <td style="padding: 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Address</p>
                                <p style="margin: 0; color: #e2e8f0; font-size: 13px; font-weight: 600;">Building No. 70, Mominvad, Vaso, Kheda, Gujarat 387710</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 28px 0 0;">
                      Warm regards,<br>
                      <strong style="color: #0f172a;">Bakarali Momin</strong><br>
                      <span style="font-size: 12px; color: #64748b;">Founder &amp; Proprietor, HG Automation</span>
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #0f172a; padding: 24px 40px; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #1e293b;">
                    <p style="margin: 0 0 12px;">
                      <a href="https://www.linkedin.com/company/hgautomation" style="color: #64748b; text-decoration: none; margin: 0 8px; font-size: 12px;">LinkedIn</a>
                      <span style="color: #334155;">&bull;</span>
                      <a href="https://twitter.com/hgautomation" style="color: #64748b; text-decoration: none; margin: 0 8px; font-size: 12px;">Twitter</a>
                      <span style="color: #334155;">&bull;</span>
                      <a href="https://wa.me/918320049749" style="color: #64748b; text-decoration: none; margin: 0 8px; font-size: 12px;">WhatsApp</a>
                    </p>
                    <p style="margin: 0; color: #334155; font-size: 10px;">
                      &copy; ${new Date().getFullYear()} HG Automation India &bull;
                      <a href="https://hgautomationindia.com" style="color: #475569; text-decoration: none;">hgautomationindia.com</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
Hi ${firstName},

Thank you for contacting HG Automation. We've received your inquiry about "${subject}" and our team is already on it.

You can expect a detailed response within 24 hours during business days.

Your Message:
"${message.substring(0, 250)}${message.length > 250 ? '...' : ''}"

Need immediate assistance?
  Phone: +91 83200 49749
  Email: bakarali@hgautomationindia.com
  Address: Building No. 70, Mominvad, Vaso, Kheda, Gujarat 387710

Warm regards,
Bakarali Momin
Founder & Proprietor, HG Automation
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
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #0f172a; padding: 32px 16px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 40px; text-align: center; border-radius: 16px 16px 0 0; border-bottom: 2px solid #2da0d4;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">
                      <span style="color: #ffffff;">HG</span>
                      <span style="color: #2da0d4;"> AUTOMATION</span>
                    </h1>
                    <p style="color: #64748b; margin: 6px 0 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;">Email Verification</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background: #ffffff; padding: 40px;">
                    <p style="margin: 0 0 8px; font-size: 18px; font-weight: 700; color: #0f172a; text-align: center;">Your Verification Code</p>
                    <p style="margin: 0 0 28px; font-size: 13px; color: #64748b; text-align: center;">
                      Enter this code to verify your email address. Expires in <strong style="color: #0f172a;">5 minutes</strong>.
                    </p>

                    <!-- OTP Code -->
                    <div style="background: linear-gradient(135deg, #0f172a, #1e293b); padding: 28px; border-radius: 14px; text-align: center; margin: 0 auto; max-width: 300px; border: 1px solid #334155;">
                      <p style="margin: 0; font-size: 40px; font-weight: 800; letter-spacing: 12px; color: #2da0d4; font-family: 'Courier New', monospace;">${otp}</p>
                    </div>

                    <p style="margin: 28px 0 0; font-size: 12px; color: #94a3b8; text-align: center; line-height: 1.6;">
                      If you didn't request this code, you can safely ignore this email.<br>
                      Do not share this code with anyone.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background: #0f172a; padding: 20px 40px; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #1e293b;">
                    <p style="color: #334155; margin: 0; font-size: 10px;">
                      &copy; ${new Date().getFullYear()} HG Automation India &bull;
                      <a href="https://hgautomationindia.com" style="color: #475569; text-decoration: none;">hgautomationindia.com</a>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
