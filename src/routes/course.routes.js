const express = require("express");
const router = express.Router();

// Example: Fetch all courses
router.get("/", (req, res) => {
  res.json({ message: "Course routes working!" });
});

module.exports = router;
