import React, { useState, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";

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
  const mockDoctors = [
    {
      id: "doc001",
      name: "Dr. Emily Carter",
      specialization: "Cardiologist",
      experience: 12,
      qualifications: "MD, FACC",
      affiliations: ["City General Hospital", "Heart & Vascular Clinic"],
      photoUrl: "https://via.placeholder.com/100/007bff/ffffff?Text=Dr.EC",
      overallRating: 4.8,
      consultationFee: 1500,
      languagesSpoken: ["English", "Hindi"],
      bio: "Dr. Carter is a renowned cardiologist...",
      availabilitySummary: "Mon, Wed, Fri (9 AM - 5 PM)",
    },
    {
      id: "doc002",
      name: "Dr. Arjun Mehta",
      specialization: "Pediatrician",
      experience: 8,
      qualifications: "MBBS, DCH",
      affiliations: ["KidsCare Children's Hospital"],
      photoUrl: "https://via.placeholder.com/100/28a745/ffffff?Text=Dr.AM",
      overallRating: 4.9,
      consultationFee: 1200,
      languagesSpoken: ["English", "Marathi", "Hindi"],
      bio: "Dr. Mehta is a compassionate pediatrician...",
      availabilitySummary: "Tue, Thu (10 AM - 6 PM), Sat (9 AM - 1 PM)",
    },
    {
      id: "doc003",
      name: "Dr. Priya Sharma",
      specialization: "Dermatologist",
      experience: 7,
      qualifications: "MD, DNB (Dermatology)",
      affiliations: ["Skin & Wellness Clinic"],
      photoUrl: "https://via.placeholder.com/100/ffc107/000000?Text=Dr.PS",
      overallRating: 4.7,
      consultationFee: 1000,
      languagesSpoken: ["English", "Hindi", "Punjabi"],
      bio: "Dr. Sharma specializes in clinical and cosmetic dermatology...",
      availabilitySummary: "Mon - Sat (11 AM - 7 PM)",
    },
  ];

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDoctors = () => {
      setTimeout(() => {
        setDoctors(mockDoctors);
        setLoading(false);
      }, 1000); // Simulate 1-second delay
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
          doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
        ) : (
          <p style={{ textAlign: "center", fontSize: "1rem", color: "#4b5563", padding: "40px", width: "100%" }}>
            No doctors available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
