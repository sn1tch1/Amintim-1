const Price = require("../models/Price"); // Adjust the path as per your project structure

exports.addOrUpdatePrices = async (req, res) => {
  try {
    const existingPrice = await Price.findOne();
    if (existingPrice) {
      const updatedPrice = await Price.findByIdAndUpdate(
        existingPrice._id,
        req.body,
        { new: true }
      );
      return res.status(200).json({ success: true, data: updatedPrice });
    }
    const newPrice = await Price.create(req.body);
    res.status(201).json({ success: true, data: newPrice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPrices = async (req, res) => {
  try {
    const prices = await Price.findOne();
    res.status(200).json({ success: true, data: prices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
