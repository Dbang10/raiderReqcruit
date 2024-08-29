import React, { useEffect, useState } from "react";
import JobCardIndex from "../components/JobCardIndex";
import { getAllJobs } from "../services/api"; // Import the API call to fetch jobs
import { Navigate, useNavigate } from 'react-router-dom';

function JobListings() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response.data); // Store fetched jobs in the state
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs(); // Call fetchJobs when the component mounts
  }, []);

  const navigate = useNavigate(); 
  const returnApplicantPortal = async (event) => {
    event.preventDefault();
    try {
      navigate('/applicant-dashboardjob');
    } catch (error) {
      console.error('Error redirecting to apply job:', error);
    }
  };


  return (
    <div>
      <button className="return-button" onClick={returnApplicantPortal}>Return to Applicant Dashboard</button>
      {/* Other components like SearchBar, Header, etc. can be included here */}
      {jobs.map((job) => (
        <JobCardIndex key={job.id} {...job} />
      ))}
    </div>
  );
}

export default JobListings;
