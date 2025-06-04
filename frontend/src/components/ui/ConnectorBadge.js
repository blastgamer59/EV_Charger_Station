import React from 'react';
import PropTypes from 'prop-types';

const ConnectorBadge = ({ type, size = 'md' }) => {
  const getConnectorStyles = () => {
    switch (type) {
      case 'CCS1':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CCS2':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'CHAdeMO':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Type1':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Type2':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Tesla':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-0.5';
      case 'lg':
        return 'text-sm px-3 py-1';
      case 'md':
      default:
        return 'text-xs px-2.5 py-0.5';
    }
  };

  const connectorStyles = getConnectorStyles();
  const sizeStyles = getSizeStyles();

  return (
    <span
      className={`inline-flex items-center rounded-full border ${connectorStyles} ${sizeStyles} font-medium`}
    >
      {type}
    </span>
  );
};

ConnectorBadge.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ConnectorBadge;
