const Prescription = require("../models/Prescription");
const User = require("../models/User"); // Might be needed for role checks or populating

// Get all prescriptions for the logged-in patient
exports.getMyPatientPrescriptions = async (req, res) => {
  try {
    // req.user.id should be set by the auth middleware, referring to the User model's _id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Assuming req.user.role is also set by auth middleware
    // This route is specifically for patients to get their prescriptions.
    // If a doctor needs to see prescriptions they issued, or all for a patient,
    // that would be a different controller or an admin/doctor specific route.
    if (req.user.role !== 'Patient') {
        // Or if Patient model is used for patientId:
        // const patientProfile = await Patient.findOne({ userId: req.user.id });
        // if (!patientProfile) return res.status(403).json({ error: "User is not a patient or patient profile not found." });
        // query = { patientId: patientProfile._id };
        // For now, directly use req.user.id as patientId, assuming User._id is used in Prescription.patientId
         return res.status(403).json({ error: "Access denied. Only patients can fetch their prescriptions through this route." });
    }

    const prescriptions = await Prescription.find({ patientId: req.user.id })
      .populate("doctorId", "firstName lastName email") // Populate doctor's name and email
      .sort({ dateIssued: -1 }); // Sort by most recent first

    if (!prescriptions) {
      // find returns an empty array if no documents match, not null/undefined
      // So, an empty array is a valid response.
      return res.json([]);
    }

    res.json(prescriptions);
  } catch (err) {
    console.error("Error in getMyPatientPrescriptions:", err);
    res.status(500).json({ error: "Server error while fetching prescriptions" });
  }
};

// TODO: Add controller for doctors to create prescriptions
// exports.createPrescription = async (req, res) => { ... }
// TODO: Add controller for doctors/patients to update prescription status (e.g., cancel)
// exports.updatePrescriptionStatus = async (req, res) => { ... }
