import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiUrl } from "../../api";
import useHospitals from "../../hooks/useHospitals";

export default function Signup() {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Patient" });
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: "",
    experience: "",
    qualifications: "",
    bio: "",
    photoUrl: "",
    languagesSpoken: "",
    consultationFee: "",
    availabilitySummary: "",
    affiliations: "",
    awards: "",
    memberships: "",
    address: "",
    phone: "",
    gender: "",
    about: "",
    website: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    instagram: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const { hospitals } = useHospitals();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle doctor-specific details
  const handleDoctorDetailsChange = (e) => {
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    let submitData = { ...form };
    let formData;
    if (form.role === "Doctor") {
      submitData = {
        ...form,
        ...doctorDetails,
        hospital: selectedHospital,
        languagesSpoken: doctorDetails.languagesSpoken
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        affiliations: doctorDetails.affiliations
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        awards: doctorDetails.awards
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        memberships: doctorDetails.memberships
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        socialLinks: {
          website: doctorDetails.website,
          linkedin: doctorDetails.linkedin,
          twitter: doctorDetails.twitter,
          facebook: doctorDetails.facebook,
          instagram: doctorDetails.instagram,
        },
      };
      formData = new FormData();
      Object.entries(submitData).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
      if (documentFile) formData.append("documents", documentFile);
    }
    try {
      let res, data;
      if (form.role === "Doctor") {
        res = await fetch(apiUrl("api/auth/register"), {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch(apiUrl("api/auth/register"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });
      }
      data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      login(data);
      setSuccess("Signup successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          className="w-full p-2 mb-4 border rounded"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select className="w-full p-2 mb-4 border rounded" name="role" value={form.role} onChange={handleChange}>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Pharmacy">Pharmacy</option>
        </select>
        {/* Doctor extra fields */}
        {form.role === "Doctor" && (
          <div className="mb-4">
            {/* Hospital selection */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Hospital</label>
            <select
              className="w-full p-2 mb-2 border rounded"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              required>
              <option value="">-- Select Hospital --</option>
              {hospitals.map((h) => (
                <option key={h._id} value={h._id}>
                  {h.name}
                </option>
              ))}
            </select>
            {/* Document upload */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="w-full p-2 mb-2 border rounded"
              onChange={(e) => setDocumentFile(e.target.files[0])}
              required
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="specialization"
              placeholder="Specialization (e.g. Cardiologist)"
              value={doctorDetails.specialization}
              onChange={handleDoctorDetailsChange}
              required
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="experience"
              type="number"
              placeholder="Years of Experience"
              value={doctorDetails.experience}
              onChange={handleDoctorDetailsChange}
              required
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="qualifications"
              placeholder="Qualifications (e.g. MBBS, MD)"
              value={doctorDetails.qualifications}
              onChange={handleDoctorDetailsChange}
              required
            />
            <textarea
              className="w-full p-2 mb-2 border rounded"
              name="bio"
              placeholder="Short Bio"
              value={doctorDetails.bio}
              onChange={handleDoctorDetailsChange}
              required
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="photoUrl"
              placeholder="Profile Photo URL"
              value={doctorDetails.photoUrl}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="languagesSpoken"
              placeholder="Languages Spoken (comma separated)"
              value={doctorDetails.languagesSpoken}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="consultationFee"
              type="number"
              placeholder="Consultation Fee (INR)"
              value={doctorDetails.consultationFee}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="availabilitySummary"
              placeholder="Availability (e.g. Mon-Fri 10am-5pm)"
              value={doctorDetails.availabilitySummary}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="affiliations"
              placeholder="Affiliations (comma separated)"
              value={doctorDetails.affiliations}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="awards"
              placeholder="Awards (comma separated)"
              value={doctorDetails.awards}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="memberships"
              placeholder="Memberships (comma separated)"
              value={doctorDetails.memberships}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="address"
              placeholder="Clinic Address"
              value={doctorDetails.address}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="phone"
              placeholder="Phone Number"
              value={doctorDetails.phone}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="gender"
              placeholder="Gender"
              value={doctorDetails.gender}
              onChange={handleDoctorDetailsChange}
            />
            <textarea
              className="w-full p-2 mb-2 border rounded"
              name="about"
              placeholder="About Doctor (detailed)"
              value={doctorDetails.about}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="website"
              placeholder="Website"
              value={doctorDetails.website}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="linkedin"
              placeholder="LinkedIn"
              value={doctorDetails.linkedin}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="twitter"
              placeholder="Twitter"
              value={doctorDetails.twitter}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="facebook"
              placeholder="Facebook"
              value={doctorDetails.facebook}
              onChange={handleDoctorDetailsChange}
            />
            <input
              className="w-full p-2 mb-2 border rounded"
              name="instagram"
              placeholder="Instagram"
              value={doctorDetails.instagram}
              onChange={handleDoctorDetailsChange}
            />
          </div>
        )}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}
