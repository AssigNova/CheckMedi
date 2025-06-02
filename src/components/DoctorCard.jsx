import React, { useState } from "react";

// Refined styles
const cardStyle = {
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  padding: "20px", // Consistent padding
  margin: "16px",
  maxWidth: "340px",
  minWidth: "300px",
  flex: "1 1 300px", // Flexbox behavior
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  backgroundColor: "white", // Added background color
  display: "flex", // Added for internal layout
  flexDirection: "column", // Added for internal layout
  alignItems: "center", // Added for internal layout
};

const imageStyle = {
  width: "80px", // Updated width
  height: "80px", // Updated height
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "16px", // Updated margin
};

const buttonStyle = {
  backgroundColor: "#3b82f6", // blue-600
  color: "white",
  padding: "12px", // Updated padding
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  marginTop: "12px",
  fontSize: "0.95rem", // Updated font size
  width: "100%", // Full width
  textAlign: "center", // Centered text
  transition: "background-color 0.2s ease-in-out", // Added transition for hover
};

// Note: Hover effect for buttonStyle (e.g., darker blue) is not directly possible with inline styles here.
// This would typically be handled by CSS classes or a styling library.

export default function DoctorCard({ doctor }) {
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ doctor: doctor._id, date, type, notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setSuccess("Appointment requested! Awaiting doctor's approval.");
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return <div style={cardStyle}>Loading doctor details...</div>;
  }

  return (
    <div style={cardStyle}>
      <img src={doctor.photoUrl || "https://via.placeholder.com/100"} alt={`Dr. ${doctor.name}`} style={imageStyle} />
      <h3 style={{ fontSize: "1.15rem", fontWeight: "bold", color: "#1f2937", margin: "0 0 8px 0", textAlign: "center" }}>{doctor.name}</h3>
      <p style={{ color: "#3b82f6", fontSize: "0.95rem", fontWeight: "500", margin: "0 0 6px 0", textAlign: "center" }}>
        {doctor.specialization}
      </p>
      <p style={{ color: "#4b5563", fontSize: "0.85rem", margin: "0 0 4px 0", textAlign: "center" }}>
        {doctor.experience} years of experience
      </p>
      <p style={{ color: "#4b5563", fontSize: "0.85rem", margin: "0 0 10px 0", textAlign: "center" }}>Rating: {doctor.overallRating}/5</p>
      <p style={{ color: "#059669", fontSize: "1rem", fontWeight: "600", margin: "0 0 16px 0", textAlign: "center" }}>
        Fee: ₹{doctor.consultationFee}
      </p>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
        onClick={() => setShowForm(true)}
      >
        View Profile & Book
      </button>
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <form
            onSubmit={handleBook}
            style={{ background: "white", padding: 32, borderRadius: 8, minWidth: 320, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          >
            <h3 style={{ marginBottom: 16 }}>Book Appointment with Dr. {doctor.name}</h3>
            <label>
              Date & Time:
              <br />
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{ width: "100%", marginBottom: 12 }}
              />
            </label>
            <label>
              Type:
              <br />
              <select value={type} onChange={(e) => setType(e.target.value)} required style={{ width: "100%", marginBottom: 12 }}>
                <option value="">Select type</option>
                <option value="video">Video</option>
                <option value="in-person">In-person</option>
              </select>
            </label>
            <label>
              Notes:
              <br />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{ background: "#e5e7eb", color: "#111827", border: "none", borderRadius: 4, padding: "8px 16px" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ background: "#3b82f6", color: "white", border: "none", borderRadius: 4, padding: "8px 16px" }}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book"}
              </button>
            </div>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            {success && <div style={{ color: "green", marginTop: 8 }}>{success}</div>}
          </form>
        </div>
      )}
    </div>
  );
}
