import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home() {
  return (
    <div className="main-container">
      <div className="center-container">
        <div className="button-container">
          <Link to="/list">
            <button>TOP RESUMES</button>
          </Link>
          <Link to="/paint">
            <button>Paint</button>
          </Link>
          <Link to="/building">
            <button>Building</button>
          </Link>
          
        </div>
      </div>
      
    </div>
  );
}

export default Home;
