const express = require("express");
const {
  registerUser,
  verifyUser,
  loginUser,
  updateUser,
  resendVerificationCode,
  getUserDetails,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.post("/resend", resendVerificationCode);
router.put("/update", protect, updateUser);
router.get("/me", protect, getUserDetails);
module.exports = router;
