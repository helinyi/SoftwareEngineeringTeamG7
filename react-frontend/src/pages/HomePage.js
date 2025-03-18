import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const [featuredRes, trendingRes, categoriesRes] = await Promise.all([
          axios.get('/api/featured-deals/'),
          axios.get('/api/trending-products/'),
          axios.get('/api/categories/')
        ]);

        setFeaturedDeals(featuredRes.data.results || featuredRes.data);
        setTrendingProducts(trendingRes.data.results || trendingRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
        console.error('Error fetching home data:', err);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden bg-gray-900 mb-8">
        <img 
          src="/static/deals/images/hero-shopping.jpeg" 
          alt="Shopping" 
          className="w-full h-80 object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-4xl font-bold mb-4">
            Find the Best Deals Across the Web
          </h1>
          <p className="text-white text-xl mb-6 max-w-2xl">
            DealScout helps you compare prices and find the best offers on your favorite products
          </p>
          <Link 
            to="/products" 
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg text-lg transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>

      {/* Featured Deals */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Deals</h2>
          <Link to="/products?sort_by=discount" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredDeals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="text-lg font-medium">{category.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending Products</h2>
          <Link to="/products?sort_by=newest" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;