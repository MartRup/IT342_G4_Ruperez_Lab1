import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoUrl from '../images/logo.svg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Demo password reset
    setError('');
    setSuccess(true);

    // Redirect to login after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="auth-container">
      <img src={logoUrl} alt="MiniApp" className="logo" />
      <div className="brand-pill">
        <span className="brand-dot" />
        <span className="brand-text">MiniApp</span>
      </div>
      <h2>Forgot Password?</h2>
      <p className="muted">
        No worries! Enter your email and we'll send you reset instructions
      </p>

      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {success && (
          <div className="success">
            Password reset link sent! Check your email and follow the instructions.
          </div>
        )}

        <div className="form-row">
          <svg
            className="form-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8a4 4 0 014-4h10a4 4 0 014 4v8a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            aria-label="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={success}
          />
        </div>

        <button className="button-cta" type="submit" disabled={success}>
          {success ? 'Redirecting...' : 'Send Reset Link'}
        </button>
      </form>

      <p className="center muted" style={{ marginTop: 20 }}>
        Remember your password?{' '}
        <Link className="signin-link" to="/login">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
