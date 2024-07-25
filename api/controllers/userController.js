const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.create({ email, password });

    const verificationCode = Math.floor(
      10000 + Math.random() * 90000
    ).toString();
    user.verificationCode = verificationCode;
    await user.save();

    await sendEmail(
      user.email,
      "Verify your email",
      `Your verification code is ${verificationCode}`
    );

    res.status(201).json({
      message:
        "User registered. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({ message: "Email verified", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
