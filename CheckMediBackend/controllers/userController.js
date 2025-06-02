const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const updates = (({ name, email, role }) => ({ name, email, role }))(req.body);
    const user = await User.findByIdAndUpdate(decoded.id, { $set: updates }, { new: true, runValidators: true, select: "-password" });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRoles = async (req, res) => {
  // TODO: Return supported roles
  res.json(["Patient", "Doctor", "Pharmacy"]);
};

exports.verifyLicense = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const { license } = req.body;
    if (!license) return res.status(400).json({ error: "License is required" });
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: { license, isVerified: true } },
      { new: true, runValidators: true, select: "-password" }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "License verified and uploaded", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPreferences = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const user = await User.findById(decoded.id).select("preferences");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const updates = (({ notification, language, timezone }) => ({ notification, language, timezone }))(req.body);
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $set: { preferences: updates } },
      { new: true, runValidators: true, select: "preferences" }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/user?role=Doctor - List all doctors with full details for appointment booking
exports.listUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    // For doctors, return all relevant fields for appointment booking
    let projection =
      "_id name email role specialization experience qualifications bio photoUrl overallRating consultationFee languagesSpoken availabilitySummary affiliations";
    if (role !== "Doctor") {
      projection = "_id name email role";
    }
    const users = await User.find(filter).select(projection);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
