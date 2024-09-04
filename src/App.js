import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserDashboard from './pages/UserDashboard';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage'; // Import
import AdminRegisterPage from './pages/AdminRegisterPage'; // Import


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard" element={<UserDashboard />} />
        
        <Route path="/admin/login" element={<AdminLoginPage />} /> {/* Admin login */}
        <Route path="/admin/register" element={<AdminRegisterPage />} /> {/* Admin registration */}
       
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminPage />} adminOnly />}
        />
      </Routes>
    </Router>
  );
};

export default App;
