const express = require("express");
const router = express.Router();
const {
  createTribute,
  getAllTributes,
  getTributeById,
  updateTribute,
  deleteTribute,
} = require("../controllers/memorialController");

// Create a new tribute
router.post("/", createTribute);

// Get all tributes for a memorial page
router.get("/memorialPage/:memorialPageId", getAllTributes);

// Get a tribute by ID
router.get("/:id", getTributeById);

// Update a tribute
router.put("/:id", updateTribute);

// Delete a tribute
router.delete("/:id", deleteTribute);

module.exports = router;
