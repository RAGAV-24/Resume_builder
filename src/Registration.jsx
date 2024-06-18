import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Registration = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('age', formData.age);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:5000/register', data);
      setResponseMessage(response.data.message);

      // Redirect to profile page after successful registration
      navigate('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
      setResponseMessage('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="r1">
    <div className="registration-form-container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /><br></br>
        
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br></br>
        
        <label htmlFor="age">Age</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required /><br></br>
        
        <label htmlFor="image">Profile Image</label>
        <input type="file" id="image" name="image" onChange={handleImageChange} accept="image/*" required /><br></br>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
    </div>
  );
};

export default Registration;
