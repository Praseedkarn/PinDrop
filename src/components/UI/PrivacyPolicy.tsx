// src/components/UI/PrivacyPolicy.tsx
import './PrivacyPolicy.css';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicy({ isOpen, onClose }: PrivacyPolicyProps) {
  if (!isOpen) return null;

  const privacyPoints = [
    {
      icon: '🔒',
      title: 'No Account Required',
      description: 'Use PinDrop immediately without signing up. No email, no password, no personal information required.'
    },
    {
      icon: '💾',
      title: 'Local Storage Only',
      description: 'All your data stays in your browser. Nothing is sent to any server or cloud service.'
    },
    {
      icon: '🚫',
      title: 'No Tracking',
      description: 'We don\'t use cookies, analytics, or any tracking technologies. Your browsing remains private.'
    },
    {
      icon: '📤',
      title: 'Full Data Control',
      description: 'Export your data anytime. Delete everything instantly. You have complete ownership.'
    },
    {
      icon: '🌐',
      title: 'Open Source',
      description: 'PinDrop is open-source. Anyone can review the code to verify our privacy claims.'
    },
    {
      icon: '⚖️',
      title: 'No Third Parties',
      description: 'We don\'t share, sell, or monetize your data. There are no advertisements.'
    }
  ];

  const dataTypes = [
    {
      type: '📍 Pin Data',
      details: 'Location coordinates, names, notes, ratings, and dates you enter'
    },
    {
      type: '⚙️ Settings',
      details: 'Your preferences like map theme, auto-backup frequency, etc.'
    },
    {
      type: '📊 Statistics',
      details: 'Generated statistics based on your pins (countries visited, counts, etc.)'
    }
  ];

  return (
    <div className="privacy-modal-overlay" onClick={onClose}>
      <div className="privacy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="privacy-header">
          <h2>🔒 PinDrop Privacy Policy</h2>
          <button className="close-btn" onClick={onClose} title="Close">
            ×
          </button>
        </div>

        <div className="privacy-content">
          <div className="privacy-hero">
            <div className="hero-content">
              <h3>Your Privacy is Our Priority</h3>
              <p>At PinDrop, we believe privacy is a fundamental right. Here's how we protect yours.</p>
            </div>
            <div className="privacy-badge">
              <span className="badge-icon">🛡️</span>
              <span className="badge-text">Privacy-First Design</span>
            </div>
          </div>

          <div className="principles-section">
            <h3>Our Privacy Principles</h3>
            <div className="principles-grid">
              {privacyPoints.map((point, index) => (
                <div key={index} className="principle-card">
                  <div className="principle-icon">{point.icon}</div>
                  <h4 className="principle-title">{point.title}</h4>
                  <p className="principle-description">{point.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="data-section">
            <h3>📁 What Data We Store</h3>
            <p className="section-intro">
              All data is stored <strong>locally in your browser</strong> using localStorage. 
              This means:
            </p>
            <div className="data-list">
              {dataTypes.map((item, index) => (
                <div key={index} className="data-item">
                  <div className="data-type">{item.type}</div>
                  <div className="data-details">{item.details}</div>
                </div>
              ))}
            </div>
            <div className="storage-info">
              <h4>💾 Storage Details</h4>
              <ul>
                <li>Data persists until you clear browser data or use the "Clear All Data" option</li>
                <li>No expiration date - your pins stay until you remove them</li>
                <li>Works offline - no internet required after initial load</li>
                <li>Browser-specific - data doesn't sync between devices</li>
              </ul>
            </div>
          </div>

          <div className="control-section">
            <h3>🎛️ Your Control & Rights</h3>
            <div className="control-grid">
              <div className="control-card">
                <div className="control-icon">📤</div>
                <h4>Export Data</h4>
                <p>Download all your pins as JSON anytime from the Export button</p>
              </div>
              <div className="control-card">
                <div className="control-icon">🗑️</div>
                <h4>Delete Data</h4>
                <p>Clear individual pins or use "Clear All Data" in Settings</p>
              </div>
              <div className="control-card">
                <div className="control-icon">🔍</div>
                <h4>View Data</h4>
                <p>All your data is visible and editable within the app</p>
              </div>
              <div className="control-card">
                <div className="control-icon">🚫</div>
                <h4>Opt-Out</h4>
                <p>Simply close the tab - nothing continues running</p>
              </div>
            </div>
          </div>

          <div className="technical-section">
            <h3>🔧 Technical Details</h3>
            <div className="tech-details">
              <div className="tech-item">
                <h4>Storage Method</h4>
                <p>Browser localStorage (limited to ~5-10MB per domain)</p>
              </div>
              <div className="tech-item">
                <h4>Data Format</h4>
                <p>JSON - human readable and portable</p>
              </div>
              <div className="tech-item">
                <h4>Encryption</h4>
                <p>No encryption applied (data is already local to your device)</p>
              </div>
              <div className="tech-item">
                <h4>Backups</h4>
                <p>Auto-backups stored in same localStorage (Settings → Auto Backup)</p>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h3>❓ Privacy FAQs</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>Can anyone access my data?</h4>
                <p>Only you. Data is stored in your browser and not transmitted anywhere.</p>
              </div>
              <div className="faq-item">
                <h4>What happens if I clear browser cache?</h4>
                <p>Your data will be deleted. Always export backups before clearing cache.</p>
              </div>
              <div className="faq-item">
                <h4>Is my location tracked?</h4>
                <p>Never. We don't track your location unless you explicitly add a pin.</p>
              </div>
              <div className="faq-item">
                <h4>Can I use PinDrop anonymously?</h4>
                <p>Yes! No registration, no identification, complete anonymity.</p>
              </div>
            </div>
          </div>

          <div className="comparison-section">
            <h3>🆚 vs Other Services</h3>
            <div className="comparison-table">
              <div className="table-header">
                <div className="table-cell">Feature</div>
                <div className="table-cell">PinDrop</div>
                <div className="table-cell">Google Maps</div>
                <div className="table-cell">Other Apps</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Data Collection</div>
                <div className="table-cell good">None</div>
                <div className="table-cell bad">Extensive</div>
                <div className="table-cell medium">Varies</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Account Required</div>
                <div className="table-cell good">No</div>
                <div className="table-cell bad">Yes</div>
                <div className="table-cell medium">Often</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Data Ownership</div>
                <div className="table-cell good">You</div>
                <div className="table-cell bad">Them</div>
                <div className="table-cell medium">Varies</div>
              </div>
              <div className="table-row">
                <div className="table-cell">Offline Use</div>
                <div className="table-cell good">Full</div>
                <div className="table-cell medium">Limited</div>
                <div className="table-cell bad">Rare</div>
              </div>
            </div>
          </div>

          <div className="contact-section">
            <h3>📞 Contact & Transparency</h3>
            <div className="contact-info">
              <p>
                PinDrop is an open-source project. You can:
              </p>
              <ul>
                <li>Review the source code on GitHub</li>
                <li>Report privacy concerns or suggestions</li>
                <li>Contribute to making it more private</li>
                <li>Fork and create your own version</li>
              </ul>
              <p className="last-updated">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="privacy-footer">
          <button className="btn-secondary" onClick={onClose}>
            I Understand
          </button>
          <p className="footer-note">
            By using PinDrop, you acknowledge this privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}