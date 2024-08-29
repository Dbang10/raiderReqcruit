import React from 'react';
import axios from 'axios';

const DownloadButton = ({ userId, jobId }) => {
  const handleDownload = async () => {
    
    const filename = `${userId}_${jobId}.pdf`;

    try {
      const response = await axios.get(`http://localhost:7788/api/resume/download/${filename}`, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and the link
      link.remove();
      window.URL.revokeObjectURL(url);

      alert('File downloaded successfully.');
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file.');
    }
  };

  return (
    <button onClick={handleDownload}>
      Download Resume
    </button>
  );
};

export default DownloadButton;
