import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../api";

const AdminLabList = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editLabId, setEditLabId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', address: '', contact_number: '', email: '', license_number: '', services_offered: '', accreditation: '', working_hours: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState(null);

  const fetchLabs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(apiUrl('/api/labs'), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLabs(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching labs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabs();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lab?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(apiUrl(`/api/labs/${id}`), {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLabs(labs.filter(lab => lab._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || 'Error deleting lab');
    }
  };

  // Handle edit
  const handleEditClick = (lab) => {
    setEditLabId(lab._id);
    setEditForm({
      name: lab.name,
      address: lab.address,
      contact_number: lab.contact_number,
      email: lab.email,
      license_number: lab.license_number,
      services_offered: lab.services_offered ? lab.services_offered.join(', ') : '',
      accreditation: lab.accreditation || '',
      working_hours: lab.working_hours || ''
    });
    setEditError(null);
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    setEditLoading(true);
    setEditError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(apiUrl(`/api/labs/${editLabId}`), {
        ...editForm,
        services_offered: editForm.services_offered.split(',').map(s => s.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLabs(labs.map(lab => lab._id === editLabId ? res.data : lab));
      setEditLabId(null);
    } catch (err) {
      setEditError(err.response?.data?.error || 'Error updating lab');
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditLabId(null);
    setEditError(null);
  };

  return (
    <div>
      <h2>Lab List</h2>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <ul>
          {labs.map(lab => (
            <li key={lab._id}>
              {editLabId === lab._id ? (
                <form onSubmit={handleEditSubmit} style={{ display: 'inline' }}>
                  <input name="name" value={editForm.name} onChange={handleEditChange} required />
                  <input name="address" value={editForm.address} onChange={handleEditChange} required />
                  <input name="contact_number" value={editForm.contact_number} onChange={handleEditChange} required />
                  <input name="email" value={editForm.email} onChange={handleEditChange} required />
                  <input name="license_number" value={editForm.license_number} onChange={handleEditChange} required />
                  <input name="services_offered" value={editForm.services_offered} onChange={handleEditChange} />
                  <input name="accreditation" value={editForm.accreditation} onChange={handleEditChange} />
                  <input name="working_hours" value={editForm.working_hours} onChange={handleEditChange} />
                  <button type="submit" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                  {editError && <span style={{color:'red'}}>{editError}</span>}
                </form>
              ) : (
                <>
                  <strong>{lab.name}</strong> - {lab.address} - {lab.contact_number}
                  <button onClick={() => handleEditClick(lab)} style={{marginLeft:'10px'}}>Edit</button>
                  <button onClick={() => handleDelete(lab._id)} style={{marginLeft:'5px'}}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminLabList;
