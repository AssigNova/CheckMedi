import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { apiUrl } from "../../api";
import axios from "axios";

const AdminDashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
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
        console.log("Here" + usersRes.data);
        setUsers(usersRes.data);
        setAppointments(apptRes.data);
      } catch (err) {
        console.log("Here" + err);
        setError("Failed to load admin data" + err);
      }
      setLoading(false);
    };
    if (user && user.role === "Admin") fetchData();
  }, [user, token]);

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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Admin Dashboard</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">All Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
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
