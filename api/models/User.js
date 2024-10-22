const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  country: { type: String },
  zipcode: { type: String },
  password: { type: String },
  qrCodePath: { type: String },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  hasPurchased: { type: Boolean, default: false },
  referralCode: { type: String },
  referralCodeUsedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  role: {
    type: String,
    enum: ["admin", "user", "partner"],
    default: "user", // Default to "user"
  },
  deliveryInfo: {
    firstName: { type: String },
    lastName: { type: String },
    apartment: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  if (this.role === "partner" && !this.referralCode) {
    this.referralCode = `PARTNER-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  }
  next();
});

userSchema.pre("save", function (next) {
  // If the role is changed to partner and no referralCode exists, generate one
  if (
    this.isModified("role") &&
    this.role === "partner" &&
    !this.referralCode
  ) {
    this.referralCode = `PARTNER-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
