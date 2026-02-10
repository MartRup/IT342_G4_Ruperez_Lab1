import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../utils/api';
import logoUrl from '../images/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const response = await authService.login({
        username: email,
        password: password
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userFirstName', data.username);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="login-card">
        <h2>Login</h2>
        <p className="muted">Welcome back — sign in to continue</p>

        <form onSubmit={handleLogin}>
          {error && <div className="error">{error}</div>}

          <div className="form-row">
            <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8a4 4 0 014-4h10a4 4 0 014 4v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input aria-label="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="form-row">
            <svg className="form-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="10" rx="2" stroke="#94a3b8" strokeWidth="1.2"/><path d="M7 11V8a5 5 0 1110 0v3" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input aria-label="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="button-cta" type="submit">Sign in</button>
        </form>

        <p className="center muted" style={{ marginTop: 12 }}>Don't have an account? <Link className="create-link" to="/register">Create one</Link></p>
      </div>
    </div>
  );
};

export default Login;
