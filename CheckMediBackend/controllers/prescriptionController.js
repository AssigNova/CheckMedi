const Prescription = require("../models/Prescription");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const User = require("../models/User");

// Create a new prescription (doctor can only prescribe for patients with a past appointment)
exports.createPrescription = async (req, res) => {
  try {
    const { doctorId, patientId, appointmentId, medicines, notes, pharmacyId } = req.body;

    // Check if appointment exists and belongs to doctor and patient
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctor: doctorId,
      patient: patientId,
      status: "completed", // or whatever status means 'done'
    });
    if (!appointment) {
      return res.status(400).json({ error: "No completed appointment found for this doctor and patient." });
    }

    // Create prescription
    const prescription = new Prescription({
      doctorId,
      patientId,
      appointmentId,
      medicines,
      notes,
      pharmacyId,
    });
    await prescription.save();

    // Notify patient and pharmacy (basic email simulation)
    // Fetch patient and pharmacy details
    // Patient may be in User or Patient collection
    let patient = await User.findById(patientId);
    if (!patient) {
      patient = await Patient.findById(patientId);
    }
    const pharmacy = await User.findById(pharmacyId); // or Pharmacy if you use a separate model

    // Simulate sending notification (replace with real email/notification logic)
    console.log(`Prescription sent to patient: ${patient ? patient.email : "N/A"}`);
    console.log(`Prescription sent to pharmacy: ${pharmacy ? pharmacy.email : "N/A"}`);

    // Optionally, you can add logic to send emails here using nodemailer or any notification service

    res.status(201).json(prescription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all prescriptions for a doctor
exports.getPrescriptionsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const prescriptions = await Prescription.find({ doctorId }).populate("patientId").populate("pharmacyId");
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all prescriptions for a patient
exports.getPrescriptionsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await Prescription.find({ patientId }).populate("doctorId").populate("pharmacyId");
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all prescriptions for a pharmacy
exports.getPrescriptionsByPharmacy = async (req, res) => {
  try {
    const { pharmacyId } = req.params;
    const prescriptions = await Prescription.find({ pharmacyId }).populate("doctorId").populate("patientId");
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
