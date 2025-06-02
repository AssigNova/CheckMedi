const express = require("express");
const router = express.Router();
const pharmacyController = require("../controllers/pharmacyController");

// Create pharmacy
router.post("/", pharmacyController.createPharmacy);

// Get all pharmacies
router.get("/", pharmacyController.getPharmacies);

// Delete pharmacy
router.delete("/:id", pharmacyController.deletePharmacy);

module.exports = router;
