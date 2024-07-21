import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/workouts" className="navbar-link">Workouts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/personal-records" className="navbar-link">PRs</Link>
        </li>
        <li className="navbar-item">
          <Link to="/personal-records" className="navbar-link">Log Workout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
