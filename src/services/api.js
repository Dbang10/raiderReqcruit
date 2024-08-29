import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

export const loginUser = (data) => API.post('users/login', data);
export const registerUser = (data) => API.post('/users/register', data);
export const getUserById = (userId) => API.get(`users/${userId}`);
//export const sendPasswordResetEmail = (email) => API.post('/forgot-password', { email });
export const getAllJobs = () => API.get('/jobs/getall');
export const applyJob =(userId, jobId) => API.patch(`/users/${userId}/apply/${jobId}`);
export const createJob = (jobDetails) => API.post('/jobs/create', jobDetails); //Only Manger can create
export const updateJob = (jobId,jobDetails) => API.put(`/jobs/update/${jobId}`, jobDetails);
export const deleteJob = (jobId) => API.delete(`/jobs/delete/${jobId}`);
export const getJobById = (jobId) => API.get(`/jobs/${jobId}`);
export const getStatus = (title) => API.get(`/jobs/search?title=${title}`);


export const applyForJob = (jobId, application) => API.post(`/job-applications`, application);
export const getJobApplicantionByJobId = (jobId) => API.get(`/job-applications/job/${jobId}`);// Get job applications by jobId (Manager Side)
export const getJobApplicantionUserId = (userId) => API.get(`/job-applications/user/${userId}`);// Get job applications by userId (Applicant Side)
export const getJobApplicantion = (jobId) => API.get(`/job-applications/${jobId}`);//Get application by id


export const offerJobApplicationById = (applicationId, boolean) => 
    API.patch(`job-applications/${applicationId}/accept`, boolean, { 
        headers: {
        'Content-Type': 'application/json',
        }
    });

export const denyJobApplicationById = (applicationId, jobOffered) => 
    API.patch(`job-applications/${applicationId}/deny`, jobOffered, {
        headers: {
            'Content-Type': 'application/json',
        }
    });