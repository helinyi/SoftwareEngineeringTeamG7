import React, { useState } from 'react';
import { FiX, FiCheck, FiMinus, FiImage } from 'react-icons/fi';
import '../styles/ProductComparison.css';

const ProductComparison = ({ product1, product2, onClose }) => {
  const [product1ImageLoaded, setProduct1ImageLoaded] = useState(false);
  const [product2ImageLoaded, setProduct2ImageLoaded] = useState(false);

  const getBetterProduct = (value1, value2) => {
    if (value1 > value2) return 'product1';
    if (value2 > value1) return 'product2';
    return 'equal';
  };
  
  const highlightBetter = (value1, value2, higherIsBetter = true) => {
    if (value1 === value2) return 'equal';
    
    if (higherIsBetter) {
      return value1 > value2 ? 'product1' : 'product2';
    } else {
      return value1 < value2 ? 'product1' : 'product2';
    }
  };

  const getCategorySpecificMetrics = () => {
    const category = product1.category;
    
    switch(category) {
      case 'phone':
        return [
          { name: 'Camera Quality', product1Value: getSubRatingValue(product1, 'Photography'), product2Value: getSubRatingValue(product2, 'Photography') },
          { name: 'Performance', product1Value: getSubRatingValue(product1, 'Performance'), product2Value: getSubRatingValue(product2, 'Performance') },
          { name: 'Display Quality', product1Value: getSubRatingValue(product1, 'Display Quality'), product2Value: getSubRatingValue(product2, 'Display Quality') }
        ];
      case 'laptop':
        return [
          { name: 'Performance', product1Value: getSubRatingValue(product1, 'Performance'), product2Value: getSubRatingValue(product2, 'Performance') },
          { name: 'Display Quality', product1Value: getSubRatingValue(product1, 'Display Quality'), product2Value: getSubRatingValue(product2, 'Display Quality') },
          { name: 'Battery Life', product1Value: getSubRatingValue(product1, 'Battery Life'), product2Value: getSubRatingValue(product2, 'Battery Life') }
        ];
      case 'earpods':
        return [
          { name: 'Sound Quality', product1Value: getSubRatingValue(product1, 'Sound Quality'), product2Value: getSubRatingValue(product2, 'Sound Quality') },
          { name: 'Noise Cancellation', product1Value: getSubRatingValue(product1, 'Noise Cancellation'), product2Value: getSubRatingValue(product2, 'Noise Cancellation') },
          { name: 'Comfort', product1Value: getSubRatingValue(product1, 'Comfort'), product2Value: getSubRatingValue(product2, 'Comfort') }
        ];
      case 'watch':
        return [
          { name: 'Features', product1Value: getSubRatingValue(product1, 'Features'), product2Value: getSubRatingValue(product2, 'Features') },
          { name: 'Battery Life', product1Value: getSubRatingValue(product1, 'Battery Life'), product2Value: getSubRatingValue(product2, 'Battery Life') },
          { name: 'Build Quality', product1Value: getSubRatingValue(product1, 'Build Quality'), product2Value: getSubRatingValue(product2, 'Build Quality') }
        ];
      default:
        return [];
    }
  };

  const getSubRatingValue = (product, ratingName) => {
    if (!product || !product.subRatings) return 0;
    const rating = product.subRatings.find(r => r.name === ratingName);
    return rating ? rating.value : 0;
  };

  const handleProduct1ImageLoad = () => {
    setProduct1ImageLoaded(true);
  };

  const handleProduct2ImageLoad = () => {
    setProduct2ImageLoaded(true);
  };

  const handleProduct1ImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    
    if (product1.id === 'redmagic10-pro-5g' || product1.id === 'pixel9-pro') {
      e.target.src = `/images/products/${product1.id}.jpg`;
    } else if (product1.id === 'airpods-pro' || product1.id === 'pixel-buds') {
      e.target.src = `/images/products/${product1.id}.jpg`;
    } else {
      e.target.src = '/images/products/placeholder-product.jpg';
    }
    e.target.onerror = null;
    setProduct1ImageLoaded(true);
  };

  const handleProduct2ImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    
    if (product2.id === 'redmagic10-pro-5g' || product2.id === 'pixel9-pro') {
      e.target.src = `/images/products/${product2.id}.jpg`;
    } else if (product2.id === 'airpods-pro' || product2.id === 'pixel-buds') {
      e.target.src = `/images/products/${product2.id}.jpg`;
    } else {
      e.target.src = '/images/products/placeholder-product.jpg';
    }
    e.target.onerror = null;
    setProduct2ImageLoaded(true);
  };

  const safeNumber = (value, fallback = 0) => {
    return typeof value === 'number' ? value : fallback;
  };

  const safeToFixed = (value, digits = 1) => {
    return safeNumber(value).toFixed(digits);
  };

  const hasValidSubRatings = () => {
    return (
      product1 && product1.subRatings && Array.isArray(product1.subRatings) &&
      product2 && product2.subRatings && Array.isArray(product2.subRatings)
    );
  };

  return (
    <div className="product-comparison">
      <div className="comparison-header">
        <h2>Product Comparison</h2>
        <button className="close-button" onClick={onClose}>
          <FiX /> Close Comparison
        </button>
      </div>
      
      <div className="comparison-content">
        <div className="comparison-row header-row">
          <div className="comparison-cell feature-cell">Feature</div>
          <div className="comparison-cell">{product1.name}</div>
          <div className="comparison-cell">{product2.name}</div>
        </div>
        
        <div className="comparison-section">
          <div className="section-title">Basic Information</div>
          
          <div className="comparison-row image-row">
            <div className="comparison-cell feature-cell">Image</div>
            <div className="comparison-cell product-image-cell">
              <div className="comparison-image-container">
                {!product1ImageLoaded && <div className="loading-placeholder"><FiImage size={36} /></div>}
                <img
                  src={product1.image}
                  alt={product1.name}
                  className="comparison-product-image"
                  style={{ display: product1ImageLoaded ? 'block' : 'none' }}
                  onLoad={handleProduct1ImageLoad}
                  onError={handleProduct1ImageError}
                />
              </div>
            </div>
            <div className="comparison-cell product-image-cell">
              <div className="comparison-image-container">
                {!product2ImageLoaded && <div className="loading-placeholder"><FiImage size={36} /></div>}
                <img
                  src={product2.image}
                  alt={product2.name}
                  className="comparison-product-image"
                  style={{ display: product2ImageLoaded ? 'block' : 'none' }}
                  onLoad={handleProduct2ImageLoad}
                  onError={handleProduct2ImageError}
                />
              </div>
            </div>
          </div>
          
          <div className="comparison-row">
            <div className="comparison-cell feature-cell">Brand</div>
            <div className="comparison-cell">{product1.brand}</div>
            <div className="comparison-cell">{product2.brand}</div>
          </div>
          
          <div className="comparison-row">
            <div className="comparison-cell feature-cell">Price</div>
            <div className={`comparison-cell ${highlightBetter(product1.price, product2.price, false)}`}>${product1.price}</div>
            <div className={`comparison-cell ${highlightBetter(product2.price, product1.price, false)}`}>${product2.price}</div>
          </div>
        </div>
        
        <div className="comparison-section">
          <div className="section-title">Ratings</div>
          
          <div className="comparison-row">
            <div className="comparison-cell feature-cell">Overall Rating</div>
            <div className={`comparison-cell ${highlightBetter(product1.rating, product2.rating)}`}>
              {safeToFixed(product1.rating)} / 10
            </div>
            <div className={`comparison-cell ${highlightBetter(product2.rating, product1.rating)}`}>
              {safeToFixed(product2.rating)} / 10
            </div>
          </div>
          
          <div className="comparison-row">
            <div className="comparison-cell feature-cell">Review Count</div>
            <div className={`comparison-cell ${highlightBetter(product1.reviewCount, product2.reviewCount)}`}>
              {product1.reviewCount || 0}
            </div>
            <div className={`comparison-cell ${highlightBetter(product2.reviewCount, product1.reviewCount)}`}>
              {product2.reviewCount || 0}
            </div>
          </div>
          
          {hasValidSubRatings() && product1.subRatings.map((subRating, index) => {
            const product2SubRating = product2.subRatings.find(sr => sr.name === subRating.name);
            
            if (!product2SubRating) return null;
            
            return (
              <div className="comparison-row" key={`subrating-${index}`}>
                <div className="comparison-cell feature-cell">{subRating.name}</div>
                <div className={`comparison-cell ${highlightBetter(subRating.value, product2SubRating.value)}`}>
                  {safeToFixed(subRating.value)} / 10
                </div>
                <div className={`comparison-cell ${highlightBetter(product2SubRating.value, subRating.value)}`}>
                  {safeToFixed(product2SubRating.value)} / 10
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="comparison-section">
          <div className="section-title">Specifications</div>
          
          {product1.specifications && Array.isArray(product1.specifications) && product1.specifications.length > 0 && 
            product1.specifications[0].groups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <div className="comparison-row group-header">
                  <div className="comparison-cell feature-cell">{group.name}</div>
                  <div className="comparison-cell"></div>
                  <div className="comparison-cell"></div>
                </div>
                
                {group.items && Array.isArray(group.items) && group.items.map((item, itemIndex) => {
                  const product2Group = product2.specifications && 
                                    Array.isArray(product2.specifications) && 
                                    product2.specifications.length > 0 && 
                                    product2.specifications[0].groups ? 
                                      product2.specifications[0].groups[groupIndex] : null;
                  
                  const product2Item = product2Group && 
                                    Array.isArray(product2Group.items) ? 
                                      product2Group.items[itemIndex] : null;
                  
                  return (
                    <div className="comparison-row" key={itemIndex}>
                      <div className="comparison-cell feature-cell">{item.name}</div>
                      <div className="comparison-cell">
                        {item.value}
                      </div>
                      <div className="comparison-cell">
                        {product2Item ? product2Item.value : <FiMinus />}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))
          }
        </div>
        
        <div className="comparison-section">
          <div className="section-title">Pricing</div>
          
          {product1.pricingData && Array.isArray(product1.pricingData) && product1.pricingData.map((pricing, index) => {
            const product2Pricing = product2.pricingData && 
                                Array.isArray(product2.pricingData) ? 
                                  product2.pricingData.find(p => p.vendorName === pricing.vendorName) : null;
            
            return (
              <div className="comparison-row" key={index}>
                <div className="comparison-cell feature-cell">{pricing.vendorName || 'Unknown Vendor'}</div>
                <div className={`comparison-cell ${product2Pricing ? highlightBetter(pricing.price, product2Pricing.price, false) : ''}`}>
                  ${pricing.price}
                  {pricing.inStock ? <span className="in-stock"><FiCheck /> In Stock</span> : <span className="out-of-stock">Out of Stock</span>}
                </div>
                <div className={`comparison-cell ${product2Pricing ? highlightBetter(product2Pricing.price, pricing.price, false) : ''}`}>
                  {product2Pricing ? (
                    <>
                      ${product2Pricing.price}
                      {product2Pricing.inStock ? <span className="in-stock"><FiCheck /> In Stock</span> : <span className="out-of-stock">Out of Stock</span>}
                    </>
                  ) : (
                    <FiMinus />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="comparison-section conclusion-section">
          <div className="section-title">Conclusion</div>
          
          <div className="comparison-row">
            <div className="comparison-cell feature-cell">Overall Value</div>
            <div className={`comparison-cell ${getBetterProduct(
              (safeNumber(product1.rating) * 0.7) - (safeNumber(product1.price) * 0.0003), 
              (safeNumber(product2.rating) * 0.7) - (safeNumber(product2.price) * 0.0003)
            )}`}>
              {safeNumber(product1.rating) >= 4.0 && safeNumber(product1.price) <= 800 ? 'Great Value' : 
                safeNumber(product1.rating) >= 4.5 ? 'Premium Quality' : 'Average Value'}
            </div>
            <div className={`comparison-cell ${getBetterProduct(
              (safeNumber(product2.rating) * 0.7) - (safeNumber(product2.price) * 0.0003), 
              (safeNumber(product1.rating) * 0.7) - (safeNumber(product1.price) * 0.0003)
            )}`}>
              {safeNumber(product2.rating) >= 4.0 && safeNumber(product2.price) <= 800 ? 'Great Value' : 
                safeNumber(product2.rating) >= 4.5 ? 'Premium Quality' : 'Average Value'}
            </div>
          </div>
          
          <div className="comparison-row">
            <div className="comparison-cell feature-cell">Recommendation</div>
            <div className="comparison-cell">
              {safeNumber(product1.rating) > safeNumber(product2.rating) + 0.5 ? 'Recommended Choice' : 
                safeNumber(product1.price) < safeNumber(product2.price) * 0.8 ? 'Budget-Friendly Option' : ''}
            </div>
            <div className="comparison-cell">
              {safeNumber(product2.rating) > safeNumber(product1.rating) + 0.5 ? 'Recommended Choice' : 
                safeNumber(product2.price) < safeNumber(product1.price) * 0.8 ? 'Budget-Friendly Option' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison; 