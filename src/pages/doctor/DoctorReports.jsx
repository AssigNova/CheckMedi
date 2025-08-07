import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../api";
import SideBar from '../../UI/SideBar';
import {
  UserGroupIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";

const DoctorReports = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const doctorId = localStorage.getItem('doctorId');
        console.log("Fetching reports for doctorId:", doctorId);
        const res = await axios.get(apiUrl(`/api/reports?doctor_id=${doctorId}`), {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReports(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to right, #f8fafc, #e0e7ff)' }}>
      <div style={{ minWidth: 240, background: '#fff', boxShadow: '2px 0 8px rgba(0,0,0,0.04)', zIndex: 2 }}>
        <SideBar
          values={[ 
            { id: "overview", icon: ChartBarIcon, label: "Overview" },
            { id: "appointments", icon: CalendarIcon, label: "Appointments" },
            { id: "patients", icon: UserGroupIcon, label: "Patients" },
            { id: "request-report", icon: ShieldCheckIcon, label: "Request Report", link: "/doctor/request-report" },
            { id: "reports", icon: DocumentTextIcon, label: "Reports", link: "/doctor/reports" },
            { id: "profile", icon: UserCircleIcon, label: "Profile" },
          ]}
          heading="CheckMedi"
          text="Doctor Portal"
          onClickTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
      <main style={{ flex: 1, padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'transparent' }}>
        <div style={{ width: '100%', maxWidth: 800, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '2rem 2.5rem', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: '#3730a3' }}>My Requested Lab Reports</h2>
          {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
            Array.isArray(reports) && reports.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {reports.map(report => (
                  <li key={report._id} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: 8, background: '#f3f4f6', boxShadow: '0 1px 4px rgba(0,0,0,0.03)' }}>
                    <div style={{ marginBottom: 8 }}><strong>Patient:</strong> {report.patient_id}</div>
                    <div style={{ marginBottom: 8 }}><strong>Lab:</strong> {report.lab_id}</div>
                    <div style={{ marginBottom: 8 }}><strong>Type:</strong> {report.report_type}</div>
                    <div style={{ marginBottom: 8 }}><strong>Details:</strong> {report.report_details}</div>
                    <div style={{ marginBottom: 8 }}><strong>Status:</strong> {report.status}</div>
                    <div>
                      {report.pdf_url ? (
                        <a href={report.pdf_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 600 }}>Download PDF</a>
                      ) : (
                        <span style={{ color: '#a1a1aa' }}>Awaiting report from lab</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#6b7280', textAlign: 'center', margin: '2rem 0' }}>No reports found.</p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorReports;
