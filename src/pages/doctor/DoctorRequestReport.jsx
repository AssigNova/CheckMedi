import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../api";

const DoctorRequestReport = ({doctorId}) => {
  const [patients, setPatients] = useState([]);
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({ patient_id: '', lab_id: '', report_type: '', report_details: '', doctor_id: doctorId || '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
  setForm(prev => {
    const updated = { ...prev, [name]: value };
    console.log("Updated form:", updated); // This shows real-time changes
    return updated;
  });
};


  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('token');
      await axios.post(apiUrl('/api/reports'), form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setForm({ patient_id: '', lab_id: '', report_type: '', report_details: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Error requesting report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Request Lab Report</h2>
      <form onSubmit={handleSubmit}>
        <select name="patient_id" value={form.patient_id} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {(Array.isArray(patients) ? patients : []).map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <select name="lab_id" value={form.lab_id} onChange={handleChange} required>
          <option value="">Select Lab</option>
          {(Array.isArray(labs) ? labs : []).map(l => <option key={l._id} value={l._id}>{l.name}</option>)}
        </select>
        <input name="doctor_id" value={doctorId} readOnly/>
        <input name="report_type" value={form.report_type} onChange={handleChange} placeholder="Report Type" required />
        <textarea name="report_details" value={form.report_details} onChange={handleChange} placeholder="Report Details" />
        <button type="submit" disabled={loading}>{loading ? 'Requesting...' : 'Request Report'}</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>Report requested successfully!</p>}
    </div>
  );
};

export default DoctorRequestReport;
