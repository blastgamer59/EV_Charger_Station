import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStations } from '../context/StationsContext';
import StationForm from '../stations/StationForm';

const StationAdd = () => {
  const navigate = useNavigate();
  const { addStation } = useStations();

  const handleSubmit = async (station) => {
    try {
      await addStation(station);
      navigate('/stations');
    } catch (error) {
      console.error('Error adding station:', error);
      alert(`Failed to add station: ${error.message}`);
    }
  };

  const handleCancel = () => {
    navigate('/stations');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Charging Station</h1>
      
      <StationForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default StationAdd;