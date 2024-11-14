const express = require("express");
const {
  purchaseSoulStar,
  euplatescCheckout,  
  getAllPurchases,
  redeemReferralCode,
  validateReferralCode,
} = require("../controllers/purchaseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseSoulStar);
router.post("/delete-purchase", protect, purchaseSoulStar);
router.post("/euplatesc", euplatescCheckout);
router.get("/", getAllPurchases);
router.post("/referral-code", protect, redeemReferralCode);
router.post("/check-code", validateReferralCode);

module.exports = router;
