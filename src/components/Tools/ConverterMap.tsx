// src/components/Tools/ConverterMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ConverterMap.css';

interface LocationResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface ConverterMapProps {
  location: LocationResult | null;
  searchQuery: string;
}

// Custom marker icon
const createMarkerIcon = () => {
  return L.divIcon({
    html: `
      <div class="custom-marker">
        <div class="marker-pin"></div>
        <div class="marker-dot"></div>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
};

export default function ConverterMap({ location, searchQuery }: ConverterMapProps) {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;
  
  const markerPosition = location 
    ? [parseFloat(location.lat), parseFloat(location.lon)] as [number, number]
    : null;

  // Determine center - use marker position if available, otherwise use default
  const center = markerPosition || defaultCenter;
  const zoom = markerPosition ? 13 : defaultZoom;

  return (
    <div className="converter-map">
      <div className="map-header">
        <h3>🗺️ Location Preview</h3>
        <p className="map-subtitle">
          {location ? `Showing: ${location.display_name}` : 'Select a location to view on map'}
        </p>
      </div>
      
      <div className="map-container">
        <MapContainer 
          center={center} 
          zoom={zoom} 
          style={{ height: '400px', width: '100%' }}
          className="leaflet-container"
        >
          <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
/>
          
          {markerPosition && (
            <Marker position={markerPosition}>
              <Popup>
                Selected location: <br />
                {markerPosition[0].toFixed(6)}, {markerPosition[1].toFixed(6)}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      
      {!location && searchQuery && (
        <div className="map-placeholder">
          <div className="placeholder-icon">🔍</div>
          <p>Search for a location to see it on the map</p>
        </div>
      )}
    </div>
  );
}