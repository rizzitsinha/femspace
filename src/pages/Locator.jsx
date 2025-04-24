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
    lat: 37.7694, 
    lng: -122.4862,
    ratings: [4, 3, 5],
    crowdLevel: 2,
    facilities: ['Baby Station']
  },
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-teal-600 mb-6">
        Nearby Washrooms
        <span className="ml-2 text-2xl">🚻</span>
      </h2>
      
      {userLocation ? (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-50">
            <p className="text-sm font-semibold text-teal-700 mb-2">Your Current Location</p>
            <div className="text-gray-600 space-y-1">
              <p className="flex items-center">
                <span className="inline-block w-20">Latitude:</span>
                <span className="font-mono text-teal-600">{userLocation.lat.toFixed(4)}</span>
              </p>
              <p className="flex items-center">
                <span className="inline-block w-20">Longitude:</span>
                <span className="font-mono text-teal-600">{userLocation.lng.toFixed(4)}</span>
              </p>
            </div>
          </div>

          <WashroomList 
            washrooms={washrooms}
            userLocation={userLocation}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center p-8">
          <div className="flex items-center space-x-3 text-gray-500">
            <svg 
              className="animate-spin h-5 w-5 text-teal-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Detecting your location...</span>
          </div>
        </div>
      )}
    </div>
  );
}