const express = require("express");
const {
  registerUser,
  verifyUser,
  loginUser,
  updateUser,
  resendVerificationCode,
  getUserDetails,
  logout,
  getAllUsers,
  changeUserRole,
  deleteUser,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.post("/verify", verifyUser);
router.post("/resend", resendVerificationCode);
router.put("/update", protect, updateUser);
router.put("/change-role", changeUserRole);
router.get("/me", protect, getUserDetails);
router.delete("/user/:id", deleteUser);
router.get("/", getAllUsers);
module.exports = router;
