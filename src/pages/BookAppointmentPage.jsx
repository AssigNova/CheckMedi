import React, { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import { apiUrl } from "../api";

// Refined styles
const pageStyle = {
  padding: "24px", // Updated padding
  backgroundColor: "#f9fafb", // gray-50
};

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "24px", // Updated gap
  justifyContent: "flex-start", // Updated justification
};

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDoctors = async () => {
      try {
        const res = await fetch(apiUrl("api/user?role=Doctor"));
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch doctors");
        setDoctors(data);
      } catch (err) {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div style={pageStyle}>
      <h1 style={{ textAlign: "center", fontSize: "1.875rem", fontWeight: "bold", color: "#111827", marginBottom: "12px" }}>
        Book an Appointment
      </h1>
      <p style={{ textAlign: "center", marginBottom: "24px", color: "#374151", fontSize: "1rem" }}>
        Find the right doctor for your needs and schedule your consultation.
      </p>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Search by doctor name, specialization..."
          style={{
            padding: "12px 16px",
            width: "clamp(300px, 60%, 700px)", // Responsive width
            borderRadius: "8px",
            border: "1px solid #d1d5db", // gray-300
            fontSize: "1rem",
          }}
        />
      </div>
      <div style={gridStyle}>
        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1rem", color: "#4b5563", padding: "40px", width: "100%" }}>Loading doctors...</p>
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => <DoctorCard key={doctor._id} doctor={doctor} />)
        ) : (
          <p style={{ textAlign: "center", fontSize: "1rem", color: "#4b5563", padding: "40px", width: "100%" }}>
            No doctors available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
