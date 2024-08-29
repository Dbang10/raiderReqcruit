import React, { useState } from 'react';
import axios from 'axios';
import { applyJob } from '../services/api';
import { useLocation, useParams, Navigate, useNavigate } from 'react-router-dom';
import DownloadButton from '../components/DownloadButton';

const JobApplicationForm = ({ userId, onSubmit }) => {
  const [applicantState, setApplicantState] = useState('');
  const [applicantCity, setApplicantCity] = useState('');
  const [name, setName] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [college, setCollege] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [gpa, setGpa] = useState('');
  const [workExperiences, setWorkExperiences] = useState([{
    jobTitle: '',
    company: '',
    jobStartDate: '',
    location: '',
    jobDescription: '',
    jobEndDate: ''
  }]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  console.log('Job ID from URL:', id);
  
  

  userId = "test2";
  jobId = id;
  console.log(id)

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index][field] = value;
    setWorkExperiences(updatedExperiences);
  };

  const handleAddWorkExperience = () => {
    setWorkExperiences([...workExperiences, {
      jobTitle: '',
      company: '',
      jobStartDate: '',
      location: '',
      jobDescription: '',
      jobEndDate: ''
    }]);
  };

  const handleRemoveWorkExperience = (index) => {
    const updatedExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedExperiences);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    // First POST request for the resume file
    const fileFormData = new FormData();
    fileFormData.append('file', file);

    try {
      await axios.post(`http://localhost:7788/api/resume/upload/${userId}/${jobId}`, fileFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message);
      alert('Failed to upload file.');
      return;
    }

    // Second POST request for the form data
    const formData = {
      userId,
      jobId,
      name,
      applicantState,
      applicantCity,
      highestEducation,
      college,
      fieldOfStudy,
      startDate,
      endDate,
      gpa,
      workExperiences,
      jobAccepted: false,
      jobDenied: false,
      jobOffered: false,
    };

    try {
      await axios.post('http://localhost:8080/api/job-applications', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Form submitted successfully.');
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      alert('Failed to submit form.');
    }

    try {
      await applyJob(userId, jobId);
      alert('Job added to list.');
      onSubmit(formData);
    } catch (error) {
      console.error('Error updating job application status:', error.response ? error.response.data : error.message);
      alert('Failed to add job to list.');
    }
  };

  const navigate = useNavigate(); 
  const returnJobListings = async (event) => {
    event.preventDefault();
    try {
      navigate('/joblistings');
    } catch (error) {
      console.error('Error redirecting to job listings:', error);
    }
  };



  return (
    <form className='jobapplicationform' onSubmit={handleSubmit}>
      {/* Other fields */}
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Applicant State:</label>
        <input type="text" value={applicantState} onChange={(e) => setApplicantState(e.target.value)} />
      </div>
      <div>
        <label>Applicant City:</label>
        <input type="text" value={applicantCity} onChange={(e) => setApplicantCity(e.target.value)} />
      </div>
      <div>
        <h2>Education</h2>
      </div>
      <div>
        <label>Highest Education:</label>
        <input type="text" value={highestEducation} onChange={(e) => setHighestEducation(e.target.value)} />
      </div>
      <div>
        <label>College:</label>
        <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} />
      </div>
      <div>
        <label>Field of Study:</label>
        <input type="text" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div>
        <label>GPA:</label>
        <input type="number" step="0.01" value={gpa} onChange={(e) => setGpa(e.target.value)} />
      </div>
      <div>
        <h2>Work Experience</h2>
      </div>
      {workExperiences.map((experience, index) => (
        <div key={index}>
          <div>
            <label>Job Title:</label>
            <input
              type="text"
              value={experience.jobTitle}
              onChange={(e) => handleWorkExperienceChange(index, 'jobTitle', e.target.value)}
            />
          </div>
          <div>
            <label>Company:</label>
            <input
              type="text"
              value={experience.company}
              onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
            />
          </div>
          <div>
            <label>Job Start Date:</label>
            <input
              type="date"
              value={experience.jobStartDate}
              onChange={(e) => handleWorkExperienceChange(index, 'jobStartDate', e.target.value)}
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={experience.location}
              onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
            />
          </div>
          <div>
            <label>Job Description:</label>
            <textarea
              value={experience.jobDescription}
              onChange={(e) => handleWorkExperienceChange(index, 'jobDescription', e.target.value)}
            />
          </div>
          <div>
            <label>Job End Date:</label>
            <input
              type="date"
              value={experience.jobEndDate}
              onChange={(e) => handleWorkExperienceChange(index, 'jobEndDate', e.target.value)}
            />
          </div>
          <button type="button" style={{backgroundColor:'#6c7e7d', marginBottom:'10px'}} onClick={() => handleRemoveWorkExperience(index)}>Remove Work Experience</button>
        </div>
      ))}

      <button type="button" style={{marginBottom:'10px'}} onClick={handleAddWorkExperience}>Add Work Experience</button>
      
      <div>
        <label>Resume Upload:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button className="jobappleftbtn" onClick={returnJobListings}>Cancel</button>
      <button className="jobapprightbtn" type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
