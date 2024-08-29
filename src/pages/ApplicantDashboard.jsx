import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import '../styles/ApplicantDashboard.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserById } from '../services/api';
import { getJobById } from '../services/api'; 
import { getJobApplicantionUserId } from '../services/api';  

const ApplicantDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]); // Separate state for filtered applications

  const userId = '66cf462a7862906dea5fdc13'; 

  useEffect(() => {
    const fetchJobsAndApplications = async () => {
      try {
        // Fetch user data
        const userResponse = await getUserById(userId);
        const appliedJobIds = userResponse.data.appliedJobIds;

        // Fetch jobs based on appliedJobIds
        const jobPromises = appliedJobIds.map(jobId => getJobById(jobId));
        const jobResponses = await Promise.all(jobPromises);

        setJobs(jobResponses.map(response => response.data));

        // Fetch job applications by user ID
        const applicationsResponse = await getJobApplicantionUserId(userId);
        setApplications(applicationsResponse.data);
      } catch (error) {
        console.error('Error fetching jobs or applications:', error);
      }
    };

    fetchJobsAndApplications();
  }, [userId]);

  const handleJobClick = (jobId) => {
    const job = jobs.find(job => job.id === jobId);
    setSelectedJob(job);

    // Filter applications that match the selected job ID
    const filteredApps = applications.filter(application => application.jobId === jobId);
    setFilteredApplications(filteredApps); // Update the filtered applications state
  };

  const navigate = useNavigate(); 
  const handleApplyJob = async (event) => {
    event.preventDefault();
    try {
      navigate('/joblistings');
    } catch (error) {
      console.error('Error redirecting to apply job:', error);
    }
  };

  return (
    <>
      <div className="manager-dashboard">
        <div className="job-list">
          <h2>Your Job Applications</h2>
          <button className="action-button add-job" onClick={handleApplyJob}>Apply New Job</button>
          {jobs.map(job => (
            <div key={job.id} className="job-card" onClick={() => handleJobClick(job.id)}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
        {selectedJob && (
          <div className="applications-section">
            <h2>Your detailed application for {selectedJob.title}</h2>
            {filteredApplications.length ? (
              <ul>
                {filteredApplications.map(application => (
                  <li key={application.id}>
                    <p>Applicant: {application.name}</p>
                    <p>State: {application.applicantState}</p>
                    <p>City: {application.applicantCity}</p>
                    <p>Highest Education: {application.highestEducation}</p>
                    <p>College: {application.college}</p>
                    <p>Field of Study: {application.fieldOfStudy}</p>
                    <p>Start Date: {application.startDate}</p>
                    <p>End Date: {application.endDate}</p>
                    <p>GPA: {application.gpa}</p>
                    <p>Status: {application.status}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications for this job.</p>
            )}
            <div className="application-actions">
              <button className="action-button edit-job" onClick={() => handleEditApplication(selectedJob.id)}>Edit</button>
              <button className="action-button delete-job" onClick={() => handleDeleteApplication(selectedJob.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplicantDashboard;
