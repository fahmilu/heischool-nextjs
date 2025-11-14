'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  fetchLocations, 
  selectAllLocations, 
  selectLocationsLoading, 
  selectLocationsError,
  setSelectedLocation,
  selectSelectedLocation
} from '@/redux/slices/locationsSlice';

/**
 * Example component showing how to use Redux for locations
 * This component can be imported and used anywhere in your app
 */
export default function LocationsList() {
  const dispatch = useAppDispatch();
  const locations = useAppSelector(selectAllLocations);
  const loading = useAppSelector(selectLocationsLoading);
  const error = useAppSelector(selectLocationsError);
  const selectedLocation = useAppSelector(selectSelectedLocation);

  useEffect(() => {
    // Fetch locations when component mounts
    if (locations.length === 0) {
      dispatch(fetchLocations());
    }
  }, [dispatch, locations.length]);

  const handleLocationClick = (location) => {
    dispatch(setSelectedLocation(location));
  };

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading locations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Our Locations</h2>
      
      {locations.length === 0 ? (
        <p>No locations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((location) => (
            <div
              key={location.slug}
              onClick={() => handleLocationClick(location)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedLocation?.slug === location.slug
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{location.title}</h3>
              <p className="text-gray-600 mb-1">{location.address}</p>
              <p className="text-gray-500 text-sm">{location.city}</p>
              
              {location.image && (
                <img
                  src={location.image}
                  alt={location.title}
                  className="mt-3 w-full h-48 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {selectedLocation && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Selected Location:</h3>
          <p className="font-medium">{selectedLocation.title}</p>
          <p className="text-sm text-gray-600">{selectedLocation.description}</p>
        </div>
      )}
    </div>
  );
}

