import React from 'react';

function SubscribeSection() {
  return (
    <div className="subscribe-section">
      <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
      <p>Subscribe to our newsletter and never miss a deal.</p>
      <form className="subscribe-form">
        <input type="email" placeholder="Enter your email address" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default SubscribeSection;
