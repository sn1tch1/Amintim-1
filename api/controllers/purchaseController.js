const User = require("../models/User");
const QRCode = require("qrcode");

exports.purchaseSoulStar = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const qrCodeData = `https://yourwebsite.com/memorial/${userId}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    // Here you should save the QR code to the database or send it to the user via email
    // For simplicity, we are returning it in the response
    res.status(200).json({ qrCode });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
