const express = require("express");
const router = express.Router();
const {
  addOrUpdatePrices,
  getPrices,
} = require("../controllers/priceController");

// Route to add or update prices
router.post("", addOrUpdatePrices);

// Route to get prices
router.get("/", getPrices);

module.exports = router;
