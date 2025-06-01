const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Patient", "Doctor", "Pharmacy"], required: true },
  isVerified: { type: Boolean, default: false },
  preferences: {
    notification: { type: Boolean, default: true },
    language: { type: String, default: "en" },
    timezone: { type: String, default: "UTC" },
  },
  license: { type: String }, // For Doctor/Pharmacy
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", UserSchema);
