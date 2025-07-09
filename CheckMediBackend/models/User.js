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
  // Doctor-specific fields
  specialization: { type: String },
  experience: { type: Number },
  qualifications: { type: String },
  bio: { type: String },
  photoUrl: { type: String },
  languagesSpoken: [{ type: String }],
  consultationFee: { type: Number },
  availabilitySummary: { type: String },
  affiliations: [{ type: String }],
  awards: [{ type: String }],
  memberships: [{ type: String }],
  address: { type: String },
  phone: { type: String },
  gender: { type: String },
  overallRating: { type: Number, default: 5 },
  about: { type: String },
  socialLinks: {
    website: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", UserSchema);
