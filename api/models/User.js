const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  profileImage: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  city: { type: String },
  country: { type: String },
  zipcode: { type: String },
  password: { type: String },
  qrCodePath: {type : String},
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  hasPurchased: { type: Boolean, default: false }, // Add this field
  createdAt: { type: Date, default: Date.now },
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
