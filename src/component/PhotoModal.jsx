import React from 'react';

export default function PhotoModal({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div className="photo-modal-backdrop" onClick={onClose}>
      <div className="photo-modal" onClick={e => e.stopPropagation()}>
        <img src={photo.url} alt={photo.title} className="modal-img" />
        <div className="modal-meta">
          <div className="modal-title">{photo.title}</div>
          <div className="modal-caption">{photo.caption}</div>
          <div className="modal-info">
            <span>❤️ {photo.likes}</span>
            <span>💬 {photo.comments}</span>
            <span>📅 {photo.date}</span>
          </div>
          <div className="modal-actions">
            <button>❤️ Like</button>
            <button>🔖 Save</button>
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
