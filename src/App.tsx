import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModernLandingPage from './components/ModernLandingPage'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Toaster } from 'sonner'
import './App.css'

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<ModernLandingPage />} />
          <Route 
            path="/admin" 
            element={
              isAdminAuthenticated ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </ErrorBoundary>
    </Router>
  )
}

export default App
