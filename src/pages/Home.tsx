// src/pages/Home.tsx
import { useState, useEffect } from 'react';
import { createNewPin, Pin, AppSettings } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import WorldMap from '../components/Map/WorldMap';
import PinList from '../components/Pins/PinList';
import PinForm from '../components/Pins/PinForm';
import StatsPanel from '../components/Stats/StatsPanel';
import Header from '../components/UI/Header';
import Sidebar from '../components/UI/Sidebar';
import './Home.css';

const defaultSettings: AppSettings = {
  theme: 'light',
  language: 'en',
  notifications: true,
  autoSave: true,
  mapTheme: 'standard',
  pinAnimation: true,
  autoBackup: true,
  backupInterval: 7,
  defaultView: 'map'
};

export default function HomePage() {
  const { data, addPin, updatePin, deletePin, exportData, importData } = useLocalStorage();
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [mapClickMode, setMapClickMode] = useState(false); // Add this state

  // Load settings on app start
  useEffect(() => {
    const savedSettings = localStorage.getItem('pindrop-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const validatedSettings: AppSettings = {
          ...defaultSettings,
          ...parsedSettings,
          theme: ['light', 'dark'].includes(parsedSettings.theme)
            ? parsedSettings.theme as 'light' | 'dark'
            : defaultSettings.theme,
          mapTheme: ['standard', 'satellite', 'dark'].includes(parsedSettings.mapTheme)
            ? parsedSettings.mapTheme as 'standard' | 'satellite' | 'dark'
            : defaultSettings.mapTheme,
          defaultView: ['map', 'list'].includes(parsedSettings.defaultView)
            ? parsedSettings.defaultView as 'map' | 'list'
            : defaultSettings.defaultView
        };
        
        setSettings(validatedSettings);
        setViewMode(validatedSettings.defaultView);
      } catch (error) {
        console.error('Error loading settings:', error);
        localStorage.setItem('pindrop-settings', JSON.stringify(defaultSettings));
      }
    }
  }, []);

  // Save settings when they change
  useEffect(() => {
    localStorage.setItem('pindrop-settings', JSON.stringify(settings));
  }, [settings]);

  // ESC key listener to cancel map click mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mapClickMode) {
        setMapClickMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mapClickMode]);

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    // Only handle if we're in map click mode
    if (mapClickMode) {
      const country = getCountryFromCoordinates(latlng.lat, latlng.lng);
      const newPin = createNewPin(latlng, country);
      
      setSelectedPin(newPin);
      setShowForm(true);
      setIsAddingPin(true);
      setMapClickMode(false); // Turn off map click mode after selection
      
      return;
    }
  };

  const handlePinClick = (pin: Pin) => {
    setSelectedPin(pin);
    setShowForm(true);
    setIsAddingPin(false);
  };

  const handleAddPinClick = () => {
    // Ask user how they want to add the pin
    const useMapClick = window.confirm(
      "How would you like to add a new pin?\n\n" +
      "Click 'OK' to select location on the map\n" +
      "Click 'Cancel' to enter details manually"
    );
    
    if (useMapClick) {
      // Enable map click mode
      setMapClickMode(true);
      setShowForm(false);
      setSelectedPin(null);
      setIsAddingPin(true);
    } else {
      // Manual entry
      setSelectedPin({
        id: '',
        name: '',
        lat: 0,
        lng: 0,
        country: '',
        city: '',
        status: 'wishlist',
        notes: '',
        date: new Date().toISOString().split('T')[0],
        photo: '',
        rating: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setShowForm(true);
      setIsAddingPin(true);
    }
  };

  const handleHomeClick = () => {
    setSelectedPin(null);
    setShowForm(false);
    setViewMode('map');
    setMapClickMode(false);
  };

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pindrop-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (importData(result)) {
          alert('✅ Data imported successfully!');
          event.target.value = '';
        } else {
          alert('❌ Failed to import data. Invalid format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFormSubmit = (pinData: Omit<Pin, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedPin?.id) {
      updatePin(selectedPin.id, pinData);
    } else {
      addPin(pinData);
    }
    setShowForm(false);
    setSelectedPin(null);
    setIsAddingPin(false);
    setMapClickMode(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedPin(null);
    setIsAddingPin(false);
    setMapClickMode(false);
  };

  const getCountryFromCoordinates = (lat: number, lng: number): string => {
    if (lat >= 35 && lat <= 72 && lng >= -10 && lng <= 40) return 'Europe';
    if (lat >= 25 && lat <= 50 && lng >= -125 && lng <= -65) return 'United States';
    if (lat >= 35 && lat <= 55 && lng >= 135 && lng <= 145) return 'Japan';
    if (lat >= -40 && lat <= -10 && lng >= 110 && lng <= 155) return 'Australia';
    if (lat >= 20 && lat <= 55 && lng >= 70 && lng <= 140) return 'China';
    return '';
  };

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    if (newSettings.defaultView && newSettings.defaultView !== settings.defaultView) {
      setViewMode(newSettings.defaultView);
    }
  };

  return (
    <div className="home-page">
      <Header
        onExport={handleExport}
        onImport={handleImport}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onSettingsChange={handleSettingsChange}
        currentSettings={settings}
      />
      
      <div className="main-content">
        <Sidebar
          onAddPin={handleAddPinClick}
          onHomeClick={handleHomeClick}
        >
          {showForm ? (
            <PinForm
              initialData={selectedPin || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              onEnableMapClick={() => {
                setMapClickMode(true);
                setShowForm(false);
              }}
            />
          ) : (
            <>
              <StatsPanel pins={data.pins} settings={settings} />
              <PinList
                pins={data.pins}
                onSelect={handlePinClick}
                onEdit={(pin) => {
                  setSelectedPin(pin);
                  setShowForm(true);
                  setIsAddingPin(false);
                }}
                onDelete={deletePin}
              />
            </>
          )}
        </Sidebar>

        <div className="content-area">
          {viewMode === 'map' ? (
            <WorldMap
              pins={data.pins}
              onPinClick={handlePinClick}
              onMapClick={handleMapClick}
              settings={settings}
              mapClickMode={mapClickMode} // Pass the mapClickMode prop
            />
          ) : (
            <div className="list-view-container">
              <div className="list-view-header">
                <h2>📍 All Pins ({data.pins.length})</h2>
                <p className="list-view-subtitle">
                  {data.pins.length === 0 
                    ? 'Start your journey by adding your first pin!' 
                    : 'Click on pins to view details'}
                </p>
              </div>
              <div className="list-view-content">
                {data.pins.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">🗺️</div>
                    <h3>No pins yet</h3>
                    <p>Click on the map or "Add Pin" button to create your first pin!</p>
                    <button 
                      className="btn-primary"
                      onClick={handleAddPinClick}
                    >
                      Add Your First Pin
                    </button>
                  </div>
                ) : (
                  <div className="list-view-grid">
                    {data.pins.map(pin => (
                      <div 
                        key={pin.id} 
                        className="list-view-card"
                        onClick={() => handlePinClick(pin)}
                      >
                        <div className={`card-status ${pin.status}`}>
                          {pin.status === 'visited' ? '✅ Visited' : 
                           pin.status === 'favorite' ? '❤️ Favorite' : '⭐ Wishlist'}
                        </div>
                        <h3 className="card-title">{pin.name}</h3>
                        <p className="card-location">
                          {pin.city && `${pin.city}, `}{pin.country}
                        </p>
                        {pin.notes && (
                          <p className="card-notes">
                            {pin.notes.length > 100 
                              ? `${pin.notes.substring(0, 100)}...` 
                              : pin.notes}
                          </p>
                        )}
                        <div className="card-footer">
                          {pin.date && (
                            <span className="card-date">
                              📅 {new Date(pin.date).toLocaleDateString()}
                            </span>
                          )}
                          {pin.rating && (
                            <span className="card-rating">
                              ⭐ {pin.rating}/5
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Show map click mode indicator */}
          {mapClickMode && viewMode === 'map' && (
            <div className="map-click-indicator">
              <div className="indicator-content">
                <span className="blinking-marker">📍</span>
                <span className="indicator-text">
                  <strong>Map Click Mode Active</strong>
                  <small>Click anywhere on the map to select location</small>
                </span>
                <button 
                  className="indicator-cancel-btn"
                  onClick={() => setMapClickMode(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {/* Floating action button */}
          {viewMode === 'map' && !showForm && !mapClickMode && (
            <button 
              className="floating-add-btn"
              onClick={handleAddPinClick}
              title="Add new pin"
            >
              +
            </button>
          )}
        </div>
      </div>

      {data.pins.length > 0 && viewMode === 'map' && !showForm && (
        <div className="corner-stats">
          <div className="stat-bubble" title={`${data.pins.length} pins`}>
            <span className="stat-icon">📍</span>
            <span className="stat-count">{data.pins.length}</span>
          </div>
          {settings.autoBackup && (
            <div className="backup-indicator" title="Auto-backup enabled">
              💾
            </div>
          )}
        </div>
      )}

      {settings.mapTheme !== 'standard' && viewMode === 'map' && (
        <div className="theme-indicator">
          {settings.mapTheme === 'satellite' && '🛰️ Satellite View'}
          {settings.mapTheme === 'dark' && '🌙 Dark Mode'}
        </div>
      )}
    </div>
  );
}