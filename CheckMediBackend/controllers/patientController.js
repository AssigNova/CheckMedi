const Patient = require("../models/Patient");

// Get all patients
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new patient
exports.addPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const newPatient = new Patient({ name, age, gender });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get the logged-in patient's profile
exports.getMyPatientProfile = async (req, res) => {
  try {
    // req.user.id is expected to be set by the auth middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const patient = await Patient.findOne({ userId: req.user.id })
      // .populate('userId', ['name', 'email']); // Optionally populate fields from User model

    if (!patient) {
      return res.status(404).json({ error: "Patient profile not found" });
    }

    // Construct the profile data to return
    // This matches the frontend expectation: { patientData: { profile: ..., healthSummary: ... } }
    // However, the loader in main.jsx expects { patientData } where patientData is the direct object.
    // So we will return the patient object directly, which contains profile fields and healthSummary sub-object.
    res.json(patient);

  } catch (err) {
    console.error("Error in getMyPatientProfile:", err);
    res.status(500).json({ error: "Server error while fetching patient profile" });
  }
};
