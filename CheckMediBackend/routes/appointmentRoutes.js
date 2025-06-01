const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const auth = require("../middleware/auth"); // You need to implement this middleware

// All routes require authentication
router.use(auth);

// Route for patients to get their own appointments
router.get("/patient/me", appointmentController.getAppointments);

// Generic route to get appointments (controller logic handles filtering by role)
router.get("/", appointmentController.getAppointments);

router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
