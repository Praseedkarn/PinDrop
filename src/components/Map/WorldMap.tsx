// src/components/Map/WorldMap.tsx
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { Pin } from '../../types';
import CustomMarker from './CustomMarker';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

interface WorldMapProps {
  pins: Pin[];
  onPinClick: (pin: Pin) => void;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  settings?: {
    mapTheme?: string;
    pinAnimation?: boolean;
  };
  mapClickMode: boolean; // Add this prop
}

// Map click handler component - Only active when mapClickMode is true
function MapClickHandler({ 
  onClick, 
  enabled 
}: { 
  onClick: (latlng: { lat: number; lng: number }) => void;
  enabled: boolean;
}) {
  const map = useMap();
  
  useMapEvents({
    click: (e:any) => {
      if (!enabled) return; // Only handle clicks when enabled
      
      const { lat, lng } = e.latlng;
      
      // Prevent default behavior
      e.originalEvent.preventDefault();
      e.originalEvent.stopPropagation();
      
      // Call the click handler
      onClick({ lat, lng });
      
      // Provide visual feedback
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'temporary-marker',
          html: '📍',
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })
      }).addTo(map);
      
      // Remove temporary marker after 1 second
      setTimeout(() => {
        marker.remove();
      }, 1000);
    },
  });
  
  // Add/remove cursor style based on mode
  useEffect(() => {
    if (enabled) {
      map.getContainer().style.cursor = 'crosshair';
    } else {
      map.getContainer().style.cursor = 'grab';
    }
    
    return () => {
      map.getContainer().style.cursor = 'grab';
    };
  }, [enabled, map]);
  
  return null;
}

// Map theme configurations
const mapThemes: Record<string, string> = {
  standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  topographic: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};

const mapAttributions: Record<string, string> = {
  standard: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  topographic: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  default: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
};

export default function WorldMap({ 
  pins, 
  onPinClick, 
  onMapClick, 
  settings,
  mapClickMode // New prop
}: WorldMapProps) {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;
  
  const theme = settings?.mapTheme || 'standard';
  const tileUrl = mapThemes[theme] || mapThemes.standard;
  const attribution = mapAttributions[theme] || mapAttributions.standard;

  return (
    <div className="map-container">
      {mapClickMode && (
        <div className="map-click-mode-indicator">
          <div className="click-mode-content">
            <span className="blinking-dot"></span>
            <span className="click-mode-text">
              Click anywhere on the map to set coordinates
            </span>
            <span className="click-mode-hint">(Click will be captured)</span>
          </div>
        </div>
      )}
      
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="world-map"
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={tileUrl}
          attribution={attribution}
        />
        
        {pins.map(pin => (
          <CustomMarker
            key={pin.id}
            pin={pin}
            onClick={() => onPinClick(pin)}
            animate={settings?.pinAnimation ?? true}
          />
        ))}
        
        {/* Only enable map clicks when mapClickMode is true */}
        <MapClickHandler 
          onClick={onMapClick} 
          enabled={mapClickMode} 
        />
      </MapContainer>
    </div>
  );
}