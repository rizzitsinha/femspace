import { useState, useEffect } from 'react';
import WashroomList from '../components/WashroomList';

const tempWashrooms = [
  { 
    id: 1, 
    name: 'Westfield San Francisco Centre', 
    address: '865 Market St, San Francisco, CA 94103',
    lat: 37.7843, 
    lng: -122.4074,
    ratings: [4, 5, 4],
    crowdLevel: 2,
    facilities: ['Changing Table', 'Sanitary Products']
  },
  { 
    id: 2, 
    name: 'Golden Gate Park Restroom', 
    address: 'Music Concourse Dr, San Francisco, CA 94118',
    lat: 18.46976464307834, 
    lng: 73.83460239894364,
    ratings: [4, 3, 5],
    crowdLevel: 2,
    facilities: ['Baby Station']
  },
  // Add more entries as needed
];

export default function Locator() {
  const [userLocation, setUserLocation] = useState(null);
  const [washrooms, setWashrooms] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        error => console.error(error)
      );
    }

    setWashrooms(tempWashrooms);
  }, []);

  return (
    <div className="section">
      <h2>Nearby Washrooms</h2>
      
      {userLocation ? (
        <>
          <p style={{ marginBottom: '1rem' }}>
            Your current coordinates: 
            <br />
            Latitude: {userLocation.lat.toFixed(4)}
            <br />
            Longitude: {userLocation.lng.toFixed(4)}
          </p>
          <WashroomList 
            washrooms={washrooms}
            userLocation={userLocation}
          />
        </>
      ) : (
        <p>Detecting your location...</p>
      )}
    </div>
  );
}