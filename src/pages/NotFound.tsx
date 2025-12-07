// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-code">
          <span className="error-number">4</span>
          <span className="error-icon">🗺️</span>
          <span className="error-number">4</span>
        </div>
        
        <h1 className="error-title">Page Not Found</h1>
        
        <p className="error-message">
          Oops! The map doesn't have this location plotted yet.
        </p>
        
        <div className="suggestions">
          <h3>Here are some places you might be looking for:</h3>
          <div className="suggestion-links">
            <Link to="/" className="suggestion-link">
              🏠 Home Page
            </Link>
            <Link to="/converter" className="suggestion-link">
              🔍 Coordinate Converter
            </Link>
            <button 
              className="suggestion-link"
              onClick={() => window.history.back()}
            >
              ↩️ Go Back
            </button>
          </div>
        </div>
        
        <div className="search-tips">
          <h4>📍 Lost? Try these:</h4>
          <ul>
            <li>Check the URL for typos</li>
            <li>Use the navigation menu above</li>
            <li>Return to the main map</li>
            <li>Or explore the coordinate converter</li>
          </ul>
        </div>
        
        <div className="action-buttons">
          <Link to="/" className="btn-primary">
            🗺️ Back to Map
          </Link>
          <Link to="/converter" className="btn-secondary">
            🔍 Find Coordinates
          </Link>
        </div>
        
        <div className="fun-fact">
          <p>
            <strong>Fun Fact:</strong> The 404 error got its name from 
            Room 404 at CERN where the first web server was located.
          </p>
        </div>
      </div>
    </div>
  );
}