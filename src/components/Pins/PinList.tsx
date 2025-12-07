// src/components/Pins/PinList.tsx
import { useState, useMemo, useEffect, useRef } from 'react';
import { Pin, PinStatus } from '../../types';
import './PinList.css';

interface PinListProps {
  pins: Pin[];
  onSelect: (pin: Pin) => void;
  onEdit: (pin: Pin) => void;
  onDelete: (pinId: string) => void;
}

export default function PinList({ pins, onSelect, onEdit, onDelete }: PinListProps) {
  const [filter, setFilter] = useState<PinStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'rating'>('date');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredPins = useMemo(() => {
    let result = [...pins];

    if (filter !== 'all') {
      result = result.filter(pin => pin.status === filter);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(pin => 
        pin.name.toLowerCase().includes(searchLower) ||
        pin.country.toLowerCase().includes(searchLower) ||
        pin.notes?.toLowerCase().includes(searchLower) ||
        pin.city?.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [pins, filter, search, sortBy]);

  const getStatusIcon = (status: PinStatus) => {
    return status === 'visited' ? '✅' : '⭐';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not visited';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDeleteClick = (pin: Pin, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${pin.name}"?`)) {
      onDelete(pin.id);
    }
  };

  // Reset scroll position when pins change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [filteredPins]);

  if (pins.length === 0) {
    return (
      <div className="pin-list-container">
        <div className="pin-list-empty">
          <div className="empty-icon-container">
            <span className="empty-icon">📍</span>
          </div>
          <h3>No pins yet</h3>
          <p>Click on the map to add your first travel pin!</p>
          <button className="add-first-pin-btn">
            ✨ Add Your First Pin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pin-list-wrapper">
      <div className="pin-list-container">
        <div className="pin-list-header">
          <div className="header-content">
            <h3>
              <span className="pin-icon"></span>
              Travel  
              <span className="pin-count">({filteredPins.length})</span>
            </h3>
            
            <div className="pin-list-controls">
              <div className="search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search by name, city, or notes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                />
                {search && (
                  <button 
                    className="clear-search"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="filter-controls">
                <div className="filter-group">
                  <span className="filter-icon">⚙️</span>
                  <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value as PinStatus | 'all')}
                    className="filter-select"
                  >
                    <option value="all">All Pins</option>
                    <option value="visited">✅ Visited</option>
                    <option value="wishlist">⭐ Wishlist</option>
                  </select>
                </div>

                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'rating')}
                  className="sort-select"
                >
                  <option value="date">Newest First</option>
                  <option value="name">A to Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="pin-list-scroll" ref={scrollContainerRef}>
          <div className="pin-list-content">
            {filteredPins.map(pin => (
              <div 
                key={pin.id} 
                className={`pin-list-item ${pin.status}`}
                onClick={() => onSelect(pin)}
              >
                <div className="pin-item-header">
                  <span className="pin-status-icon">
                    {getStatusIcon(pin.status)}
                  </span>
                  <h4 className="pin-name">{pin.name}</h4>
                  <div className="pin-actions">
                    <button 
                      className="icon-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(pin);
                      }}
                      title="Edit pin"
                      aria-label={`Edit ${pin.name}`}
                    >
                      ✏️
                    </button>
                    <button 
                      className="icon-btn delete-btn"
                      onClick={(e) => handleDeleteClick(pin, e)}
                      title="Delete pin"
                      aria-label={`Delete ${pin.name}`}
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="pin-item-details">
                  <span className="pin-location">
                    <span className="location-icon">📍</span>
                    {pin.city && `${pin.city}, `}{pin.country}
                  </span>
                  
                  {pin.date && (
                    <span className="pin-date">
                      <span className="date-icon">📅</span>
                      {formatDate(pin.date)}
                    </span>
                  )}
                  
                  {pin.rating && (
                    <span className="pin-rating">
                      <span className="rating-icon">⭐</span>
                      {pin.rating}/5
                    </span>
                  )}
                </div>

                {pin.notes && (
                  <div className="pin-notes-container">
                    <p className="pin-notes">
                      {pin.notes.length > 120 
                        ? `${pin.notes.substring(0, 120)}...` 
                        : pin.notes}
                    </p>
                    {pin.notes.length > 120 && (
                      <span className="read-more">Read more</span>
                    )}
                  </div>
                )}

                {pin.photo && (
                  <div className="pin-photo-preview">
                    <div className="photo-placeholder">
                      <span className="photo-icon">📷</span>
                      <span className="photo-text">Photo attached</span>
                    </div>
                  </div>
                )}

                <div className="pin-tags">
                  {pin.status === 'visited' && (
                    <span className="tag visited-tag">✅ Visited</span>
                  )}
                  {pin.status === 'wishlist' && (
                    <span className="tag wishlist-tag">⭐ Wishlist</span>
                  )}
                  {/* Removed pin.category since it doesn't exist in the Pin type */}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pin-list-footer">
          <div className="footer-stats">
            <span className="stat-item">
              <strong>{pins.filter(p => p.status === 'visited').length}</strong> visited
            </span>
            <span className="stat-item">
              <strong>{pins.filter(p => p.status === 'wishlist').length}</strong> wishlist
            </span>
            <span className="stat-item">
              <strong>{filteredPins.length}</strong> shown
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}