import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'lg':
        return 'text-sm px-3 py-1.5';
      case 'md':
      default:
        return 'text-xs px-2.5 py-1';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'maintenance':
        return 'Maintenance';
      default:
        return status;
    }
  };

  const statusStyles = getStatusStyles();
  const sizeStyles = getSizeStyles();

  return (
    <span
      className={`inline-flex items-center rounded-full border ${statusStyles} ${sizeStyles} font-medium`}
    >
      <span
        className={`mr-1.5 h-2 w-2 rounded-full ${
          status === 'active'
            ? 'bg-green-500'
            : status === 'inactive'
            ? 'bg-red-500'
            : 'bg-amber-500'
        }`}
      ></span>
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;
