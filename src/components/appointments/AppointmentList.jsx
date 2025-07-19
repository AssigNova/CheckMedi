import { useEffect, useState } from "react";
import Appointment from "./Appointment";
import WrapperCard from "../../Templates/WrapperCard";
import PrescriptionModal from "../prescriptions/PrescriptionModal";
import { apiUrl } from "../../api";

export default function AppointmentList({ role, setScheduleView, scheduleView }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(apiUrl("api/appointments"), {
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
    <WrapperCard
      heading={"Consultation Schedule"}
      options={
        <div className="flex space-x-2">
          <button
            onClick={() => setScheduleView("upcoming")}
            className={`px-4 py-2 rounded-lg ${scheduleView === "upcoming" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            Upcoming
          </button>
          <button
            onClick={() => setScheduleView("past")}
            className={`px-4 py-2 rounded-lg ${scheduleView === "past" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}>
            Past Consultations
          </button>
        </div>
      }>
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
              <Appointment
                key={appt._id}
                values={[
                  { text: appt.doctor?.name || "-", color: "" },
                  { text: appt.patient?.name || "-", color: "" },
                  { text: new Date(appt.date).toLocaleString(), color: "" },
                  { text: appt.type, color: "blue" },
                  {
                    text: appt.status,
                    color:
                      appt.status === "confirmed"
                        ? "green"
                        : appt.status === "pending"
                        ? "yellow"
                        : appt.status === "cancelled"
                        ? "red"
                        : "",
                  },
                  { text: "", color: "" }, // Placeholder for actions
                ]}
                actions={<ManageAppointmentButton appt={appt} role={role} onAction={() => window.location.reload()} />}
              />
            ))}
          </tbody>
        </table>
      </div>
    </WrapperCard>
  );
}

function ManageAppointmentButton({ appt, role, onAction }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPrescribe, setShowPrescribe] = useState(false);
  const doctorId = appt.doctor?._id || appt.doctor; // fallback for populated or id

  const updateStatus = async (status) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(apiUrl(`api/appointments/${appt._id}`), {
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
      {role === "Doctor" && appt.status === "completed" && (
        <>
          <button onClick={() => setShowPrescribe(true)} className="text-blue-600 hover:underline">
            Prescribe
          </button>
          <PrescriptionModal
            open={showPrescribe}
            onClose={() => setShowPrescribe(false)}
            appointment={appt}
            doctorId={doctorId}
            onSuccess={onAction}
          />
        </>
      )}
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
