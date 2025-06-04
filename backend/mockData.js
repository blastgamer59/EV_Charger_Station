// --- City Configurations ---
const cityConfigurations = {
  tenali: {
    name: 'Tenali',
    state: 'Andhra Pradesh',
    lat: 16.2430,
    lng: 80.6500,
    pinCodes: ['522202', '522201'],
    areas: [
      // Center (15)
      { name: 'Main Bazaar', lat: 16.2435, lng: 80.6505, range: 0.008, type: 'center' },
      { name: 'Bus Stand Area', lat: 16.2425, lng: 80.6495, range: 0.008, type: 'center' },
      { name: 'Railway Station', lat: 16.2440, lng: 80.6510, range: 0.008, type: 'center' },
      { name: 'City Center', lat: 16.2430, lng: 80.6500, range: 0.010, type: 'center' },
      { name: 'Commercial Area', lat: 16.2420, lng: 80.6485, range: 0.008, type: 'center' },
      { name: 'Residential Hub', lat: 16.2445, lng: 80.6520, range: 0.008, type: 'center' },
      { name: 'Gandhi Chowk', lat: 16.2410, lng: 80.6470, range: 0.008, type: 'center' },
      { name: 'Market Road', lat: 16.2450, lng: 80.6490, range: 0.008, type: 'center' },
      { name: 'Subramanyam Street', lat: 16.2427, lng: 80.6530, range: 0.008, type: 'center' },
      { name: 'Ramalingeswara Pet', lat: 16.2438, lng: 80.6468, range: 0.008, type: 'center' },
      { name: 'Kothapet', lat: 16.2449, lng: 80.6455, range: 0.008, type: 'center' },
      { name: 'Nehru Nagar', lat: 16.2462, lng: 80.6513, range: 0.008, type: 'center' },
      { name: 'Ramakrishna Colony', lat: 16.2471, lng: 80.6502, range: 0.008, type: 'center' },
      { name: 'Pattabhipuram', lat: 16.2433, lng: 80.6473, range: 0.008, type: 'center' },
      { name: 'Kalyana Mandapam Area', lat: 16.2418, lng: 80.6541, range: 0.008, type: 'center' },
      // Outskirts (5)
      { name: 'Kolakaluru Road', lat: 16.2350, lng: 80.6700, range: 0.020, type: 'outskirt' },
      { name: 'Angalakuduru', lat: 16.2500, lng: 80.6200, range: 0.020, type: 'outskirt' },
      { name: 'Nelapadu Road', lat: 16.2600, lng: 80.6400, range: 0.020, type: 'outskirt' },
      { name: 'Vinjanampadu', lat: 16.2250, lng: 80.6600, range: 0.020, type: 'outskirt' },
      { name: 'Kollipara', lat: 16.2200, lng: 80.6800, range: 0.020, type: 'outskirt' }
    ]
  },
  vijayawada: {
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    lat: 16.5062,
    lng: 80.6480,
    pinCodes: ['520001', '520002', '520003', '520004', '520010', '520011', '520012'],
    areas: [
      // Center (15)
      { name: 'MG Road', lat: 16.5067, lng: 80.6485, range: 0.008, type: 'center' },
      { name: 'Governorpet', lat: 16.5055, lng: 80.6470, range: 0.008, type: 'center' },
      { name: 'One Town', lat: 16.5070, lng: 80.6495, range: 0.008, type: 'center' },
      { name: 'Labbipet', lat: 16.5042, lng: 80.6455, range: 0.008, type: 'center' },
      { name: 'Benz Circle', lat: 16.5085, lng: 80.6520, range: 0.008, type: 'center' },
      { name: 'Patamata', lat: 16.5025, lng: 80.6440, range: 0.008, type: 'center' },
      { name: 'Suryaraopet', lat: 16.5080, lng: 80.6475, range: 0.008, type: 'center' },
      { name: 'Mallikarjunapeta', lat: 16.5050, lng: 80.6510, range: 0.008, type: 'center' },
      { name: 'Kummaripalem', lat: 16.5095, lng: 80.6460, range: 0.008, type: 'center' },
      { name: 'Ramavarapadu', lat: 16.5030, lng: 80.6525, range: 0.008, type: 'center' },
      { name: 'Gunadala', lat: 16.5100, lng: 80.6490, range: 0.008, type: 'center' },
      { name: 'Krishna Lanka', lat: 16.5015, lng: 80.6500, range: 0.008, type: 'center' },
      { name: 'Vijayawada Junction', lat: 16.5072, lng: 80.6441, range: 0.008, type: 'center' },
      { name: 'Pandit Nehru Bus Station', lat: 16.5060, lng: 80.6520, range: 0.008, type: 'center' },
      { name: 'Bandar Road', lat: 16.5045, lng: 80.6435, range: 0.008, type: 'center' },
      // Outskirts (5)
      { name: 'Gannavaram Road', lat: 16.4900, lng: 80.6200, range: 0.025, type: 'outskirt' },
      { name: 'Machilipatnam Road', lat: 16.4800, lng: 80.6700, range: 0.025, type: 'outskirt' },
      { name: 'Guntur Road', lat: 16.4700, lng: 80.6300, range: 0.025, type: 'outskirt' },
      { name: 'Hanuman Junction', lat: 16.5300, lng: 80.6100, range: 0.025, type: 'outskirt' },
      { name: 'Nunna', lat: 16.5400, lng: 80.6800, range: 0.025, type: 'outskirt' }
    ]
  },
  guntur: {
    name: 'Guntur',
    state: 'Andhra Pradesh',
    lat: 16.3067,
    lng: 80.4365,
    pinCodes: ['522001', '522002', '522003', '522004', '522006', '522007', '522510'],
    areas: [
      // Center (15)
      { name: 'Arundelpet', lat: 16.3072, lng: 80.4370, range: 0.008, type: 'center' },
      { name: 'Brodipet', lat: 16.3060, lng: 80.4355, range: 0.008, type: 'center' },
      { name: 'Kothapet', lat: 16.3055, lng: 80.4380, range: 0.008, type: 'center' },
      { name: 'Naaz Area', lat: 16.3085, lng: 80.4350, range: 0.008, type: 'center' },
      { name: 'Lakshmipuram', lat: 16.3040, lng: 80.4340, range: 0.008, type: 'center' },
      { name: 'Syamala Nagar', lat: 16.3090, lng: 80.4385, range: 0.008, type: 'center' },
      { name: 'Chuttugunta', lat: 16.3025, lng: 80.4395, range: 0.008, type: 'center' },
      { name: 'Collector Office Area', lat: 16.3075, lng: 80.4320, range: 0.008, type: 'center' },
      { name: 'Government Hospital', lat: 16.3050, lng: 80.4410, range: 0.008, type: 'center' },
      { name: 'Guntur Medical College', lat: 16.3100, lng: 80.4400, range: 0.008, type: 'center' },
      { name: 'Bus Stand Area', lat: 16.3065, lng: 80.4365, range: 0.008, type: 'center' },
      { name: 'Railway Station', lat: 16.3020, lng: 80.4350, range: 0.008, type: 'center' },
      { name: 'Donka Road', lat: 16.3080, lng: 80.4430, range: 0.008, type: 'center' },
      { name: 'Pattabhipuram', lat: 16.3035, lng: 80.4425, range: 0.008, type: 'center' },
      { name: 'Pandaripuram', lat: 16.3095, lng: 80.4365, range: 0.008, type: 'center' },
      // Outskirts (5)
      { name: 'Amaravathi Road', lat: 16.2800, lng: 80.4000, range: 0.025, type: 'outskirt' },
      { name: 'Vijayawada Road', lat: 16.2900, lng: 80.4600, range: 0.025, type: 'outskirt' },
      { name: 'Tenali Road', lat: 16.3300, lng: 80.4700, range: 0.025, type: 'outskirt' },
      { name: 'Mangalagiri Road', lat: 16.3400, lng: 80.4200, range: 0.025, type: 'outskirt' },
      { name: 'Pedakakani', lat: 16.2700, lng: 80.4500, range: 0.025, type: 'outskirt' }
    ]
  }
};

const connectorTypes = ['CCS1', 'CCS2', 'CHAdeMO', 'Type1', 'Type2', 'Tesla'];

const streetNamesByCity = {
  tenali: ['Main Road', 'Gandhi Road', 'Nehru Street', 'Bus Stand Road', 'Railway Station Road'],
  vijayawada: ['MG Road', 'Bandar Road', 'Eluru Road', 'Machilipatnam Road', 'Gandhi Nagar', 'Ring Road'],
  guntur: ['Trunk Road', 'Collectorate Road', 'Kothapet Main Road', 'Arundelpet Road', 'Hospital Road', 'Station Road']
};

const stationNamesByCity = {
  tenali: ['Tenali EV Hub', 'Tenali Fast Charge', 'Central Tenali Charging'],
  vijayawada: ['Vijayawada Power Station', 'Krishna EV Hub', 'Vijayawada Central Charging', 'Benz Circle EV Point'],
  guntur: ['Guntur EV Center', 'Guntur Fast Charge', 'Amaravathi Road Charging', 'Central Guntur EV Hub']
};

// --- Helper Functions ---
const generateCoordinatesForCity = (cityName) => {
  const cityConfig = cityConfigurations[cityName];
  const areas = cityConfig.areas;
  const randomArea = areas[Math.floor(Math.random() * areas.length)];
  const lat = randomArea.lat + (Math.random() - 0.5) * randomArea.range;
  const lng = randomArea.lng + (Math.random() - 0.5) * randomArea.range;
  return { lat, lng, area: randomArea.name, areaType: randomArea.type };
};

const generateRecentDate = () => {
  const now = new Date();
  now.setDate(now.getDate() - Math.floor(Math.random() * 30));
  return now.toISOString();
};

const generateStationForCity = (id, cityName) => {
  const cityConfig = cityConfigurations[cityName];
  const { lat, lng, area, areaType } = generateCoordinatesForCity(cityName);
  const streetName = streetNamesByCity[cityName][Math.floor(Math.random() * streetNamesByCity[cityName].length)];
  const stationName = stationNamesByCity[cityName][Math.floor(Math.random() * stationNamesByCity[cityName].length)];
  const streetNumber = areaType === 'outskirt' ? Math.floor(Math.random() * 500) + 100 : Math.floor(Math.random() * 200) + 1;
  const pin = cityConfig.pinCodes[Math.floor(Math.random() * cityConfig.pinCodes.length)];
  const connectors = [...new Set(Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
    connectorTypes[Math.floor(Math.random() * connectorTypes.length)]
  ))];
  const statuses = ['active', 'active', 'inactive', 'maintenance'];
  const powerOutputs = areaType === 'outskirt' ? [120, 150, 180, 240, 300] : [22, 50, 60, 120, 150];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const powerOutput = powerOutputs[Math.floor(Math.random() * powerOutputs.length)];
  const operatingHours = areaType === 'outskirt' ? '24/7' : '6:00 AM - 11:00 PM';

  return {
    id: `${cityName}-station-${id}`,
    name: stationName,
    address: `${streetNumber}, ${streetName}`,
    city: cityConfig.name,
    state: cityConfig.state,
    zipCode: pin,
    latitude: lat,
    longitude: lng,
    status,
    powerOutput,
    connectorTypes: connectors,
    lastUpdated: generateRecentDate(),
    area,
    areaType,
    operatingHours,
    pricing: `₹${Math.floor(Math.random() * 3) + 8}/kWh`,
    amenities: ['Parking', 'ATM'],
    landmark: `Near ${area}`,
    parkingSpaces: areaType === 'outskirt' ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 8) + 2,
    contactNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`
  };
};

const generateStationsForCity = (cityName, centerCount, outskirtCount) => {
  const stations = [];
  let centerStations = 0, outskirtStations = 0;
  let id = 1;

  while (centerStations < centerCount || outskirtStations < outskirtCount) {
    const { areaType } = generateCoordinatesForCity(cityName);
    if (areaType === 'center' && centerStations < centerCount) {
      stations.push(generateStationForCity(id++, cityName));
      centerStations++;
    } else if (areaType === 'outskirt' && outskirtStations < outskirtCount) {
      stations.push(generateStationForCity(id++, cityName));
      outskirtStations++;
    }
  }
  return stations;
};

const generateAllStations = () => {
  const allStations = [];
  
  // Define station counts per city
  const stationCounts = {
    tenali: { center: 15, outskirt: 5 },
    vijayawada: { center: 7, outskirt: 3 },
    guntur: { center: 7, outskirt: 3 }
  };

  // Generate stations for each city
  Object.keys(cityConfigurations).forEach(cityName => {
    const { center, outskirt } = stationCounts[cityName];
    const cityStations = generateStationsForCity(cityName, center, outskirt);
    allStations.push(...cityStations);
  });

  return allStations;
};

const mockStations = generateAllStations();

const mockStatistics = {
  totalStations: mockStations.length,
  activeStations: mockStations.filter(s => s.status === 'active').length,
  inactiveStations: mockStations.filter(s => s.status === 'inactive').length,
  maintenanceStations: mockStations.filter(s => s.status === 'maintenance').length,
  averagePowerOutput: Math.round(mockStations.reduce((sum, s) => sum + s.powerOutput, 0) / mockStations.length),
  totalCapacity: mockStations.reduce((sum, s) => sum + s.powerOutput, 0),
  citiesServed: Object.keys(cityConfigurations).length,
  totalParkingSpaces: mockStations.reduce((sum, s) => sum + s.parkingSpaces, 0),
  centerStations: mockStations.filter(s => s.areaType === 'center').length,
  outskirtStations: mockStations.filter(s => s.areaType === 'outskirt').length,
  stationsByCity: Object.keys(cityConfigurations).reduce((acc, city) => {
    acc[city] = mockStations.filter(s => s.city === cityConfigurations[city].name).length;
    return acc;
  }, {})
};

// Calculate center point for map view
const calculateMapCenter = () => {
  const cities = Object.values(cityConfigurations);
  const avgLat = cities.reduce((sum, city) => sum + city.lat, 0) / cities.length;
  const avgLng = cities.reduce((sum, city) => sum + city.lng, 0) / cities.length;
  return [avgLat, avgLng];
};

// --- Export for Node.js ---
module.exports = {
  mockStations,
  mockStatistics,
  mapCenter: calculateMapCenter(),
  mapZoom: 10,
  supportedCities: cityConfigurations,
  availableConnectorTypes: connectorTypes
};