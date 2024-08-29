import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import Header from './components/Header';
import Header_Dashboards from './components/Header_Dashboards';
import Footer from './components/Footer';
import Homepage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ManagerDashboard from './pages/ManagerDashboard';
import ApplicantDashboard from './pages/ApplicantDashboard';
import JobApplicationForm from './pages/JobApplicationForm';
import JobListings from './pages/JobListings';
import AddJobPage from './pages/AddJobPage'

const App = () => {
  const { role } = useUser();
  const location = useLocation();

  const isDashboard = location.pathname.includes('job');

  return (
    <div>
      {isDashboard ? <Header_Dashboards /> : <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/manager-dashboardjob" element={<ManagerDashboard />} />
        {/* <Route
          path="/applicant-dashboard"
          element={role === 'applicant' ? <ApplicantDashboard /> : <Navigate to="/applicant-dashboard" />}
        /> */}
        <Route path="/applicant-dashboardjob" element={<ApplicantDashboard />} />
        <Route path="/joblistings" element={<JobListings />} />
        <Route path="/job-application-form/:jobId" element={<JobApplicationForm />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/add-job" element={<AddJobPage />}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;