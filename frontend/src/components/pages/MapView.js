import React, { useState, useEffect } from 'react';
import { useStations } from '../context/StationsContext';
import ChargingStationMap from '../map/ChargingStationMap';
import { Search, X } from 'lucide-react';

const MapView = () => {
  const { filteredStations, setSearchQuery, stations } = useStations();
  const [searchQuery, setLocalSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([16.5062, 80.6480]); // Default center (Vijayawada)

  useEffect(() => {
    // Calculate map center based on all stations
    if (stations.length > 0) {
      const avgLat = stations.reduce((sum, station) => sum + station.latitude, 0) / stations.length;
      const avgLng = stations.reduce((sum, station) => sum + station.longitude, 0) / stations.length;
      setMapCenter([avgLat, avgLng]);
    }
  }, [stations]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
    setSearchQuery('');
    if (stations.length > 0) {
      const avgLat = stations.reduce((sum, station) => sum + station.latitude, 0) / stations.length;
      const avgLng = stations.reduce((sum, station) => sum + station.longitude, 0) / stations.length;
      setMapCenter([avgLat, avgLng]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Charging Stations Map</h1>
        <p className="mt-1 text-sm text-gray-500">
          View the geographic distribution of all charging stations
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md mb-6 p-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for a station by name, address, or city..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={searchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mb-2 text-sm text-gray-500">
        {filteredStations.length} stations found
        {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
      </div>

      <ChargingStationMap
        stations={filteredStations}
        height="75vh"
        zoom={11}
        center={mapCenter}
      />
    </div>
  );
};

export default MapView;