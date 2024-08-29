import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Raider Recruit</h1>
        <nav className="header-nav">
          <Link to="/login" className="header-button">Login</Link>
          <Link to="/register" className="header-button">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;