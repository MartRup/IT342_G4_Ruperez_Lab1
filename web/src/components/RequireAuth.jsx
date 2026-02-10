import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Decode JWT token to check expiration
  try {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      // Invalid token format
      localStorage.removeItem('token');
      localStorage.removeItem('userFirstName');
      return <Navigate to="/login" replace />;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime) {
      // Token has expired
      localStorage.removeItem('token');
      localStorage.removeItem('userFirstName');
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    // Error decoding token
    localStorage.removeItem('token');
    localStorage.removeItem('userFirstName');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
