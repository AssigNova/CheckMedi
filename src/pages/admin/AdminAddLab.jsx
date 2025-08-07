import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../api";

const AdminAddLab = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    contact_number: '',
    email: '',
    license_number: '',
    services_offered: '',
    accreditation: '',
    working_hours: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem('token');
      await axios.post(apiUrl('/api/labs'), {
        ...form,
        services_offered: form.services_offered.split(',').map(s => s.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      setForm({
        name: '', address: '', contact_number: '', email: '', license_number: '', services_offered: '', accreditation: '', working_hours: ''
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding lab');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add New Lab</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Lab Name" required />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
        <input name="contact_number" value={form.contact_number} onChange={handleChange} placeholder="Contact Number" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="license_number" value={form.license_number} onChange={handleChange} placeholder="License Number" required />
        <input name="services_offered" value={form.services_offered} onChange={handleChange} placeholder="Services Offered (comma separated)" />
        <input name="accreditation" value={form.accreditation} onChange={handleChange} placeholder="Accreditation" />
        <input name="working_hours" value={form.working_hours} onChange={handleChange} placeholder="Working Hours" />
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Lab'}</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>Lab added successfully!</p>}
    </div>
  );
};

export default AdminAddLab;
