import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/products/', {
          params: Object.fromEntries(queryParams)
        });
        
        setProducts(response.data.results);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          currentPage: parseInt(queryParams.get('page') || '1')
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, [location.search]);
  
  const handleFilterChange = (filters) => {
    // Create new URL with filters
    const newParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });
    
    // Reset to page 1 when filters change
    navigate({
      pathname: '/products',
      search: newParams.toString()
    });
  };
  
  const handlePageChange = (page) => {
    queryParams.set('page', page);
    navigate({
      pathname: '/products',
      search: queryParams.toString()
    });
  };
  
  const renderPagination = () => {
    const totalPages = Math.ceil(pagination.count / 12);
    const pages = [];
    
    // Calculate visible page numbers
    let startPage = Math.max(1, pagination.currentPage - 2);
    let endPage = Math.min(totalPages, pagination.currentPage + 2);
    
    // Always show 5 pages if possible
    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }
    }
    
    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={!pagination.previous}
        className={`px-3 py-1 rounded-md ${
          pagination.previous
            ? 'text-primary hover:bg-primary-light hover:text-white'
            : 'text-gray-300 cursor-not-allowed'
        }`}
      >
        &laquo;
      </button>
    );
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-md ${
            i === pagination.currentPage
              ? 'bg-primary text-white'
              : 'text-primary hover:bg-primary-light hover:text-white'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={!pagination.next}
        className={`px-3 py-1 rounded-md ${
          pagination.next
            ? 'text-primary hover:bg-primary-light hover:text-white'
            : 'text-gray-300 cursor-not-allowed'
        }`}
      >
        &raquo;
      </button>
    );
    
    return (
      <div className="flex justify-center mt-8 space-x-2">{pages}</div>
    );
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters */}
        <div className="md:w-1/4">
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>
        
        {/* Product grid */}
        <div className="md:w-3/4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="text-lg">Loading...</div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow p-6">
              <p className="text-lg text-gray-600">
                No products found matching your filters. Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {pagination.count > 12 && renderPagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;