// src/components/Tools/CoordinateConverter.tsx
import { useState } from 'react';
import './CoordinateConverter.css';

interface LocationResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface CoordinateConverterProps {
  onSearch: (query: string) => void;
  onLocationSelect: (location: LocationResult) => void;
}

export default function CoordinateConverter({ onSearch, onLocationSelect }: CoordinateConverterProps) {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<LocationResult[]>([]);

  const searchLocation = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    onSearch(query);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchLocation();
  };

  const handleResultClick = (result: LocationResult) => {
    onLocationSelect(result);
    setResults([]);
    setQuery(result.display_name);
  };

  return (
    <div className="coordinate-converter">
      <form onSubmit={handleSubmit} className="converter-form">
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter address or coordinates (e.g., Paris or 48.8584, 2.2945)"
            className="search-input"
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? '🔍 Searching...' : '🔍 Search'}
          </button>
        </div>
        
        <div className="quick-coordinates">
          <div className="quick-title">Quick coordinates:</div>
          <div className="quick-buttons">
            {[
              { label: '🗽 NYC', coords: '40.7128, -74.0060' },
              { label: '🗼 Paris', coords: '48.8566, 2.3522' },
              { label: '🏯 Tokyo', coords: '35.6762, 139.6503' },
              { label: '🏖️ Sydney', coords: '-33.8688, 151.2093' }
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="quick-button"
                onClick={() => {
                  setQuery(item.coords);
                  searchLocation();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      {results.length > 0 && (
        <div className="search-results">
          <div className="results-title">Search Results:</div>
          <div className="results-list">
            {results.map((result, index) => (
              <div
                key={index}
                className="result-item"
                onClick={() => handleResultClick(result)}
              >
                <div className="result-name">{result.display_name}</div>
                <div className="result-coords">
                  📍 {parseFloat(result.lat).toFixed(6)}, {parseFloat(result.lon).toFixed(6)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <div>Searching for locations...</div>
        </div>
      )}
    </div>
  );
}