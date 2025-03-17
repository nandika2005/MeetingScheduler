const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phoneNumber: String,
});

module.exports = mongoose.model("Signup", SignupSchema);
