const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video", // Reference to the Video model
    },
  ],
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
