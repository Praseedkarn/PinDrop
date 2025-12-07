// src/components/Map/CustomMarker.tsx
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Pin, PinStatus } from '../../types';  // Import PinStatus
import './CustomMarker.css';

interface CustomMarkerProps {
  pin: Pin;
  onClick: () => void;
  animate?: boolean;
}

// Create custom icon based on pin status
const createCustomIcon = (status: PinStatus) => {  // Change parameter type to PinStatus
  const colors = {
    visited: '#10b981',    // Green
    wishlist: '#f59e0b',   // Yellow/Orange
    favorite: '#ec4899'    // Pink - ADD THIS
  };
  
  const size = 24;
  const className = `custom-marker ${status}`;
  
  return L.divIcon({
    html: `
      <div class="${className}" style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${colors[status]};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
      ">
        ${status === 'visited' ? '✓' : status === 'favorite' ? '❤' : '☆'}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

// Format date for display
const formatDate = (dateString?: string) => {
  if (!dateString) return 'Not visited';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
};

export default function CustomMarker({ pin, onClick, animate = true }: CustomMarkerProps) {
  const icon = createCustomIcon(pin.status);
  
  return (
    <Marker
      position={[pin.lat, pin.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup className={animate ? 'animated-popup' : ''}>
        <div className="pin-popup">
          <div className="popup-header">
            <div className="popup-status">
              <span className={`status-badge ${pin.status}`}>
                {pin.status === 'visited' ? '✅ Visited' : 
                 pin.status === 'favorite' ? '❤️ Favorite' : '⭐ Wishlist'}
              </span>
            </div>
            <h3 className="popup-title">{pin.name}</h3>
          </div>
          
          <div className="popup-body">
            <p className="popup-location">
              📍 {pin.city && `${pin.city}, `}{pin.country}
            </p>
            
            {pin.notes && (
              <p className="popup-notes">
                📝 {pin.notes}
              </p>
            )}
            
            {pin.date && (
              <p className="popup-date">
                📅 {formatDate(pin.date)}
              </p>
            )}
            
            {pin.rating && (
              <div className="popup-rating">
                ⭐ {'★'.repeat(Math.floor(pin.rating))}
                {'☆'.repeat(5 - Math.floor(pin.rating))}
                <span className="rating-text">({pin.rating}/5)</span>
              </div>
            )}
          </div>
          
          <div className="popup-footer">
            <small className="popup-id">ID: {pin.id.substring(0, 8)}...</small>
            <small className="popup-updated">
              Updated: {new Date(pin.updatedAt).toLocaleDateString()}
            </small>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}