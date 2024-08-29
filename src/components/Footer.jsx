import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Raider Recruit. All rights reserved |<a href="/privacy-policy">Privacy Policy</a>|
        <a onClick={() => window.location.href = 'mailto:contact@raiderrecruit.com'}>Contact Us</a>
        </p>
        <p>
          
        </p>
      </div>
    </footer>
  );
};

export default Footer;