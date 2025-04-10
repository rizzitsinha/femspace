import { useState } from 'react';
import StarRating from './StarRating';
import CrowdLevel from './CrowdLevel';

export default function WashroomList({ washrooms, userLocation }) {
  const [ratings, setRatings] = useState({});
  const [crowdLevels, setCrowdLevels] = useState({});

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleStarRating = (washroomId, rating) => {
    setRatings(prev => ({
      ...prev,
      [washroomId]: [...(prev[washroomId] || []), rating]
    }));
  };

  const handleCrowdLevel = (washroomId, level) => {
    setCrowdLevels(prev => ({
      ...prev,
      [washroomId]: level
    }));
  };

  const getAverageRating = (washroom) => {
    const allRatings = [...(washroom.ratings || []), ...(ratings[washroom.id] || [])];
    return allRatings.length > 0 
      ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
      : 'No ratings';
  };

  const nearbyWashrooms = washrooms.filter(washroom => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      washroom.lat,
      washroom.lng
    );
    return distance <= 5;
  });

  return (
    <div>
      {nearbyWashrooms.length === 0 ? (
        <p>No washrooms found within 5km radius</p>
      ) : (
        nearbyWashrooms.map(washroom => (
          <div key={washroom.id} className="washroom-card">
            <h3>{washroom.name}</h3>
            <p className="address-line">{washroom.address}</p>
            
            <div className="ratings-container">
              <div className="rating-section">
                <span>Cleanliness:</span>
                <StarRating
                  washroomId={washroom.id}
                  currentRating={getAverageRating(washroom)}
                  onRate={handleStarRating}
                />
                <span>{getAverageRating(washroom)}</span>
              </div>
              
              <div className="rating-section">
                <span>Crowd Level:</span>
                <CrowdLevel
                  washroomId={washroom.id}
                  currentLevel={crowdLevels[washroom.id] || washroom.crowdLevel}
                  onRate={handleCrowdLevel}
                />
                <span>{['Low', 'Medium', 'High'][crowdLevels[washroom.id] - 1] || 'Medium'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}