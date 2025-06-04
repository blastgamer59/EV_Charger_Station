import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Zap, Calendar, ChevronRight } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import ConnectorBadge from '../ui/ConnectorBadge';

const StationCard = ({ station }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{station.name}</h3>
          <StatusBadge status={station.status} />
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <MapPin size={16} className="mr-1" />
          <span>{station.address}, {station.city}, {station.state} {station.zipCode}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Zap size={16} className="mr-1" />
          <span>{station.powerOutput} kW</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Calendar size={16} className="mr-1" />
          <span>Updated: {formatDate(station.lastUpdated)}</span>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-1">
          {station.connectorTypes.map((type) => (
            <ConnectorBadge key={type} type={type} size="sm" />
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
        <Link 
          to={`/stations/${station.id}`}
          className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center justify-end"
        >
          View details
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default StationCard;
