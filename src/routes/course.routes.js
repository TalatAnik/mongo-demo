const express = require("express");
const router = express.Router();
const { createCourse } = require("../controllers/course.controller");




router.post("/", createCourse, async (req, res) => {
  res.json(req.result);
});

module.exports = router;
