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
      <p style="font-size: 16px; line-height: 1.5;">Salutare!</p>
      <p style="font-size: 16px; line-height: 1.5;">Îți mulțumim pentru achiziția ta de la Amintim. Suntem încântați să te anunțăm că ai cumpărat un Profil Memorial QR - un mod minunat de a onora amintirea celor dragi.</p> 
      <p style="font-size: 16px; line-height: 1.5;">Dacă ai întrebări sau ai nevoie de asistență, nu ezita să <a href="mailto:contact@amintim.ro" style="color: #007BFF;">contactezi echipa noastră</a>. Suntem aici să te ajutăm!</p>
      <p style="font-size: 16px; line-height: 1.5;">Toate cele bune,</p>
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
