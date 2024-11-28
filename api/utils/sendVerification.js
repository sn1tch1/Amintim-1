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

const sendEmail = async (to, subject, verificationCode) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #007BFF;">Amintim</h1>
      <p style="font-size: 16px; line-height: 1.5;">Salutare,</p>
      <p style="font-size: 16px; line-height: 1.5;">Îți mulțumim pentru înregistrarea pe Amintim! Suntem onorați să te avem alături.</p>
      <p style="font-size: 16px; line-height: 1.5;"><strong>Verifică-ți Adresa de Email</strong></p>
      <p style="font-size: 16px; line-height: 1.5;"><strong>Codul Tău de Verificare este:</strong> <code style="background: #f1f1f1; padding: 4px; border-radius: 4px;">${verificationCode}</code></p>
      <p style="font-size: 16px; line-height: 1.5;">Dacă ai întrebări sau ai nevoie de ajutor, nu ezita să <a href="mailto:contact@amintim.ro" style="color: #007BFF;">contactezi echipa noastră de suport</a>.</p>
      <p style="font-size: 16px; line-height: 1.5;">Cele mai bune urări,</p>
      <p style="font-size: 16px; line-height: 1.5;">Echipa Amintim</p>
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
