import React, { useState, useEffect } from 'react';
import '../styles/ManagerDashboard.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAllJobs,getJobApplicantionByJobId,denyJobApplicationById,offerJobApplicationById, deleteJob } from '../services/api';
import DownloadButton from '../components/DownloadButton';
import {Link} from 'react-router-dom';

const ManagerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch the jobs when the component mounts
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs(); // Call the API function
        setJobs(response.data); // Update the state with the fetched jobs
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs(); // Call the fetchJobs function
  }, []); // Empty dependency array to run only once on mount

  const handleJobClick = async (jobId) => {
    setSelectedJob(jobs.find(job => job.id === jobId));

    const response = await getJobApplicantionByJobId(jobId);
    console.log(response.data)

    setApplications(response.data);
  };

  const handleUpdateDeny = async (applicationId) => {
    try {
      const bool = "true"
        // Call the API to deny the job application
        await denyJobApplicationById(applicationId, bool);

        // If the API call is successful, update the application status in the state
        setApplications(prevApplications =>
            prevApplications.map(app =>
                app._id === applicationId ? { ...app, jobDenied: true } : app
            )
        );
    } catch (error) {
        console.error('Failed to update the application status:', error);
        // Optionally, handle the error, e.g., show an error message to the user
    }
};

  const handleUpdateOffer= async (applicationId) => {
    try {
      const bool = "true"
        // Call the API to deny the job application
        await offerJobApplicationById(applicationId, bool);

        // If the API call is successful, update the application status in the state
        setApplications(prevApplications =>
            prevApplications.map(app =>
                app._id === applicationId ? { ...app, jobDenied: true } : app
            )
        );
    } catch (error) {
        console.error('Failed to update the application status:', error);
        // Optionally, handle the error, e.g., show an error message to the user
    }
};

  const navigate = useNavigate(); 
  const handleAddJob = async (event) => {
    event.preventDefault();
    try {
      navigate('/add-job');
    } catch (error) {
      console.error('Error redirecting', error);
    }
  };

  const handleEditJob = (jobId) => {
    // Placeholder for editing a job
    alert(`Edit Job ${jobId} functionality not implemented.`);
  };

  const handleDeleteJob = async (jobId) => {

    await deleteJob(jobId);
    // Placeholder for deleting a job
    setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(null);
      setApplications([]);
    }
  };

  const handleViewDetails = (applicationId) => {
    // Placeholder for viewing applicant details
    alert('View Details functionality not implemented.');
  };

  return (
    <>
      <div className="manager-dashboard">
        <div className="job-list">
          <h2>Your Job Postings</h2>
          <div>
      <Link to="/add-job">
        <button className="action-button add-job">Add Job</button>
      </Link>
    </div>
          {jobs.map(job => (
            <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
              <h3>{job.title}</h3>
              {/* <p>{job.description}</p> */}
              <div className="job-actions">
                <button className="action-button edit-job" onClick={() => handleEditJob(job.id)}>Edit</button>
                <button className="action-button delete-job" onClick={() => handleDeleteJob(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {selectedJob && (
          <div className="applications-section">
            <h2>Applications for {selectedJob.title}</h2>
            {applications.length ? (
              <ul>
                {applications.map(application => (
                  <li key={application.id}>
                    <p>Applicant: {application.name}</p>
                    <p>Job Offered: {application.jobOffered ? 'Yes' : 'No' }</p>
                    <p>Job Accepted: {application.jobAccepted ? 'Yes' : 'No'}</p>
                    <p>Job Denied: {application.jobDenied ? 'Yes' : 'No'}</p>


                    <div className="application-actions">
                      <button className="action-button view-details" onClick={() => handleViewDetails(application.id)}>View Details</button>
                      <button className="action-button accept" onClick={() => handleUpdateStatus(application.id, 'Accepted')}>Accept</button>
                      <button className="action-button reject" onClick={() => handleUpdateDeny(application.id, 'Rejected')}>Reject</button>
                      <DownloadButton userId = {application.userId} jobId = {application.jobId} />
                    
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications for this job.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManagerDashboard;