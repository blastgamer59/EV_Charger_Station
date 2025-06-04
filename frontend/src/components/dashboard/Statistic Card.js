import { ArrowUp, ArrowDown } from 'lucide-react';
import PropTypes from 'prop-types';

const StatisticCardSkeleton = ({ className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="w-24 h-4 bg-gray-200 rounded mb-3"></div>
        <div className="w-16 h-8 bg-gray-200 rounded mb-3"></div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
    </div>
  </div>
);

const StatisticCard = ({ 
  title, 
  value, 
  icon,
  trend,
  className = '',
  isLoading = false
}) => {
  if (isLoading) {
    return <StatisticCardSkeleton className={className} />;
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center">
              {trend.isPositive ? (
                <ArrowUp size={16} className="text-green-500" />
              ) : (
                <ArrowDown size={16} className="text-red-500" />
              )}
              <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-green-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

StatisticCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
  trend: PropTypes.shape({
    value: PropTypes.number.isRequired,
    isPositive: PropTypes.bool.isRequired
  }),
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

export default StatisticCard;