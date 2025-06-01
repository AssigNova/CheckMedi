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
