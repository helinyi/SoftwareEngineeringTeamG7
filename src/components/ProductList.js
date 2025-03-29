import React from 'react';
import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FiStar
        key={index}
        className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
      />
    ));
  };

  // Map product IDs to the IDs used in ProductDetail.js mockProducts
  const getDetailId = (id) => {
    const idMapping = {
      1: 'pixel9-pro',
      2: 'redmagic10-pro-5g',
      3: 'iphone-15',
      4: 'macbook-pro-16',
      5: 'dell-xps-15',
      6: 'thinkpad-x1',
      7: 'airpods-pro',
      8: 'galaxy-watch6',
      9: 'pixel-buds'
    };
    return idMapping[id] || 'iphone-15';
  };

  return (
    <Link to={`/product/${getDetailId(product.id)}`} className="product-card-link">
      <div className="product-card">
        <div className="product-image-container">
          <img 
            src={`/images/products/${product.image}`} 
            alt={product.name} 
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
            }}
          />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-rating">
            <div className="stars">{renderStars(product.rating)}</div>
            <span className="rating-text">{product.rating}/5</span>
          </div>
          <div className="product-price">
            <div className="price-info">
              <span className="price-from">From</span>
              <span className="price-amount">${product.price}</span>
            </div>
            <span className="stores-count">{product.stores} Stores</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProductList = () => {
  const products = [
    // Mobile Phones
    {
      id: 1,
      name: 'Google Pixel 9 Pro',
      image: 'pixel9-pro.jpg',
      rating: 4.5,
      price: 899,
      stores: 2,
      category: 'phone'
    },
    {
      id: 2,
      name: 'RedMagic 10 Pro 5G',
      image: 'redmagic10-pro-5g.jpg',
      rating: 4.2,
      price: 799,
      stores: 4,
      category: 'phone'
    },
    {
      id: 3,
      name: 'Apple iPhone 15, 128GB',
      image: 'iphone15.jpg',
      rating: 4.4,
      price: 799,
      stores: 5,
      category: 'phone'
    },
    // Laptops
    {
      id: 4,
      name: 'MacBook Pro 16"',
      image: 'macbook-pro-16.jpg',
      rating: 4.7,
      price: 2499,
      stores: 3,
      category: 'laptop'
    },
    {
      id: 5,
      name: 'Dell XPS 15',
      image: 'dell-xps-15.jpg',
      rating: 4.6,
      price: 1999,
      stores: 3,
      category: 'laptop'
    },
    {
      id: 6,
      name: 'Lenovo ThinkPad X1',
      image: 'thinkpad-x1.jpg',
      rating: 4.3,
      price: 1699,
      stores: 3,
      category: 'laptop'
    },
    // Accessories
    {
      id: 7,
      name: 'AirPods Pro 2',
      image: 'airpods-pro.jpg',
      rating: 4.6,
      price: 249,
      stores: 5,
      category: 'earpods'
    },
    {
      id: 8,
      name: 'Samsung Galaxy Watch 6',
      image: 'galaxy-watch6.jpg',
      rating: 4.4,
      price: 399,
      stores: 4,
      category: 'watch'
    },
    {
      id: 9,
      name: 'Pixel Buds Pro',
      image: 'pixel-buds.jpg',
      rating: 4.2,
      price: 199,
      stores: 3,
      category: 'earpods'
    }
  ];

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>Top Picks</h2>
        <div className="product-list-controls">
          <span className="product-count">
            Showing 1-9 of 100 Products
          </span>
          <select className="sort-select" defaultValue="most-popular">
            <option value="most-popular">Sort by: Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button className="pagination-btn" disabled>Previous</button>
        <div className="page-numbers">
          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>
          <span>...</span>
          <button className="page-number">8</button>
          <button className="page-number">9</button>
          <button className="page-number">10</button>
        </div>
        <button className="pagination-btn">Next</button>
      </div>
    </div>
  );
};

export default ProductList; 