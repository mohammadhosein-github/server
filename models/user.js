const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  username: {
    type: String,
    min: 6,
    max: 65,
    lowercase: true,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    min: 3,
    max: 254,
    unique: true,
    lowercase: true,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    min: 8,
    max: 500,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  phone_number: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userModel);
