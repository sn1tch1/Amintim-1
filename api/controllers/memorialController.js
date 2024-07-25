const User = require("../models/User");
const MemorialPage = require("../models/MemorialPage");

exports.createMemorialPage = async (req, res) => {
  const { userId, qrCode, details } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Here you should verify the QR code, for simplicity, we assume it's valid if user exists
    const memorialPage = await MemorialPage.create({ user: userId, details });

    res.status(201).json({ memorialPage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
