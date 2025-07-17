import React from 'react';

export const ResumeUpload: React.FC = () => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle the file upload logic here
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="resume-upload">
      <h2>Upload Your Resume</h2>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
    </div>
  );
};