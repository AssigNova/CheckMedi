import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const patientId = localStorage.getItem('patientId');
        const res = await axios.get(apiUrl(`/api/reports?patient_id=${patientId}`), {
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
    <div>
      <h2>My Lab Reports</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul>
          {reports.map(report => (
            <li key={report._id}>
              <strong>Doctor:</strong> {report.doctor_id}<br />
              <strong>Lab:</strong> {report.lab_id}<br />
              <strong>Type:</strong> {report.report_type}<br />
              <strong>Details:</strong> {report.report_details}<br />
              <strong>Status:</strong> {report.status}<br />
              {report.pdf_url ? (
                <a href={report.pdf_url} target="_blank" rel="noopener noreferrer">Download PDF</a>
              ) : (
                <span>Awaiting report from lab</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientReports;
