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


const addVideoToChapter = async (req, res) => {
  const { courseId, chapterId } = req.params;
  const { title, description } = req.body;
  const videoFile = req.file;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the chapter by ID
    const chapter = course.chapters.id(chapterId);

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    // Create video metadata to be saved in the database
    const newVideo = {
      title,
      description,
      fileName: videoFile.filename, // Store the video file name for later access
    };

    // Push the video to the chapter's videos array
    chapter.videos.push(newVideo);

    // Save the updated course document
    await course.save();

    res.status(201).json({
      message: "Video added successfully",
      video: newVideo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  upload,
  addVideoToChapter,
};
