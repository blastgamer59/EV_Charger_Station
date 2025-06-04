import React, { useState, useEffect } from 'react';
import { useStations } from '../context/StationsContext';
import StatisticCard from '../dashboard/Statistic Card';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ChargingStationMap from '../map/ChargingStationMap';
import { BatteryCharging, MapPin, Power, Wrench, AlertTriangle, Plus, Loader2 } from 'lucide-react';

// Loading Spinner Component
const LoadingSpinner = ({ size = 'medium', text = 'Loading...', className = '', showText = true }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-green-600 animate-spin`} />
      {showText && (
        <p className={`mt-2 text-gray-600 ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Map Loading Skeleton
const MapSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="w-full bg-gray-200 rounded-lg animate-pulse" style={{ height: '50vh' }}>
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    </div>
  </div>
);

// Recent Stations Skeleton
const RecentStationsSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>

    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded-md animate-pulse">
          <div className="flex items-start">
            <div className="w-11 h-11 bg-gray-200 rounded-md mr-3"></div>
            <div className="flex-1 min-w-0">
              <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-24 h-3 bg-gray-200 rounded"></div>
            </div>
            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-6">
      <div className="w-full h-9 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

// Header Skeleton
const HeaderSkeleton = () => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
    <div>
      <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="w-80 h-4 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="mt-4 md:mt-0 flex space-x-3">
      <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-28 h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const Dashboard = () => {
  const { stations, filteredStations, isLoading } = useStations();
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Simulate initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show full page loading spinner on initial load (without header/footer)
  if (isPageLoading) {
    return (
      <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    );
  }

  // Compute live statistics from backend data
  const totalStations = stations?.length || 0;
  const activeStations = stations?.filter(s => s.status === 'active').length || 0;
  const maintenanceStations = stations?.filter(s => s.status === 'maintenance').length || 0;
  const inactiveStations = stations?.filter(s => s.status === 'inactive').length || 0;

  const trends = {
    total: { value: 8.2, isPositive: true },
    active: { value: 5.1, isPositive: true },
    maintenance: { value: 2.3, isPositive: false },
    inactive: { value: 1.2, isPositive: false },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">EV Charging Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of all charging stations and their current status
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link to="/stations">
              <Button variant="outline" icon={<BatteryCharging size={18} />}>
                View All Stations
              </Button>
            </Link>
            <Link to="/stations/add">
              <Button variant="primary" icon={<Plus size={18} />}>
                Add Station
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatisticCard
          title="Total Stations"
          value={totalStations}
          icon={<BatteryCharging size={24} className="text-green-600" />}
          trend={trends.total}
          isLoading={isLoading}
        />
        <StatisticCard
          title="Active Stations"
          value={activeStations}
          icon={<Power size={24} className="text-green-600" />}
          trend={trends.active}
          isLoading={isLoading}
        />
        <StatisticCard
          title="Under Maintenance"
          value={maintenanceStations}
          icon={<Wrench size={24} className="text-amber-600" />}
          trend={trends.maintenance}
          isLoading={isLoading}
        />
        <StatisticCard
          title="Inactive Stations"
          value={inactiveStations}
          icon={<AlertTriangle size={24} className="text-red-600" />}
          trend={trends.inactive}
          isLoading={isLoading}
        />
      </div>

      {/* Map and Recent Stations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <MapSkeleton />
          ) : (
            <ChargingStationMap
              stations={stations.slice(0, 15)}
              height="50vh"
              zoom={11}
            />
          )}
        </div>

        {/* Recent Stations Section */}
        <div>
          {isLoading ? (
            <RecentStationsSkeleton />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Recent Stations</h2>
                <Link to="/stations" className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View all
                </Link>
              </div>

              {stations.length === 0 ? (
                <div className="text-center py-8">
                  <BatteryCharging className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No stations available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {stations.slice(0, 5).map((station) => (
                    <Link
                      key={station.id}
                      to={`/stations/${station.id}`}
                      className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="flex items-start">
                        <div className={`p-2 rounded-md ${
                          station.status === 'active'
                            ? 'bg-green-100 text-green-600'
                            : station.status === 'maintenance'
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-red-100 text-red-600'
                        } mr-3`}>
                          <BatteryCharging size={20} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {station.name}
                          </p>
                          <div className="flex items-center mt-1">
                            <MapPin size={14} className="text-gray-400 mr-1" />
                            <p className="text-xs text-gray-500 truncate">
                              {station.city}, {station.state}
                            </p>
                          </div>
                        </div>

                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                          station.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : station.status === 'maintenance'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {station.status.charAt(0).toUpperCase() + station.status.slice(1)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <Link to="/stations/add">
                  <Button variant="outline" size="sm" fullWidth icon={<Plus size={16} />}>
                    Add New Station
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;