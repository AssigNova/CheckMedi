import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../api";

const doctorFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "role", label: "Role", type: "select", options: ["Doctor", "Patient", "Pharmacy"] },
  { name: "specialization", label: "Specialization", type: "text" },
  { name: "experience", label: "Experience (years)", type: "number" },
  { name: "qualifications", label: "Qualifications", type: "text" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "photoUrl", label: "Photo URL", type: "text" },
  { name: "consultationFee", label: "Consultation Fee", type: "number" },
  { name: "languagesSpoken", label: "Languages Spoken (comma separated)", type: "text" },
  { name: "availabilitySummary", label: "Availability", type: "text" },
  { name: "affiliations", label: "Affiliations (comma separated)", type: "text" },
  { name: "awards", label: "Awards (comma separated)", type: "text" },
  { name: "memberships", label: "Memberships (comma separated)", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
  { name: "about", label: "About", type: "textarea" },
  { name: "socialLinks.website", label: "Website", type: "text" },
  { name: "socialLinks.linkedin", label: "LinkedIn", type: "text" },
];

const patientFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "role", label: "Role", type: "select", options: ["Doctor", "Patient", "Pharmacy"] },
  { name: "phone", label: "Phone", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
];

const pharmacyFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "role", label: "Role", type: "select", options: ["Doctor", "Patient", "Pharmacy"] },
  { name: "address", label: "Address", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
];

function getFieldsByRole(role) {
  if (role === "Doctor") return doctorFields;
  if (role === "Pharmacy") return pharmacyFields;
  return patientFields;
}

export default function UpdateProfile() {
  const [form, setForm] = useState({});
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current profile to prefill form
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("api/user/profile"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch profile");
        setForm({
          ...data,
          languagesSpoken: Array.isArray(data.languagesSpoken) ? data.languagesSpoken.join(", ") : data.languagesSpoken || "",
          affiliations: Array.isArray(data.affiliations) ? data.affiliations.join(", ") : data.affiliations || "",
          awards: Array.isArray(data.awards) ? data.awards.join(", ") : data.awards || "",
          memberships: Array.isArray(data.memberships) ? data.memberships.join(", ") : data.memberships || "",
          "socialLinks.website": data.socialLinks?.website || "",
          "socialLinks.linkedin": data.socialLinks?.linkedin || "",
        });
        setRole(data.role);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "role") setRole(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Prepare data for backend
    const submitData = { ...form };
    // Convert comma separated fields to arrays
    if (role === "Doctor") {
      submitData.languagesSpoken = form.languagesSpoken
        ? form.languagesSpoken
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      submitData.affiliations = form.affiliations
        ? form.affiliations
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      submitData.awards = form.awards
        ? form.awards
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      submitData.memberships = form.memberships
        ? form.memberships
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      submitData.socialLinks = {
        website: form["socialLinks.website"] || "",
        linkedin: form["socialLinks.linkedin"] || "",
      };
      // Ensure consultationFee is a number
      if (form.consultationFee !== undefined && form.consultationFee !== "") {
        submitData.consultationFee = Number(form.consultationFee);
      }
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl("api/user/profile"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fields = getFieldsByRole(role);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>
        {fields.map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block mb-1 font-medium">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                required={field.name === "role"}
                className="w-full border px-3 py-2 rounded">
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                rows={3}
              />
            ) : (
              <input
                name={field.name}
                type={field.type}
                value={form[field.name] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                {...(field.name === "consultationFee" ? { step: 1, min: 0, onWheel: (e) => e.target.blur() } : {})}
              />
            )}
          </div>
        ))}
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-2 text-center">{success}</div>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="w-full mt-3 bg-gray-200 text-gray-700 py-2 rounded font-semibold hover:bg-gray-300">
          Cancel
        </button>
      </form>
    </div>
  );
}
