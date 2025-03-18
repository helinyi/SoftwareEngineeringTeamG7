import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaThumbsUp, FaThumbsDown, FaUser } from 'react-icons/fa';
import '../styles/ProductReviews.css';

const ProductReviews = ({ reviews, overallRating, subRatings }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [expandedReviews, setExpandedReviews] = useState({});

  const renderStars = (rating) => {
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

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const sortReviews = () => {
    if (!reviews || reviews.length === 0) {
      return [];
    }
    
    let sortedReviews = [...reviews];
    
    switch (sortBy) {
      case 'recent':
        return sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'highest':
        return sortedReviews.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sortedReviews.sort((a, b) => a.rating - b.rating);
      case 'helpful':
        return sortedReviews.sort((a, b) => b.helpfulVotes - a.helpfulVotes);
      default:
        return sortedReviews;
    }
  };

  const handleAvatarError = (e) => {
    console.error('Avatar image failed to load:', e.target.src);
    e.target.style.display = 'none';
    e.target.parentNode.classList.add('avatar-error');
  };

  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div className="product-reviews-container">
        <div className="reviews-header">
          <h2>Customer Reviews</h2>
          <div className="overall-rating">
            <div className="rating-stars">
              {renderStars(overallRating || 0)}
              <span className="rating-value">{(overallRating || 0).toFixed(1)}</span>
            </div>
            <p className="review-count">No reviews yet</p>
          </div>
        </div>
        <div className="no-reviews">
          <p>There are no reviews for this product yet. Be the first to leave a review!</p>
        </div>
      </div>
    );
  }

  const displaySubRatings = Array.isArray(subRatings) ? subRatings : 
    (subRatings && typeof subRatings === 'object' ? 
      Object.entries(subRatings).map(([name, value]) => ({name, value})) : 
      []);

  return (
    <div className="product-reviews-container">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <div className="overall-rating">
          <div className="rating-stars">
            {renderStars(overallRating)}
            <span className="rating-value">{overallRating.toFixed(1)}</span>
          </div>
          <p className="review-count">{reviews.length} reviews</p>
        </div>
      </div>

      {displaySubRatings.length > 0 && (
        <div className="sub-ratings">
          {displaySubRatings.map((subRating, index) => (
            <div key={index} className="sub-rating">
              <div className="sub-rating-label">{subRating.name}</div>
              <div className="sub-rating-bar-container">
                <div 
                  className="sub-rating-bar" 
                  style={{ width: `${(subRating.value / 5) * 100}%` }}
                ></div>
              </div>
              <div className="sub-rating-value">{subRating.value.toFixed(1)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="reviews-filter">
        <label htmlFor="sort-reviews">Sort by: </label>
        <select 
          id="sort-reviews" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Most Recent</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      <div className="reviews-list">
        {sortReviews().map((review) => {
          const isExpanded = expandedReviews[review.id] || false;
          const reviewText = review.text || '';
          const needsExpansion = reviewText.length > 200;
          const displayText = isExpanded ? reviewText : reviewText.substring(0, 200);
          
          return (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.avatar ? (
                      <img 
                        src={review.avatar} 
                        alt={review.username || 'User'} 
                        onError={handleAvatarError}
                      />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="reviewer-details">
                    <div className="reviewer-name">{review.username || 'Anonymous'}</div>
                    <div className="review-date">{review.date || 'Unknown date'}</div>
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating || 0)}
                </div>
              </div>
              
              <div className="review-title">{review.title || 'Review'}</div>
              
              <div className="review-content">
                <p>{displayText}{!isExpanded && needsExpansion && '...'}</p>
                {needsExpansion && (
                  <button 
                    className="read-more-button"
                    onClick={() => toggleReviewExpansion(review.id)}
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
              
              <div className="review-footer">
                <div className="review-helpful">
                  <span>Was this review helpful?</span>
                  <button className="helpful-button">
                    <FaThumbsUp /> Yes ({review.helpfulVotes || 0})
                  </button>
                  <button className="helpful-button">
                    <FaThumbsDown /> No ({review.unhelpfulVotes || 0})
                  </button>
                </div>
                {review.verified && (
                  <div className="verified-purchase">Verified Purchase</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviews; 