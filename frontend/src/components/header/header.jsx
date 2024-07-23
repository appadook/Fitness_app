import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Create this CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="header-list">
          <li className="header-item"><Link to="/">Home</Link></li>
          <li className="header-item"><Link to="/workouts">Workouts</Link></li>
          <li className="header-item"><Link to="/personal-records">PRs</Link></li>
          <li className="header-item"><Link to="/log-workout">Log Workout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
