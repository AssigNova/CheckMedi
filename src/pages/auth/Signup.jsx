import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiUrl } from "../../api";
import useHospitals from "../../hooks/useHospitals";

export default function Signup() {
  const { login } = useAuth();

  // Common form fields for all users
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Patient" });

  // Doctor-specific fields (already existed in your code)
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

  // ✅ New: Lab-specific fields
  const [labDetails, setLabDetails] = useState({
    labName: "", // Name of the lab
    license_number: "", // Govt-issued license number
    address: "", // Lab address
    phone: "", // Contact phone
    email: "", // Contact email
    servicesOffered: "", // Comma-separated list of services
    operatingHours: "", // e.g. "Mon-Fri 9am-5pm"
    website: "", // Optional lab website
  });

  const [error, setError] = useState(""); // Store error message for display
  const [success, setSuccess] = useState(""); // Store success message for display
  const [selectedHospital, setSelectedHospital] = useState(""); // For doctors
  const [documentFile, setDocumentFile] = useState(null); // For file uploads
  const { hospitals } = useHospitals(); // Custom hook for fetching hospitals
  const navigate = useNavigate();

  // Redirect user if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  // Update main form state
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Update doctor details state
  const handleDoctorDetailsChange = (e) => setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });

  // Update lab details state
  const handleLabDetailsChange = (e) => setLabDetails({ ...labDetails, [e.target.name]: e.target.value });

  // Handle signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let submitData = { ...form }; // Base data
    let formData; // Will be used for multipart/form-data requests

    // If the user is a Doctor, merge doctor details into submission
    if (form.role === "Doctor") {
      submitData = {
        ...form,
        ...doctorDetails,
        hospital: selectedHospital,
        // Convert comma-separated strings to arrays
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

      // Prepare FormData for file upload
      formData = new FormData();
      Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
      });
      if (documentFile) formData.append("documents", documentFile);
    }

    // ✅ If the user is a Lab, merge lab details into submission
    else if (form.role === "Lab") {
      submitData = {
        ...form,
        ...labDetails,
        // Convert servicesOffered to an array
        servicesOffered: labDetails.servicesOffered
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      // Prepare FormData for file upload (labs may also upload documents)
      formData = new FormData();
      Object.entries(submitData).forEach(([key, value]) => {
        formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
      });
      if (documentFile) formData.append("documents", documentFile);
    }

    try {
      // Send request: If Doctor or Lab, send FormData; otherwise JSON
      const res = await fetch(apiUrl("api/auth/register"), {
        method: "POST",
        body: form.role === "Doctor" || form.role === "Lab" ? formData : JSON.stringify(submitData),
        headers: form.role === "Doctor" || form.role === "Lab" ? {} : { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");

      login(data); // Log the user in
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

        {/* Common signup fields */}
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

        {/* Role dropdown — fixed Lab label */}
        <select className="w-full p-2 mb-4 border rounded" name="role" value={form.role} onChange={handleChange}>
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Lab">Lab</option>
        </select>

        {/* Doctor extra fields — unchanged from your code */}
        {form.role === "Doctor" && (
          <div className="mb-4">
            {
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
            }
          </div>
        )}

        {/* ✅ Lab extra fields */}
        {form.role === "Lab" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lab Name</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="labName"
              value={labDetails.labName}
              onChange={handleLabDetailsChange}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="license_number" // Ensure this matches backend expectation
              value={labDetails.license_number} // Correct state property
              onChange={handleLabDetailsChange}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="address"
              value={labDetails.address}
              onChange={handleLabDetailsChange}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="phone"
              value={labDetails.phone}
              onChange={handleLabDetailsChange}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="email"
              type="email"
              value={labDetails.email}
              onChange={handleLabDetailsChange}
              required
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Services Offered (comma separated)</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="servicesOffered"
              value={labDetails.servicesOffered}
              onChange={handleLabDetailsChange}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
            <input
              className="w-full p-2 mb-2 border rounded"
              name="operatingHours"
              value={labDetails.operatingHours}
              onChange={handleLabDetailsChange}
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input className="w-full p-2 mb-2 border rounded" name="website" value={labDetails.website} onChange={handleLabDetailsChange} />

            <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="w-full p-2 mb-2 border rounded"
              onChange={(e) => setDocumentFile(e.target.files[0])}
            />
          </div>
        )}

        {/* Error & Success Messages */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}

        {/* Submit button */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}
