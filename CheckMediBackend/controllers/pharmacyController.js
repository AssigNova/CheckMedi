const Pharmacy = require("../models/Pharmacy");

// Create a new pharmacy
exports.createPharmacy = async (req, res) => {
  try {
    const { name, address, contact, email } = req.body;
    const pharmacy = new Pharmacy({ name, address, contact, email });
    await pharmacy.save();
    res.status(201).json(pharmacy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all pharmacies
exports.getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find();
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// (Optional) Delete a pharmacy
exports.deletePharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    await Pharmacy.findByIdAndDelete(id);
    res.json({ message: "Pharmacy deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
