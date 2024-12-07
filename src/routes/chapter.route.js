const express = require("express");
const router = express.Router();
const { addChapterToCourse } = require("../controllers/chapter.controller");

// Route to add a chapter to a course
router.post(
  "/:courseId",
  addChapterToCourse,
  async (req, res) => {
    res.json(req.result);
  }
);

module.exports = router;
