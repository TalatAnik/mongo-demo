const mongoose = require("mongoose");
const User = require("../models/User.model");

// MongoDB Connection
const MONGO_URI ="mongodb+srv://pranxta007:hd5AD3uOMLDJixxb@cluster0.kjrip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Data to Insert
const users = [
  {
    name: "Instructor One",
    email: "instructor1@example.com",
    password: "password1", // No hashing for demo purposes
    role: "instructor",
  },
  {
    name: "Instructor Two",
    email: "instructor2@example.com",
    password: "password2",
    role: "instructor",
  },
  {
    name: "General User",
    email: "user@example.com",
    password: "password3",
    role: "user",
  },
];

// Insert Users
const seedUsers = async () => {
  try {
    await User.deleteMany(); // Clear existing users
    const result = await User.insertMany(users); // Insert new users
    console.log(`${result.length} users inserted successfully!`);
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    mongoose.connection.close(); // Close connection
  }
};

seedUsers();
