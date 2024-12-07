const mongoose = require("mongoose");
const video = require("../models/Video.model")

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videos: ["Video"], // Array of videos
});

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chapters: [ChapterSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
