import React, { useState } from 'react';
import "../styles/PriceAlert.css";

function PriceAlert() {
  const [product, setProduct] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your alert creation logic here
    console.log({ product, currentPrice, targetPrice, alertType });
  };

  return (
    <div className="price-alert-container">
      <h2>Create Price Alert</h2>
      <div className="form-and-image">
        <form onSubmit={handleSubmit} className="price-alert-form">
          <div className="form-group">
            <label htmlFor="product">Product Name</label>
            <input
              id="product"
              type="text"
              placeholder="Enter product name"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentPrice">Current Price</label>
            <input
              id="currentPrice"
              type="number"
              placeholder="Enter current price"
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetPrice">Target Price</label>
            <input
              id="targetPrice"
              type="number"
              placeholder="Enter target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="alertType">Alert Type</label>
            <select
              id="alertType"
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              required
            >
              <option value="email">Email</option>
              <option value="phone">Phone Number</option>
              <option value="both">Both</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Create Alert
          </button>
        </form>

        <div className="image-container">
          <img
            src="https://www.pzdeals.com/cdn/shop/files/HOME_P3_Main-KV_720x1080_mo_grande.gif?v=1737863673"
            alt="Product Preview"
          />
        </div>
      </div>
    </div>
  );
}

export default PriceAlert;
