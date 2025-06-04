import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ 
  width = '100%', 
  height = '16px', 
  className = '', 
  rounded = false,
  circle = false 
}) => {
  const baseClasses = 'animate-pulse bg-gray-200';
  const shapeClasses = circle 
    ? 'rounded-full' 
    : rounded 
    ? 'rounded' 
    : 'rounded-sm';
  
  return (
    <div 
      className={`${baseClasses} ${shapeClasses} ${className}`}
      style={{ width, height }}
    />
  );
};

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  circle: PropTypes.bool,
};

export default Skeleton;

// SkeletonCard.js - Skeleton for station cards
export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Skeleton width="60%" height="20px" className="mb-2" />
          <Skeleton width="80%" height="16px" />
        </div>
        <Skeleton width="60px" height="24px" rounded />
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center">
          <Skeleton width="16px" height="16px" className="mr-2" />
          <Skeleton width="70%" height="14px" />
        </div>
        <div className="flex items-center">
          <Skeleton width="16px" height="16px" className="mr-2" />
          <Skeleton width="50%" height="14px" />
        </div>
        <div className="flex items-center">
          <Skeleton width="16px" height="16px" className="mr-2" />
          <Skeleton width="40%" height="14px" />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton width="60px" height="20px" rounded />
        <Skeleton width="50px" height="20px" rounded />
        <Skeleton width="70px" height="20px" rounded />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Skeleton width="60px" height="32px" rounded />
        <Skeleton width="50px" height="32px" rounded />
        <Skeleton width="60px" height="32px" rounded />
      </div>
    </div>
  );
};

// SkeletonTable.js - Skeleton for station table
export const SkeletonTable = ({ rows = 5 }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">
              <Skeleton width="60px" height="12px" />
            </th>
            <th className="px-6 py-3 text-left">
              <Skeleton width="70px" height="12px" />
            </th>
            <th className="px-6 py-3 text-left">
              <Skeleton width="50px" height="12px" />
            </th>
            <th className="px-6 py-3 text-left">
              <Skeleton width="80px" height="12px" />
            </th>
            <th className="px-6 py-3 text-left">
              <Skeleton width="90px" height="12px" />
            </th>
            <th className="px-6 py-3 text-left">
              <Skeleton width="80px" height="12px" />
            </th>
            <th className="px-6 py-3 text-right">
              <Skeleton width="60px" height="12px" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4">
                <Skeleton width="80%" height="16px" />
              </td>
              <td className="px-6 py-4">
                <Skeleton width="70%" height="14px" />
              </td>
              <td className="px-6 py-4">
                <Skeleton width="60px" height="20px" rounded />
              </td>
              <td className="px-6 py-4">
                <Skeleton width="60px" height="14px" />
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1">
                  <Skeleton width="40px" height="20px" rounded />
                  <Skeleton width="35px" height="20px" rounded />
                </div>
              </td>
              <td className="px-6 py-4">
                <Skeleton width="80px" height="14px" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end space-x-2">
                  <Skeleton width="50px" height="28px" rounded />
                  <Skeleton width="45px" height="28px" rounded />
                  <Skeleton width="55px" height="28px" rounded />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// SkeletonDetails.js - Skeleton for station details page
export const SkeletonDetails = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Skeleton width="120px" height="16px" />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <Skeleton width="200px" height="24px" className="mr-3" />
              <Skeleton width="80px" height="24px" rounded />
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Skeleton width="70px" height="36px" rounded />
              <Skeleton width="80px" height="36px" rounded />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <Skeleton width="150px" height="20px" className="mb-3" />
                <div className="space-y-4">
                  <div>
                    <Skeleton width="60px" height="14px" className="mb-1" />
                    <div className="flex items-start">
                      <Skeleton width="18px" height="18px" className="mr-2 mt-0.5" />
                      <div className="flex-1">
                        <Skeleton width="90%" height="16px" className="mb-1" />
                        <Skeleton width="70%" height="16px" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Skeleton width="80px" height="14px" className="mb-1" />
                    <Skeleton width="60%" height="16px" />
                  </div>

                  <div>
                    <Skeleton width="90px" height="14px" className="mb-1" />
                    <div className="flex items-center">
                      <Skeleton width="18px" height="18px" className="mr-2" />
                      <Skeleton width="80px" height="16px" />
                    </div>
                  </div>

                  <div>
                    <Skeleton width="90px" height="14px" className="mb-1" />
                    <div className="flex items-center">
                      <Skeleton width="18px" height="18px" className="mr-2" />
                      <Skeleton width="120px" height="16px" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Skeleton width="120px" height="20px" className="mb-3" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton width="60px" height="28px" rounded />
                  <Skeleton width="70px" height="28px" rounded />
                  <Skeleton width="55px" height="28px" rounded />
                </div>
              </div>
            </div>

            <div>
              <Skeleton width="100%" height="300px" rounded />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SkeletonFilters.js - Skeleton for filters panel
export const SkeletonFilters = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <Skeleton width="60px" height="14px" className="mb-2" />
          <Skeleton width="100%" height="36px" rounded />
        </div>
        <div>
          <Skeleton width="40px" height="14px" className="mb-2" />
          <Skeleton width="100%" height="36px" rounded />
        </div>
        <div>
          <Skeleton width="90px" height="14px" className="mb-2" />
          <Skeleton width="100%" height="36px" rounded />
        </div>
        <div>
          <Skeleton width="100%" height="36px" rounded />
        </div>
      </div>
    </div>
  );
};

// SkeletonList.js - Complete skeleton for stations list page
export const SkeletonList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Skeleton width="180px" height="28px" className="mb-2" />
          <Skeleton width="300px" height="16px" />
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Skeleton width="80px" height="36px" rounded />
          <Skeleton width="100px" height="36px" rounded />
          <Skeleton width="100px" height="36px" rounded />
        </div>
      </div>

      {/* Filters skeleton */}
      <SkeletonFilters />

      {/* View controls skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <Skeleton width="200px" height="16px" />
        <Skeleton width="120px" height="32px" rounded />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center mt-6">
        <div className="inline-flex rounded-md shadow">
          <Skeleton width="80px" height="36px" className="rounded-l-md" />
          <Skeleton width="40px" height="36px" />
          <Skeleton width="40px" height="36px" />
          <Skeleton width="40px" height="36px" />
          <Skeleton width="60px" height="36px" className="rounded-r-md" />
        </div>
      </div>
    </div>
  );
};