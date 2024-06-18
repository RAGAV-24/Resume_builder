// src/List.jsx
import React, { useState } from 'react';
import './List.css';
import image1 from './components/images/img1.png';
import image2 from './components/images/img2.png';
import image3 from './components/images/img3.png';
import image4 from './components/images/img4.png';
import image5 from './components/images/img5.png';
import image6 from './components/images/img6.png';
import image7 from './components/images/img7.png';
import image8 from './components/images/img8.png';
import image9 from './components/images/img9.png';
import image10 from './components/images/img10.png';
import image11 from './components/images/img11.png';
import image12 from './components/images/img12.png';
import image13 from './components/images/img13.png';
import image14 from './components/images/img14.png';
import image15 from './components/images/img15.png';
import image16 from './components/images/img16.png';
import image17 from './components/images/img17.png';
import image18 from './components/images/img18.png';
import image19 from './components/images/img19.png';
import image20 from './components/images/img20.png';
import image21 from './components/images/img21.png';
function List() {
  const images = [
    image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
    image11,image12,image13,image14,image15,image16,image17,image18,image19,image20,image21
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseClick = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h1>RESUMES FOR YOUR INTERVIEW</h1>
      {selectedImage && (
        <div className="fullscreen-overlay" onClick={handleCloseClick}>
          <img src={selectedImage} alt="Full Screen" className="fullscreen-image" />
        </div>
      )}
      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image-container" key={index} onClick={() => handleImageClick(image)}>
            <img src={image} alt={`img-${index}`} className="image-item" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
