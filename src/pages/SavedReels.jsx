import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';

function getShortsId(url) {
  if (!url) return null;
  const shortsMatch = url.match(/youtube\.com\/(?:shorts\/)([\w-]{11})/);
  const watchMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return shortsMatch ? shortsMatch[1] : (watchMatch ? watchMatch[1] : null);
}

function SavedReels() {
  const [reels, setReels] = useState([]);
  const [savedReelIds, setSavedReelIds] = useState(() => {
    const stored = localStorage.getItem('savedReels');
    return stored ? JSON.parse(stored) : [];
  });
  const [likedReelIds, setLikedReelIds] = useState(() => {
    const stored = localStorage.getItem('likedReels');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedReel, setSelectedReel] = useState(null);

  useEffect(() => {
    fetch('/data/reelfeed.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(r =>
          ((r.reel_url && getShortsId(r.reel_url)) || (r.video_url && getShortsId(r.video_url))) &&
          savedReelIds.includes(r.id || data.indexOf(r))
        );
        setReels(filtered);
      });
  }, [savedReelIds]);

  const toggleLike = (reelId) => {
    const updated = likedReelIds.includes(reelId)
      ? likedReelIds.filter(id => id !== reelId)
      : [...likedReelIds, reelId];
    setLikedReelIds(updated);
    localStorage.setItem('likedReels', JSON.stringify(updated));
  };

  const toggleSave = (reelId) => {
    const updated = savedReelIds.includes(reelId)
      ? savedReelIds.filter(id => id !== reelId)
      : [...savedReelIds, reelId];
    setSavedReelIds(updated);
    localStorage.setItem('savedReels', JSON.stringify(updated));
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', background: '#fafbfc', height: 'calc(100vh - 63px)' }}>
        <div style={{
          position: 'fixed',
          top: 50,
          alignSelf: 'flex-start',
          height: '100vh',
          zIndex: 20,
          background: '#fafafa',
          overflow: 'hidden', // prevent scroll in sidebar
          display: 'flex',
          flexDirection: 'column'
        }}>

          <Sidebar />
          {/* Theme button just below the saved button (bottom of sidebar) */}
          {/* Removed Theme button */}
        </div>
        <main style={{ flex: 1, backgroundColor: '#fafbfc', padding: '1rem', marginLeft: "30px" }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
              justifyItems: 'center'
            }}
          >
            {reels.map((reel, index) => {
              const videoUrl = reel.reel_url || reel.video_url;
              const shortsId = getShortsId(videoUrl);
              return (
                <div
                  key={reel.id || index}
                  style={{
                    width: '100%',
                    aspectRatio: '9 / 16',
                    borderRadius: 12,
                    overflow: 'hidden',
                    background: '#000',
                    boxShadow: '0 4px 12px #000a',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedReel({ ...reel, index })}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${shortsId}?autoplay=0&mute=1&playsinline=1`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={reel.title}
                    style={{ border: 'none', display: 'block' }}
                  />
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {selectedReel && (
        <div
          onClick={() => setSelectedReel(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: 'min(90vw, 480px)',
              width: '100%',
              aspectRatio: '9 / 16',
              background: '#fff',
              borderRadius: 20,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 32px #000a, 0 2px 16px #7c5cff22'
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${getShortsId(selectedReel.reel_url || selectedReel.video_url)}?autoplay=1&mute=0&playsinline=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={selectedReel.title}
              style={{ display: 'block', border: 'none' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              right: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
              fontSize: 14
            }}>
              <span>{selectedReel.title}</span>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => toggleLike(selectedReel.id || selectedReel.index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: 24,
                    cursor: 'pointer',
                    color: likedReelIds.includes(selectedReel.id || selectedReel.index) ? '#e0245e' : '#aaa'
                  }}
                >
                  {likedReelIds.includes(selectedReel.id || selectedReel.index) ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={() => toggleSave(selectedReel.id || selectedReel.index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: 24,
                    cursor: 'pointer',
                    color: savedReelIds.includes(selectedReel.id || selectedReel.index) ? '#7c5cff' : '#aaa'
                  }}
                >
                  {savedReelIds.includes(selectedReel.id || selectedReel.index) ? '🔖' : '📑'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SavedReels;
