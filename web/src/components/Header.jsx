import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    // Keep token state in sync across tabs/windows
    const onStorage = (e) => {
      if (e.key === 'token') setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', onStorage);

    // Also update on focus (useful after login in same tab)
    const onFocus = () => setToken(localStorage.getItem('token'));
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('focus', onFocus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userFirstName');
    setToken(null);
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="container">
        <h1 className="brand">MiniApp</h1>
        <nav>
          <Link to="/">Home</Link>
          {!token && <Link to="/login">Login</Link>}
          {!token && <Link to="/register">Register</Link>}
          {token && <Link to="/dashboard">Dashboard</Link>}
          {token && (
            <button className="logout" onClick={handleLogout}>
              Log out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
