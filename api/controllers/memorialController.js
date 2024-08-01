const { MemorialPage, Tribute } = require("../models/MemorialPage");

// Create a new memorial page
exports.createMemorialPage = async (req, res) => {
  const user = req.user.id;
  const {
    title,
    firstName,
    middleName,
    profileImage,
    coverImage,
    lastName,
    note,
    about,
    gallery,
    birthDate,
    deathDate,
    isHuman,
  } = req.body;

  try {
    const newMemorialPage = new MemorialPage({
      user,
      title,
      firstName,
      middleName,
      profileImage,
      coverImage,
      lastName,
      note,
      about,
      gallery,
      birthDate,
      deathDate,
      isHuman,
    });

    await newMemorialPage.save();

    res.status(201).json({
      message: "Memorial Page created successfully",
      memorialPage: newMemorialPage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all memorial pages
exports.getAllMemorialPages = async (req, res) => {
  try {
    const memorialPages = await MemorialPage.find().populate("user");
    res.status(200).json(memorialPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all memorial pages by user
exports.getMemorialPagesByUser = async (req, res) => {
  try {
    const user = req.user.id;
    // const user = req.params.userId;
    console.log(user);
    const memorialPages = await MemorialPage.find({ user });
    console.log(memorialPages);
    if (memorialPages.length === 0) {
      return res
        .status(404)
        .json({ message: "No memorial pages found for this user" });
    }
    res.status(200).json(memorialPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a memorial page by ID
exports.getMemorialPageById = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findById(req.params.id).populate(
      "user"
    );
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json(memorialPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a memorial page
exports.updateMemorialPage = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    console.log(memorialPage);
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json(memorialPage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a memorial page
exports.deleteMemorialPage = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findByIdAndDelete(req.params.id);
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json({ message: "Memorial page deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new tribute
exports.createTribute = async (req, res) => {
  const user = req.user.id;
  try {
    // Find the memorial page by ID
    const memorialPage = await MemorialPage.findById(req.params.id);
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }

    // Create a new tribute
    const tribute = new Tribute({
      user,
      message: req.body.message,
      memorialPage: req.params.id, // Set the memorial page reference
    });

    // Save the tribute
    await tribute.save();

    // Add the tribute ID to the tributes array of the memorial page
    memorialPage.tributes.push(tribute._id);

    // Save the updated memorial page
    await memorialPage.save();

    // Populate the tributes field after saving the tribute
    await memorialPage.populate("tributes");

    // Return the updated memorial page with populated tributes
    res.status(201).json(memorialPage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all tributes for a memorial page
exports.getAllTributes = async (req, res) => {
  try {
    const memorialPage = await MemorialPage.findById(req.params.id).populate({
      path: "tributes",
      populate: {
        path: "user", // Populate user information within tributes
        select: "firstName profileImage", // Select only the fields you need
      },
    });
    if (!memorialPage) {
      return res.status(404).json({ message: "Memorial page not found" });
    }
    res.status(200).json(memorialPage.tributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a tribute by ID
exports.getTributeById = async (req, res) => {
  try {
    const tribute = await Tribute.findById(req.params.id);
    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }
    res.status(200).json(tribute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a tribute
exports.updateTribute = async (req, res) => {
  try {
    const tribute = await Tribute.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }
    res.status(200).json(tribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a tribute
exports.deleteTribute = async (req, res) => {
  try {
    const tribute = await Tribute.findByIdAndDelete(req.params.id);
    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }
    const memorialPage = await MemorialPage.findOne({
      "tributes._id": tribute._id,
    });
    if (memorialPage) {
      memorialPage.tributes.pull(tribute._id);
      await memorialPage.save();
    }
    res.status(200).json({ message: "Tribute deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
