const express = require("express");
const router = express.Router();
const {
  createTribute,
  getAllTributes,
  getTributeById,
  updateTribute,
  deleteTribute,
} = require("../controllers/memorialController");
const { protect } = require("../middleware/authMiddleware.js");

// Create a new tribute
router.post("/create/:id", createTribute);

// Get all tributes for a memorial page
router.get("/memorialPage/:id", getAllTributes);

// Get a tribute by ID
router.get("/:id", getTributeById);

// Update a tribute
router.put("/:id", updateTribute);

// Delete a tribute
router.delete("/:id", deleteTribute);

module.exports = router;
