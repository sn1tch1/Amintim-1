const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cardName: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  isUsed: { type: Boolean, default: false }, // Add this field
});

module.exports = mongoose.model("Card", cardSchema);
