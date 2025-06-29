import React from 'react';

export default function MasonryGrid({ photos, onPhotoClick }) {
  return (
    <div className="masonry-grid">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="photo-card"
          onClick={() => onPhotoClick(photo)}
        >
          <div className="photo-img-wrapper">
            <img src={photo.url} alt={photo.title} className="photo-img" />
            <div className="photo-overlay">
              <div className="photo-title">{photo.title}</div>
              <div className="photo-meta">
                <span>❤️ {photo.likes}</span>
                <span>💬 {photo.comments}</span>
              </div>
            </div>
            {photo.avatar && (
              <img src={photo.avatar} alt="avatar" className="photo-avatar" />
            )}
            <span className="photo-save">🔖</span>
          </div>
        </div>
      ))}
    </div>
  );
}
