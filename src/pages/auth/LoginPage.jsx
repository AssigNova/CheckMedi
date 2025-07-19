import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // No actual login logic for now
    console.log('Login attempt with:', { email, password });
    alert('Login functionality is not implemented yet.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <div style={{ padding: '40px', borderRadius: '8px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '300px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '300px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            />
          </div>
          <button
            type="submit"
            style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#3b82f6', color: 'white', fontSize: '16px', cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
