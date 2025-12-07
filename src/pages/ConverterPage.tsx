// src/pages/ConverterPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CoordinateConverter from '../components/Tools/CoordinateConverter';
import ConverterMap from '../components/Tools/ConverterMap';
import './ConverterPage.css';

interface LocationResult {
  lat: string;
  lon: string;
  display_name: string;
}

export default function ConverterPage() {
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationSelect = (loc: LocationResult) => {
    setLocation(loc);
  };

  return (
    <div className="converter-page">
      <div className="converter-header">
        <Link to="/" className="back-button">
          ← Back to Map
        </Link>
        <h1 className="page-title">🌍 Coordinate Converter</h1>
        <p className="page-subtitle">
          Convert between coordinates and addresses. Search for a location or enter coordinates directly.
        </p>
      </div>

      <div className="converter-grid">
        <div className="converter-side">
          <div className="tool-card">
            <h2 className="tool-title">📍 Coordinate Search</h2>
            
          </div>

          <div className="instructions-card">
            <h3 className="instructions-title">How to Use</h3>
            <ul className="instructions-list">
              <li>🔍 <strong>Search by address:</strong> Enter a place name (e.g., "Eiffel Tower")</li>
              <li>📏 <strong>Search by coordinates:</strong> Enter lat/lng (e.g., "48.8584, 2.2945")</li>
              <li>🗺️ <strong>Click on map</strong> to select coordinates</li>
              <li>📋 <strong>Copy coordinates</strong> with the copy button</li>
              <li>📍 <strong>Add to pins</strong> by saving to your collection</li>
            </ul>
          </div>

          {location && (
            <div className="results-card">
              <h3 className="results-title">Selected Location</h3>
              <div className="location-details">
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{location.display_name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Latitude:</span>
                  <span className="detail-value coordinate">{location.lat}°</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Longitude:</span>
                  <span className="detail-value coordinate">{location.lon}°</span>
                </div>
                <div className="action-buttons">
                  <button 
                    className="btn-copy"
                    onClick={() => navigator.clipboard.writeText(`${location.lat}, ${location.lon}`)}
                  >
                    📋 Copy Coordinates
                  </button>
                  <button className="btn-save">
                    ➕ Add to Pins
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="map-side">
          <div className="map-card">
            <ConverterMap 
              location={location}
              searchQuery={searchQuery}
            />
          </div>

          <div className="coordinate-formats">
            <h3 className="formats-title">Coordinate Formats</h3>
            <div className="formats-grid">
              <div className="format-item">
                <div className="format-name">Decimal Degrees</div>
                <div className="format-example">48.8584, 2.2945</div>
              </div>
              <div className="format-item">
                <div className="format-name">Degrees Minutes</div>
                <div className="format-example">48°51'30"N, 2°17'40"E</div>
              </div>
              <div className="format-item">
                <div className="format-name">Degrees Minutes Seconds</div>
                <div className="format-example">48°51'30.24"N, 2°17'40.2"E</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="converter-footer">
        <div className="footer-note">
          <strong>Note:</strong> Uses OpenStreetMap Nominatim API for geocoding. Rate limit: 1 request per second.
        </div>
      </div>
    </div>
  );
}