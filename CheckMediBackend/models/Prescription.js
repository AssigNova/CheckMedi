const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  patientId: { // This should reference the User model's ID, assuming a user can be a patient.
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Or "Patient" if you have a separate Patient model linked to User and want to use its _id
    required: true,
    index: true,
  },
  doctorId: { // User ID of the prescribing doctor
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true }, // e.g., "1 tablet", "10mg"
  quantity: { type: String }, // e.g., "30 tablets", "100ml"
  frequency: { type: String, default: "As directed" }, // e.g., "Once daily", "Twice daily"
  duration: { type: String }, // e.g., "7 days", "Until finished"
  instructions: { type: String }, // Special instructions
  status: {
    type: String,
    enum: ["Active", "Expired", "Cancelled", "Completed"],
    default: "Active",
  },
  dateIssued: { type: Date, default: Date.now },
  expiryDate: { type: Date }, // Optional: if the prescription itself has an expiry
  refillsRemaining: { type: Number, default: 0 },
  pharmacyContact: { type: String }, // Optional: contact info for the fulfilling pharmacy
  notes: { type: String }, // Additional notes from the doctor
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

PrescriptionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Example of a virtual for full medication details (optional)
PrescriptionSchema.virtual('fullMedicationDetails').get(function() {
  return `${this.medicationName} ${this.dosage}`;
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
