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
      const filtered = videos.filter(v => v.category === selectedCategory);
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
        // Simulate loading more data (repeat the same data for demo)
        setTimeout(() => {
          setVideos(prev => [...prev, ...prev]);
          setLoadingMore(false);
        }, 800);
      }
    };

    grid.addEventListener('scroll', handleScroll);
    return () => grid.removeEventListener('scroll', handleScroll);
  }, [loadingMore]);

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
                      minHeight: 300, // reduced from 420
                      border: '1px solid #ececec',
                    }}
                    onClick={() => setModalVideo(video)}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.13)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)'}
                  >
                    <div style={{
                      width: '100%',
                      position: 'relative',
                      paddingTop: '43.75%' // 16:7 aspect ratio (7/16 = 0.4375)
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
                      <h3 style={{ margin: 0, fontSize: 20, color: '#222', fontWeight: 600, lineHeight: 1.3 }}>{video.title}</h3>
                      <p style={{ margin: '10px 0 0', fontSize: 15, color: '#444', lineHeight: 1.5 }}>{video.description}</p>
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
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
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
              <h3 style={{ margin: 0, fontSize: 24 }}>{modalVideo.title}</h3>
              <p style={{ margin: '8px 0 0', fontSize: 17 }}>{modalVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ExploreVideos;
