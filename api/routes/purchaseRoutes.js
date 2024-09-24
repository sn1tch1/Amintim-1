const express = require("express");
const {
  purchaseSoulStar,
  getAllPurchases,
} = require("../controllers/purchaseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseSoulStar);
router.get("/", getAllPurchases);

module.exports = router;
