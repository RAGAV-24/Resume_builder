// GeneratedResume.jsx

import React from 'react';

const GeneratedResume = ({ resumeData }) => {
  return (
    <div>
      <h2>Generated Resume</h2>
      <div>
        <img src={`/uploads/${resumeData.image}`} alt="Profile" />
        <h3>{resumeData.name}</h3>
        <p>Email: {resumeData.email}</p>
        <p>Phone: {resumeData.phone}</p>
        <p>Education: {resumeData.education}</p>
        <p>Experience: {resumeData.experience}</p>
        <p>Skills: {resumeData.skills}</p>
      </div>
    </div>
  );
};

export default GeneratedResume;
