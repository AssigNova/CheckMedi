import { useState, useEffect } from "react";
import { apiUrl } from "../../api";

export default function BookAppointment({ onBooked, doctor, forceDoctor }) {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor: forceDoctor?._id || doctor?._id || "", date: "", type: "video", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // If forceDoctor is provided, set doctor in form
    if (forceDoctor?._id) {
      setForm((prev) => ({ ...prev, doctor: forceDoctor._id }));
    }
  }, [forceDoctor]);

  useEffect(() => {
    // Fetch doctors
    const fetchDoctors = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("api/user?role=Doctor"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch doctors");
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("api/appointments"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setSuccess("Appointment booked!");
      setForm({ doctor: "", date: "", type: "video", notes: "" });
      if (onBooked) onBooked();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 md:p-12 border border-blue-100 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">Book an Appointment</h2>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Doctor</label>
          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
            className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-gray-800"
            disabled={!!forceDoctor}>
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Date & Time</label>
          <input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-gray-800"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="video"
                checked={form.type === "video"}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-gray-700">Video</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value="in-person"
                checked={form.type === "in-person"}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span className="text-gray-700">In-person</span>
            </label>
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Notes <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full border border-blue-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-blue-50 text-gray-800 min-h-[80px]"
            placeholder="Add any notes for the doctor..."
          />
        </div>
        {error && <div className="text-red-500 mb-4 text-center font-medium">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center font-medium">{success}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow transition">
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.3s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
