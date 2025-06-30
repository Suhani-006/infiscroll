import React, { useEffect, useState, useRef } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';

const categories = [
  'All',
  'Technology',
  'Sports',
  'Lifestyle',
  'Business',
  'Education',
  'Health & Fitness',
  'Fashion',
  'Gaming'
];

const categoryIcons = {
  'All': '🗂️',
  'Technology': '💻',
  'Sports': '⚽',
  'Lifestyle': '🏡',
  'Business': '💼',
  'Education': '🎓',
  'Health & Fitness': '🏋️',
  'Fashion': '👗',
  'Gaming': '🎮'
};

function getYouTubeId(url) {
  const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function ExploreVideos() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalVideo, setModalVideo] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [likedVideos, setLikedVideos] = useState(() => {
    try {
      const data = localStorage.getItem('likedVideos');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [savedVideos, setSavedVideos] = useState(() => {
    try {
      const data = localStorage.getItem('savedVideos');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const gridRef = useRef(null);

  useEffect(() => {
    fetch('/data/videofeed.json')
      .then(res => res.json())
      .then(data => {
        const validVideos = data.filter(v => v.video_url && getYouTubeId(v.video_url));
        for (let i = validVideos.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [validVideos[i], validVideos[j]] = [validVideos[j], validVideos[i]];
        }
        setVideos(validVideos);
        setFilteredVideos(validVideos); // default is all
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredVideos(videos);
    } else {
      // Match category by tag (case-insensitive, ignore spaces and &)
      const normalized = selectedCategory.replace(/ & /g, '_').replace(/\s+/g, '_').toLowerCase();
      const filtered = videos.filter(v => {
        const tag = (v.tag || v.category || '').replace(/ & /g, '_').replace(/\s+/g, '_').toLowerCase();
        return tag === normalized;
      });
      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]);

  // Infinite scroll: load more data when scrolled to bottom of grid
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const handleScroll = () => {
      if (
        grid.scrollTop + grid.clientHeight >= grid.scrollHeight - 10 &&
        !loadingMore
      ) {
        setLoadingMore(true);
        // Repeat the filteredVideos (not just all videos) for infinite scroll
        setTimeout(() => {
          setVideos(prev => [...prev, ...filteredVideos]);
          setLoadingMore(false);
        }, 800);
      }
    };

    grid.addEventListener('scroll', handleScroll);
    return () => grid.removeEventListener('scroll', handleScroll);
  }, [loadingMore, filteredVideos]);

  // Like handler: Save liked video to localStorage
  function handleLike(video) {
    let liked = likedVideos.slice();
    if (!liked.some(v => v.id === video.id)) {
      liked.push(video);
      setLikedVideos(liked);
      localStorage.setItem('likedVideos', JSON.stringify(liked));
    }
  }
  function handleUnlike(video) {
    let liked = likedVideos.filter(v => v.id !== video.id);
    setLikedVideos(liked);
    localStorage.setItem('likedVideos', JSON.stringify(liked));
  }

  // Save handler: Save video to savedVideos in localStorage
  function handleSave(video) {
    let saved = savedVideos.slice();
    if (!saved.some(v => v.id === video.id)) {
      saved.push(video);
      setSavedVideos(saved);
      localStorage.setItem('savedVideos', JSON.stringify(saved));
    }
  }
  function handleUnsave(video) {
    let saved = savedVideos.filter(v => v.id !== video.id);
    setSavedVideos(saved);
    localStorage.setItem('savedVideos', JSON.stringify(saved));
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', background: '#fafafa' }}>
        <div
          style={{
            position: 'fixed',
            top: 50,
            alignSelf: 'flex-start',
            height: '100vh',
            zIndex: 20,
            width: 240, // adjust width as needed to match Sidebar's width
            background: '#fafafa'
          }}
        >
          <Sidebar />
        </div>
        <div style={{ flex: 1, padding: '0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "280px" }}>
          <div
            className="no-scrollbar"
            style={{
              width: '100%',
              margin: 0,

              paddingLeft: 2,
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 8,
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '4px 0 6px',
              background: '',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              height: 50,
              boxSizing: 'border-box',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#6C63FF' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#181818',
                  border: 'none',
                  borderRadius: 16,
                  padding: '4px',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow:
                    selectedCategory === cat
                      ? '0 2px 6px #6C63FF33'
                      : '0 1px 3px #0001',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                  minWidth: 90,
                  outline: selectedCategory === cat ? '2px solid #6C63FF' : 'none',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: 14 }}>{categoryIcons[cat]}</span>
                <span style={{ fontSize: 13 }}>{cat}</span>
              </button>
            ))}
          </div>

          <main style={{ maxWidth: 1300, width: '100%', padding: '0 0px', margin:"16px 16px" }}>
            <div
              ref={gridRef}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '32px',
                background: 'transparent',
                padding: '0',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto'
              }}
            >
              {filteredVideos.map((video, idx) => {
                const ytId = getYouTubeId(video.video_url);
                return (
                  <div
                    key={video.id || idx}
                    style={{
                      background: '#fff',
                      borderRadius: 18,
                      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'transform 0.15s, box-shadow 0.15s',
                      minHeight: 200, // reduced from 300
                      border: '1px solid #ececec',
                    }}
                    onClick={() => setModalVideo(video)}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.13)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)'}
                  >
                    <div style={{
                      width: '100%',
                      position: 'relative',
                      paddingTop: '70%' // reduced aspect ratio for less height
                    }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=0&mute=1&playsinline=1`}
                        title={video.title || 'Video'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          borderRadius: '0'
                        }}
                      />
                    </div>
                    <div style={{ padding: '20px 18px 16px', width: '100%' }}>
                      <h3
                        style={{
                          margin: 0,
                          fontSize: 20,
                          color: '#222',
                          fontWeight: 600,
                          lineHeight: 1.3,
                          textAlign: 'center',
                          background: '#fff',
                          boxShadow: '0 2px 8px #6C63FF22',
                          borderRadius: 12,
                          padding: '8px 0',
                          width: '100%',
                          display: 'inline-block'
                        }}
                      >
                        {video.title}
                      </h3>
                      {/* Description removed */}
                    </div>
                  </div>
                );
              })}
              {loadingMore && (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 24, color: '#888' }}>
                  Loading more...
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {modalVideo && (
        <div
          onClick={() => setModalVideo(null)}
          style={{
            position: 'fixed',
            zIndex: 9999,
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '90vw',
              height: '90vh',
              maxWidth: 900,
              maxHeight: '90vh',
              background: '#000',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Close button at the top right */}
            <button
              onClick={() => setModalVideo(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 2,
                background: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 40,
                height: 40,
                fontSize: 24,
                cursor: 'pointer'
              }}
              aria-label="Close"
            >
              ×
            </button>
            {/* Video area */}
            <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <iframe
                key={getYouTubeId(modalVideo.video_url)}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeId(modalVideo.video_url)}?autoplay=1&mute=0&playsinline=1`}
                title={modalVideo.title || 'Video'}
                frameBorder="0"
                allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', borderRadius: 16 }}
              />
              <div style={{ position: 'absolute', bottom: 24, left: 0, width: '100%', textAlign: 'center', color: '#fff', background: 'rgba(0,0,0,0.4)', padding: 16 }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 24,
                    // Add a grid pattern overlay with a bottom-to-top dark-to-light gradient
                    background: `
                      repeating-linear-gradient(
                        45deg,
                        rgba(255,255,255,0.04) 0px,
                        rgba(255,255,255,0.04) 8px,
                        transparent 8px,
                        transparent 16px
                      ),
                      linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(40,40,40,0.45) 60%, rgba(255,255,255,0.01) 100%)
                    `,
                    color: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px #6C63FF22',
                    display: 'inline-block',
                    padding: '10px 24px'
                  }}
                >
                  {modalVideo.title}
                </h3>
              </div>
            </div>
            {/* Vertical buttons on right */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 28,
              marginLeft: 32,
              minWidth: 0
            }}>
              {/* Like button */}
              <button
                onClick={() =>
                  likedVideos.some(v => v.id === modalVideo.id)
                    ? handleUnlike(modalVideo)
                    : handleLike(modalVideo)
                }
                style={{
                  background: likedVideos.some(v => v.id === modalVideo.id) ? '#e0245e' : '#fff',
                  color: likedVideos.some(v => v.id === modalVideo.id) ? '#fff' : '#e0245e',
                  border: '2px solid #e0245e',
                  borderRadius: '50%',
                  width: 56,
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #e0245e22',
                  transition: 'all 0.15s'
                }}
                title="Like"
              >
                {likedVideos.some(v => v.id === modalVideo.id) ? '❤️' : '🤍'}
              </button>
              {/* Save button */}
              <button
                onClick={() =>
                  savedVideos.some(v => v.id === modalVideo.id)
                    ? handleUnsave(modalVideo)
                    : handleSave(modalVideo)
                }
                style={{
                  background: savedVideos.some(v => v.id === modalVideo.id) ? '#7c5cff' : '#fff',
                  color: savedVideos.some(v => v.id === modalVideo.id) ? '#fff' : '#7c5cff',
                  border: savedVideos.some(v => v.id === modalVideo.id) ? 'none' : '2px solid #7c5cff',
                  borderRadius: '50%',
                  width: 56,
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #7c5cff33',
                  transition: 'all 0.15s'
                }}
                title="Save"
              >
                {savedVideos.some(v => v.id === modalVideo.id) ? '🔖' : '📑'}
              </button>
              {/* Skip button: show next video in filteredVideos */}
              <button
                onClick={() => {
                  const idx = filteredVideos.findIndex(v => v.id === modalVideo.id);
                  if (idx >= 0 && idx < filteredVideos.length - 1) {
                    setModalVideo(filteredVideos[idx + 1]);
                  } else {
                    setModalVideo(null);
                  }
                }}
                style={{
                  background: '#fff',
                  color: '#7c5cff',
                  border: '2px solid #7c5cff',
                  borderRadius: '50%',
                  width: 56,
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px #7c5cff22',
                  transition: 'all 0.15s'
                }}
                title="Skip"
              >
                ➡️
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExploreVideos;
