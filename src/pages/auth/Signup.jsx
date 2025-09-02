import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiUrl } from "../../api";
import useHospitals from "../../hooks/useHospitals";
import { motion, AnimatePresence } from "framer-motion";

export default function Signup() {
  const { login } = useAuth();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Common form fields for all users
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Patient",
  });

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
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Update doctor details state
  const handleDoctorDetailsChange = (e) =>
    setDoctorDetails({ ...doctorDetails, [e.target.name]: e.target.value });

  // Update lab details state
  const handleLabDetailsChange = (e) =>
    setLabDetails({ ...labDetails, [e.target.name]: e.target.value });

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
        formData.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
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
        formData.append(
          key,
          typeof value === "object" ? JSON.stringify(value) : value
        );
      });
      if (documentFile) formData.append("documents", documentFile);
    }

    try {
      // Send request: If Doctor or Lab, send FormData; otherwise JSON
      const res = await fetch(apiUrl("api/auth/register"), {
        method: "POST",
        body:
          form.role === "Doctor" || form.role === "Lab"
            ? formData
            : JSON.stringify(submitData),
        headers:
          form.role === "Doctor" || form.role === "Lab"
            ? {}
            : { "Content-Type": "application/json" },
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-indigo-400 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-100"
      >
        {/* Progress Indicator */}
        <div className="flex justify-between mb-6 text-sm font-medium">
          <div className={`${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
            Step 1: Basic Info
          </div>
          <div className={`${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
            Step 2: Role Details
          </div>
          <div className={`${step === 3 ? "text-blue-600" : "text-gray-400"}`}>
            Step 3: Review
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="p-3 border rounded-lg"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border rounded-lg"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <input
                  className="p-3 border rounded-lg"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <select
                  className="p-3 border rounded-lg"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                >
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Role Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                {form.role} Details
              </h2>

              {form.role === "Doctor" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    className="p-3 border rounded-lg"
                    value={selectedHospital}
                    onChange={(e) => setSelectedHospital(e.target.value)}
                  >
                    <option value="">-- Select Hospital --</option>
                    {hospitals.map((h) => (
                      <option key={h._id} value={h._id}>
                        {h.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="file"
                    className="p-3 border rounded-lg"
                    onChange={(e) => setDocumentFile(e.target.files[0])}
                  />

                  <input
                    className="p-3 border rounded-lg"
                    name="specialization"
                    placeholder="Specialization"
                    value={doctorDetails.specialization}
                    onChange={handleDoctorDetailsChange}
                  />
                  <input
                    className="p-3 border rounded-lg"
                    name="experience"
                    type="number"
                    placeholder="Experience (years)"
                    value={doctorDetails.experience}
                    onChange={handleDoctorDetailsChange}
                  />
                  {/* Add rest of Doctor fields in grid */}
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

              {form.role === "Lab" && (
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="p-3 border rounded-lg"
                    name="labName"
                    placeholder="Lab Name"
                    value={labDetails.labName}
                    onChange={handleLabDetailsChange}
                  />
                  <input
                    className="p-3 border rounded-lg"
                    name="license_number"
                    placeholder="License Number"
                    value={labDetails.license_number}
                    onChange={handleLabDetailsChange}
                  />
                  <input
                    className="p-3 border rounded-lg"
                    name="address"
                    placeholder="Address"
                    value={labDetails.address}
                    onChange={handleLabDetailsChange}
                  />
                  <input
                    className="p-3 border rounded-lg"
                    name="phone"
                    placeholder="Phone"
                    value={labDetails.phone}
                    onChange={handleLabDetailsChange}
                  />
                  {/* Add rest of Lab fields in grid */}
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    name="email"
                    type="email"
                    value={labDetails.email}
                    onChange={handleLabDetailsChange}
                    required
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Services Offered (comma separated)
                  </label>
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    name="servicesOffered"
                    value={labDetails.servicesOffered}
                    onChange={handleLabDetailsChange}
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Operating Hours
                  </label>
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    name="operatingHours"
                    value={labDetails.operatingHours}
                    onChange={handleLabDetailsChange}
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    className="w-full p-2 mb-2 border rounded"
                    name="website"
                    value={labDetails.website}
                    onChange={handleLabDetailsChange}
                  />

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supporting Document
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="w-full p-2 mb-2 border rounded"
                    onChange={(e) => setDocumentFile(e.target.files[0])}
                  />
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                Review & Confirm
              </h2>
              <p className="text-gray-600 text-sm text-center mb-6">
                Please check your details before submitting.
              </p>

              {/* You can show a summary card here */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-sm">
                <p>
                  <strong>Name:</strong> {form.name}
                </p>
                <p>
                  <strong>Email:</strong> {form.email}
                </p>
                <p>
                  <strong>Role:</strong> {form.role}
                </p>
                {/* Add Doctor/Lab details summary */}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:scale-105 transition"
                >
                  Submit ✔
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
