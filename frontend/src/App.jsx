import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import GlobalStyle from './styles/GlobalStyle';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import JobsList from './components/JobsList';
import ScheduleManager from './components/ScheduleManager';

// Protected route component
const ProtectedRoute = ({ children }) => {
  // In a real app, this would check the auth state from Redux
  const isAuthenticated = true; // Mock authentication for demo
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={
            <ProtectedRoute>
              <JobsList />
            </ProtectedRoute>
          } />
          <Route path="/schedules" element={
            <ProtectedRoute>
              <ScheduleManager />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
