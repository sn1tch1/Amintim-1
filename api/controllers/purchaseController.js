const User = require("../models/User");
const QRCode = require("qrcode");

exports.purchaseSoulStar = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const qrCodeData = `https://Amintim.com/memorial/${userId}`;
    const qrCodePath = path.join("uploads", `${userId}.png`);

    // Generate QR code and save it to disk
    await QRCode.toFile(qrCodePath, qrCodeData);

    // Save purchase information and QR code path in the database
    user.hasPurchasedSoulStar = true;
    user.qrCodePath = qrCodePath;
    await user.save();

    res.status(200).json({ qrCodePath });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};