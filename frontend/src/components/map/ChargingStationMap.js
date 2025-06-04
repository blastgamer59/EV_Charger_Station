import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import StatusBadge from '../ui/StatusBadge';
import ConnectorBadge from '../ui/ConnectorBadge';
import Button from '../ui/Button';
import { Edit, ExternalLink } from 'lucide-react';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const ChargingStationMap = ({
  stations,
  height = '70vh',
  zoom = 10,
  center = [16.5062, 80.6480], // Default to Vijayawada, Andhra Pradesh
  standalone = true,
}) => {
  useEffect(() => {
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const getMarkerIcon = (status) => {
    const markerHtmlStyles = `
      background-color: ${status === 'active' ? '#10B981' : status === 'maintenance' ? '#F59E0B' : '#EF4444'};
      width: 2rem;
      height: 2rem;
      display: block;
      left: -1rem;
      top: -1rem;
      position: relative;
      border-radius: 2rem 2rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    `;

    return L.divIcon({
      className: 'my-custom-pin',
      iconAnchor: [0, 24],
      popupAnchor: [12, -36],
      html: `<span style="${markerHtmlStyles}" />`,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { // Changed to Indian locale
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-md ${standalone ? 'bg-white p-4' : ''}`}>
      {standalone && (
        <h2 className="text-xl font-semibold text-gray-800 mb-4">EV Charging Station Map</h2>
      )}

      <div style={{ height }} className="rounded-lg overflow-hidden">
        <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} className="z-0">
          <ChangeView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={getMarkerIcon(station.status)}
            >
              <Popup className="station-popup" minWidth={300} maxWidth={350}>
                <div className="p-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{station.name}</h3>
                  <StatusBadge status={station.status} className="mb-2" />

                  <div className="text-gray-600 mt-2 mb-2">
                    <p>{station.address}</p>
                    <p>{station.city}, {station.state} {station.zipCode}</p>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <span className="font-medium mr-2">Power:</span> {station.powerOutput} kW
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <span className="font-medium mr-2">Updated:</span> {formatDate(station.lastUpdated)}
                  </div>

                  <div className="mb-3">
                    <span className="font-medium text-sm text-gray-600 block mb-1">Connectors:</span>
                    <div className="flex flex-wrap gap-1">
                      {station.connectorTypes.map((type) => (
                        <ConnectorBadge key={type} type={type} size="sm" />
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Link to={`/stations/${station.id}`} className="flex-1">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        icon={<ExternalLink size={14} />}
                      >
                        Details
                      </Button>
                    </Link>
                    <Link to={`/stations/edit/${station.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        icon={<Edit size={14} />}
                      >
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ChargingStationMap;