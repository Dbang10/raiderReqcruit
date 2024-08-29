import React, { useState } from 'react';
import '../styles/AddJobPage.css';
import { createJob } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddJobPage = () => {
  const [title, setTitle] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const formData = {
    title,
    state,
    city,
    country,
    companyName,
    salary,
    description,
    status : ""
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    await createJob(formData);
    navigate('/manager-dashboardjob')
    }catch(error){
      console.error('Error submitting the application:', error);
    }

    
    console.log('Job submitted:', { title, description });
    // Success message
  };

  return (
    <div className="jobapplicationform">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Job Location - State</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Job Location - City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Job Location - Country</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">Salary</label>
          <input
            type="text"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;