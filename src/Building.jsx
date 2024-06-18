import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Building.css';

const Building = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    title: '',
    aboutme: '',
    skills: '',
    email: '',
    phone: '',
    education: '',
    experience: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    axios.post('http://localhost:5000/api/resumes', data)
      .then(response => {
        console.log(response.data);
        navigate('/resume', { state: { formData: response.data.resume } });
      })
      .catch(error => {
        console.error('There was an error posting the data!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image:</label>
        <input type="file" name="image" onChange={handleChange} required />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>About Me:</label>
        <textarea type="text" name="aboutme" value={formData.aboutme} onChange={handleChange} required />
      </div>
      <div>
        <label>Skills:</label>
        <textarea type="text" name="skills" value={formData.skills} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <label>Education:</label>
        <textarea type="text" name="education" value={formData.education} onChange={handleChange} required />
      </div>
      <div>
        <label>Experience:</label>
        <textarea type="text" name="experience" value={formData.experience} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Building;
