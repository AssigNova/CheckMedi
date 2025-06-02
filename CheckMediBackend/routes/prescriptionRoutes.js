const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescriptionController");

// Create prescription
router.post("/", prescriptionController.createPrescription);

// Get all prescriptions for a doctor
router.get("/doctor/:doctorId", prescriptionController.getPrescriptionsByDoctor);

// Get all prescriptions for a patient
router.get("/patient/:patientId", prescriptionController.getPrescriptionsByPatient);

// Get all prescriptions for a pharmacy
router.get("/pharmacy/:pharmacyId", prescriptionController.getPrescriptionsByPharmacy);

module.exports = router;
