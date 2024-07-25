const express = require("express");
const { createMemorialPage } = require("../controllers/memorialController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createMemorialPage);

module.exports = router;
