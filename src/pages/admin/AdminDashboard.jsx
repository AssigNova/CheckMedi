import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { apiUrl } from "../../api";
import axios from "axios";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [hospitalForm, setHospitalForm] = useState({ name: "", address: "", contact: "" });
  const [hospitalLoading, setHospitalLoading] = useState(false);
  const [hospitalError, setHospitalError] = useState("");
  const [hospitalSuccess, setHospitalSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const usersRes = await axios.get(apiUrl("/api/admin/users"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const apptRes = await axios.get(apiUrl("/api/admin/appointments"), {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data);
        setAppointments(apptRes.data);
      } catch (err) {
        setError("Failed to load admin data" + err);
      }
      setLoading(false);
    };
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(apiUrl("/api/hospitals"));
        setHospitals(res.data);
      } catch (err) {
        setHospitalError("Failed to load hospitals");
      }
    };
    if (user && user.role === "Admin") {
      fetchData();
      fetchHospitals();
    }
  }, [user, token]);

  // Add hospital handler
  const handleHospitalInput = (e) => {
    setHospitalForm({ ...hospitalForm, [e.target.name]: e.target.value });
  };
  const handleAddHospital = async (e) => {
    e.preventDefault();
    setHospitalLoading(true);
    setHospitalError("");
    setHospitalSuccess("");
    try {
      const res = await axios.post(apiUrl("/api/hospitals"), hospitalForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitals((prev) => [...prev, res.data]);
      setHospitalForm({ name: "", address: "", contact: "" });
      setHospitalSuccess("Hospital added successfully!");
    } catch (err) {
      setHospitalError("Failed to add hospital: " + (err.response?.data?.message || err.message));
    }
    setHospitalLoading(false);
  };

  console.log(error);

  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
  if (!user || user.role !== "Admin") return <div className="text-center text-lg mt-8">Access denied.</div>;
  if (loading) return <div className="text-center text-lg mt-8">Loading...</div>;

  // Approve/Reject handlers
  const handleApprove = async (id) => {
    try {
      await axios.put(
        apiUrl(`/api/admin/approve/${id}`),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, isVerified: true } : u)));
    } catch (e) {
      alert("Failed to approve user" + e);
    }
  };
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject and delete this user?")) return;
    try {
      await axios.delete(apiUrl(`/api/admin/reject/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (e) {
      alert("Failed to reject user" + e);
    }
  };

  // Secure document view handler
  const handleViewDocument = async (userId, fileName = "document") => {
    try {
      const res = await fetch(apiUrl(`/api/admin/doctor-document/${userId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch document");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      // Try to open in new tab if possible, else download
      const win = window.open(url, "_blank");
      if (!win) {
        // fallback: download
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      setTimeout(() => window.URL.revokeObjectURL(url), 5000);
    } catch (err) {
      alert("Could not open document: " + err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h2>

      {/* Hospital Management Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Hospital Management</h3>
        <form className="mb-6 flex flex-col md:flex-row gap-4 items-end" onSubmit={handleAddHospital}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={hospitalForm.name}
              onChange={handleHospitalInput}
              required
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={hospitalForm.address}
              onChange={handleHospitalInput}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              name="contact"
              value={hospitalForm.contact}
              onChange={handleHospitalInput}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" disabled={hospitalLoading}>
            {hospitalLoading ? "Adding..." : "Add Hospital"}
          </button>
        </form>
        {hospitalError && <div className="text-red-600 mb-2">{hospitalError}</div>}
        {hospitalSuccess && <div className="text-green-600 mb-2">{hospitalSuccess}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Address</th>
                <th className="py-2 px-4 text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h._id} className="border-b">
                  <td className="py-2 px-4">{h.name}</td>
                  <td className="py-2 px-4">{h.address}</td>
                  <td className="py-2 px-4">{h.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Users Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">All Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Hospital</th>
                <th className="py-2 px-4 text-left">Document</th>
                <th className="py-2 px-4 text-left">Verified</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-blue-50">
                  <td className="py-2 px-4">{u.name}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">{u.role}</td>
                  <td className="py-2 px-4">
                    {u.hospital ? u.hospital.name : u.role === "Doctor" ? <span className="text-gray-400">None</span> : ""}
                  </td>
                  <td className="py-2 px-4">
                    {u.role === "Doctor" && u.documents ? (
                      <button
                        onClick={() => handleViewDocument(u._id, u.documents.split("/").pop())}
                        className="text-blue-600 underline hover:text-blue-800 bg-transparent border-none cursor-pointer p-0">
                        View Document
                      </button>
                    ) : (
                      <span className="text-gray-400">No Document</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {u.isVerified ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-500 font-semibold">No</span>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {(u.role === "Doctor" || u.role === "Pharmacy") && !u.isVerified && (
                      <>
                        <button
                          onClick={() => handleApprove(u._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2 transition">
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(u._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">All Appointments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 text-left">Patient</th>
                <th className="py-2 px-4 text-left">Doctor</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-blue-50">
                  <td className="py-2 px-4">{a.patient?.name}</td>
                  <td className="py-2 px-4">{a.doctor?.name}</td>
                  <td className="py-2 px-4">{new Date(a.date).toLocaleString()}</td>
                  <td className="py-2 px-4">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
