// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../../api";
// import AuthContext from "../../context/AuthContext";

// const DoctorRequestReport = ({ doctorId }) => {
//   const { user } = useContext(AuthContext);
//   const [patients, setPatients] = useState([]);
//   const [labs, setLabs] = useState([]);
//   const [form, setForm] = useState({ patient_id: "", lab_id: "", report_type: "", report_details: "", doctor_id: user.id });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   doctorId = user.id;

//   useEffect(() => {
//     async function fetchPatients() {
//       setLoading(true);
//       setError("");
//       try {
//         const token = localStorage.getItem("token");
//         // Get all patients who had appointments with this doctor
//         const res = await axios.get(apiUrl("api/appointments"), {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const resLabs = await axios.get(apiUrl("api/labs"), {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // Filter unique patients from appointments
//         const appointments = res.data.filter((a) => a.doctor?._id === doctorId || a.doctor === doctorId);
//         const uniquePatients = [];
//         const seen = new Set();
//         appointments.forEach((a) => {
//           const p = a.patient;
//           const pid = p?._id || p;
//           if (!seen.has(pid)) {
//             seen.add(pid);
//             uniquePatients.push(p);
//           }
//         });
//         setPatients(uniquePatients);
//         setLabs(resLabs.data);
//       } catch (err) {
//         setError("Failed to load patients" + err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (doctorId) fetchPatients();
//   }, [doctorId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => {
//       const updated = { ...prev, [name]: value };
//       console.log("Updated form:", updated); // This shows real-time changes
//       return updated;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(apiUrl("/api/reports"), form, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSuccess(true);
//       setForm({ patient_id: "", lab_id: "", report_type: "", report_details: "" });
//     } catch (err) {
//       setError(err.response?.data?.error || "Error requesting report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Request Lab Report</h2>
//       <form onSubmit={handleSubmit}>
//         <select name="patient_id" value={form.patient_id} onChange={handleChange} required>
//           <option value="">Select Patient</option>
//           {(Array.isArray(patients) ? patients : []).map((p) => (
//             <option key={p._id} value={p._id}>
//               {p.name}
//             </option>
//           ))}
//         </select>
//         <select name="lab_id" value={form.lab_id} onChange={handleChange} required>
//           <option value="">Select Lab</option>
//           {(Array.isArray(labs) ? labs : []).map((l) => (
//             <option key={l._id} value={l._id}>
//               {l.name}
//             </option>
//           ))}
//         </select>
//         <input name="doctor_id" value={doctorId} readOnly />
//         <input name="report_type" value={form.report_type} onChange={handleChange} placeholder="Report Type" required />
//         <textarea name="report_details" value={form.report_details} onChange={handleChange} placeholder="Report Details" />
//         <button type="submit" disabled={loading}>
//           {loading ? "Requesting..." : "Request Report"}
//         </button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {success && <p style={{ color: "green" }}>Report requested successfully!</p>}
//     </div>
//   );
// };

// export default DoctorRequestReport;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../api";
import AuthContext from "../../context/AuthContext";

const DoctorRequestReport = ({ doctorId }) => {
  const { user } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({
    patient_id: "",
    lab_id: "",
    report_type: "",
    report_details: "",
    doctor_id: user.id,
    priority: "normal",
    test_date: "",
    instructions: "",
    required_tests: [],
    test_options: [
      { id: "blood", name: "Blood Test" },
      { id: "urine", name: "Urine Analysis" },
      { id: "xray", name: "X-Ray" },
      { id: "mri", name: "MRI Scan" },
      { id: "ultrasound", name: "Ultrasound" },
      { id: "ecg", name: "ECG" },
      { id: "ct", name: "CT Scan" },
      { id: "biopsy", name: "Biopsy" },
      { id: "genetic", name: "Genetic Testing" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  doctorId = user.id;

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        // Get all patients who had appointments with this doctor
        const res = await axios.get(apiUrl("api/appointments"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const resLabs = await axios.get(apiUrl("api/labs"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filter unique patients from appointments
        const appointments = res.data.filter((a) => a.doctor?._id === doctorId || a.doctor === doctorId);
        const uniquePatients = [];
        const seen = new Set();
        appointments.forEach((a) => {
          const p = a.patient;
          const pid = p?._id || p;
          if (!seen.has(pid)) {
            seen.add(pid);
            uniquePatients.push(p);
          }
        });
        setPatients(uniquePatients);
        setLabs(resLabs.data);
      } catch (err) {
        setError("Failed to load patients" + err);
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchPatients();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestToggle = (testId) => {
    setForm((prev) => {
      const newTests = prev.required_tests.includes(testId)
        ? prev.required_tests.filter((id) => id !== testId)
        : [...prev.required_tests, testId];
      return { ...prev, required_tests: newTests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem("token");
      await axios.post(apiUrl("/api/reports"), form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setForm((prev) => ({
        ...prev,
        patient_id: "",
        lab_id: "",
        report_type: "",
        report_details: "",
        priority: "normal",
        test_date: "",
        instructions: "",
        required_tests: [],
      }));
    } catch (err) {
      setError(err.response?.data?.error || "Error requesting report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">Request Lab Report</h2>
        <p className="text-gray-600">Order diagnostic tests for your patients from trusted labs</p>
      </div>

      <div className="bg-indigo-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-indigo-800 mb-4">Doctor Information</h3>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div>
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.specialization || "Medical Specialist"}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Patient</label>
            <div className="relative">
              <select
                name="patient_id"
                value={form.patient_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Choose a patient</option>
                {(Array.isArray(patients) ? patients : []).map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name} • {p.age ? `${p.age}yrs` : "Age not specified"}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Lab Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Laboratory</label>
            <div className="relative">
              <select
                name="lab_id"
                value={form.lab_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Choose a laboratory</option>
                {(Array.isArray(labs) ? labs : []).map((l) => (
                  <option key={l._id} value={l._id}>
                    {l.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Report Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <input
              name="report_type"
              value={form.report_type}
              onChange={handleChange}
              placeholder="e.g., Complete Blood Count, Lipid Profile"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <div className="relative">
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="normal">Normal (2-3 days)</option>
                <option value="urgent">Urgent (24 hours)</option>
                <option value="stat">STAT (Immediate)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Required Tests */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Required Tests</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {form.test_options.map((test) => (
              <div key={test.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={test.id}
                  checked={form.required_tests.includes(test.id)}
                  onChange={() => handleTestToggle(test.id)}
                  className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor={test.id} className="ml-2 text-sm text-gray-700">
                  {test.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Test Date</label>
            <input
              type="date"
              name="test_date"
              value={form.test_date}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
            <input
              name="instructions"
              value={form.instructions}
              onChange={handleChange}
              placeholder="e.g., Fasting required, Morning sample preferred"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Report Details */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Clinical Notes & Details</label>
          <textarea
            name="report_details"
            value={form.report_details}
            onChange={handleChange}
            placeholder="Provide clinical context, symptoms, and specific areas to focus on..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center disabled:opacity-70">
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Request...
              </>
            ) : (
              "Submit Lab Request"
            )}
          </button>
        </div>

        {/* Status Messages */}
        <div className="mt-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Report requested successfully! The lab has been notified.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorRequestReport;
