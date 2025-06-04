import { createContext, useContext, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const defaultFilters = {
  status: [],
  connectorTypes: [],
  powerOutputMin: 0,
  powerOutputMax: 500,
  searchQuery: '',
};

const StationsContext = createContext(undefined);

export const StationsProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [viewMode, setViewMode] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch stations from backend
  const fetchStations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/stations/mongodb');
      if (!res.ok) throw new Error(`Failed to fetch stations: ${res.status}`);
      const data = await res.json();
      const parsedData = data.map(station => ({
        ...station,
        latitude: parseFloat(station.latitude),
        longitude: parseFloat(station.longitude),
        powerOutput: parseFloat(station.powerOutput),
      }));
      setStations(parsedData);
      console.log("Stations fetched successfully:", parsedData);
    } catch (error) {
      console.error('Failed to fetch stations:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch stations: ' + error.message,
        severity: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  const filteredStations = stations.filter((station) => {
    if (filters.status.length > 0 && !filters.status.includes(station.status)) {
      return false;
    }

    if (
      filters.connectorTypes.length > 0 &&
      !station.connectorTypes.some((connector) =>
        filters.connectorTypes.includes(connector)
      )
    ) {
      return false;
    }

    if (
      station.powerOutput < filters.powerOutputMin ||
      station.powerOutput > filters.powerOutputMax
    ) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        station.name.toLowerCase().includes(query) ||
        station.address.toLowerCase().includes(query) ||
        station.city.toLowerCase().includes(query) ||
        station.state.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const addStation = async (station) => {
    try {
      const res = await fetch('http://localhost:5000/api/stations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...station,
          latitude: parseFloat(station.latitude),
          longitude: parseFloat(station.longitude),
          powerOutput: parseFloat(station.powerOutput),
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to add station: ${errorData.error || res.status}`);
      }
      const newStation = await res.json();
      console.log("Station added successfully:", newStation);
      setSnackbar({
        open: true,
        message: `Station "${newStation.name}" added successfully!`,
        severity: 'success',
      });
      await fetchStations();
      return newStation;
    } catch (error) {
      console.error('Failed to add station:', error);
      setSnackbar({
        open: true,
        message: 'Failed to add station: ' + error.message,
        severity: 'error',
      });
      throw error;
    }
  };

  const updateStation = async (updatedStation) => {
    try {
      const { _id, ...stationWithoutId } = updatedStation;
      
      const res = await fetch(`http://localhost:5000/api/stations/${updatedStation.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...stationWithoutId,
          latitude: parseFloat(updatedStation.latitude),
          longitude: parseFloat(updatedStation.longitude),
          powerOutput: parseFloat(updatedStation.powerOutput),
          lastUpdated: new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to update station: ${errorData.error || res.status}`);
      }

      await fetchStations();
      setSnackbar({
        open: true,
        message: `Station "${updatedStation.name}" updated successfully!`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to update station:', error);
      setSnackbar({
        open: true,
        message: 'Failed to update station: ' + error.message,
        severity: 'error',
      });
      throw error;
    }
  };

  const deleteStation = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/stations/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Failed to delete station: ${errorData.error || res.status}`);
      }

      await fetchStations();
      setSnackbar({
        open: true,
        message: 'Station deleted successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Failed to delete station:', error);
      setSnackbar({
        open: true,
        message: 'Failed to delete station: ' + error.message,
        severity: 'error',
      });
      throw error;
    }
  };

  const getStationById = (id) => {
    return stations.find((station) => station.id === id);
  };

  const setSearchQuery = (query) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <StationsContext.Provider
      value={{
        stations,
        filteredStations,
        filters,
        setFilters,
        addStation,
        updateStation,
        deleteStation,
        getStationById,
        viewMode,
        setViewMode,
        fetchStations,
        isLoading,
        setSearchQuery,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '75%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StationsContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationsContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationsProvider');
  }
  return context;
};

export default StationsProvider;