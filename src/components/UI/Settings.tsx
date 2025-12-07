// src/components/UI/Settings.tsx
import { useState } from 'react';
import './Settings.css';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [settings, setSettings] = useState({
    mapTheme: 'default',
    pinAnimation: true,
    autoBackup: true,
    backupInterval: 'weekly',
    defaultView: 'map',
    enableNotifications: true,
    measurementUnit: 'km',
    language: 'en'
  });

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // Save to localStorage
    localStorage.setItem('pindrop-settings', JSON.stringify({
      ...settings,
      [key]: value
    }));
  };

  const handleReset = () => {
    const defaultSettings = {
      mapTheme: 'default',
      pinAnimation: true,
      autoBackup: true,
      backupInterval: 'weekly',
      defaultView: 'map',
      enableNotifications: true,
      measurementUnit: 'km',
      language: 'en'
    };
    setSettings(defaultSettings);
    localStorage.setItem('pindrop-settings', JSON.stringify(defaultSettings));
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
          <div className="settings-section">
            <h3>🗺️ Map Settings</h3>
            <div className="setting-item">
              <label>Map Theme</label>
              <select 
                value={settings.mapTheme}
                onChange={(e) => handleSettingChange('mapTheme', e.target.value)}
              >
                <option value="default">Default (OpenStreetMap)</option>
                <option value="satellite">Satellite View</option>
                <option value="dark">Dark Mode</option>
                <option value="topographic">Topographic</option>
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
                <label>Backup Interval</label>
                <select 
                  value={settings.backupInterval}
                  onChange={(e) => handleSettingChange('backupInterval', e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="manual">Manual Only</option>
                </select>
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
              <label>Measurement Unit</label>
              <select 
                value={settings.measurementUnit}
                onChange={(e) => handleSettingChange('measurementUnit', e.target.value)}
              >
                <option value="km">Kilometers</option>
                <option value="miles">Miles</option>
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
                <option value="hi">हिन्दी</option>
                <option value="ja">日本語</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>🔔 Notifications</h3>
            <div className="setting-item">
              <label>
                <input 
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
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
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}