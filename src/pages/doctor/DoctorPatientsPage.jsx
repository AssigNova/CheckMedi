import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../api";
import AuthContext from "../../context/AuthContext";
import {
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  ClipboardListIcon,
  DocumentReportIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/outline";

export default function DoctorPatientsPage({ doctorId }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("prescriptions");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
      } catch (err) {
        setError("Failed to load patients" + err);
      } finally {
        setLoading(false);
      }
    }
    if (doctorId) fetchPatients();
  }, [doctorId]);

  const handleSelectPatient = async (patient) => {
    setSelectedPatient(patient);
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");

      // Fetch prescriptions
      const presRes = await axios.get(apiUrl(`api/prescriptions/patient/${patient._id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const filteredPrescriptions = presRes.data.filter((pr) => {
        if (!pr.doctorId) return false;
        if (typeof pr.doctorId === "object") return pr.doctorId._id === doctorId;
        return pr.doctorId === doctorId;
      });
      setPrescriptions(filteredPrescriptions);

      // Fetch reports
      const reportsRes = await axios.get(apiUrl(`api/reports?patient_id=${patient._id}&doctor_id=${doctorId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(reportsRes.data);
    } catch (err) {
      setError("Failed to load patient data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const viewReportDetails = (reportId) => {
    navigate(`/lab/reports/${reportId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <UserGroupIcon className="h-10 w-10 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded flex items-center">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Patient List */}
          <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Patient List</h2>
              <p className="text-indigo-200 text-sm mt-1">
                {patients.length} patient{patients.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="p-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => <div key={idx} className="animate-pulse bg-gray-200 h-16 rounded-lg mb-3"></div>)
              ) : patients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <UserGroupIcon className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="mt-2">No patients found</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {patients.map((p) => (
                    <li key={p._id}>
                      <button
                        className={`w-full text-left p-4 rounded-lg flex items-center transition-all ${
                          selectedPatient?._id === p._id ? "bg-indigo-50 border-l-4 border-indigo-500" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleSelectPatient(p)}>
                        <div className="bg-indigo-100 p-2 rounded-full mr-3">
                          <UserIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{p.name}</div>
                          <div className="text-sm text-gray-500">{p.email || p.gender || "No contact info"}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Patient Details */}
          <div className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden">
            {selectedPatient ? (
              <>
                <div className="bg-white px-6 py-5 border-b">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <UserIcon className="h-8 w-8 text-indigo-600 mr-3" />
                        {selectedPatient.name}
                      </h2>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {selectedPatient.age && (
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Age: {selectedPatient.age}</span>
                        )}
                        {selectedPatient.gender && (
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Gender: {selectedPatient.gender}</span>
                        )}
                        {selectedPatient.bloodGroup && (
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Blood Group: {selectedPatient.bloodGroup}</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="text-sm text-gray-500">Last seen</div>
                      <div className="font-medium">
                        {selectedPatient.lastAppointmentDate ? formatDate(selectedPatient.lastAppointmentDate) : "No record"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="border-b border-gray-200 mb-6">
                    <nav className="flex space-x-8">
                      <button
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "prescriptions"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("prescriptions")}>
                        <div className="flex items-center">
                          <ClipboardListIcon className="h-5 w-5 mr-2" />
                          Prescriptions ({prescriptions.length})
                        </div>
                      </button>
                      <button
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "reports"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("reports")}>
                        <div className="flex items-center">
                          <DocumentReportIcon className="h-5 w-5 mr-2" />
                          Lab Reports ({reports.length})
                        </div>
                      </button>
                      <button
                        className={`pb-3 px-1 border-b-2 font-medium text-sm ${
                          activeTab === "history"
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("history")}>
                        <div className="flex items-center">
                          <ClockIcon className="h-5 w-5 mr-2" />
                          Medical History
                        </div>
                      </button>
                    </nav>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : activeTab === "prescriptions" ? (
                    <div>
                      {prescriptions.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                          <ClipboardListIcon className="h-12 w-12 mx-auto text-gray-300" />
                          <h3 className="mt-4 text-lg font-medium text-gray-900">No prescriptions</h3>
                          <p className="mt-1 text-gray-500">No prescriptions found for this patient.</p>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          {prescriptions.map((pr) => (
                            <div key={pr._id} className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-gray-800">Prescription #{pr.prescriptionNumber || "N/A"}</h3>
                                  <p className="text-sm text-gray-500 mt-1">Date: {formatDate(pr.date)}</p>
                                </div>
                                <div className="bg-indigo-50 px-3 py-1 rounded-full text-sm text-indigo-800">
                                  {pr.pharmacyId?.name || "No pharmacy assigned"}
                                </div>
                              </div>

                              <div className="mt-4">
                                <h4 className="font-medium text-gray-700 mb-2">Medications</h4>
                                <ul className="space-y-2">
                                  {pr.medicines.map((m, i) => (
                                    <li key={i} className="flex items-start">
                                      <div className="bg-green-100 p-1 rounded-full mr-2 mt-1">
                                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                      </div>
                                      <div>
                                        <span className="font-medium">{m.name}</span> - {m.dosage}, {m.frequency}, {m.duration}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {pr.notes && (
                                <div className="mt-4">
                                  <h4 className="font-medium text-gray-700 mb-2">Doctor's Notes</h4>
                                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{pr.notes}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : activeTab === "reports" ? (
                    <div>
                      {reports.length === 0 ? (
                        <div className="text-center py-10 bg-gray-50 rounded-lg">
                          <DocumentReportIcon className="h-12 w-12 mx-auto text-gray-300" />
                          <h3 className="mt-4 text-lg font-medium text-gray-900">No lab reports</h3>
                          <p className="mt-1 text-gray-500">No lab reports found for this patient.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {reports.map((report) => (
                            <div
                              key={report._id}
                              className="border border-gray-200 rounded-lg p-5 hover:border-indigo-300 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-gray-800">{report.report_type}</h3>
                                  <p className="text-sm text-gray-500 mt-1">Requested: {formatDate(report.created_at)}</p>
                                </div>
                                <div className="flex items-center">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                                    {report.status === "in_progress" ? "In Progress" : report.status}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Lab</p>
                                  <p className="font-medium">{report.lab_id?.name || "Unknown Lab"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Priority</p>
                                  <p className="font-medium capitalize">{report.priority || "Normal"}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Last Updated</p>
                                  <p className="font-medium">{formatDate(report.updated_at)}</p>
                                </div>
                              </div>

                              {report.report_details && (
                                <div className="mt-4">
                                  <p className="text-sm text-gray-500">Details</p>
                                  <p className="text-gray-600 mt-1 line-clamp-2">{report.report_details}</p>
                                </div>
                              )}

                              <div className="mt-5 flex justify-end">
                                <button
                                  onClick={() => viewReportDetails(report._id)}
                                  className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                                  View Full Report
                                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <ClockIcon className="h-12 w-12 mx-auto text-gray-300" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Medical History</h3>
                      <p className="mt-1 text-gray-500">Patient medical history will be displayed here.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[300px] p-6">
                <UserGroupIcon className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Select a Patient</h3>
                <p className="text-gray-500 text-center">
                  Choose a patient from the list to view their medical details, prescriptions, and lab reports.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
