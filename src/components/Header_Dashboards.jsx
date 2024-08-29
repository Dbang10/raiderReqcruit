import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header_Dashboards.css';

const Header_Dashboards = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Raider Recruit</h1>
        <nav className="header-nav">
          <Link to="/logout" className="header-button">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header_Dashboards;