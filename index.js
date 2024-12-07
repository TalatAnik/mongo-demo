const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


// Routes
const userRoutes = require("./src/routes/user.routes");
const courseRoutes = require("./src/routes/course.routes");
const videoRoutes = require("./src/routes/video.routes");
const chapterRoutes = require("./src/routes/chapter.route");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/videos", videoRoutes);
app.use('/api/chapters', chapterRoutes); // Register chapter routes

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

mongoose.connect(
  "mongodb+srv://pranxta007:hd5AD3uOMLDJixxb@cluster0.kjrip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(()=>{
    console.log("Client Connected!");
    const PORT = 5000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
});



