// src/components/UI/AddPinModal.tsx
import './AddPinModal.css';

interface AddPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onManualEntry: () => void;
  onMapClick: () => void;
}

export default function AddPinModal({ 
  isOpen, 
  onClose, 
  onManualEntry, 
  onMapClick 
}: AddPinModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Pin</h3>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-content">
          <div className="option-card" onClick={onMapClick}>
            <div className="option-icon map-option">
              🗺️
            </div>
            <div className="option-content">
              <h4>Select on Map</h4>
              <p>Click anywhere on the map to choose location</p>
              <span className="option-hint">Great for precise placement</span>
            </div>
            <div className="option-arrow">→</div>
          </div>
          
          <div className="option-card" onClick={onManualEntry}>
            <div className="option-icon manual-option">
              ✏️
            </div>
            <div className="option-content">
              <h4>Enter Manually</h4>
              <p>Fill in details including coordinates</p>
              <span className="option-hint">For exact coordinates</span>
            </div>
            <div className="option-arrow">→</div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <div className="modal-tip">
            💡 <strong>Tip:</strong> Map selection is recommended for better accuracy
          </div>
        </div>
      </div>
    </div>
  );
}