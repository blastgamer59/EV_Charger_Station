import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Home, Map, BatteryCharging } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
          <BatteryCharging size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <Button variant="primary" size="lg" icon={<Home size={20} />}>
              Go to Dashboard
            </Button>
          </Link>
          
          <Link to="/stations">
            <Button variant="outline" size="lg" icon={<BatteryCharging size={20} />}>
              View Stations
            </Button>
          </Link>
          
          <Link to="/map">
            <Button variant="outline" size="lg" icon={<Map size={20} />}>
              View Map
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
