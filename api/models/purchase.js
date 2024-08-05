const mongoose = require("mongoose");
const { Schema } = mongoose;

const keySchema = new Schema({
  key: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
});

const itemSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  keys: [keySchema], // Array of key objects
});

const purchaseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  deliveryInfo: {
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    address: { type: String, required: true },
    apartment: { type: String },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
  },
  items: [itemSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
