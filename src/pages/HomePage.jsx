import React from 'react';
import '../styles/HomePage.css';
import DownloadButton from '../components/DownloadButton';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="content">
        <img src="/images/recruitment.png" alt="Website" className="home-image" />
        <div className="description">
          <h1>Welcome to Raider Recruit</h1>
          <p>Find the best job or the best candidate, all in one place!</p>
          <p>

            Raider Recruit is your go-to platform for finding the perfect job or hiring the right candidate.
            Explore our features to apply for jobs, post new openings, and more!
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;