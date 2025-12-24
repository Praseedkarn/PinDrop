// src/components/Map/WorldMap.tsx - UPDATED
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
  mapClickMode: boolean;
}

// Map click handler component
function MapClickHandler({ 
  onClick, 
  enabled 
}: { 
  onClick: (latlng: { lat: number; lng: number }) => void;
  enabled: boolean;
}) {
  const map = useMap();
  
  useMapEvents({
    click: (e: any) => {
      if (!enabled) return;
      
      const { lat, lng } = e.latlng;
      
      e.originalEvent.preventDefault();
      e.originalEvent.stopPropagation();
      
      onClick({ lat, lng });
      
      const marker = L.marker([lat, lng], {
        icon: L.divIcon({
          className: 'temporary-marker',
          html: '📍',
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })
      }).addTo(map);
      
      setTimeout(() => {
        marker.remove();
      }, 1000);
    },
  });
  
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

// Map theme configurations - UPDATED
const mapThemes: Record<string, string> = {
  standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  topographic: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  light: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // Added light theme
};

const mapAttributions: Record<string, string> = {
  standard: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  satellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  topographic: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  light: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
};

// Custom TileLayer component that updates when theme changes
function ThemeTileLayer({ theme }: { theme: string }) {
  const tileUrl = mapThemes[theme] || mapThemes.standard;
  const attribution = mapAttributions[theme] || mapAttributions.standard;
  
  return (
    <TileLayer
      url={tileUrl}
      attribution={attribution}
      key={theme} // Key forces re-render when theme changes
    />
  );
}

export default function WorldMap({ 
  pins, 
  onPinClick, 
  onMapClick, 
  settings,
  mapClickMode
}: WorldMapProps) {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;
  const [mapKey, setMapKey] = useState(0); // Add key to force map refresh

  // Force map refresh when theme changes
  useEffect(() => {
    if (settings?.mapTheme) {
      setMapKey(prev => prev + 1);
    }
  }, [settings?.mapTheme]);

  const theme = settings?.mapTheme || 'standard';

  return (
    <div className="map-container">
      
      
      <MapContainer
        key={mapKey} // Force re-render on theme change
        center={defaultCenter}
        zoom={defaultZoom}
        className="world-map"
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Use custom ThemeTileLayer component */}
        <ThemeTileLayer theme={theme} />
        
        {pins.map(pin => (
          <CustomMarker
            key={pin.id}
            pin={pin}
            onClick={() => onPinClick(pin)}
            animate={settings?.pinAnimation ?? true}
          />
        ))}
        
        <MapClickHandler 
          onClick={onMapClick} 
          enabled={mapClickMode} 
        />
      </MapContainer>
    </div>
  );
}