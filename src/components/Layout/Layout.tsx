// src/components/Layout/Layout.tsx
import { Outlet, Link } from 'react-router-dom';
import Header from '../UI/Header';
import './Layout.css';

interface LayoutProps {
  showHeader?: boolean;
}

export default function Layout({ showHeader = true }: LayoutProps) {
  return (
    <div className="layout">
      {showHeader && (
        <header className="layout-header">
          <nav className="layout-nav">
            <Link to="/" className="nav-home">
              🏠 PinDrop
            </Link>
            <div className="nav-links">
              <Link to="/converter" className="nav-link">
                🔍 Converter
              </Link>
            </div>
          </nav>
        </header>
      )}
      
      <main className="layout-main">
        <Outlet />
      </main>
      
      <footer className="layout-footer">
        <p>© {new Date().getFullYear()} PinDrop - Your Personal Travel Map</p>
      </footer>
    </div>
  );
}