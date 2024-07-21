const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  // Fetch user profile
  res.send(`Profile of user with ID ${req.userId}`);
});

module.exports = router;
