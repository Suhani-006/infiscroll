import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import styles from '../ExplorePhotos.module.css';

// --- Add localStorage integration for liked photos ---
function getLikedPhotosFromStorage() {
  try {
    const data = localStorage.getItem('likedPhotos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function LikedPhotos() {
  const [modalPhoto, setModalPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [page, setPage] = useState(1);

  // Load liked photos from localStorage (from ExplorePhotos)
  useEffect(() => {
    const likedPhotos = getLikedPhotosFromStorage();
    setPhotos(likedPhotos);
  }, []);

  useEffect(() => {
    if (modalPhoto) {
      setLiked(false);
      setSaved(false);
    }
  }, [modalPhoto]);

  // Infinite scroll: (optional, repeat liked photos for demo)
  useEffect(() => {
    if (page === 1) return;
    const likedPhotos = getLikedPhotosFromStorage();
    // For demo, repeat liked photos with new ids
    const mapped = likedPhotos.map(photo => ({
      ...photo,
      id: `${photo.id}-page${page}-${Math.random()}`
    }));
    setPhotos(prev => [...prev, ...mapped]);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.scrollingElement || document.documentElement;
      if (container.scrollHeight - container.scrollTop - container.clientHeight < 40) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', background: '#fafafa' }}>
        <div style={{
          position: 'fixed',
          top: 50,
          height: '100vh',
          zIndex: 20,
          background: '#fafafa',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Sidebar />
        </div>

        <div style={{ flex: 1, padding: '0px 0', display: 'flex', justifyContent: 'center', overflowY: 'auto', marginLeft: '280px', marginRight: '16px' }}>
          <main className={styles['explore-root']} style={{ maxWidth: 1200, width: '100%' }}>
            <div className={styles['masonry-grid']}>
              {photos.map(photo => (
                <div
                  key={photo.id}
                  className={styles['photo-card']}
                  onClick={() => setModalPhoto(photo)}
                  style={{ cursor: 'zoom-in' }}
                >
                  <div className={styles['photo-img-wrapper']}>
                    <img src={photo.url} alt={photo.caption} className={styles['photo-img']} />
                    <img src={photo.avatar} alt="avatar" className={styles['photo-avatar']} />
                  </div>
                  <div className={styles['photo-overlay']}>
                    <span className={styles['photo-title']}>{photo.title}</span>
                  </div>
                </div>
              ))}
            </div>
            {modalPhoto && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.85)',
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={() => setModalPhoto(null)}
              >
                <div
                  style={{
                    position: 'relative',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'row',
                    background: 'rgba(0,0,0,0.01)',
                    borderRadius: 16,
                    boxShadow: '0 8px 32px #000a',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 22, textAlign: 'center', padding: '16px 24px 8px 24px', background: 'rgba(0,0,0,0.45)', borderTopLeftRadius: 16, borderTopRightRadius: 16, width: '50vw', maxWidth: '50vw' }}>
                      {modalPhoto.title}
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.01)' }}>
                      <img
                        src={modalPhoto.url}
                        alt={modalPhoto.caption}
                        style={{ width: '50vw', height: 'auto', maxWidth: '50vw', maxHeight: '70vh', display: 'block', objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ color: '#fff', fontSize: 16, textAlign: 'center', padding: '12px 24px 18px 24px', background: 'rgba(0,0,0,0.45)', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, width: '50vw', maxWidth: '50vw' }}>
                      {modalPhoto.caption}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, marginLeft: 32, minWidth: 0 }}>
                    <button onClick={() => setLiked(l => !l)} style={{ background: liked ? '#e0245e' : '#fff', color: liked ? '#fff' : '#e0245e', border: '2px solid #e0245e', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #e0245e22', transition: 'all 0.15s' }} title="Like">
                      {liked ? '❤️' : '🤍'}
                    </button>
                    <button onClick={() => setSaved(s => !s)} style={{ background: saved ? '#7c5cff' : '#fff', color: saved ? '#fff' : '#7c5cff', border: saved ? 'none' : '2px solid #7c5cff', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #7c5cff33', transition: 'all 0.15s' }} title="Save">
                      {saved ? '🔖' : '📑'}
                    </button>
                    <button onClick={() => {
                      const idx = photos.findIndex((p) => p.id === modalPhoto.id);
                      if (idx >= 0 && idx < photos.length - 1) {
                        setModalPhoto(photos[idx + 1]);
                      } else {
                        setModalPhoto(null);
                      }
                    }} style={{ background: '#fff', color: '#7c5cff', border: '2px solid #7c5cff', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #7c5cff22', transition: 'all 0.15s' }} title="Skip">
                      ⭢️
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default LikedPhotos;