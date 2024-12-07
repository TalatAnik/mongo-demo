// src/controllers/chapter.controller.js

const Course = require("../models/Course.model");

// Controller function to add a chapter to a course
const addChapterToCourse = async (req, res, next) => {
  const { courseId } = req.params; // Get course ID from the URL parameter
  const { title, description } = req.body; // Get chapter details from the request body

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new chapter
    const newChapter = {
      title,
      description,
      videos: [], 
    };
    console.log("params found: ",newChapter);

    // Push the new chapter into the chapters array
    course.chapters.push(newChapter);

    // Save the updated course document
    await course.save();

    req.result = {
      status: 201,
      message: "Chapter created successfully",
      chapter: newChapter,
    };
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
  next();
};

module.exports = {
  addChapterToCourse,
};
