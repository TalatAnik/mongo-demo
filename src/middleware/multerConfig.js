const multer = require("multer");
const path = require("path");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads")); // Save files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    const instructorId = req.body.instructorId;
    const chapterId = req.params.chapterId;
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const newFilename = `${instructorId}-${chapterId}-${timestamp}${ext}`;
    cb(null, newFilename);
  },
});

// Filter for video files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mkv|avi/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

module.exports = multer({ storage, fileFilter });
