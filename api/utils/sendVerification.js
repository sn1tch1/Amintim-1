require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your Outlook email address
    pass: process.env.EMAIL_PASS, // your Outlook email password
  },
});

const sendEmail = async (to, subject, verificationCode) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #007BFF;">Amintim</h1>
      <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
      <p style="font-size: 16px; line-height: 1.5;">Thank you for your Signing up in Amintim! We're excited to welcome you.</p>
      <p style="font-size: 16px; line-height: 1.5;"><strong>Verify Your Email</strong></p>
      <p style="font-size: 16px; line-height: 1.5;"><strong>Your Verification Code is:</strong> <code style="background: #f1f1f1; padding: 4px; border-radius: 4px;">${verificationCode}</code></p>
      <p style="font-size: 16px; line-height: 1.5;">If you have any questions or need assistance, feel free to <a href="mailto:support@amintim.com" style="color: #007BFF;">contact our support team</a>.</p>
      <p style="font-size: 16px; line-height: 1.5;">Best regards,</p>
      <p style="font-size: 16px; line-height: 1.5;">The Amintim Team</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
