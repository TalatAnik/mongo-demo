const express = require("express");
const router = express.Router();

// Example: Fetch all videos
router.get("/", (req, res) => {
  res.json({ message: "Video routes working!" });
});

const {
  upload,
  addVideoToChapter,
} = require("../controllers/video.controller");

router.post(
  "/:courseId/chapters/:chapterId/videos",
  upload.single("video"),
  addVideoToChapter
);

module.exports = router;
