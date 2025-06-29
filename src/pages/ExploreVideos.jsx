import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';

function getYouTubeId(url) {
  const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function ExploreVideos() {
  const [videos, setVideos] = useState([]);
  const [modalVideo, setModalVideo] = useState(null);

  useEffect(() => {
    fetch('/data/videofeed.json')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(v => v.video_url && getYouTubeId(v.video_url));
        // Shuffle the array
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        setVideos(filtered);
      });
  }, []);

  return (
    <>
      <Header />
      <div style={{ display: 'flex', background: '#fafafa', minHeight: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '40px 0', display: 'flex', justifyContent: 'center' }}>
          <main style={{ maxWidth: 1300, width: '100%', padding: '0 32px' }}>
            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '32px',
                background: 'transparent',
                padding: '0',
              }}
            >
              {videos.map((video, idx) => {
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
                      minHeight: 420,
                      border: '1px solid #ececec',
                    }}
                    onClick={() => setModalVideo(video)}
                    onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.13)'}
                    onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)'}
                  >
                    <div style={{ width: '100%', aspectRatio: '16/9', background: '#000' }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${ytId}?autoplay=0&mute=1&playsinline=1`}
                        title={video.title || 'Video'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '0' }}
                      />
                    </div>
                    <div style={{ padding: '20px 18px 16px', width: '100%' }}>
                      <h3 style={{ margin: 0, fontSize: 20, color: '#222', fontWeight: 600, lineHeight: 1.3 }}>{video.title}</h3>
                      <p style={{ margin: '10px 0 0', fontSize: 15, color: '#444', lineHeight: 1.5 }}>{video.description}</p>
                    </div>
                  </div>
                );
              })}
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
            style={{ position: 'relative', width: '90vw', height: '90vh', maxWidth: 900, maxHeight: '90vh', background: '#000', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <button
              onClick={() => setModalVideo(null)}
              style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, background: '#fff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 24, cursor: 'pointer' }}
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
