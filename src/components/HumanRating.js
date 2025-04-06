import React, { useState } from 'react';

const HumanRating = ({ averageRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="rating-container">
      <div className="human-rating">
        {[1, 2, 3, 4, 5].map((human) => (
          <svg
            key={human}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill={human <= (hoverRating || averageRating) ? '#2980b9' : '#ddd'}
            stroke="#2c3e50"
            onMouseEnter={() => setHoverRating(human)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRate(human)}
            style={{ 
              cursor: 'pointer', 
              marginRight: 8,
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
          </svg>
        ))}
      </div>
      <span className="rating-text">People: {averageRating.toFixed(1)}/5</span>
    </div>
  );
};

export default HumanRating;