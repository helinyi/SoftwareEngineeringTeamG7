import axios from 'axios';

// Get the API base URL from the window context or default to /api in production
const apiBaseUrl = window.apiBaseUrl || '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service methods
export default {
  // Home page data
  getFeaturedDeals: () => api.get('/featured-deals/'),
  getTrendingProducts: () => api.get('/trending-products/'),
  getCategories: () => api.get('/categories/'),
  getSubcategories: (parentId) => api.get(`/categories/${parentId}/subcategories/`),
  
  // Product listing
  getProducts: (params) => api.get('/products/', { params }),
  getProductById: (id) => api.get(`/products/${id}/`),
  getProductListings: (productId) => api.get(`/products/${productId}/listings/`),
  getPriceHistory: (productId) => api.get(`/products/${productId}/price-history/`),
  getRelatedProducts: (productId) => api.get(`/products/${productId}/related/`),
  getProductReviews: (productId) => api.get(`/products/${productId}/reviews/`),
  
  // Filter options
  getFilterOptions: () => api.get('/filter-options/'),
  
  // Search
  searchProducts: (query, params) => {
    const searchParams = { ...params, q: query };
    return api.get('/search/', { params: searchParams });
  },
};