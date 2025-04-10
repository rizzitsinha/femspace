import { useState } from 'react';

export default function CrowdLevel({ washroomId, currentLevel, onRate }) {
  const [hoverLevel, setHoverLevel] = useState(0);

  return (
    <div className="crowd-level">
      {[1, 2, 3].map((level) => (
        <span
          key={level}
          className={`person ${level <= (hoverLevel || currentLevel) ? 'active' : ''}`}
          onMouseEnter={() => setHoverLevel(level)}
          onMouseLeave={() => setHoverLevel(0)}
          onClick={() => onRate(washroomId, level)}
        >
          🧍‍♀️
        </span>
      ))}
    </div>
  );
}