import React, { useState } from 'react';
import axios from 'axios';
import {registerUser} from "../services/api";
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const[fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await registerUser({ fname, email, password, role });
      
      console.log('Registration successful:', response.data);
      // You can redirect the user or show a success message here
      navigate(role === 'manager' ? '/manager-dashboardjob' : '/applicant-dashboardjob');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  

  return (
    <div>
      {/* <h1>Register</h1> */}
      <form className='registerform' onSubmit={handleSubmit}>
      <label htmlFor="fname">Full Name</label>
        <input
          type="fname"
          id="fname"
          placeholder='Enter Your Full Name'
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder='Enter Your Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        > 
          <option value="applicant">Applicant</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;