const express = require("express");
const router = express.Router();
const {
  createMemorialPage,
  getAllMemorialPages,
  getMemorialPageById,
  updateMemorialPage,
  deleteMemorialPage,
  getMemorialPagesByUser,
} = require("../controllers/memorialController");
const { protect } = require("../middleware/authMiddleware.js");

// Create a new memorial page
router.post("/", protect, createMemorialPage);

// Get all memorial pages
router.get("/", getAllMemorialPages);

// Get a memorial page by ID
router.get("/:id", getMemorialPageById);

// Get all memorial pages by user
router.get("/user/:userId", protect, getMemorialPagesByUser);

// Update a memorial page
router.put("/:id", updateMemorialPage);

// Delete a memorial page
router.delete("/:id", deleteMemorialPage);

module.exports = router;
