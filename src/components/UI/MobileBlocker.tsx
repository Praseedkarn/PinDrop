// src/components/UI/MobileBlocker.tsx
import { useEffect, useState } from 'react';
import './MobileBlocker.css';

export default function MobileBlocker() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 730);
    };
    
    // Check on initial load
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  if (!isMobile) return null;
  
  return (
    <div className="mobile-blocker-overlay">
      <div className="mobile-blocker-content">
        <div className="mobile-blocker-icon">💻</div>
        <h2>Desktop Experience Required</h2>
        <p>
          PinDrop Dashboard is designed for desktop and tablet devices with larger screens 
          for the best mapping experience.
        </p>
        
        <div className="mobile-blocker-features">
          <div className="feature-item">
            <span className="feature-icon">🗺️</span>
            <span className="feature-text">Interactive Maps</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span className="feature-text">Dashboard Analytics</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📍</span>
            <span className="feature-text">Pin Management</span>
          </div>
        </div>
        
        <p className="mobile-blocker-instruction">
          Please open this website on a laptop, desktop, or tablet with a screen width of 700px or more.
        </p>
        
        <div className="mobile-blocker-actions">
          <button 
            className="mobile-blocker-btn"
            onClick={() => window.location.href = 'https://www.google.com'}
          >
            🔍 Search Desktop
          </button>
          <button 
            className="mobile-blocker-btn secondary"
            onClick={() => alert('Try rotating your device to landscape mode if on a tablet.')}
          >
            📱 Try Landscape
          </button>
        </div>
        
        <div className="mobile-blocker-current-device">
          <p>Current screen width: <strong>{window.innerWidth}px</strong></p>
          <p>Minimum required: <strong>700px</strong></p>
        </div>
      </div>
    </div>
  );
}