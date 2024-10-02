const mongoose = require("mongoose");

const tributeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  profileImage: { type: String },
  firstName: { type: String },
  message: { type: String, required: true },
  memorialPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MemorialPage",
    required: true,
  }, // Reference to MemorialPage
  createdAt: { type: Date, default: Date.now },
});

const memorialPageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String },
  animal: { type: String },
  breed: { type: String },
  firstName: { type: String },
  QRCode: { type: String },
  QRCodeStatus: {
    type: String,
    enum: ["Printed", "Not Printed"],
    default: "Not Printed",
  },
  middleName: { type: String },
  lastName: { type: String },
  profileImage: { type: String },
  coverImage: { type: String },
  about: { type: String },
  note: { type: String },
  birthDate: { type: Date },
  deathDate: { type: Date },
  gallery: [{ type: String }],
  videoGallery: [{ type: String }],
  audioGallery: [{ type: String }],
  youtubeLinks: [{ type: String }],
  tributes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tribute" }],
  createdAt: { type: Date, default: Date.now },
  isHuman: { type: Boolean, required: true }, // New boolean field to distinguish between human and pet
});

const MemorialPage = mongoose.model("MemorialPage", memorialPageSchema);
const Tribute = mongoose.model("Tribute", tributeSchema);

module.exports = { MemorialPage, Tribute };
