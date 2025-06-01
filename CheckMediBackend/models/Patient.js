const mongoose = require("mongoose");

const HealthSummarySchema = new mongoose.Schema({
  lastBpReading: { type: String }, // e.g., "120/80 mmHg"
  activeMedicationsCount: { type: Number, default: 0 },
  nextCheckupDate: { type: Date },
  nextCheckupType: { type: String }, // e.g., "Annual Physical"
  wellnessScore: { type: String }, // e.g., "75/100"
  allergies: [{ type: String }],
  conditions: [{ type: String }], // Chronic conditions
});

const PatientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Assuming patient has a primary email for contact
  phoneNumber: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  // role: { type: String, default: 'patient', enum: ['patient'] }, // Role might be more on the User model
  healthSummary: {
    type: HealthSummarySchema,
    default: () => ({}), // Default to an empty object for health summary
  },
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String,
  },
  insuranceInformation: {
    provider: String,
    policyNumber: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` field before saving
PatientSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Patient", PatientSchema);
