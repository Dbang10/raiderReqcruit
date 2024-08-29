import React from 'react';
import '../styles/JobCard.css';

const JobCard = ({ job, onClick }) => {
  return (
    <div className="job-card" onClick={onClick}>
      <h3>{job.title}</h3>
      <p>{job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
    </div>
  );
};

export default JobCard;