// src/components/Tools/ResultsList.tsx
import './ResultsList.css';

interface LocationResult {
  lat: string;
  lon: string;
  display_name: string;
  type: string;
  importance: number;
}

interface ResultsListProps {
  results: LocationResult[];
  selectedLocation: LocationResult | null;
  onSelect: (location: LocationResult) => void;
  onCopy: (lat: string, lon: string) => void;
  onUseInPinDrop: (lat: string, lon: string, name: string) => void;
}

export default function ResultsList({ 
  results, 
  selectedLocation, 
  onSelect, 
  onCopy,
  onUseInPinDrop 
}: ResultsListProps) {
  
  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'town': return '🏘️';
      case 'village': return '🏡';
      case 'administrative': return '🏛️';
      case 'landmark': return '🏛️';
      case 'tourism': return '🏨';
      case 'railway': return '🚆';
      case 'airport': return '✈️';
      case 'water': return '🌊';
      case 'mountain': return '⛰️';
      default: return '📍';
    }
  };

  const formatDisplayName = (name: string) => {
    // Truncate long names
    if (name.length > 60) {
      return name.substring(0, 57) + '...';
    }
    return name;
  };

  return (
    <div className="results-list">
      <div className="results-header">
        <h3>📍 Search Results ({results.length})</h3>
        <p className="results-subtitle">Click on a result to view on map</p>
      </div>

      <div className="results-container">
        {results.map((result, index) => (
          <div 
            key={index}
            className={`result-item ${selectedLocation === result ? 'selected' : ''}`}
            onClick={() => onSelect(result)}
          >
            <div className="result-icon">
              {getLocationTypeIcon(result.type)}
            </div>
            <div className="result-content">
              <h4 className="result-name">
                {formatDisplayName(result.display_name)}
              </h4>
              <div className="result-details">
                <span className="result-type">{result.type}</span>
                <span className="result-coordinates">
                  {parseFloat(result.lat).toFixed(6)}, {parseFloat(result.lon).toFixed(6)}
                </span>
              </div>
            </div>
            <div className="result-actions">
              <button 
                className="action-btn copy-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy(result.lat, result.lon);
                }}
                title="Copy coordinates"
              >
                📋
              </button>
              <button 
                className="action-btn use-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onUseInPinDrop(result.lat, result.lon, result.display_name);
                }}
                title="Use in PinDrop"
              >
                📍
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}