const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
// require("dotenv").config(); 

// Routes
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/video-platform-demo";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/users", userRoutes); 
app.use("/api/courses", courseRoutes); 
app.use("/api/videos", videoRoutes); 


app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
