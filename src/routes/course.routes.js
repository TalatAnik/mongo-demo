const express = require("express");
const router = express.Router();
const { createCourse, deleteCourse } = require("../controllers/course.controller");


router.post(
  "/", 
  createCourse, 
  async (req, res) => {
    res.json(req.result);
  }
);

router.delete("/:courseId", deleteCourse);

module.exports = router;
