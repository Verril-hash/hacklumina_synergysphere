import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import UserProfile from './components/UserProfile';
import OfflineIndicator from './components/OfflineIndicator';
import { offlineSync } from './services/offlineSync';
import './tailwind.css';

function App() {
  useEffect(() => {
    // Start sync listener
    window.addEventListener('online', offlineSync.syncAll);
    return () => window.removeEventListener('online', offlineSync.syncAll);
  }, []);

  return (
    <Router>
      <OfflineIndicator />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;