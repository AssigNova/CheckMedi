import { useEffect, useState } from "react";

export default function AppointmentList({ role }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch appointments");
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <div className="text-center mt-6">Loading appointments...</div>;
  if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

  if (!appointments.length) return <div className="text-center mt-6">No appointments found.</div>;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-white rounded shadow-md">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="pb-3">Doctor</th>
            <th className="pb-3">Patient</th>
            <th className="pb-3">Date & Time</th>
            <th className="pb-3">Type</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id} className="border-b hover:bg-gray-50">
              <td>{appt.doctor?.name || "-"}</td>
              <td>{appt.patient?.name || "-"}</td>
              <td>{new Date(appt.date).toLocaleString()}</td>
              <td>{appt.type}</td>
              <td>{appt.status}</td>
              <td>
                <ManageAppointmentButton appt={appt} role={role} onAction={() => window.location.reload()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ManageAppointmentButton({ appt, role, onAction }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateStatus = async (status) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/appointments/${appt._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      if (onAction) onAction();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Show buttons based on role and status
  return (
    <div className="flex flex-col gap-1">
      {role === "Doctor" && appt.status === "pending" && (
        <button onClick={() => updateStatus("confirmed")} disabled={loading} className="text-blue-600 hover:underline">
          Confirm
        </button>
      )}
      {role === "Doctor" && appt.status === "confirmed" && (
        <button onClick={() => updateStatus("completed")} disabled={loading} className="text-green-600 hover:underline">
          Complete
        </button>
      )}
      {role === "Patient" && ["pending", "confirmed"].includes(appt.status) && (
        <button onClick={() => updateStatus("cancelled")} disabled={loading} className="text-red-600 hover:underline">
          Cancel
        </button>
      )}
      {error && <div className="text-xs text-red-500">{error}</div>}
    </div>
  );
}
