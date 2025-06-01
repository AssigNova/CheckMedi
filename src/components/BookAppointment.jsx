import { useState, useEffect } from "react";

export default function BookAppointment({ onBooked }) {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctor: "", date: "", type: "video", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Fetch doctors
    const fetchDoctors = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/user?role=Doctor", {
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
      const res = await fetch("/api/appointments", {
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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Doctor</label>
        <select name="doctor" value={form.doctor} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.email})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Date & Time</label>
        <input
          type="datetime-local"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Type</label>
        <select name="type" value={form.type} onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="video">Video</option>
          <option value="in-person">In-person</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Notes (optional)</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
        {loading ? "Booking..." : "Book Appointment"}
      </button>
    </form>
  );
}
