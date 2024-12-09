const express = require("express");
const router = express.Router();
const {
  upload,
  addVideoToChapter,
  uploadVideoFile,
  addVideoMetadata
} = require("../controllers/video.controller");



router.post(
  "/upload/:courseId/:chapterId",
  upload.single("video"), // Handle file upload
  uploadVideoFile
);

router.post("/:courseId/:chapterId/metadata", addVideoMetadata);

module.exports = router;
