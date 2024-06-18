import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/profile');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Error fetching profile');
      }
    };

    fetchProfileData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      {profileData ? (
        <>
          <h1>{profileData.name}'s Profile</h1>
          {profileData.image && (
            <img src={`http://localhost:5000/uploads/${profileData.image}`} alt="Profile" />
          )}
          <p>Email: {profileData.email}</p>
          <p>Age: {profileData.age}</p>
          
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
