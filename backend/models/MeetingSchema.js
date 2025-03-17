const mongoose = require("mongoose");

const MeetingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup" },
  meetingName: String,
  duration: String,
  meetingType: String,
  meetingURL: String,
});

module.exports = mongoose.model("Meeting", MeetingSchema);
