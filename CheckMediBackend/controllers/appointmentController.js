const Appointment = require("../models/Appointment");
const User = require("../models/User");

// Create a new appointment (patient books with doctor)
exports.createAppointment = async (req, res) => {
  try {
    const { doctor, date, type, notes } = req.body;
    const patient = req.user.id; // req.user should be set by auth middleware
    if (!doctor || !date || !type) {
      return res.status(400).json({ error: "Doctor, date, and type are required" });
    }
    // Prevent double booking (same doctor, same time)
    const conflict = await Appointment.findOne({ doctor, date });
    if (conflict) {
      return res.status(409).json({ error: "Doctor already has an appointment at this time" });
    }
    const appointment = new Appointment({ patient, doctor, date, type, notes, status: "pending" });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments for logged-in user (patient or doctor)
exports.getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    let query = {};
    if (role === "Patient") query.patient = userId;
    else if (role === "Doctor") query.doctor = userId;
    else return res.status(403).json({ error: "Unauthorized" });
    const appointments = await Appointment.find(query).populate("doctor", "name email").populate("patient", "name email").sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appointment status (doctor or patient can update)
exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const userId = req.user.id;
    const role = req.user.role;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    // Only doctor or patient involved can update
    if (appointment.patient.toString() !== userId && appointment.doctor.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    // Only doctor can approve/reject/complete, patient can cancel
    if (status) {
      if (status === "approved" && role !== "Doctor") return res.status(403).json({ error: "Only doctor can approve" });
      if (status === "rejected" && role !== "Doctor") return res.status(403).json({ error: "Only doctor can reject" });
      if (status === "completed" && role !== "Doctor") return res.status(403).json({ error: "Only doctor can complete" });
      if (status === "cancelled" && !["Doctor", "Patient"].includes(role)) return res.status(403).json({ error: "Unauthorized to cancel" });
      appointment.status = status;
    }
    if (notes) appointment.notes = notes;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete appointment (optional, for admin or patient cancel)
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    if (appointment.patient.toString() !== userId && appointment.doctor.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await appointment.deleteOne();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
