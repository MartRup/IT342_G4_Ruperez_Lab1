import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoUrl from '../images/logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    // Demo auth
    localStorage.setItem('token', 'dummy-token');
    localStorage.setItem('userFirstName', email.split('@')[0]);
    if (remember) localStorage.setItem('remember', '1');
    navigate('/dashboard');
  };

  // Google Identity Services callback
  const handleGoogleCredential = (response) => {
    // response.credential is a JWT from Google containing user info
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const name = payload.given_name || payload.name || payload.email.split('@')[0];
      localStorage.setItem('token', response.credential);
      localStorage.setItem('userFirstName', name);
      navigate('/dashboard');
    } catch (e) {
      console.error('Failed to parse Google credential', e);
      setError('Google sign-in failed');
    }
  };

  // Render Google button when client id is present
  useEffect(() => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!googleClientId || typeof window === 'undefined') return;

    let attempts = 0;
    const tryInit = () => {
      attempts += 1;
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleGoogleCredential,
        });
        window.google.accounts.id.renderButton(document.getElementById('google-button'), {
          theme: 'filled_blue',
          size: 'large',
          type: 'standard'
        });
        return;
      }
      if (attempts < 10) setTimeout(tryInit, 300);
    };

    tryInit();
  }, []);

  return (
    <div className="auth-container">
      <img src={logoUrl} alt="MiniApp" className="logo" />
      <div className="brand-pill"><span className="brand-dot" /><span className="brand-text">MiniApp</span></div>
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

        <div className="helper-row">
          <label className="remember"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me</label>
          <Link className="forgot" to="/forgot">Forgot?</Link>
        </div>

        <button className="button-cta" type="submit">Sign in</button>
      </form>

      <div id="google-button" style={{ marginTop: 14, display: (import.meta.env.VITE_GOOGLE_CLIENT_ID ? 'block' : 'none') }}></div>
      {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
        <p className="muted center">Set <code>.env.local</code> with <code>VITE_GOOGLE_CLIENT_ID</code> to enable Google sign-in</p>
      )}

      <p className="center muted" style={{ marginTop: 12 }}>Don't have an account? <Link to="/register">Create one</Link></p>
    </div>
  );
};

export default Login;
