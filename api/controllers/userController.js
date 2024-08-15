const User = require("../models/User");
const sendEmail = require("../utils/sendVerification");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  const { email } = req.body;
  console.log("hiiii");
  try {
    let user = await User.findOne({ email });
    let token;

    if (user) {
      token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      if (user.isVerified) {
        console.log(token);
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS only in production
            sameSite: "strict",
          })
          .status(200)
          .json({ message: "Logged in successfully", token });
      } else {
        const verificationCode = Math.floor(
          10000 + Math.random() * 90000
        ).toString();

        user.verificationCode = verificationCode;
        user.isVerified = false;

        await user.save();
        await sendEmail(
          user.email,
          "Please verify your email",
          `${verificationCode}`
        );

        res.status(201).json({ token, message: "Verification email sent" });
      }
    } else {
      // Create a new user if not found
      const verificationCode = Math.floor(
        10000 + Math.random() * 90000
      ).toString();

      console.log(verificationCode);

      const newUser = new User({
        email,
        verificationCode,
        isVerified: false,
      });

      console.log(newUser);

      await newUser.save();
      console.log("newUser");
      await sendEmail(
        newUser.email,
        "Please verify your email",
        `${verificationCode}`
      );

      token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      res.status(201).json({ token, message: "Verification email sent" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.uploadProfileImage = async (userId, filename) => {
  try {
    console.log(userId);
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    user.profileImage = filename; // Set the filename for the profile image
    console.log(user);
    await user.save();
  } catch (error) {
    throw new Error("Error updating profile image");
  }
};

exports.loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

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

    res.status(200).json({
      message: "Verification code sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server" });
  }
};

exports.logout = (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", // Ensure the path matches the one used when setting the cookie
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({ message: "Email verified" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const verificationCode = Math.floor(
      10000 + Math.random() * 90000
    ).toString();
    user.verificationCode = verificationCode;
    await user.save();

    let subject = "Please verify your email";

    await sendEmail(user.email, subject, `${verificationCode}`);

    res.status(200).json({ message: "Verification code resent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const {
    firstName,
    lastName,
    city,
    country,
    zipcode,
    deathDate,
    birthDate,
    profileImage,
  } = req.body;
  const userId = req.user.id;

  try {
    // Find the user by email
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (city) user.city = city;
    if (country) user.country = country;
    if (zipcode) user.zipcode = zipcode;
    if (birthDate) user.birthDate = birthDate;
    if (deathDate) user.deathDate = deathDate;
    if (profileImage) user.profileImage = profileImage;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    // Get userID from the request object (attached by protect middleware)
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user details
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      city: user.city,
      country: user.country,
      zipcode: user.zipcode,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
