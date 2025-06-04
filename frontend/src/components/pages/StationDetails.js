import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStations } from '../context/StationsContext';
import StatusBadge from '../ui/StatusBadge';
import ConnectorBadge from '../ui/ConnectorBadge';
import Button from '../ui/Button';
import ChargingStationMap from '../map/ChargingStationMap';
import { SkeletonDetails } from '../ui/Skeleton'; 
import { MapPin, Clock, Zap, Edit, Trash2, ArrowLeft } from 'lucide-react';

function StationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStationById, deleteStation, isLoading } = useStations();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoadingStation, setIsLoadingStation] = useState(true);

  const station = getStationById(id);

  // Simulate loading state for individual station
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingStation(false);
    }, 100); // Small delay to show skeleton briefly

    return () => clearTimeout(timer);
  }, [id]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      await deleteStation(station.id);
      setOpenDialog(false);
      navigate('/stations');
    } catch (error) {
      // Error handling is managed by StationsContext snackbar
    }
  };

  // Show skeleton while loading or if station is being fetched
  if (isLoading || isLoadingStation || !station) {
    if (isLoading || isLoadingStation) {
      return <SkeletonDetails />;
    }
    
    // Station not found
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Station Not Found</h1>
          <p className="text-gray-500 mb-6">The charging station you are looking for does not exist or has been removed.</p>
          <Link to="/stations">
            <Button variant="primary" icon={<ArrowLeft size={16} />}>
              Back to Stations
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/stations" className="text-green-600 hover:text-green-700 flex items-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to Stations
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{station.name}</h1>
              <StatusBadge status={station.status} size="md" className="ml-3" />
            </div>

            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link to={`/stations/edit/${station.id}`}>
                <Button variant="outline" icon={<Edit size={16} />}>
                  Edit
                </Button>
              </Link>
              <Button
                variant="danger"
                icon={<Trash2 size={16} />}
                onClick={handleOpenDialog}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-3">Station Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <div className="mt-1 flex items-start">
                      <MapPin size={18} className="text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <p className="text-base text-gray-900">{station.address}</p>
                        <p className="text-base text-gray-900">
                          {station.city}, {station.state} {station.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Coordinates</p>
                    <p className="mt-1 text-base text-gray-900">
                      {Number(station.latitude).toFixed(6)}, {Number(station.longitude).toFixed(6)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Power Output</p>
                    <div className="mt-1 flex items-center">
                      <Zap size={18} className="text-gray-400 mr-2" />
                      <p className="text-base text-gray-900">{station.powerOutput} kW</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <div className="mt-1 flex items-center">
                      <Clock size={18} className="text-gray-400 mr-2" />
                      <p className="text-base text-gray-900">{formatDate(station.lastUpdated)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Connector Types</h2>
                <div className="flex flex-wrap gap-2">
                  {station.connectorTypes.map((type) => (
                    <ConnectorBadge key={type} type={type} size="lg" />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <ChargingStationMap
                stations={[station]}
                height="300px"
                zoom={15}
                center={[Number(station.latitude), Number(station.longitude)]}
                standalone={false}
              />
            </div>
          </div>
        </div>
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete the station "{station.name}"? This action cannot be undone.
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
}

export default StationDetails;