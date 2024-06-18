import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="footer-content">
        <h2>ResumeBuilder</h2>
        <nav>
          <a href="#">Home &emsp;</a>
          <a href="#">Features &emsp;</a>
          <a href="#">Pricing &emsp;</a>
          <a href="#">Contact &emsp;</a>
        </nav>
        <div className="social-media">
        <a href="https://facebook.com" className="social-icon">
            <i className="fab fa-facebook-f"></i>&emsp;
          </a>
          <a href="https://twitter.com" className="social-icon">
            <i className="fab fa-twitter"></i>&emsp;
          </a>
          <a href="https://linkedin.com" className="social-icon">
            <i className="fab fa-linkedin-in"></i>&emsp;
          </a>
          <a href="https://instagram.com" className="social-icon">
            <i className="fab fa-instagram"></i>&emsp;
          </a>

        </div>
        <div className="newsletter">
          <h3>Subscribe to our newsletter</h3>
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
        <p>© 2024 ResumeBuilder. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#1a1a1a',
  color: 'rgba(255, 255, 255, 0.87)',
  textAlign: 'center',
  padding: '20px 0', // Adjusted padding
  width: '100%',
  flexShrink: 0, // Ensure the footer doesn't shrink
};

export default Footer;
