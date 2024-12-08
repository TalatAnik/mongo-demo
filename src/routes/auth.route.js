const express = require("express");
const router = express.Router();
const Instructor = require("../models/User.model"); // Import your Instructor model


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    
    const instructor = await Instructor.findOne({ name: username });

    
    if (!instructor || instructor.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    
    return res.status(200).json({ instructorId: instructor._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
