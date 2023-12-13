// Navbar.js
import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const navigate = useNavigate();
  
    const navigateTo = (path) => {
      navigate(path);
    };
  
    return (
        <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <button onClick={() => navigateTo('/')} className="nav-link">
          Map
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => navigateTo('/flowData')} className="nav-link">
            Data
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => navigateTo('/routing')} className="nav-link">
          Routing
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => navigateTo('/report')} className="nav-link">
          Report
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
