import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Fix default marker icon for webpack builds
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  // Hardcode the coordinates obtained from the Nominatim details page
  const position = [51.888733, 4.483876]; // update with the exact values if they differ

  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      className="custom-map"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={position}>
        <Popup>Keizerstraat 160, 3011 GH Rotterdam</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
