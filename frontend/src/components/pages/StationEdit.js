import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStations } from '../context/StationsContext';
import StationForm from '../stations/StationForm';
import Button from '../ui/Button';
import { ArrowLeft } from 'lucide-react';

const StationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStationById, updateStation } = useStations();

  const station = id ? getStationById(id) : null;

const handleSubmit = async (updatedStation) => {
  try {
    await updateStation(updatedStation);
    navigate(`/stations/${id}`);
  } catch (error) {
    if (error.message.includes("Station not found")) {
      navigate('/stations', {
        state: { error: 'The station you are trying to edit does not exist.' },
      });
    }
    console.error('Error in StationEdit handleSubmit:', error);
  }
};

  const handleCancel = () => {
    navigate(`/stations/${id}`);
  };

  if (!station) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Station Not Found</h1>
          <p className="text-gray-500 mb-6">The charging station you are trying to edit does not exist or has been removed.</p>
          <Button 
            variant="primary" 
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/stations')}
          >
            Back to Stations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Charging Station</h1>
      <StationForm 
        station={station}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default StationEdit;
