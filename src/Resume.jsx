import React from 'react';
import { useLocation } from 'react-router-dom';
import './Resume.css';

const Resume = () => {
  const location = useLocation();
  const { formData } = location.state;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div id="resume" className="main-container">
        <div className="image-container">
          {formData.image && (
            <img
              src={`http://localhost:5000/uploads/${formData.image}`}
              alt="Profile"
              className="responsive-image"
            />
          )}
        </div>
        <div className="info-container">
          <h1 className="name">{formData.name}</h1>
          <p className="job">{formData.title}</p>
          <p className="about-me">{formData.aboutme}</p>
        </div>
      </div>
      <div className="content-container">
        <div className="left-right-container">
          <div className="left-content">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
          <div className="right-content">
            <h3>Education</h3>
            <p>{formData.education}</p>
            <h3>Experience</h3>
            <p>{formData.experience}</p>
            <h3>Skills</h3>
            <p>{formData.skills}</p>
          </div>
        </div>
      </div>
      <button onClick={handlePrint} style={{ display: 'block', margin: '20px auto', padding: '10px 15px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Print Resume
      </button>
    </div>
  );
};

export default Resume;
