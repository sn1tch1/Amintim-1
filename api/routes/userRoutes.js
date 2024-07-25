const express = require("express");
const {
  registerUser,
  verifyUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyUser);

module.exports = router;
