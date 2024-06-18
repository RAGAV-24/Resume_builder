import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import Registration from './Registration';
import Contact from './Contact';
import About from './About';
import Footer from './Footer';
import List from './List';
import Paint from './Paint';
import Building from './Building';
import Resume from './Resume'; // Import the Resume component
import axios from 'axios'; // Import axios for API calls

function App() {
  const [profileData, setProfileData] = useState(null);

  const handleRegister = (data) => {
    setProfileData(data);
  };

  const handleResumeSubmit = async (resumeData) => {
    try {
      const formData = new FormData();
      formData.append('image', resumeData.image); // Assuming 'image' is the file input
      formData.append('name', resumeData.name);
      formData.append('title', resumeData.title);
      formData.append('about', resumeData.aboutme);
      formData.append('email', resumeData.email);
      formData.append('phone', resumeData.phone);
      formData.append('education', resumeData.education);
      formData.append('experience', resumeData.experience);
      formData.append('skills', resumeData.skills);

      const response = await axios.post('/api/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Optionally, redirect to a success page or handle state update
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile profileData={profileData} />} />
            <Route path="/registration" element={<Registration onRegister={handleRegister} />} />
            <Route path="/list" element={<List />} />
            <Route path="/paint" element={<Paint />} />
            <Route path="/building" element={<Building />} />
            <Route path="/resume" element={<Resume onSubmit={handleResumeSubmit} />} /> {/* Pass onSubmit prop */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
