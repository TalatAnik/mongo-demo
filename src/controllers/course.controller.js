const Course = require("../models/Course.model");
const fs = require("fs");
const path = require("path");


const createCourse = async (req, res, next) => {
  const { title, description, instructorId } = req.body;

  if (!title || !description || !instructorId) {
    return res
      .status(400)
      .json({ error: "Title, description, and instructorId are required" });
  }

  try {
    const newCourse = new Course({
      title,
      description,
      instructorId,
    });

    await newCourse.save();

    req.result = {
      status: 201,
      message: "Course created successfully",
      course: newCourse,
    }
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ error: "Failed to create course" });
  }

  next();
};


const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Collect all video file names from the course's chapters
    const videoFiles = [];
    course.chapters.forEach((chapter) => {
      chapter.videos.forEach((video) => {
        videoFiles.push(video.fileName);
      });
    });

    // Delete the video files from the file system
    videoFiles.forEach((fileName) => {
      const filePath = path.join(__dirname, "../../uploads/videos", fileName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file ${fileName}:`, err);
        } else {
          console.log(`Deleted file: ${fileName}`);
        }
      });
    });

    // Remove the course from the database
    await Course.findByIdAndDelete(courseId);

    res
      .status(200)
      .json({ message: "Course and associated videos deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCourse,
  deleteCourse
};
