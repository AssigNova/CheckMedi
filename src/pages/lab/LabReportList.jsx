import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../api";

const LabReportList = () => {
  const [reports, setReports] = useState([]);
  const [completedReports, setCompletedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const labId = localStorage.getItem('labId');
        const [pendingRes, completedRes] = await Promise.all([
          axios.get(apiUrl('/api/reports?status=pending'), { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(apiUrl('/api/reports?status=completed'), { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setReports(pendingRes.data.filter(r => r.lab_id === labId));
        setCompletedReports(completedRes.data.filter(r => r.lab_id === labId));
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching reports');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleFileChange = async (e, reportId) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingId(reportId);
    setUploadError(null);
    setUploadSuccess(false);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('pdf', file);
      await axios.put(apiUrl(`/api/reports/${reportId}/upload`), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadSuccess(true);
      setReports(reports.filter(r => r._id !== reportId)); // Remove from pending list
    } catch (err) {
      setUploadError(err.response?.data?.error || 'Error uploading PDF');
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <div>
      <h2>Pending Lab Reports</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul>
          {reports.map(report => (
            <li key={report._id}>
              <strong>Patient:</strong> {report.patient_id}<br />
              <strong>Doctor:</strong> {report.doctor_id}<br />
              <strong>Type:</strong> {report.report_type}<br />
              <strong>Details:</strong> {report.report_details}<br />
              <input type="file" accept="application/pdf" onChange={e => handleFileChange(e, report._id)} disabled={uploadingId === report._id} />
              {uploadingId === report._id && <span>Uploading...</span>}
            </li>
          ))}
        </ul>
      )}
      {uploadError && <p style={{color:'red'}}>{uploadError}</p>}
      {uploadSuccess && <p style={{color:'green'}}>PDF uploaded successfully!</p>}

      <h2 style={{marginTop:'2em'}}>Completed Lab Reports</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul>
          {completedReports.map(report => (
            <li key={report._id}>
              <strong>Patient:</strong> {report.patient_id}<br />
              <strong>Doctor:</strong> {report.doctor_id}<br />
              <strong>Type:</strong> {report.report_type}<br />
              <strong>Details:</strong> {report.report_details}<br />
              {report.pdf_url ? (
                <a href={report.pdf_url} target="_blank" rel="noopener noreferrer">Download PDF</a>
              ) : (
                <span>No PDF uploaded</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LabReportList;
