const path = require("path");
const User = require("../models/User");
const Card = require("../models/purchase");
const express = require("express");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail"); // Ensure this function is available
const app = express();

app.use(express.json());

exports.purchaseSoulStar = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  console.log("purchaseSoulStar called");
  console.log(`userId: ${userId}`);

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

    // Generate a unique key
    const key = crypto.randomBytes(16).toString("hex");

    console.log(`Key generated: ${key}`);

    // Create a new card entry
    const card = new Card({
      userId: user._id,
      cardName: "Soul Star", // Customize this as needed
      key,
    });

    await card.save();

    // Save delivery information
    user.deliveryInfo = deliveryInfo;

    await user.save();

    // Log email sending attempt
    console.log("Attempting to send email with key...");

    try {
      await sendEmail(
        user.email,
        "Your Key for Soul Star Purchase",
        `Your key for the Soul Star purchase is: ${key}`
      );

      console.log("Email successfully sent to:", user.email);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({ message: "Error sending email" });
    }

    res.status(200).json({ key });
  } catch (error) {
    console.error("Error generating or saving key:", error);
    res.status(400).json({ message: error.message });
  }
};
