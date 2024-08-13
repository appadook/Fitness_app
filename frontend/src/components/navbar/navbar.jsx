// import React from 'react';
// import { Link } from 'react-router-dom';
// import './navbar.css';
// import BackButton from '../backBtn/backButton';

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <ul className="navbar-list">
//         <BackButton />
//         <li className="navbar-item">
//           <Link to="/" className="navbar-link">Home</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/workouts" className="navbar-link">Workouts</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/personal-records" className="navbar-link">PRs</Link>
//         </li>
//         <li className="navbar-item">
//           <Link to="/personal-records" className="navbar-link">Log Workout</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


// New code =>
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar2.css';
import BackButton from '../backBtn/backButton';
import Logo from '../../assets/logo.svg';

const Navbar = ({ signOut, session }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const navbarRef = useRef(null);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'PRs', path: '/personal-records' }
    // ,{ name: 'Log Workout', path: '/log-workout' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = menuItems.findIndex(item => item.path === currentPath);
    setActiveIndex(activeItem !== -1 ? activeItem : 0);
  }, [location.pathname, menuItems]);

  return (
    <nav className="navbar" ref={navbarRef}>
      <ul className="navbar-list">
        <BackButton className="back-btn"/>
        <li className="navbar-logo">
          <img src={Logo} alt="Logo" className="logo-image" />
        </li>
        <li className='navbar-links-list'>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`navbar-item ${index === activeIndex ? 'active' : ''}`}
          >
            <Link
              to={item.path}
              className="navbar-link"
              onClick={() => setActiveIndex(index)}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li className='navbar-item'>
          <button onClick={signOut} className='navbar-link'>Logout</button>
        </li>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
