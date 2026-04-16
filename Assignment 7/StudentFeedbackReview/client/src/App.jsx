import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SubmitFeedback from './pages/SubmitFeedback';
import ViewFeedback from './pages/ViewFeedback';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="container" style={{padding: '2rem'}}>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/submit" 
            element={
              <ProtectedRoute>
                <SubmitFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/view" 
            element={
              <ProtectedRoute>
                <ViewFeedback />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
