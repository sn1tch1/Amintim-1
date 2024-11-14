const express = require("express");
const {
  purchaseSoulStar,
  getPurchase,
  deletePurchase,
  euplatescCheckout,  
  getAllPurchases,
  redeemReferralCode,
  validateReferralCode,
} = require("../controllers/purchaseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseSoulStar);
router.get("/get-purchase/:key", getPurchase);
router.delete("/delete-purchase/:key", deletePurchase);
router.post("/euplatesc", euplatescCheckout);
router.get("/", getAllPurchases);
router.post("/referral-code", protect, redeemReferralCode);
router.post("/check-code", validateReferralCode);

module.exports = router;
