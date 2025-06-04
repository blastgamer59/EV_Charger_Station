// ChargingStation model structure (for reference)
/*
  ChargingStation = {
    id: string,
    name: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    latitude: number,
    longitude: number,
    status: 'active' | 'inactive' | 'maintenance',
    powerOutput: number,
    connectorTypes: ['CCS1', 'CCS2', 'CHAdeMO', 'Type1', 'Type2', 'Tesla'],
    lastUpdated: string
  }
*/

// Allowed connector types
export const ConnectorTypes = [
  'CCS1',
  'CCS2',
  'CHAdeMO',
  'Type1',
  'Type2',
  'Tesla',
];

// StationFilters model structure (for reference)
/*
  StationFilters = {
    status: string[],
    connectorTypes: string[],
    powerOutputMin: number,
    powerOutputMax: number,
    searchQuery: string
  }
*/
