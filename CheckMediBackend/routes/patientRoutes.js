const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// GET /api/patients
router.get("/", patientController.getPatients);

// POST /api/patients
router.post("/", patientController.addPatient);

module.exports = router;
