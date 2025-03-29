import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiSliders } from 'react-icons/fi';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const MAX_PRICE = 10000;
  const STEP = 100; // Add step increment for better usability

  const colors = [
    { id: 'green', color: '#4CAF50' },
    { id: 'red', color: '#f44336' },
    { id: 'yellow', color: '#FFC107' },
    { id: 'orange', color: '#FF5722' },
    { id: 'blue', color: '#2196F3' },
    { id: 'purple', color: '#9C27B0' },
    { id: 'pink', color: '#E91E63' },
    { id: 'black', color: '#000000' }
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Motorola',
    'LG',
    'Google',
    'AT&T',
    'Panasonic',
    'Nokia',
    'One Plus'
  ];

  const toggleColor = (colorId) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Format price with commas for better readability
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle min price change
  const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - STEP);
    setPriceRange([value, priceRange[1]]);
  };

  // Handle max price change
  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + STEP);
    setPriceRange([priceRange[0], value]);
  };

  // Handle slider input changes
  const handleMinSliderChange = (e) => {
    const value = Number(e.target.value);
    if (value < priceRange[1] - STEP) {
      setPriceRange([value, priceRange[1]]);
    } else {
      setPriceRange([priceRange[1] - STEP, priceRange[1]]);
    }
  };

  const handleMaxSliderChange = (e) => {
    const value = Number(e.target.value);
    if (value > priceRange[0] + STEP) {
      setPriceRange([priceRange[0], value]);
    } else {
      setPriceRange([priceRange[0], priceRange[0] + STEP]);
    }
  };

  // Calculate percentages for the slider track
  const minPercent = (priceRange[0] / MAX_PRICE) * 100;
  const maxPercent = (priceRange[1] / MAX_PRICE) * 100;

  return (
    <aside className="sidebar">
      <h2>
        <FiSliders />
        Filters
      </h2>

      <div className="filter-section">
        <h3>Cellular Phone OS Version</h3>
        <div className="filter-content">
          <label className="filter-option">
            <input type="checkbox" /> Android 13
          </label>
          <label className="filter-option">
            <input type="checkbox" /> iOS 17
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h3>Price Range</h3>
        <div className="price-filter">
          <div className="price-display">
            <span>${formatPrice(priceRange[0])}</span>
            <span>${formatPrice(priceRange[1])}</span>
          </div>
          
          <div className="price-slider-container">
            <div className="slider-track"></div>
            <div 
              className="slider-track-active"
              style={{
                left: `${minPercent}%`,
                width: `${maxPercent - minPercent}%`
              }}
            ></div>
            
            <input
              type="range"
              className="price-slider min-slider"
              min={0}
              max={MAX_PRICE}
              step={STEP}
              value={priceRange[0]}
              onChange={handleMinSliderChange}
              aria-label="Minimum price"
            />
            
            <input
              type="range"
              className="price-slider max-slider"
              min={0}
              max={MAX_PRICE}
              step={STEP}
              value={priceRange[1]}
              onChange={handleMaxSliderChange}
              aria-label="Maximum price"
            />
          </div>
          
          <div className="price-inputs">
            <div className="price-input">
              <span>$</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                min={0}
                max={priceRange[1] - STEP}
                step={STEP}
                aria-label="Minimum price input"
              />
            </div>
            <span>-</span>
            <div className="price-input">
              <span>$</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                min={priceRange[0] + STEP}
                max={MAX_PRICE}
                step={STEP}
                aria-label="Maximum price input"
              />
            </div>
          </div>
          
          <div className="price-presets">
            <button onClick={() => setPriceRange([0, 2500])}>Under $2,500</button>
            <button onClick={() => setPriceRange([2500, 5000])}>$2,500 - $5,000</button>
            <button onClick={() => setPriceRange([5000, 10000])}>$5,000+</button>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h3>Memory Storage Capacity</h3>
        <div className="filter-content">
          <label className="filter-option">
            <input type="checkbox" /> 128GB
          </label>
          <label className="filter-option">
            <input type="checkbox" /> 256GB
          </label>
          <label className="filter-option">
            <input type="checkbox" /> 512GB
          </label>
        </div>
      </div>

      <div className="filter-section">
        <h3>Colors</h3>
        <div className="color-options">
          {colors.map(({ id, color }) => (
            <button
              key={id}
              className={`color-option ${selectedColors.includes(id) ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => toggleColor(id)}
              aria-label={`Select ${id} color`}
            />
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Brands</h3>
        <div className="brand-options">
          {brands.map(brand => (
            <button
              key={brand}
              className={`brand-btn ${selectedBrands.includes(brand) ? 'selected' : ''}`}
              onClick={() => toggleBrand(brand)}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section deals-section">
        <h3>Deals & Discounts</h3>
        <div className="filter-content">
          <label className="filter-option">
            <input type="checkbox" /> Today Deals
          </label>
          <label className="filter-option">
            <input type="checkbox" /> All Discounts
          </label>
          <label className="filter-option">
            <input type="checkbox" /> Free Shipping
          </label>
        </div>
      </div>

      <button className="apply-filter-btn">Apply Filter</button>
    </aside>
  );
};

export default Sidebar; 