const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const auth = require("../middleware/auth"); // Import auth middleware

// GET /api/patients/me - Get current logged-in patient's profile
// Ensure this is defined before any routes with parameters like /:id if they were to be added
router.get("/me", auth, patientController.getMyPatientProfile);

// GET /api/patients - Get all patients (potentially admin only)
router.get("/", auth, patientController.getPatients); // Assuming this also needs auth

// POST /api/patients - Add a new patient (potentially admin or specific logic)
router.post("/", auth, patientController.addPatient); // Assuming this also needs auth


module.exports = router;
