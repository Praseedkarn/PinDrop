// src/components/Stats/StatsPanel.tsx
import { useMemo } from 'react';
import { Pin } from '../../types';
import './StatsPanel.css';

interface StatsPanelProps {
  pins: Pin[];
  settings?: {
    measurementUnit?: 'km' | 'miles';
  };
}
export default function StatsPanel({ pins }: StatsPanelProps) {
  const stats = useMemo(() => {
    const visited = pins.filter(p => p.status === 'visited');
    const wishlist = pins.filter(p => p.status === 'wishlist');
    
    const countries = new Set(pins.map(p => p.country)).size;
    const cities = new Set(pins.filter(p => p.city).map(p => p.city)).size;
    
    const totalRating = visited.reduce((sum, p) => sum + (p.rating || 0), 0);
    const averageRating = visited.length > 0 ? totalRating / visited.length : 0;
    
    const totalNotesLength = pins.reduce((sum, p) => sum + p.notes.length, 0);
    const avgNotesLength = pins.length > 0 ? Math.round(totalNotesLength / pins.length) : 0;
    
    // Calculate most visited country
    const countryCounts = pins.reduce((acc, pin) => {
      acc[pin.country] = (acc[pin.country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const mostVisitedCountry = Object.entries(countryCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';
      
    // Calculate months with most visits
    const monthCounts = pins.reduce((acc, pin) => {
      if (pin.date) {
        const month = new Date(pin.date).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    
    const topMonth = Object.entries(monthCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None';

    return {
      total: pins.length,
      visited: visited.length,
      wishlist: wishlist.length,
      countries,
      cities,
      averageRating: parseFloat(averageRating.toFixed(1)),
      mostVisitedCountry,
      topMonth,
      avgNotesLength,
      completionRate: pins.length > 0 ? (visited.length / pins.length) * 100 : 0
    };
  }, [pins]);

  return (
    <div className="stats-panel">
      <div className="stats-header">
        <div className="stats-title">
          <span className="stats-icon">📊</span>
          <h3>Travel Dashboard</h3>
        </div>
        <p className="stats-subtitle">Your journey in numbers</p>
      </div>

      <div className="stats-grid">
        {/* Main stats */}
        <div className="stat-card main-stat">
          <div className="stat-content">
            <div className="stat-icon-wrapper">
              📍
            </div>
            <div className="stat-info">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Pins</div>
            </div>
          </div>
          <div className="stat-breakdown">
            <span className="visited-count">{stats.visited} visited</span>
            <span className="wishlist-count">{stats.wishlist} wishlist</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            🌍
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.countries}</div>
            <div className="stat-label">Countries</div>
          </div>
          {stats.cities > 0 && (
            <div className="stat-subtext">{stats.cities} cities</div>
          )}
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            ⭐
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.averageRating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="star-display">
            {'★'.repeat(Math.round(stats.averageRating))}
            {'☆'.repeat(5 - Math.round(stats.averageRating))}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper">
            📅
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.topMonth}</div>
            <div className="stat-label">Top Month</div>
          </div>
        </div>
      </div>

      {/* Progress section */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Journey Completion</span>
          <span className="progress-percent">{stats.completionRate.toFixed(0)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${stats.completionRate}%` }}
            data-percent={stats.completionRate.toFixed(0)}
          />
        </div>
        <div className="progress-stats">
          <span className="completed">{stats.visited} visited</span>
          <span className="remaining">{stats.wishlist} to go</span>
        </div>
      </div>

      {/* Additional insights */}
      <div className="insights-section">
        <h4 className="insights-title">
          <span className="insight-icon">🏆</span>
          Insights
        </h4>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-content">
              <span className="insight-label">Most visited country</span>
              <span className="insight-value">{stats.mostVisitedCountry}</span>
            </div>
            <span className="insight-icon">🧭</span>
          </div>
          
          <div className="insight-card">
            <div className="insight-content">
              <span className="insight-label">Average note length</span>
              <span className="insight-value">{stats.avgNotesLength} chars</span>
            </div>
            <span className="insight-icon">📝</span>
          </div>
        </div>
      </div>

      {/* Quick tip */}
      <div className="tip-section">
        <p className="tip-text">
          💡 <strong>Pro Tip:</strong> Add photos to your pins to make memories more vivid!
        </p>
      </div>
    </div>
  );
}