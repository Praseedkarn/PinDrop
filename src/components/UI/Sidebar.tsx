// src/components/UI/Sidebar.tsx
import { ReactNode, useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
  children: ReactNode;
  onAddPin?: () => void;
  onHomeClick?: () => void;
}

export default function Sidebar({ children, onAddPin, onHomeClick }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleAddPin = () => {
    onAddPin?.();
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile toggle button */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={() => setIsMobileOpen(true)}
        title="Open sidebar"
      >
        <span>→</span>
      </button>

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar header */}
        <div className="sidebar-header">
          {!isCollapsed && (
            <div className="sidebar-title">
              <h2>PinDrop Dashboard</h2>
              <p className="sidebar-subtitle">Your travel journey</p>
            </div>
          )}
          
          <div className="sidebar-controls">
            <button 
              className="sidebar-control-btn"
              onClick={onHomeClick}
              title="Reset view"
            >
              <span>🏠</span>
              {!isCollapsed && <span>Home</span>}
            </button>
            
            <button 
              className="sidebar-control-btn add-btn"
              onClick={handleAddPin}
              title="Add new pin"
            >
              <span>➕</span>
              {!isCollapsed && <span>Add Pin</span>}
            </button>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="sidebar-content">
          {children}
        </div>

        {/* Sidebar footer */}
        <div className="sidebar-footer">
          <button 
            className="collapse-btn"
            onClick={toggleSidebar}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <span>→</span> : <span>←</span>}
          </button>
          
          {!isCollapsed && (
            <div className="sidebar-info">
             
              <p className="version-info">v1.0.0</p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <button 
          className="mobile-close-btn"
          onClick={() => setIsMobileOpen(false)}
          title="Close sidebar"
        >
          <span>←</span>
        </button>
      </aside>
    </>
  );
}