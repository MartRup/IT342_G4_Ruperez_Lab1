import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../images/logo.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('User');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const name = localStorage.getItem('userFirstName');
    if (name) setFirstName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <img src={logoUrl} alt="MiniApp" className="logo" />
      <div className="dashboard-hero">
        <h1>Welcome, {firstName} 👋</h1>
        <p className="muted">This is your dashboard. Use the links above to explore.</p>
      </div>

      <div className="card">
        <h3>Session</h3>
        <p><strong>Token:</strong> <code className="token">{token}</code></p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <button className="button-cta" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

export default Dashboard;
