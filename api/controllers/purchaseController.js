const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const QRCode = require("qrcode");
const express = require("express");
const multer = require("multer");
const sendEmail = require("../utils/sendEmail"); // Make sure you have this function
const app = express();

app.use(express.json());

exports.purchaseSoulStar = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  console.log("purchaseSoulStar called");
  console.log(`userId: ${userId}`);

  app.use("/uploads", express.static(path.join(__dirname, "/uploads/QRs")));

  // Extract delivery information from the request body
  const { deliveryInfo } = req.body;

  if (!deliveryInfo) {
    return res
      .status(400)
      .json({ message: "Delivery information is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const qrCodeData = `https://Amintim.com/memorial/${userId}`;
    const qrCodeFilename = `${userId}_${Date.now()}.png`;
    const qrCodePath = path.join(__dirname, "/assets/QRs", qrCodeFilename);

    // Generate QR code and save it to disk
    await QRCode.toFile(qrCodePath, qrCodeData);

    const uploadDir = path.join(__dirname, "/uploads/QRs");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDir);
      },
      filename: function (req, file, cb) {
        const user = req.user;
        const userId = user ? user.id : "default";
        const ext = file.originalname.split(".").pop();
        const filename = `${userId}_${Date.now()}.${ext}`;
        cb(null, filename);
      },
    });

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 510 * 1024 * 1024, // 510 MB
      },
    });

    app.post(
      "/api/purchase/upload",
      upload.single("file"),
      async (req, res) => {
        if (!req.file) {
          return res.status(400).send("No file uploaded.");
        }
        try {
          console.log("Uploading file:", req.file.filename);
          await uploadProfileImage(req.user.id, req.file.filename);
          res.status(200).json({ filename: req.file.filename });
        } catch (error) {
          console.error("Error uploading file:", error);
          res.status(500).send("Error uploading file.");
        }
      }
    );

    console.log(`QR code generated and saved at: ${qrCodePath}`);

    // Save purchase information and QR code path in the database
    user.hasPurchasedSoulStar = true;
    user.qrCodePath = `/uploads/QRs/${qrCodeFilename}`;

    // Save delivery information
    user.deliveryInfo = deliveryInfo;

    await user.save();

    // Log email sending attempt
    console.log("Attempting to send email with QR code...");

    try {
      await sendEmail(
        user.email,
        "Your QR Code for Soul Star Purchase",
        "Please find attached your QR code for the Soul Star purchase.",
        [{ filename: qrCodeFilename, path: qrCodePath }]
      );

      console.log("Email successfully sent to:", user.email);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({ message: "Error sending email" });
    }

    res.status(200).json({ qrCodePath: user.qrCodePath });
  } catch (error) {
    console.error("Error generating or saving QR code:", error);
    res.status(400).json({ message: error.message });
  }
};
