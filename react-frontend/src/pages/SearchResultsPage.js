import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function SearchResultsPage() {
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
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setProducts([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.get('/api/search/', {
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
        setError('Failed to load search results');
        setLoading(false);
        console.error('Error searching products:', err);
      }
    };
    
    fetchSearchResults();
  }, [location.search]);
  
  const handlePageChange = (page) => {
    queryParams.set('page', page);
    navigate({
      pathname: '/search',
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
      <h1 className="text-2xl font-bold mb-6">
        {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Results'}
      </h1>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="text-lg">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : !searchQuery ? (
        <div className="text-center py-8 bg-white rounded-lg shadow p-6">
          <p className="text-lg text-gray-600">
            Please enter a search term to find products.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow p-6">
          <p className="text-lg text-gray-600">
            No products found matching "{searchQuery}". Please try a different search term.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {pagination.count > 12 && renderPagination()}
        </>
      )}
    </div>
  );
}

export default SearchResultsPage;