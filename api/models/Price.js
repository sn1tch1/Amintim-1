const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  price1: {
    actualPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
  },
  price2: {
    actualPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
  },
  createdAt: { type: Date, default: Date.now },
});

const Price = mongoose.model("Price", priceSchema);

module.exports = Price;
