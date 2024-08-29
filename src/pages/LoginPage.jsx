import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { loginUser } from '../services/api';

const LoginPage = () => {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant'); 

  
    const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); 

    try {
      // Send login request to the backend
      const response = await loginUser({ email, password });

      const {data} = response;
      const userRole = data.role; 

      login(data);

      // Navigate to the appropriate dashboard based on role
      navigate(userRole === 'manager' ? '/manager-dashboardjob' : '/applicant-dashboardjob');
      
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };


  return (
    <div>
      {/* <h1>Login Page</h1>
      <label>
        <input
          type="radio"
          value="applicant"
          checked={role === 'applicant'}
          onChange={() => setRole('applicant')}
        />
        Applicant
      </label>
      <label>
        <input
          type="radio"
          value="manager"
          checked={role === 'manager'}
          onChange={() => setRole('manager')}
        />
        Manager
      </label> */}
      <form className='loginform' onSubmit={handleLogin}>
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
        <button type="submit">Sign In</button>
      </form>
      {/* <button onClick={handleLogin}>Login</button> */}
    </div>
  );
};

export default LoginPage;