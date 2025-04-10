import { useState } from 'react';

export default function StarRating({ washroomId, currentRating, onRate }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || currentRating) ? 'filled' : ''}`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRate(washroomId, star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}