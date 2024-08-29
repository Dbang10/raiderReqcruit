import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/JobListings.css";

function JobCardIndex({ id, title, city, state, country, companyName, status, description, salary }) {
  return (
    <div className='job-card-container'>
      <div className='job-card'>
        <div className='job-details'>
          <h1 className='job-title'>{title} - {companyName}</h1>
          <p style={{ whiteSpace: "pre-line" }}>
            {city} &#x2022; {state} &#x2022; {country}
            {"\n\n"}{status} &#x2022; {salary}
            {"\n\n"}{description}
          </p>
        </div>
        <div className='job-actions'>
          <Link to={`/job-application-form/${id}`} 
            className="apply-button">Apply</Link>
        </div>
      </div>
    </div>
  );
}

export default JobCardIndex;
