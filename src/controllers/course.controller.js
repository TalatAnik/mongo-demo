const Course = require("../models/Course.model");

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

module.exports = {
  createCourse,
};
