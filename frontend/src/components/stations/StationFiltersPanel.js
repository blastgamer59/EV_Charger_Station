import React, { useState, useEffect } from 'react';
import { Filter, Search, X } from 'lucide-react';
import Button from '../ui/Button';

const StationFiltersPanel = ({ filters, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const [searchInput, setSearchInput] = useState(filters.searchQuery);

  // Sync tempFilters when filters prop changes
  useEffect(() => {
    setTempFilters(filters);
    setSearchInput(filters.searchQuery);
  }, [filters]);

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const connectorOptions = [
    { value: 'CCS1', label: 'CCS1' },
    { value: 'CCS2', label: 'CCS2' },
    { value: 'CHAdeMO', label: 'CHAdeMO' },
    { value: 'Type1', label: 'Type1' },
    { value: 'Type2', label: 'Type2' },
    { value: 'Tesla', label: 'Tesla' }
  ];

  const handleStatusChange = (status) => {
    const newStatuses = tempFilters.status.includes(status)
      ? tempFilters.status.filter(s => s !== status)
      : [...tempFilters.status, status];

    setTempFilters({
      ...tempFilters,
      status: newStatuses
    });
  };

  const handleConnectorChange = (connector) => {
    const newConnectors = tempFilters.connectorTypes.includes(connector)
      ? tempFilters.connectorTypes.filter(c => c !== connector)
      : [...tempFilters.connectorTypes, connector];

    setTempFilters({
      ...tempFilters,
      connectorTypes: newConnectors
    });
  };

  const handlePowerOutputChange = (min, max) => {
    setTempFilters({
      ...tempFilters,
      powerOutputMin: min,
      powerOutputMax: max
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Apply search immediately
    onChange({
      ...filters,
      searchQuery: searchInput
    });
  };

  const applyFilters = () => {
    // Apply all filters including the current search query
    onChange({
      ...tempFilters,
      searchQuery: searchInput
    });
    setIsOpen(false);
  };

  const resetFilters = () => {
    const resetFilters = {
      status: [],
      connectorTypes: [],
      powerOutputMin: 0,
      powerOutputMax: 500,
      searchQuery: ''
    };
    setTempFilters(resetFilters);
    setSearchInput('');
    onChange(resetFilters);
  };

  const activeFilterCount =
    filters.status.length +
    filters.connectorTypes.length +
    (filters.powerOutputMin > 0 || filters.powerOutputMax < 500 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0); // Include search query in count

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">Filter Stations</h3>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Filter size={16} />}
              onClick={() => setIsOpen(!isOpen)}
              className="relative"
            >
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {activeFilterCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                icon={<X size={16} />}
                onClick={resetFilters}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search by name, address, or city..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Status Filter */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Status</h4>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                      checked={tempFilters.status.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                    />
                    <span className="ml-2 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Connector Types Filter */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Connector Types</h4>
              <div className="space-y-2">
                {connectorOptions.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-green-600 focus:ring-green-500 h-4 w-4"
                      checked={tempFilters.connectorTypes.includes(option.value)}
                      onChange={() => handleConnectorChange(option.value)}
                    />
                    <span className="ml-2 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Power Output Filter */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Power Output (kW)</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Min: {tempFilters.powerOutputMin} kW</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={tempFilters.powerOutputMin}
                    onChange={(e) =>
                      handlePowerOutputChange(parseInt(e.target.value), tempFilters.powerOutputMax)
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Max: {tempFilters.powerOutputMax} kW</label>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={tempFilters.powerOutputMax}
                    onChange={(e) =>
                      handlePowerOutputChange(tempFilters.powerOutputMin, parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} size="sm">
              Cancel
            </Button>
            <Button variant="primary" onClick={applyFilters} size="sm">
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationFiltersPanel;