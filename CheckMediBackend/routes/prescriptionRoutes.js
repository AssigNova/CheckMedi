const express = require("express");
const router = express.Router();
const prescriptionController = require("../controllers/prescriptionController");
const auth = require("../middleware/auth");

// GET /api/prescriptions/patient/me - Get current logged-in patient's prescriptions
// All routes in this file can be protected by default if needed, or protect individually.
router.get(
  "/patient/me",
  auth,
  prescriptionController.getMyPatientPrescriptions
);

// Example: Route for a doctor to create a prescription (illustrative)
// router.post("/", auth, (req, res, next) => {
//   if (req.user.role !== 'Doctor') {
//     return res.status(403).json({ error: 'Access denied. Only doctors can create prescriptions.' });
//   }
//   next();
// }, prescriptionController.createPrescription); // Assuming createPrescription controller exists

module.exports = router;
