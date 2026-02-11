import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import Dashboard from './assets/pages/Dashboard';
import Profile from './assets/pages/Profile';
import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import ErrorBoundary from './components/ErrorBoundary';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <Router>
      <Header />
      <main className="app-main">
        <ErrorBoundary>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected Route: Dashboard */}
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            {/* Protected Route: Profile */}
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </Router>
  );
}

export default App;