import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';
import ConnectorBadge from '../ui/ConnectorBadge';
import { Edit, Trash2, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

const StationTable = ({ stations, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleOpenDialog = (station) => {
    setSelectedStation(station);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStation(null);
  };

  const handleDelete = async () => {
    if (!selectedStation || !selectedStation.id) {
      console.error('No station selected or invalid station ID');
      return;
    }

    try {
      console.log(`Attempting to delete station with ID: ${selectedStation.id}`);
      await onDelete(selectedStation.id);
      console.log(`Successfully deleted station with ID: ${selectedStation.id}`);
      setOpenDialog(false);
      setSelectedStation(null);
    } catch (error) {
      console.error('Error deleting station:', error);
      // Error handling is managed by StationsContext snackbar
      // Optionally, display a fallback error message if snackbar is not visible
      alert('Failed to delete station. Please try again.');
    }
  };

  if (!stations || stations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No charging stations found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power Output</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Connector Types</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stations.map((station) => (
            <tr key={station.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{station.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{station.city}, {station.state}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={station.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{station.powerOutput} kW</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {station.connectorTypes.map((type) => (
                    <ConnectorBadge key={type} type={type} size="sm" />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{formatDate(station.lastUpdated)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <Link to={`/stations/${station.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<ExternalLink size={14} />}
                      aria-label="View"
                    >
                      View
                    </Button>
                  </Link>
                  <Link to={`/stations/edit/${station.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit size={14} />}
                      aria-label="Edit"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 size={14} />}
                    aria-label="Delete"
                    onClick={() => handleOpenDialog(station)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDialog && selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the station "{selectedStation.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

StationTable.propTypes = {
  stations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      powerOutput: PropTypes.number.isRequired,
      connectorTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
      lastUpdated: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StationTable;