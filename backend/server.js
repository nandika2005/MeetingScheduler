const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");


const Signup = require("./models/Signupschema");
const Meeting = require("./models/MeetingSchema");
const Availability = require("./models/Availability");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const PORT = 3002;
const MONGO_URI = "mongodb+srv://nandikamaheshwar6:3Br1q4Bx0ebpDtdX@popbackend.oltm4.mongodb.net/meetupDB";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.userId = decoded.userId;
    next();
  });
};

// User Signup
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", isSignUp: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Signup({ firstName, lastName, email, password: hashedPassword, phoneNumber });

    await newUser.save();
    res.status(201).json({ message: "Signup successful", isSignUp: true });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup unsuccessful", isSignUp: false });
  }
});

// User Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Signup.findOne({ email });

    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, message: "Login successful", token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
});

// Create a new meeting
app.post("/api/meetings", verifyToken, async (req, res) => {
  try {
    const { meetingName, duration, meetingType, meetingURL } = req.body;

    const newMeeting = new Meeting({ userId: req.userId, meetingName, duration, meetingType, meetingURL });

    await newMeeting.save();
    res.status(201).json({ message: "Meeting created successfully", meeting: newMeeting });
  } catch (err) {
    console.error("Meeting creation error:", err);
    res.status(500).json({ message: "Error creating meeting" });
  }
});

// Get all meetings for logged-in user
app.get("/api/meetings", verifyToken, async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.userId });
    res.status(200).json(meetings);
  } catch (err) {
    console.error("Error fetching meetings:", err);
    res.status(500).json({ message: "Error fetching meetings" });
  }
});

// Delete a meeting
app.delete("/api/meetings/:id", verifyToken, async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Meeting deleted successfully" });
  } catch (err) {
    console.error("Error deleting meeting:", err);
    res.status(500).json({ message: "Error deleting meeting" });
  }
});

// Set user availability
app.post("/api/availability", verifyToken, async (req, res) => {
  try {
    const { day, startTime, endTime } = req.body;

    const newAvailability = new Availability({ userId: req.userId, day, startTime, endTime });

    await newAvailability.save();
    res.status(201).json({ message: "Availability added", availability: newAvailability });
  } catch (err) {
    console.error("Error setting availability:", err);
    res.status(500).json({ message: "Error setting availability" });
  }
});

// Get user availability
app.get("/api/availability", verifyToken, async (req, res) => {
  try {
    const availability = await Availability.find({ userId: req.userId });
    res.status(200).json(availability);
  } catch (err) {
    console.error("Error fetching availability:", err);
    res.status(500).json({ message: "Error fetching availability" });
  }
});

// Delete availability slot
app.delete("/api/availability/:id", verifyToken, async (req, res) => {
  try {
    await Availability.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (err) {
    console.error("Error deleting availability:", err);
    res.status(500).json({ message: "Error deleting availability" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
