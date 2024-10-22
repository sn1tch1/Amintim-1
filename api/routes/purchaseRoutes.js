const express = require("express");
const {
  purchaseSoulStar,
  getAllPurchases,
  redeemReferralCode,
} = require("../controllers/purchaseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseSoulStar);
router.get("/", getAllPurchases);
router.post("/referral-code", protect, redeemReferralCode);

module.exports = router;
