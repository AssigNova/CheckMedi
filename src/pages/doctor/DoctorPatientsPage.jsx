import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../api";

export default function DoctorPatientsPage({ doctorId }) {
  const [patients, setPatients] = useState([]);
  const [labs, setLabs] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        // Get all patients who had appointments with this doctor
        const res = await axios.get(apiUrl("api/appointments"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter unique patients from appointments
        const appointments = res.data.filter((a) => a.doctor?._id === doctorId || a.doctor === doctorId);
        const uniquePatients = [];
        const seen = new Set();
        appointments.forEach((a) => {
          const p = a.patient;
          const pid = p?._id || p;
          if (!seen.has(pid)) {
            seen.add(pid);
            uniquePatients.push(p);
          }
        });
        setPatients(uniquePatients);

      } catch (err) {
        setError("Failed to load patients" + err);
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchPatients();
  }, [doctorId]);

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(apiUrl(`api/prescriptions/patient/${patient._id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Only show prescriptions written by this doctor
      const filtered = res.data.filter((pr) => {
        // pr.doctorId may be an object or string
        if (!pr.doctorId) return false;
        if (typeof pr.doctorId === "object") return pr.doctorId._id === doctorId;
        return pr.doctorId === doctorId;
      });
      setPrescriptions(filtered);
    } catch {
      setError("Failed to load prescriptions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">My Patients</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex gap-8">
        <div className="w-1/3 bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Patients</h2>
          <ul>
            {patients.map((p) => (
              <li key={p._id} className="mb-2">
                <button
                  className={`w-full text-left px-3 py-2 rounded ${selectedPatient?._id === p._id ? "bg-blue-100" : "hover:bg-gray-100"}`}
                  onClick={() => handleSelectPatient(p)}>
                  {p.name} <span className="text-xs text-gray-500">({p.email || p.gender})</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-white rounded shadow p-4">
          {selectedPatient ? (
            <>
              <h2 className="text-lg font-semibold mb-2">Patient Details</h2>
              <div className="mb-4">
                <div>
                  <b>Name:</b> {selectedPatient.name}
                </div>
                {selectedPatient.email && (
                  <div>
                    <b>Email:</b> {selectedPatient.email}
                  </div>
                )}
                {selectedPatient.age && (
                  <div>
                    <b>Age:</b> {selectedPatient.age}
                  </div>
                )}
                {selectedPatient.gender && (
                  <div>
                    <b>Gender:</b> {selectedPatient.gender}
                  </div>
                )}
              </div>
              <h3 className="font-semibold mb-2">Prescriptions</h3>
              {prescriptions.length === 0 ? (
                <div>No prescriptions found for this patient.</div>
              ) : (
                <ul className="space-y-2">
                  {prescriptions.map((pr) => (
                    <li key={pr._id} className="bg-gray-50 p-3 rounded">
                      <div className="mb-1 text-sm text-gray-700">Date: {new Date(pr.date).toLocaleDateString()}</div>
                      <div className="mb-1 text-sm text-gray-700">Pharmacy: {pr.pharmacyId?.name || "-"}</div>
                      <div className="mb-1 text-sm text-gray-700">Notes: {pr.notes || "-"}</div>
                      <div className="font-semibold">Medicines:</div>
                      <ul className="list-disc ml-6">
                        {pr.medicines.map((m, i) => (
                          <li key={i}>
                            {m.name} - {m.dosage}, {m.frequency}, {m.duration}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <div>Select a patient to view details.</div>
          )}
        </div>
      </div>
    </div>
  );
}
