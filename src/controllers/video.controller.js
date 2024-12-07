const multer = require("multer");
const path = require("path");
const Course = require("../models/Course.model");
const Video = require("../models/Video.model"); // Assuming video model exists for metadata

// Set up multer to store the video files with custom naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/"); // Define where the files will be saved
  },
  filename: (req, file, cb) => {
    // Rename file to instructorId+chapterId+timestamp
    const { courseId, chapterId } = req.params;
    const timestamp = Date.now();
    cb(
      null,
      `${courseId}-${chapterId}-${timestamp}${path.extname(file.originalname)}`
    );
  },
});

// Filter to allow only video files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });


const uploadVideoFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No video file uploaded" });
  }

  try {
    // Return file information for confirmation
    res.status(201).json({
      message: "Video uploaded successfully",
      fileName: req.file.filename,
      filePath: `uploads/videos/${req.file.filename}`, // Path for debugging
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during file upload" });
  }
};

const addVideoMetadata = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description, videoId } = req.body;

  try {
    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the chapter
    const chapter = course.chapters.id(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Find the video by videoId
    const video = chapter.videos.id(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Update video metadata
    video.title = title;
    video.description = description;

    // Save the updated course
    await course.save();

    res.status(200).json({
      message: "Video metadata added successfully",
      video,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  upload,
  addVideoMetadata,
  uploadVideoFile
};
