import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SinglePrescriptionPage() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPrescription() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/prescriptions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescription(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load prescription");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchPrescription();
  }, [id]);

  if (loading) return <div className="p-8">Loading prescription...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!prescription) return <div className="p-8">No prescription found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Prescription Details</h1>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Prescription ID:</span> {prescription._id}
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Date:</span> {new Date(prescription.date).toLocaleDateString()}
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Doctor:</span> {prescription.doctorId?.name || "-"}
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Pharmacy:</span> {prescription.pharmacyId?.name || "-"}
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Notes:</span> {prescription.notes || "-"}
        </div>
        <div className="mb-2">
          <span className="font-medium text-gray-700">Medicines:</span>
          <ul className="list-disc ml-6 mt-1">
            {prescription.medicines && prescription.medicines.length > 0 ? (
              prescription.medicines.map((m, idx) => (
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
            Status: {prescription.status || "Active"}
          </span>
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            {prescription.type || "General"}
          </span>
        </div>
      </div>
    </div>
  );
}
