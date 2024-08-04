const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true }, // Ensure type is required
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }, // Ensure quantity is required
  keys: [{ type: String }], // Array of keys
});

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  deliveryInfo: {
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    address: { type: String, required: true },
    apartment: { type: String, required: false },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
  },
  items: [itemSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
