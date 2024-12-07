const express = require("express");
const router = express.Router();
const {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCoursesByInstructor,
} = require("../controllers/course.controller");


router.post(
  "/", 
  createCourse, 
  async (req, res) => {
    res.json(req.result);
  }
);

router.get("/", getAllCourses);
router.get("/instructor/:instructorId", getCoursesByInstructor);

router.delete("/:courseId", deleteCourse);

module.exports = router;
