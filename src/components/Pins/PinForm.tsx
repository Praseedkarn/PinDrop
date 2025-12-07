// src/components/Pins/PinForm.tsx
import { useState, useEffect } from 'react';
import { Pin } from '../../types';
import './PinForm.css';

interface PinFormProps {
  initialData?: Partial<Pin>;
  onSubmit: (pinData: Omit<Pin, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  onEnableMapClick?: () => void; // Add this prop
}

export default function PinForm({ initialData, onSubmit, onCancel, onEnableMapClick }: PinFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    lat: 0,
    lng: 0,
    country: '',
    city: '',
    status: 'wishlist' as 'visited' | 'wishlist' | 'favorite',
    notes: '',
    date: new Date().toISOString().split('T')[0],
    photo: '',
    rating: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        lat: initialData.lat || 0,
        lng: initialData.lng || 0,
        country: initialData.country || '',
        city: initialData.city || '',
        status: initialData.status || 'wishlist',
        notes: initialData.notes || '',
        date: initialData.date || new Date().toISOString().split('T')[0],
        photo: initialData.photo || '',
        rating: initialData.rating || 0,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUseMapClick = () => {
    if (onEnableMapClick) {
      onEnableMapClick();
    }
  };

  return (
    <div className="pin-form">
      <div className="pin-form-header">
        <h3>{initialData?.id ? 'Edit Pin' : 'Add New Pin'}</h3>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter pin name"
          />
        </div>

        <div className="form-group">
          <label>Coordinates *</label>
          <div className="coordinates-section">
            <div className="coordinates-inputs">
              <input
                type="number"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder="Latitude"
                step="any"
                required
              />
              <input
                type="number"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                placeholder="Longitude"
                step="any"
                required
              />
            </div>
            {onEnableMapClick && (
              <button
                type="button"
                className="map-click-btn"
                onClick={handleUseMapClick}
                title="Click on map to select location"
              >
                🗺️ Click on Map
              </button>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Country"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Status</label>
          <div className="status-options">
            <label>
              <input
                type="radio"
                name="status"
                value="wishlist"
                checked={formData.status === 'wishlist'}
                onChange={handleChange}
              />
              <span className="status-option wishlist">⭐ Wishlist</span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="visited"
                checked={formData.status === 'visited'}
                onChange={handleChange}
              />
              <span className="status-option visited">✅ Visited</span>
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="favorite"
                checked={formData.status === 'favorite'}
                onChange={handleChange}
              />
              <span className="status-option favorite">❤️ Favorite</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <option value="0">Not rated</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add notes about this location..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo URL</label>
          <input
            type="text"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            {initialData?.id ? 'Update Pin' : 'Add Pin'}
          </button>
        </div>
      </form>
    </div>
  );
}