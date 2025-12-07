// src/components/UI/Header.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Settings from './Settings';
import FeaturesGuide from './FeaturesGuide';
import PrivacyPolicy from './PrivacyPolicy';
import './Header.css';
import { AppSettings } from '../../types';

interface HeaderProps {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  viewMode: 'map' | 'list';
  onViewModeChange: (mode: 'map' | 'list') => void;
  onSettingsChange?: (newSettings: AppSettings) => void; // Fixed: Added optional prop
  currentSettings?: AppSettings; // Fixed: Added optional prop
}

export default function Header({ 
  onExport, 
  onImport, 
  viewMode, 
  onViewModeChange,
  onSettingsChange,
  currentSettings 
}: HeaderProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const location = useLocation();
  
  const handleImportClick = () => {
    document.getElementById('file-import')?.click();
  };

  const isConverterPage = location.pathname === '/converter';

  // Check if we're on the main page to show navigation
  const isMainPage = location.pathname === '/' || location.pathname === '';

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-icon">📍</span>
              <div className="logo-text-container">
                <h1 className="logo-text">PinDrop</h1>
                <span className="logo-subtitle"></span>
              </div>
            </Link>
          </div>
          
          {isMainPage && (
            <nav className="nav-links">
              <Link to="/converter" className="nav-link">
                <span className="nav-icon">🔄</span>
                <span className="nav-text">Coordinate Converter</span>
              </Link>
              <button 
                className="nav-link"
                onClick={() => setShowFeatures(true)}
                aria-label="View features"
              >
                <span className="nav-icon">✨</span>
                <span className="nav-text">Features</span>
              </button>
              <button 
                className="nav-link"
                onClick={() => setShowFeatures(true)}
                aria-label="View guide"
              >
                <span className="nav-icon">📖</span>
                <span className="nav-text">Guide</span>
              </button>
              <button 
                className="nav-link"
                onClick={() => setShowPrivacy(true)}
                aria-label="View privacy policy"
              >
                <span className="nav-icon">🔒</span>
                <span className="nav-text">Privacy</span>
              </button>
            </nav>
          )}
        </div>

        {isMainPage && (
          <div className="header-center">
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => onViewModeChange('map')}
                aria-label="Switch to map view"
                aria-pressed={viewMode === 'map'}
              >
                <span className="toggle-icon">🗺️</span>
                <span className="toggle-text">Map View</span>
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => onViewModeChange('list')}
                aria-label="Switch to list view"
                aria-pressed={viewMode === 'list'}
              >
                <span className="toggle-icon">📋</span>
                <span className="toggle-text">List View</span>
              </button>
            </div>
          </div>
        )}

        <div className="header-right">
          <div className="header-actions">
            {isMainPage && (
              <>
                <button 
                  className="action-btn"
                  onClick={handleImportClick}
                  title="Import data from JSON file"
                  aria-label="Import data"
                >
                  <span className="action-icon">📥</span>
                  <span className="action-label">Import</span>
                </button>
                
                <input
                  id="file-import"
                  type="file"
                  accept=".json,.geojson"
                  onChange={onImport}
                  style={{ display: 'none' }}
                  aria-label="File import"
                />

                <button 
                  className="action-btn"
                  onClick={onExport}
                  title="Export data as JSON file"
                  aria-label="Export data"
                >
                  <span className="action-icon">📤</span>
                  <span className="action-label">Export</span>
                </button>
              </>
            )}

            <button 
              className="action-btn"
              onClick={() => setShowSettings(true)}
              title="Open settings"
              aria-label="Open settings"
            >
              <span className="action-icon">⚙️</span>
              <span className="action-label">Settings</span>
            </button>

            {isMainPage && (
              <button 
                className="action-btn help-btn"
                onClick={() => setShowFeatures(true)}
                title="Get help and view guide"
                aria-label="Open help"
              >
                <span className="action-icon">❓</span>
                <span className="action-label">Help</span>
              </button>
            )}

            {/* Optional: Add a converter page link if not already on it */}
            {!isConverterPage && !isMainPage && (
              <Link 
                to="/converter" 
                className="action-btn"
                title="Coordinate Converter"
              >
                <span className="action-icon">🔄</span>
                <span className="action-label">Converter</span>
              </Link>
            )}
          </div>
        </div>
      </header>
      
      {/* Modals */}
      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        //onSave={onSettingsChange}
        //currentSettings={currentSettings}
      />
      
      <FeaturesGuide 
        isOpen={showFeatures} 
        onClose={() => setShowFeatures(false)} 
      />
      
      <PrivacyPolicy 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
      />
    </>
  );
}