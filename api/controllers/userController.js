const User = require("../models/User");
const sendEmail = require("../utils/sendVerification");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let token;

    // Create a new user if not found
    const verificationCode = Math.floor(
      10000 + Math.random() * 90000
    ).toString();

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password,
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
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    // Generate JWT token
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
      .json({ message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.registerOrLoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if not found
      const verificationCode = Math.floor(
        10000 + Math.random() * 90000
      ).toString();

      user = new User({
        email,
        password,
        verificationCode,
        isVerified: false,
      });

      await user.save();
      await sendEmail(
        user.email,
        "Please verify your email",
        `${verificationCode}`
      );
      return res.status(201).json({
        message: "User registered successfully. Verification email sent.",
      });
    } else {
      if (!user.isVerified) {
        return res
          .status(204)
          .json({ message: "Verificați mai întâi e-mailul" });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
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
      .json({ message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
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
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find().populate(
      "referralCodeUsedBy",
      "firstName lastName email"
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Send the list of users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPartnerReferrals = async (req, res) => {
  try {
    const partnerId = req.user.id; // Assuming you get the logged-in partner ID from the token
    const partner = await User.findById(partnerId);

    if (!partner || partner.role !== "partner") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const referrals = await User.find({
      _id: { $in: partner.referralCodeUsedBy },
    }).select("firstName lastName email city country");

    res.status(200).json({
      referralCode: partner.referralCode,
      referralCodeUsedBy: referrals, // List of users referred by this partner
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.changeUserRole = async (req, res) => {
  const { userId, newRole } = req.body; // Assuming you send userId and newRole in the request body

  try {
    // Check if the provided newRole is valid
    const validRoles = ["admin", "user", "partner"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role
    user.role = newRole;
    await user.save();

    res.status(200).json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from the URL parameter

  try {
    const user = await User.findByIdAndDelete(id); // Find and delete the user by ID

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
