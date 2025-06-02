const mongoose = require("mongoose");

const PharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  // Add more fields as needed
});

module.exports = mongoose.model("Pharmacy", PharmacySchema);
