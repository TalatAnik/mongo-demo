const express = require("express");
const router = express.Router();
const User = require("../models/User.model");


router.get("/:instructorId", async (req, res) => {
  const { instructorId } = req.params;

  try {
    // Find instructor by ID
    const instructor = await User.findById(instructorId, "name");

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({
      instructorId: instructor._id,
      name: instructor.name,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
