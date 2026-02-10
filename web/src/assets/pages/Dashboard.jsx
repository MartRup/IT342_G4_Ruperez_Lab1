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
    localStorage.removeItem('userFirstName');
    navigate('/login');
  };

  // Get first 50 characters of token for display
  const shortToken = token ? `${token.substring(0, 50)}...` : 'No token available';

  return (
    <div className="dashboard-container">
      <img src={logoUrl} alt="MiniApp" className="logo" />
      
      <div className="dashboard-hero">
        <h1>Welcome back, {firstName}! 👋</h1>
        <p className="muted">You're successfully logged in to your dashboard</p>
      </div>

      <div className="card">
        <h3>🌟 Account Overview</h3>
        <div style={{ marginBottom: 20 }}>
          <p style={{ marginBottom: 8 }}><strong>👤 Username:</strong> <span style={{ color: '#6366f1', fontWeight: 600 }}>{firstName}</span></p>
          <p style={{ marginBottom: 16 }}><strong>📧 Status:</strong> <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span></p>
        </div>
        
        <h3>🔐 Session Information</h3>
        <div>
          <p style={{ marginBottom: 8 }}><strong>Token:</strong></p>
          <code className="token">{shortToken}</code>
          <p style={{ marginTop: 12, fontSize: 14, color: '#64748b' }}>
            This JWT token is used to authenticate your requests to the API
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, gap: 16 }}>
        <button className="button-cta" onClick={handleLogout}>
          🚪 Log out
        </button>
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: 32, 
        padding: '20px', 
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>✨ What's Next?</h3>
        <p style={{ margin: 0, color: '#64748b', fontSize: 15 }}>
          Explore the application or manage your account settings through the navigation menu above.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
