import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShippingFast, FaCheck, FaExternalLinkAlt, FaSort, FaSortAmountDown, FaSortAmountUp, FaStore } from 'react-icons/fa';
import '../styles/ProductPricing.css';

const ProductPricing = ({ pricingData }) => {
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterFreeShipping, setFilterFreeShipping] = useState(false);
  const [logoErrors, setLogoErrors] = useState({});

  // Function to render stars based on rating
  const renderStars = (rating) => {
    if (!rating || typeof rating !== 'number') {
      return Array(5).fill().map((_, i) => <FaRegStar key={i} className="star empty" />);
    }
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star empty" />);
      }
    }
    
    return stars;
  };

  // Handle logo image error
  const handleLogoError = (vendorId) => {
    setLogoErrors(prev => ({
      ...prev,
      [vendorId]: true
    }));
  };

  // Function to sort and filter pricing data
  const getSortedAndFilteredPricing = () => {
    if (!pricingData || !Array.isArray(pricingData) || pricingData.length === 0) {
      return [];
    }

    let filteredData = [...pricingData];

    // Apply filters
    if (filterInStock) {
      filteredData = filteredData.filter(item => item.inStock);
    }

    if (filterFreeShipping) {
      filteredData = filteredData.filter(item => item.freeShipping);
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case 'rating':
          comparison = (b.vendorRating || 0) - (a.vendorRating || 0);
          break;
        case 'shipping':
          // Sort by shipping cost, with free shipping first
          if (a.freeShipping && !b.freeShipping) return -1;
          if (!a.freeShipping && b.freeShipping) return 1;
          comparison = (a.shippingCost || 0) - (b.shippingCost || 0);
          break;
        default:
          comparison = (a.price || 0) - (b.price || 0);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filteredData;
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Change sort criteria
  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      toggleSortOrder();
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Render sort icon based on current sort state
  const renderSortIcon = (criteria) => {
    if (sortBy !== criteria) {
      return <FaSort className="sort-icon" />;
    }
    return sortOrder === 'asc' ? 
      <FaSortAmountUp className="sort-icon active" /> : 
      <FaSortAmountDown className="sort-icon active" />;
  };

  // Calculate total price including shipping
  const calculateTotalPrice = (price = 0, freeShipping = false, shippingCost = 0) => {
    return freeShipping ? price : price + shippingCost;
  };

  const sortedAndFilteredPricing = getSortedAndFilteredPricing();

  // If no pricing data is available
  if (!pricingData || !Array.isArray(pricingData) || pricingData.length === 0) {
    return (
      <div className="product-pricing">
        <h2>Compare Prices</h2>
        <div className="no-pricing-data">
          This product is not currently available from any retailers.
        </div>
      </div>
    );
  }

  return (
    <div className="product-pricing">
      <h2>Compare Prices</h2>
      
      <div className="pricing-filters">
        <div className="filter-options">
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filterInStock} 
              onChange={() => setFilterInStock(!filterInStock)} 
            />
            In Stock Only
          </label>
          <label className="filter-checkbox">
            <input 
              type="checkbox" 
              checked={filterFreeShipping} 
              onChange={() => setFilterFreeShipping(!filterFreeShipping)} 
            />
            Free Shipping Only
          </label>
        </div>
        
        <div className="sort-options">
          <span>Sort by:</span>
          <button 
            className={`sort-button ${sortBy === 'price' ? 'active' : ''}`}
            onClick={() => handleSortChange('price')}
          >
            Price {renderSortIcon('price')}
          </button>
          <button 
            className={`sort-button ${sortBy === 'rating' ? 'active' : ''}`}
            onClick={() => handleSortChange('rating')}
          >
            Rating {renderSortIcon('rating')}
          </button>
          <button 
            className={`sort-button ${sortBy === 'shipping' ? 'active' : ''}`}
            onClick={() => handleSortChange('shipping')}
          >
            Shipping {renderSortIcon('shipping')}
          </button>
        </div>
      </div>
      
      {sortedAndFilteredPricing.length === 0 ? (
        <div className="no-pricing-data">
          No pricing options available with the selected filters.
        </div>
      ) : (
        <div className="pricing-list">
          {sortedAndFilteredPricing.map((item, index) => (
            <div key={`pricing-item-${index}`} className="pricing-item">
              <div className="vendor-info">
                <div className="vendor-logo">
                  {item.vendorLogo && !logoErrors[index] ? (
                    <img 
                      src={item.vendorLogo} 
                      alt={item.vendorName || 'Vendor'} 
                      onError={() => handleLogoError(index)}
                    />
                  ) : (
                    <div className="vendor-name-fallback">
                      {item.vendorName ? item.vendorName.charAt(0) : <FaStore />}
                    </div>
                  )}
                </div>
                <div className="vendor-details">
                  <div className="vendor-name">{item.vendorName || 'Unknown Vendor'}</div>
                  <div className="vendor-rating">
                    {renderStars(item.vendorRating)}
                    <span className="rating-count">({item.ratingCount || 0})</span>
                  </div>
                </div>
              </div>
              
              <div className="pricing-details">
                <div className="price-container">
                  <div className="price">${(item.price || 0).toFixed(2)}</div>
                  {item.originalPrice && (
                    <div className="original-price">${item.originalPrice.toFixed(2)}</div>
                  )}
                </div>
                
                <div className="shipping-info">
                  {item.freeShipping ? (
                    <div className="free-shipping">
                      <FaShippingFast /> Free Shipping
                    </div>
                  ) : (
                    <div className="shipping-cost">
                      + ${(item.shippingCost || 0).toFixed(2)} Shipping
                    </div>
                  )}
                </div>
                
                <div className="total-price">
                  Total: ${calculateTotalPrice(item.price, item.freeShipping, item.shippingCost).toFixed(2)}
                </div>
              </div>
              
              <div className="vendor-status">
                <div className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                  {item.inStock ? (
                    <>
                      <FaCheck /> In Stock
                      {item.deliveryEstimate && (
                        <div className="delivery-estimate">
                          Delivery: {item.deliveryEstimate}
                        </div>
                      )}
                    </>
                  ) : (
                    'Out of Stock'
                  )}
                </div>
                
                {item.vendorUrl && (
                  <a 
                    href={item.vendorUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="buy-button"
                  >
                    Buy Now <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="pricing-disclaimer">
        * Prices and availability may vary. Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export default ProductPricing; 