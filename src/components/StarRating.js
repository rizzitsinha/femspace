import React, { useState } from 'react';

const StarRating = ({ averageRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="rating-container">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={star <= (hoverRating || averageRating) ? '#ffd700' : '#ddd'}
            stroke="#ffd700"
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRate(star)}
            style={{ 
              cursor: 'pointer', 
              marginRight: 4,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <span className="rating-text">Stars: {averageRating.toFixed(1)}/5</span>
    </div>
  );
};

export default StarRating;