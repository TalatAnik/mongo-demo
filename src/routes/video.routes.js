const express = require("express");
const router = express.Router();

// Example: Fetch all videos
router.get("/", (req, res) => {
  res.json({ message: "Video routes working!" });
});

module.exports = router;
