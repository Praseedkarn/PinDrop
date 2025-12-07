// src/components/UI/FeaturesGuide.tsx
import './FeaturesGuide.css';

interface FeaturesGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeaturesGuide({ isOpen, onClose }: FeaturesGuideProps) {
  if (!isOpen) return null;

  const features = [
    {
      icon: '🗺️',
      title: 'Interactive World Map',
      description: 'Explore the world with OpenStreetMap. Click anywhere to add pins!',
      tips: [
        'Drag to move around the map',
        'Use mouse wheel or +/- buttons to zoom',
        'Click on pins to view details'
      ]
    },
    {
      icon: '📍',
      title: 'Pin Management',
      description: 'Track visited places and wishlist destinations',
      tips: [
        'Green pins = Visited locations',
        'Gold pins = Wishlist locations',
        'Click + drag pins to reposition them'
      ]
    },
    {
      icon: '📝',
      title: 'Memory Tracking',
      description: 'Add notes, photos, and ratings to each location',
      tips: [
        'Upload photos or use Unsplash placeholders',
        'Rate locations 1-5 stars',
        'Add visit dates and detailed notes'
      ]
    },
    {
      icon: '📊',
      title: 'Travel Statistics',
      description: 'Track your travel progress with detailed analytics',
      tips: [
        'View countries and cities count',
        'Monitor visited vs wishlist ratio',
        'See your average rating'
      ]
    },
    {
      icon: '💾',
      title: 'Data Management',
      description: 'Your data stays private and under your control',
      tips: [
        'All data stored locally in your browser',
        'Export as JSON for backup',
        'Import from previous backups'
      ]
    },
    {
      icon: '⚙️',
      title: 'Customizable Settings',
      description: 'Personalize your PinDrop experience',
      tips: [
        'Choose between map themes',
        'Toggle animations on/off',
        'Set auto-backup intervals'
      ]
    }
  ];

  const quickTips = [
    '💡 Right-click on map for quick actions',
    '💡 Use search in pin list to find specific locations',
    '💡 Export your data regularly for safety',
    '💡 Change map themes for different viewing experiences',
    '💡 Use list view for browsing all pins quickly',
    '💡 Mobile-friendly: Works great on phones and tablets'
  ];

  return (
    <div className="features-modal-overlay" onClick={onClose}>
      <div className="features-modal" onClick={(e) => e.stopPropagation()}>
        <div className="features-header">
          <h2>📚 PinDrop Features Guide</h2>
          <button className="close-btn" onClick={onClose} title="Close">
            ×
          </button>
        </div>

        <div className="features-content">
          <div className="intro-section">
            <div className="welcome-banner">
              <h3>Welcome to PinDrop! 🎯</h3>
              <p>Your personal travel mapping companion. Here's everything you need to know to get started.</p>
            </div>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-tips">
                  <h4>Quick Tips:</h4>
                  <ul>
                    {feature.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="quick-tips-section">
            <h3>🚀 Pro Tips & Tricks</h3>
            <div className="tips-grid">
              {quickTips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <span className="tip-icon">💡</span>
                  <span className="tip-text">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="getting-started-section">
            <h3>🎯 Getting Started</h3>
            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Add Your First Pin</h4>
                  <p>Click anywhere on the map or use the "Add Pin" button</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Customize Your Pin</h4>
                  <p>Add details like name, notes, photos, and rating</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Track Your Progress</h4>
                  <p>Use the stats panel to monitor your travel journey</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Backup Your Data</h4>
                  <p>Regularly export your pins to keep them safe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="faq-section">
            <h3>❓ Frequently Asked Questions</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>Is my data secure?</h4>
                <p>Yes! All data stays in your browser. No accounts, no servers, no tracking.</p>
              </div>
              <div className="faq-item">
                <h4>Can I use PinDrop offline?</h4>
                <p>Yes! Once loaded, you can use all features without internet connection.</p>
              </div>
              <div className="faq-item">
                <h4>Is PinDrop free?</h4>
                <p>100% free and open-source. No hidden costs, ever.</p>
              </div>
              <div className="faq-item">
                <h4>Can I share my map with others?</h4>
                <p>You can export your data and share the JSON file, or take screenshots of your map.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="features-footer">
          <button className="btn-primary" onClick={onClose}>
            Start Exploring! 🚀
          </button>
          <p className="footer-note">
            Need more help? Check out our <a href="#privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}