const express = require("express");
const { purchaseSoulStar } = require("../controllers/purchaseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/purchase", protect, purchaseSoulStar);

module.exports = router;
