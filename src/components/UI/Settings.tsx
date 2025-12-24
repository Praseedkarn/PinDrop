// src/components/UI/Settings.tsx - UPDATED
import { useState, useEffect } from 'react';
import { AppSettings } from '../../types';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (settings: AppSettings) => void; // Add this prop
  currentSettings?: AppSettings; // Add this prop
}

export default function Settings({ isOpen, onClose, onSave, currentSettings }: SettingsProps) {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    language: 'en',
    notifications: true,
    autoSave: true,
    mapTheme: 'standard',
    pinAnimation: true,
    autoBackup: true,
    backupInterval: 7,
    defaultView: 'map'
  });

  // Load current settings when component opens
  useEffect(() => {
    if (currentSettings) {
      setSettings(currentSettings);
    }
  }, [currentSettings, isOpen]);

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage
    localStorage.setItem('pindrop-settings', JSON.stringify(newSettings));
    
    // Apply theme change immediately
    if (key === 'theme') {
      applyTheme(value);
    }
    
    // Notify parent component
    if (onSave) {
      onSave(newSettings);
    }
  };

  const applyTheme = (theme: string) => {
    // Remove existing theme classes
    document.documentElement.classList.remove('light-mode', 'dark-mode');
    // Add new theme class
    document.documentElement.classList.add(`${theme}-mode`);
  };

  const handleReset = () => {
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
    
    setSettings(defaultSettings);
    localStorage.setItem('pindrop-settings', JSON.stringify(defaultSettings));
    applyTheme('light');
    
    if (onSave) {
      onSave(defaultSettings);
    }
    
    alert('Settings reset to defaults!');
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>⚙️ Settings</h2>
          <button className="close-btn" onClick={onClose} title="Close">
            ×
          </button>
        </div>

        <div className="settings-content">
          {/* APPEARANCE SECTION - ADDED */}
          <div className="settings-section">
            <h3>🎨 Appearance</h3>
            <div className="setting-item">
              <label>Theme</label>
              <div className="theme-buttons">
                <button
                  type="button"
                  className={`theme-btn ${settings.theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('theme', 'light')}
                >
                  ☀️ Light
                </button>
                <button
                  type="button"
                  className={`theme-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleSettingChange('theme', 'dark')}
                >
                  🌙 Dark
                </button>
              </div>
            </div>

            <div className="setting-item">
              <label>Map Theme</label>
              <select 
                value={settings.mapTheme}
                onChange={(e) => handleSettingChange('mapTheme', e.target.value)}
              >
                <option value="standard">🗺️ Standard</option>
                <option value="satellite">🛰️ Satellite</option>
                <option value="dark">🌙 Dark Map</option>
                <option value="topographic">🗻 Topographic</option>
              </select>
            </div>

            <div className="setting-item">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.pinAnimation}
                  onChange={(e) => handleSettingChange('pinAnimation', e.target.checked)}
                />
                Enable Pin Animations
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h3>💾 Data & Backup</h3>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                />
                Auto Backup
              </label>
            </div>

            {settings.autoBackup && (
              <div className="setting-item">
                <label>Backup Interval (days)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={settings.backupInterval}
                  onChange={(e) => handleSettingChange('backupInterval', parseInt(e.target.value))}
                />
                <span className="interval-value">{settings.backupInterval} days</span>
              </div>
            )}
          </div>

          <div className="settings-section">
            <h3>👤 User Preferences</h3>
            <div className="setting-item">
              <label>Default View</label>
              <select 
                value={settings.defaultView}
                onChange={(e) => handleSettingChange('defaultView', e.target.value)}
              >
                <option value="map">Map View</option>
                <option value="list">List View</option>
              </select>
            </div>

            <div className="setting-item">
              <label>Language</label>
              <select 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>🔔 Notifications</h3>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                />
                Enable Notifications
              </label>
              <p className="setting-description">
                Get reminders to backup your data and travel tips
              </p>
            </div>
          </div>

          <div className="settings-section">
            <h3>🔄 Data Management</h3>
            <div className="setting-item">
              <button 
                className="btn-danger"
                onClick={() => {
                  if (window.confirm('Are you sure? This will delete ALL your pins and reset the app.')) {
                    localStorage.removeItem('pindrop-data');
                    localStorage.removeItem('pindrop-settings');
                    window.location.reload();
                  }
                }}
              >
                🗑️ Clear All Data
              </button>
              <p className="setting-description">
                Warning: This action cannot be undone
              </p>
            </div>

            <div className="setting-item">
              <button 
                className="btn-secondary"
                onClick={handleReset}
              >
                🔄 Reset to Defaults
              </button>
            </div>
          </div>
        </div>

        <div className="settings-footer">
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}