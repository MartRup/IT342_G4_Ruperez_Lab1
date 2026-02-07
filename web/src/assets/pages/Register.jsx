import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoUrl from '../images/logo.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    // Demo registration
    localStorage.setItem('userFirstName', formData.firstName);
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <img src={logoUrl} alt="MiniApp" className="logo" />
      <div className="brand-pill"><span className="brand-dot" /><span className="brand-text">MiniApp</span></div>
      <h2>Create account</h2>
      <p className="muted">Sign up to get started — it only takes a minute</p>

      <form onSubmit={handleRegister}>
        {error && <div className="error">{error}</div>}
        <div className="form-row">
          <input type="text" placeholder="First name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        </div>
        <div className="form-row">
          <input type="text" placeholder="Last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
        </div>
        <div className="form-row">
          <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className="form-row">
          <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
        </div>

        <button className="button-cta" type="submit">Create account</button>
      </form>

      <p className="center muted">Already have an account? <Link className="signin-link" to="/login">Sign in</Link></p>
    </div>
  );
};

export default Register;
