import React, { useEffect, useState, useRef } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';

function getYouTubeId(url) {
  const match = url.match(/(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

// Get saved videos from localStorage
function getSavedVideosFromStorage() {
  try {
    const data = localStorage.getItem('savedVideos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function SavedVideos() {
  const [videos, setVideos] = useState([]);
  const [modalVideo, setModalVideo] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    setVideos(getSavedVideosFromStorage());
  }, []);

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
            width: 240,
            background: '#fafafa'
          }}
        >
          <Sidebar />
        </div>

        <div style={{ flex: 1, padding: '0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: "280px" }}>
          <main style={{ maxWidth: 1300, width: '100%', padding: '0 0px', margin:"16px 16px" }}>
            <div
              ref={gridRef}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '32px',
                background: 'transparent',
                padding: '0',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto'
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
                      minHeight: 200,
                      border: '1px solid #ececec',
                    }}
                    onClick={() => setModalVideo(video)}
                  >
                    <div style={{
                      width: '100%',
                      position: 'relative',
                      paddingTop: '50%'
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
                          border: 'none'
                        }}
                      />
                    </div>
                    <div style={{ padding: '20px 18px 16px', width: '100%' }}>
                      <h3 style={{ margin: 0, fontSize: 20, color: '#222', fontWeight: 400, lineHeight: 1.3 }}>{video.title}</h3>
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
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: '60vw',
              height: '75vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(0,0,0,0.01)',
              borderRadius: 16,
              boxShadow: '0 8px 32px #000a',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal content: Title bar (12%) and Video (88%) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              flex: 1
            }}>
              {/* Title bar (12%) */}
              <div style={{
                color: '#fff',
                fontWeight: 400, // non-bold
                fontSize: 22,
                textAlign: 'center',
                padding: '12px 24px 8px 24px',
                background: 'rgba(0,0,0,0.18)',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                width: '100%',
                maxWidth: '100%',
                height: '12%',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {modalVideo.title}
              </div>
              {/* Video (88%) */}
              <div
                style={{
                  width: '100%',
                  height: '88%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(0,0,0,0.01)',
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  overflow: 'hidden'
                }}
              >
                <iframe
                  key={getYouTubeId(modalVideo.video_url)}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${getYouTubeId(modalVideo.video_url)}?autoplay=1&mute=0&playsinline=1`}
                  title={modalVideo.title || 'Video'}
                  frameBorder="0"
                  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 0,
                    display: 'block',
                    margin: '0 auto',
                    background: '#000',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>
            {/* Close button in top right corner */}
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
          </div>
        </div>
      )}
    </>
  );
}

export default SavedVideos;