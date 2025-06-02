import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PrescriptionModal({ open, onClose, appointment, doctorId, onSuccess }) {
  const [pharmacies, setPharmacies] = useState([]);
  const [medicines, setMedicines] = useState([{ name: "", dosage: "", frequency: "", duration: "" }]);
  const [notes, setNotes] = useState("");
  const [pharmacyId, setPharmacyId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      // Fetch pharmacies from User collection with role=Pharmacy
      axios.get("/api/user?role=Pharmacy").then((res) => setPharmacies(res.data));
    }
  }, [open]);

  const handleMedicineChange = (idx, field, value) => {
    const updated = medicines.map((m, i) => (i === idx ? { ...m, [field]: value } : m));
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const removeMedicine = (idx) => {
    setMedicines(medicines.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/prescriptions", {
        doctorId,
        patientId: appointment.patient._id,
        appointmentId: appointment._id,
        medicines,
        notes,
        pharmacyId,
      });
      setLoading(false);
      onSuccess && onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to prescribe");
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Prescribe Medicine</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {medicines.map((med, idx) => (
              <div key={idx} className="flex gap-2 items-end">
                <input
                  className="border p-1 flex-1"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(idx, "name", e.target.value)}
                  required
                />
                <input
                  className="border p-1 w-20"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(idx, "dosage", e.target.value)}
                  required
                />
                <input
                  className="border p-1 w-24"
                  placeholder="Frequency"
                  value={med.frequency}
                  onChange={(e) => handleMedicineChange(idx, "frequency", e.target.value)}
                  required
                />
                <input
                  className="border p-1 w-20"
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) => handleMedicineChange(idx, "duration", e.target.value)}
                  required
                />
                {medicines.length > 1 && (
                  <button type="button" className="text-red-500" onClick={() => removeMedicine(idx)}>
                    -
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="text-blue-600" onClick={addMedicine}>
              + Add Medicine
            </button>
            <textarea
              className="border p-1 w-full"
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <select className="border p-1 w-full" value={pharmacyId} onChange={(e) => setPharmacyId(e.target.value)} required>
              <option value="">Select Pharmacy</option>
              {pharmacies.map((ph) => (
                <option key={ph._id} value={ph._id}>
                  {ph.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Prescribing..." : "Prescribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
