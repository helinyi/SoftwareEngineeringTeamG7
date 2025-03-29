import React from 'react';
import '../styles/Newsletter.css';

const Newsletter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <div className="newsletter-text">
          <h2>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
        </div>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Enter your email address..."
          />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 