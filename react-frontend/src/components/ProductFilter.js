import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductFilter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState({ min_price: 0, max_price: 1000 });
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    min_price: '',
    max_price: '',
    sort_by: 'newest'
  });

  useEffect(() => {
    // Fetch filter options
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('/api/filter-options/');
        setCategories(response.data.categories);
        setBrands(response.data.brands);
        setPriceRange(response.data.price_range);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      min_price: '',
      max_price: '',
      sort_by: 'newest'
    });
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <form onSubmit={applyFilters}>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="min_price"
              placeholder="Min"
              value={filters.min_price}
              onChange={handleFilterChange}
              className="w-1/2 rounded-md border border-gray-300 py-2 px-3 text-sm"
              min={priceRange.min_price}
              max={priceRange.max_price}
            />
            <input
              type="number"
              name="max_price"
              placeholder="Max"
              value={filters.max_price}
              onChange={handleFilterChange}
              className="w-1/2 rounded-md border border-gray-300 py-2 px-3 text-sm"
              min={priceRange.min_price}
              max={priceRange.max_price}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="sort_by" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort_by"
            name="sort_by"
            value={filters.sort_by}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded text-sm w-full"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded text-sm w-full"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductFilter;