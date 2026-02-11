import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../images/logo.svg';

const Profile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('User');
  const [email, setEmail] = useState('user@example.com');
  const [username, setUsername] = useState('username');
  const [joinDate, setJoinDate] = useState('January 1, 2024');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    email: '',
    username: ''
  });
  
  useEffect(() => {
    const storedFirstName = localStorage.getItem('userFirstName');
    const storedEmail = localStorage.getItem('userEmail');
    const storedUsername = localStorage.getItem('userUsername');
    const storedJoinDate = localStorage.getItem('userJoinDate');
    
    if (storedFirstName) setFirstName(storedFirstName);
    if (storedEmail) setEmail(storedEmail);
    if (storedUsername) setUsername(storedUsername);
    if (storedJoinDate) setJoinDate(storedJoinDate);
    
    setEditForm({
      firstName: storedFirstName || 'User',
      email: storedEmail || 'user@example.com',
      username: storedUsername || 'username'
    });
  }, []);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userFirstName', editForm.firstName);
    localStorage.setItem('userEmail', editForm.email);
    localStorage.setItem('userUsername', editForm.username);
    
    setFirstName(editForm.firstName);
    setEmail(editForm.email);
    setUsername(editForm.username);
    
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      firstName: firstName,
      email: email,
      username: username
    });
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="dashboard-container">
      <img src={logoUrl} alt="MiniApp" className="logo" />
      
      <div className="dashboard-hero">
        <h1>My Profile 👤</h1>
        <p className="muted">Manage your personal information and account settings</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h3>📋 Personal Information</h3>
          <button 
            className="button-secondary" 
            onClick={handleEditClick}
            style={{ 
              padding: '8px 16px', 
              fontSize: '14px',
              background: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#4f46e5'}
            onMouseLeave={(e) => e.target.style.background = '#6366f1'}
          >
            ✏️ Edit
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>Full Name</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>{firstName}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>Username</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>{username}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>Email Address</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>{email}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #e2e8f0' }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>Member Since</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>{joinDate}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
            <span style={{ color: '#64748b', fontWeight: 500 }}>Account Status</span>
            <span style={{ 
              color: '#10b981', 
              fontWeight: 600,
              background: '#10b98120',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '14px'
            }}>
              ✓ Active
            </span>
          </div>
        </div>
      </div>

      {showEditModal && (
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
          width: '90%',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Edit Profile</h3>
          
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Full Name
              </label>
              <input
                type="text"
                name="firstName"
                value={editForm.firstName}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#374151' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button
              onClick={handleCancelEdit}
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
              onClick={handleSaveProfile}
              style={{
                padding: '10px 20px',
                border: 'none',
                background: '#10b981',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                color: 'white',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#059669'}
              onMouseLeave={(e) => e.target.style.background = '#10b981'}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div
          onClick={handleCancelEdit}
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
    </div>
  );
};

export default Profile;
