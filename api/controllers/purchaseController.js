const path = require("path");
const User = require("../models/User");
const Purchase = require("../models/purchase");
const express = require("express");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail"); // Ensure this function is available
const app = express();
const { getEuPlatescRequest } = require('../lib/euplatesc/index');

app.use(express.json());

const euPlatescConfig = {
  "name": "Amintim",
  "domain": "amintim.ro",
  "env": "staging",
  "merchantId": "44841004414",
  "secretKey": "CA87AF1A3A1FFBEFFDAC5B5C64AD74C5C38A0720"
}

const euPlatescConfigProd = {
  "name": "Amintim",
  "domain": "amintim.ro",
  "env": "staging",
  "merchantId": "44841004414",
  "secretKey": "CA87AF1A3A1FFBEFFDAC5B5C64AD74C5C38A0720"
}

exports.euplatescCheckout = async (req, res) => {
  console.log("Start euplatescCheckout");

  try {
    if (req.body) {
      const order = req.body;
      if (order.env && order.env === "prod") {
        euPlatescConfig = euPlatescConfigProd;
      }
      euPlatescConfig.env = order.env;

      const dataReq = await getEuPlatescRequest(euPlatescConfig, order);

      res.status(200).send({
        success: dataReq != null,
        message: "Function euplatescCheckout was completed successfully!",
        data: dataReq,
      });
    }
  } catch (err) {
    console.log("euplatescCheckout failed :( Please check the log with error: ", err);
    res.status(400).send({ message: err.message });

    throw err;
  }
};

exports.purchaseSoulStar = async (req, res) => {
  const userId = req.user.id;

  // Extract delivery information and items from the request body
  const { deliveryInfo, items } = req.body;

  if (!deliveryInfo || !items || !Array.isArray(items)) {
    return res
      .status(400)
      .json({ message: "Delivery information and items are required" });
  }

  // Validate items
  for (const item of items) {
    if (!item.id || !item.type || !item.price || !item.quantity) {
      return res.status(400).json({ message: "Invalid item data" });
    }
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate totalBuy1 and totalBuy2 quantities
    let totalBuy1 = 0;
    let totalBuy2 = 0;

    items.forEach((item) => {
      if (item.type === "buy1") {
        totalBuy1 += item.quantity;
      } else if (item.type === "buy2") {
        totalBuy2 += item.quantity;
      }
    });

    let totalKeys = totalBuy1 + totalBuy2 * 2;

    // Generate all keys
    const allKeys = [];
    for (let i = 0; i < totalKeys; i++) {
      const key = crypto.randomBytes(16).toString("hex");
      allKeys.push(key);
      console.log(`Generated key: ${key}`);
    }

    // Distribute the keys to items
    const itemKeys = items.map((item) => {
      const keys = [];
      const keysNeeded =
        item.type === "buy1" ? item.quantity : item.quantity * 2;
      for (let i = 0; i < keysNeeded; i++) {
        keys.push({ key: allKeys.pop(), isUsed: false });
      }
      return { ...item, keys };
    });

    const purchase = new Purchase({
      userId: user._id,
      items: itemKeys,
      deliveryInfo,
    });

    await purchase.save();

    // Log email sending attempt
    console.log("Attempting to send email with keys...");

    try {
      const keysFlat = itemKeys.flatMap((item) => item.keys.map((k) => k.key));
      const subject = "Your Soul Star Purchase Keys";

      await sendEmail(user.email, subject, keysFlat);

      console.log("Email successfully sent to:", user.email);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({ message: "Error sending email" });
    }

    res.status(200).json({ keys: itemKeys });
  } catch (error) {
    console.error("Error generating or saving keys:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getPurchase = async (req, res) => {
  try {
    const { key } = req.params;

    const purchase = await Purchase.findOne({ "items.keys.key": key });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
      // res.status(200).json(null);
    }
    res.status(200).json({ purchase });
  } catch (error) {
    console.error("Error fetching purchase:", error);
    res.status(500).json({ message: "Error fetching purchase" });
  }
}

exports.deletePurchase = async (req, res) => {
  try {
    const { key } = req.params;
    const purchase = await Purchase.findOneAndDelete({ "items.keys.key": key });
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error("Error deleting purchase:", error);
    res.status(500).json({ message: "Error deleting purchase" });
  }
}

exports.getAllPurchases = async (req, res) => {
  try {
    // Fetch all purchases from the database
    const purchases = await Purchase.find().populate("userId", "name email");

    if (!purchases || purchases.length === 0) {
      return res.status(404).json({ message: "No purchases found" });
    }

    res.status(200).json({ purchases });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Error fetching purchases" });
  }
};

exports.redeemReferralCode = async (req, res) => {
  const { referralCode } = req.body;
  const userId = req.user.id;

  try {
    // Find the partner by referral code
    const partner = await User.findOne({ referralCode, role: "partner" });
    if (!partner) {
      return res.status(400).json({ message: "Invalid referral code" });
    }

    // Check if the user has already used this referral code
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if this referral code has already been used by the user
    if (user.referralCodeUsedBy.includes(partner._id)) {
      return res
        .status(400)
        .json({ message: "You have used the referral Code, Try Another One" });
    }

    // Add the user to the partner's referralCodeUsedBy array
    partner.referralCodeUsedBy.push(user._id);
    await partner.save();

    // Add the partner's referral code to the user's referralCodeUsedBy array
    user.referralCodeUsedBy.push(partner._id);
    await user.save();

    // Apply 20% discount
    const discount = 0.2; // 20% discount

    // Return the discount value and partner info to the client
    res.status(200).json({
      message: "Referral code redeemed successfully",
      discount: discount * 100,
      partner: {
        partnerId: partner._id,
        partnerName: `${partner.firstName} ${partner.lastName}`,
      },
    });
  } catch (error) {
    console.error("Error redeeming referral code:", error);
    res.status(500).json({ message: "Error redeeming referral code" });
  }
};

exports.validateReferralCode = async (req, res) => {
  const { referralCode } = req.body;

  try {
    // Find the partner by referral code
    const partner = await User.findOne({ referralCode, role: "partner" });
    if (!partner) {
      return res.status(400).json({ message: "Invalid referral code" });
    }

    // Return partner info if referral code is valid
    res.status(200).json({
      message: "Referral code is valid",
      partner: {
        partnerId: partner._id,
        partnerName: `${partner.firstName} ${partner.lastName}`,
      },
    });
  } catch (error) {
    console.error("Error validating referral code:", error);
    res.status(500).json({ message: "Error validating referral code" });
  }
};
