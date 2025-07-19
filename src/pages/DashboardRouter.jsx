import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientDashboard from "./patient/PatientDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";
import PharmacyDashboard from "./pharmacy/PharmacyDashboard";
import AdminDashboard from "./admin/AdminDashboard";
import { apiUrl } from "../api";

export default function DashboardRouter() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");
        const res = await fetch(apiUrl("api/user/profile"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
        setProfile(data);
      } catch (err) {
        setError(err.message);
        setTimeout(() => navigate("/login"), 1200);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!profile) return null;

  if (profile.role === "Patient") return <PatientDashboard profile={profile} />;
  if (profile.role === "Doctor") return <DoctorDashboard profile={profile} />;
  if (profile.role === "Pharmacy") return <PharmacyDashboard profile={profile} />;
  if (profile.role === "Admin") return <AdminDashboard profile={profile} />;
  return <div className="text-center mt-10">Unknown role</div>;
}
