const mongoose = require("mongoose");

const tributeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const memorialPageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String },
  profileImage: { type: String },
  coverImage: { type: String },
  about: { type: String },
  note: { type: String },
  birthDate: { type: Date },
  deathDate: { type: Date, required: true },
  gallery: {
    photos: [{ type: String }],
    videos: [{ type: String }],
  },
  tributes: [tributeSchema],
  createdAt: { type: Date, default: Date.now },
  isHuman: { type: Boolean, required: true }, // New boolean field to distinguish between human and pet
});

const MemorialPage = mongoose.model("MemorialPage", memorialPageSchema);
const Tribute = mongoose.model("Tribute", tributeSchema);

module.exports = { MemorialPage, Tribute };
