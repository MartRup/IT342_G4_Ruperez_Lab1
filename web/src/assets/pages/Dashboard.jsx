import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../images/logo.svg';

const Dashboard = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('User');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const name = localStorage.getItem('userFirstName');
    if (name) setFirstName(name);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userFirstName');
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

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
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, gap: 16 }}>
        <button className="button-cta" onClick={handleLogoutClick}>
          🚪 Log out
        </button>
      </div>

      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          maxWidth: '400px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>Confirm Sign Out</h3>
          <p style={{ margin: '0 0 24px 0', color: '#64748b' }}>
            Are you sure you want to sign out?
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              onClick={cancelLogout}
              style={{
                padding: '10px 20px',
                border: '1px solid #e2e8f0',
                background: '#f1f5f9',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: '#64748b',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
              onMouseLeave={(e) => e.target.style.background = '#f1f5f9'}
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#ef4444',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: 'white',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#dc2626'}
              onMouseLeave={(e) => e.target.style.background = '#ef4444'}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div
          onClick={cancelLogout}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 999
          }}
        />
      )}
      
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
      
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
