import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { FaCheck } from 'react-icons/fa';
import '../styles/Filter.css';

const Filter = () => {
  const [priceRange, setPriceRange] = useState([500, 5000]);
  const maxPrice = 10000; // Define max price for calculations

  // Function to calculate percentage for slider positioning
  const calculatePercentage = (value, max) => {
    return Math.min(100, Math.max(0, (value / max) * 100));
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([value, Math.max(value, priceRange[1])]);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setPriceRange([Math.min(priceRange[0], value), value]);
  };

  const handleMinSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([value, Math.max(value, priceRange[1])]);
  };

  const handleMaxSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([Math.min(priceRange[0], value), value]);
  };

  // Calculate percentages for positioning
  const minPercentage = calculatePercentage(priceRange[0], maxPrice);
  const maxPercentage = calculatePercentage(priceRange[1], maxPrice);
  const rangeWidth = maxPercentage - minPercentage;

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h2>Filters</h2>
        <HiOutlineAdjustmentsHorizontal size={20} />
      </div>

      <div className="filter-section">
        <div className="filter-item">
          <span>Cellular Phone OS Version</span>
          <FiChevronRight />
        </div>
        <div className="filter-item">
          <span>Cellular Phone OS</span>
          <FiChevronRight />
        </div>
        <div className="filter-item">
          <span>Memory Storage Capacity</span>
          <FiChevronRight />
        </div>
        <div className="filter-item">
          <span>Device Model Year</span>
          <FiChevronRight />
        </div>
        <div className="filter-item">
          <span>Phone Display Size</span>
          <FiChevronRight />
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">
          <h3>Price</h3>
          <FiChevronDown />
        </div>
        <div className="price-range">
          <div className="price-slider">
            <div className="slider-track"></div>
            <div 
              className="slider-track-active" 
              style={{ 
                left: `${minPercentage}%`, 
                width: `${rangeWidth}%` 
              }}
            ></div>
            <input
              type="range"
              className="range-input min-range"
              min="0"
              max={maxPrice}
              value={priceRange[0]}
              onChange={handleMinSliderChange}
            />
            <input
              type="range"
              className="range-input max-range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={handleMaxSliderChange}
            />
            <div 
              className="slider-handle" 
              style={{ left: `${minPercentage}%` }}
            ></div>
            <div 
              className="slider-handle" 
              style={{ left: `${maxPercentage}%` }}
            ></div>
          </div>
          <div className="price-inputs">
            <div className="price-input-group">
              <span>$</span>
              <input 
                type="number" 
                value={priceRange[0]} 
                onChange={handleMinPriceChange}
                min="0"
                max={priceRange[1]}
              />
            </div>
            <span>-</span>
            <div className="price-input-group">
              <span>$</span>
              <input 
                type="number" 
                value={priceRange[1]} 
                onChange={handleMaxPriceChange}
                min={priceRange[0]}
                max={maxPrice}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">
          <h3>Colors</h3>
          <FiChevronDown />
        </div>
        <div className="color-options">
          <button className="color-btn" style={{ backgroundColor: '#7CB342' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#E53935' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#FDD835' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#FB8C00' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#039BE5' }}></button>
          <button className="color-btn selected" style={{ backgroundColor: '#1E88E5' }}>
            <FaCheck className="check-icon" />
          </button>
          <button className="color-btn" style={{ backgroundColor: '#8E24AA' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#D81B60' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E0E0E0' }}></button>
          <button className="color-btn" style={{ backgroundColor: '#212121' }}></button>
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">
          <h3>Brands</h3>
          <FiChevronDown size={24} />
        </div>
        <div className="brand-options">
          <button className="brand-btn">Apple</button>
          <button className="brand-btn">Samsung</button>
          <button className="brand-btn">Motorola</button>
          <button className="brand-btn">LG</button>
          <button className="brand-btn active">Google</button>
          <button className="brand-btn">AT & T</button>
          <button className="brand-btn">Panasonic</button>
          <button className="brand-btn">Nokia</button>
          <button className="brand-btn">One Plus</button>
        </div>
      </div>

      <div className="filter-group">
        <div className="filter-group-header">
          <h3>Deals & Discounts</h3>
          <FiChevronDown size={24} />
        </div>
        <div className="deals-options">
          <div className="filter-item">
            <span>Today Deals</span>
            <FiChevronRight size={20} />
          </div>
          <div className="filter-item">
            <span>All Discounts</span>
            <FiChevronRight size={20} />
          </div>
          <div className="filter-item">
            <span>Get It By Today</span>
            <FiChevronRight size={20} />
          </div>
          <div className="filter-item">
            <span>Free Shipping</span>
            <FiChevronRight size={20} />
          </div>
        </div>
      </div>

      <button className="apply-filter-btn">Apply Filter</button>
    </div>
  );
};

export default Filter; 