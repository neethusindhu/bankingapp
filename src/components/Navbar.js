// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">HSBC Bank</Link>
      </div>
      <div className="navbar-links">
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/login">Login</Link> */}
        {/* <Link to="/register">Register</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
