import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import washrooms from './washrooms.json';
import { calculateDistance } from './utils/distanceCalculator';
import StarRating from './components/StarRating';
import HumanRating from './components/HumanRating';

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyWashrooms, setNearbyWashrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [washroomsData, setWashroomsData] = useState(() => {
    const savedData = localStorage.getItem('washroomsData');
    return savedData 
      ? JSON.parse(savedData) 
      : washrooms.map(washroom => ({
          ...washroom,
          starRatings: washroom.starRatings || [],
          humanRatings: washroom.humanRatings || []
        }));
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          setError("Please enable location access to use this service.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const filtered = washroomsData.filter(washroom => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          washroom.lat,
          washroom.lng
        );
        return distance <= 5;
      });
      setNearbyWashrooms(filtered);
    }
  }, [userLocation, washroomsData]);

  const handleRating = (washroomId, type, newRating) => {
    setWashroomsData(prev => {
      const updated = prev.map(washroom => 
        washroom.id === washroomId
          ? { 
              ...washroom, 
              [type]: [...washroom[type], newRating] 
            }
          : washroom
      );
      localStorage.setItem('washroomsData', JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 className="text-center mb-4" style={{ color: '#2c3e50' }}>Nearby Washrooms</h1>
      
      {userLocation && (
        <Card className="mb-4 shadow-sm" style={{ backgroundColor: '#e8f4f8' }}>
          <Card.Body className="text-center">
            <Card.Text>
              Your Current Location: 
              <span style={{ color: '#e67e22' }} className="ms-2">
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {nearbyWashrooms.length === 0 ? (
        <Alert variant="info" className="text-center">
          No washrooms found within 5km radius.
        </Alert>
      ) : (
        <ListGroup>
          {nearbyWashrooms.map((washroom) => {
            const starAvg = washroom.starRatings.length > 0 
              ? washroom.starRatings.reduce((a, b) => a + b, 0) / washroom.starRatings.length
              : 0;

            const humanAvg = washroom.humanRatings.length > 0 
              ? washroom.humanRatings.reduce((a, b) => a + b, 0) / washroom.humanRatings.length
              : 0;

            return (
              <Card key={washroom.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title style={{ color: '#2980b9' }}>{washroom.name}</Card.Title>
                  <Card.Text>{washroom.address}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="rating-group">
                      <StarRating 
                        averageRating={starAvg}
                        onRate={(rating) => handleRating(washroom.id, 'starRatings', rating)}
                      />
                      <HumanRating 
                        averageRating={humanAvg}
                        onRate={(rating) => handleRating(washroom.id, 'humanRatings', rating)}
                      />
                    </div>
                    <span style={{ color: '#e67e22' }}>
                      Distance: {calculateDistance(
                        userLocation.lat,
                        userLocation.lng,
                        washroom.lat,
                        washroom.lng
                      ).toFixed(2)} km
                    </span>
                  </div>
                </Card.Body>
              </Card>
            )
          })}
        </ListGroup>
      )}
    </Container>
  );
}

export default App;