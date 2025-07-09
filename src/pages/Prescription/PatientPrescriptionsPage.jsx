import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PatientPrescriptionsPage() {
  const [profile, setProfile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndPrescriptions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
        setProfile(data);
        // Now fetch prescriptions for this patient
        const presRes = await axios.get(`/api/prescriptions/patient/${data._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(presRes.data);
      } catch (err) {
        setError(err.message || err.response?.data?.error || "Failed to load data");
        setTimeout(() => navigate("/login"), 1200);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndPrescriptions();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Your Prescriptions</h1>
        {loading ? (
          <div>Loading prescriptions...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : prescriptions.length === 0 ? (
          <div>No prescriptions found.</div>
        ) : (
          <div className="space-y-8">
            {prescriptions.map((p) => (
              <div
                key={p._id}
                className="border-b pb-6 mb-6 cursor-pointer hover:bg-blue-50 transition"
                onClick={() => navigate(`/prescription/${p._id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-800">Prescription #{p._id.slice(-6)}</h2>
                  <span className="text-sm text-gray-500">{new Date(p.date).toLocaleDateString()}</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Doctor:</span> {p.doctorId?.name || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Pharmacy:</span> {p.pharmacyId?.name || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Notes:</span> {p.notes || "-"}
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-700">Medicines:</span>
                  <ul className="list-disc ml-6 mt-1">
                    {p.medicines && p.medicines.length > 0 ? (
                      p.medicines.map((m, idx) => (
                        <li key={idx} className="text-gray-700">
                          <span className="font-semibold">{m.name}</span> - {m.dosage} ({m.frequency})
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No medicines listed.</li>
                    )}
                  </ul>
                </div>
                <div className="mt-4 flex gap-4">
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Status: {p.status || "Active"}
                  </span>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {p.type || "General"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
