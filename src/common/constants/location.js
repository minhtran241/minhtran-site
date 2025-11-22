// Location configuration with coordinates
// You can easily update the location by changing the values below

export const locationConfig = {
  city: 'Hanoi',
  country: 'Vietnam',
  fullLocation: 'Hanoi, Vietnam',
  coordinates: {
    lat: 21.0285,
    lng: 105.8542,
  },
  zoom: 13, // Default zoom level for the map
};

// Common city coordinates for easy switching
export const commonLocations = {
  'Hanoi, Vietnam': { lat: 21.0285, lng: 105.8542 },
  'Grand Rapids, Michigan, USA': { lat: 42.9634, lng: -85.6681 },
  'Ho Chi Minh City, Vietnam': { lat: 10.8231, lng: 106.6297 },
  'New York, USA': { lat: 40.7128, lng: -74.006 },
  'San Francisco, USA': { lat: 37.7749, lng: -122.4194 },
  'London, UK': { lat: 51.5074, lng: -0.1278 },
  'Tokyo, Japan': { lat: 35.6762, lng: 139.6503 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
};

// Helper function to get coordinates array for Leaflet [lat, lng]
export const getCoordinates = () => {
  return [locationConfig.coordinates.lat, locationConfig.coordinates.lng];
};

// Helper function to get location display text
export const getLocationText = () => {
  return locationConfig.fullLocation;
};

// Helper function to get popup text
export const getPopupText = () => {
  return `📍 ${locationConfig.fullLocation}`;
};
