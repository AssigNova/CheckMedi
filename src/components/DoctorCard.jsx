import React from 'react';

// Refined styles
const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px', // Consistent padding
  margin: '16px',
  maxWidth: '340px',
  minWidth: '300px',
  flex: '1 1 300px', // Flexbox behavior
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  backgroundColor: 'white', // Added background color
  display: 'flex', // Added for internal layout
  flexDirection: 'column', // Added for internal layout
  alignItems: 'center' // Added for internal layout
};

const imageStyle = {
  width: '80px', // Updated width
  height: '80px', // Updated height
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '16px' // Updated margin
};

const buttonStyle = {
  backgroundColor: '#3b82f6', // blue-600
  color: 'white',
  padding: '12px', // Updated padding
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '12px',
  fontSize: '0.95rem', // Updated font size
  width: '100%', // Full width
  textAlign: 'center', // Centered text
  transition: 'background-color 0.2s ease-in-out' // Added transition for hover
};

// Note: Hover effect for buttonStyle (e.g., darker blue) is not directly possible with inline styles here.
// This would typically be handled by CSS classes or a styling library.

export default function DoctorCard({ doctor }) {
  if (!doctor) {
    return <div style={cardStyle}>Loading doctor details...</div>;
  }

  return (
    <div style={cardStyle}>
      <img src={doctor.photoUrl || 'https://via.placeholder.com/100'} alt={`Dr. ${doctor.name}`} style={imageStyle} />
      <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0', textAlign: 'center' }}>{doctor.name}</h3>
      <p style={{ color: '#3b82f6', fontSize: '0.95rem', fontWeight: '500', margin: '0 0 6px 0', textAlign: 'center' }}>{doctor.specialization}</p>
      <p style={{ color: '#4b5563', fontSize: '0.85rem', margin: '0 0 4px 0', textAlign: 'center' }}>{doctor.experience} years of experience</p>
      <p style={{ color: '#4b5563', fontSize: '0.85rem', margin: '0 0 10px 0', textAlign: 'center' }}>Rating: {doctor.overallRating}/5</p>
      <p style={{ color: '#059669', fontSize: '1rem', fontWeight: '600', margin: '0 0 16px 0', textAlign: 'center' }}>Fee: ₹{doctor.consultationFee}</p>
      {/* More details like qualifications, bio can be added here or in a modal/details view */}
      <button style={buttonStyle}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#2563eb'} // Darker blue on hover
              onMouseOut={e => e.currentTarget.style.backgroundColor = '#3b82f6'} // Original blue on mouse out
      >
        View Profile & Book
      </button>
    </div>
  );
}
