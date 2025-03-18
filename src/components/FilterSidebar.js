import React from 'react';
import '../styles/FilterSidebar.css';

function FilterSidebar() {
  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>

      {/* Category Filter */}
      <div className="filter-group">
        <h4>Category</h4>
        <div className="filter-options">
          <label>
            <input type="checkbox" /> Mobile Phones
          </label>
          <label>
            <input type="checkbox" /> Tablets
          </label>
          <label>
            <input type="checkbox" /> Accessories
          </label>
        </div>
      </div>

      {/* Color Filter */}
      <div className="filter-group">
        <h4>Color</h4>
        <div className="filter-options">
          <label>
            <input type="radio" name="color" /> Black
          </label>
          <label>
            <input type="radio" name="color" /> White
          </label>
          <label>
            <input type="radio" name="color" /> Gray
          </label>
        </div>
      </div>

      {/* Brands */}
      <div className="filter-group">
        <h4>Brands</h4>
        <div className="filter-options">
          <label>
            <input type="checkbox" /> Apple
          </label>
          <label>
            <input type="checkbox" /> Samsung
          </label>
          <label>
            <input type="checkbox" /> OnePlus
          </label>
          <label>
            <input type="checkbox" /> Xiaomi
          </label>
        </div>
      </div>

      {/* Deals & Discounts */}
      <div className="filter-group">
        <h4>Deals & Discounts</h4>
        <div className="filter-options">
          <label>
            <input type="checkbox" /> On Sale
          </label>
          <label>
            <input type="checkbox" /> Clearance
          </label>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
