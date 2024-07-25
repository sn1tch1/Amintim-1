const mongoose = require("mongoose");

const memorialPageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  details: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MemorialPage = mongoose.model("MemorialPage", memorialPageSchema);
module.exports = MemorialPage;
