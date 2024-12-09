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

    const resCourse = await newCourse.save();

    req.result = {
      status: 201,
      message: "Course created successfully",
      course: resCourse,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return res.status(500).json({ error: "Failed to create course" });
  }

  next();
};


const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    
    const videoFiles = [];
    course.chapters.forEach((chapter) => {
      chapter.videos.forEach((video) => {
        videoFiles.push(video.fileName);
      });
    });

    
    

    
    await Course.findByIdAndDelete(courseId);

    res
      .status(200)
      .json({ message: "Course and associated videos deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate("instructorId", "name") 
      .exec();

    const courseList = courses.map((course) => {
      // Calculate total number of videos
      const totalVideos = course.chapters.reduce((sum, chapter) => {
        return sum + chapter.videos.length;
      }, 0);

      return {
        id: course._id,
        title: course.title,
        description: course.description,
        instructorName: course.instructorId.name,
        instructorId: course.instructorId.id,
        numberOfVideos: totalVideos,
      };
    });

    

    res.status(200).json(courseList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};


const getCoursesByInstructor = async (req, res) => {
  const { instructorId } = req.params;

  try {
    
    const courses = await Course.find({ instructorId })
      .select("title description chapters createdAt") 
      .lean(); 

    if (!courses.length) {
      return res.status(404).json({ message: "No courses found for this instructor" });
    }

    
    const enrichedCourses = courses.map(course => ({
      id: course._id,
      title: course.title,
      description: course.description,
      chapters: course.chapters.length, 
      videos: course.chapters.reduce((total, chapter) => total + chapter.videos.length, 0), 
      createdAt: course.createdAt,
    }));

    res.status(200).json(enrichedCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getCourseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId)
      .populate("instructorId", "name") // Populate instructor details
      .populate({
        path: "chapters.videos", // Populate videos within chapters
        model: "Video", // Reference the Video model
        select: "title description filename url", // Include specific fields from Video
      })
      .lean(); // Convert Mongoose document to plain JavaScript object

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const courseDetails = {
      id: course._id,
      title: course.title,
      description: course.description,
      instructor: course.instructorId.name,
      instructorId: course.instructorId._id,
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
      chapters: course.chapters.map((chapter) => ({
        id: chapter._id,
        title: chapter.title,
        description: chapter.description,
        videos: chapter.videos.map((video) => ({
          id: video._id,
          title: video.title,
          description: video.description,
          filename: video.filename,
          url: video.url,
        })),
      })),
    };

    res.status(200).json(courseDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCoursesByInstructor,
  getCourseDetails
};
