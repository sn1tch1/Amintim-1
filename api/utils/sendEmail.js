require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@amintim.ro",
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const sendEmail = async (to, subject, keysFlat) => {
  const keysList = keysFlat.join("<br>"); // Create a line-separated list of keys

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #007BFF;">Amintim</h1>
      <p style="font-size: 16px; line-height: 1.5;">Hello,</p>
      <p style="font-size: 16px; line-height: 1.5;">Thank you for your purchase from Amintim! We're excited to let you know that you have purchased a Soul Star.</p>
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
