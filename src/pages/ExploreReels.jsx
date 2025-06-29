import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';

function getShortsId(url) {
  if (!url) return null;
  // Support both shorts and regular YouTube URLs
  const shortsMatch = url.match(/youtube\.com\/(?:shorts\/)([\w-]{11})/);
  const watchMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return shortsMatch ? shortsMatch[1] : (watchMatch ? watchMatch[1] : null);
}

function ExploreReels() {
  const [reels, setReels] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [allReels, setAllReels] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

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
  // Icon map for categories
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

  useEffect(() => {
    fetch('/data/reelfeed.json')
      .then(res => res.json())
      .then(data => {
        // Accept both reel_url and video_url for all categories
        const filtered = data.filter(r =>
          (r.reel_url && getShortsId(r.reel_url)) ||
          (r.video_url && getShortsId(r.video_url))
        );
        setAllReels(filtered);
        setReels(filtered);
      });
  }, []);

  // Filter reels by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setReels(allReels);
      setCurrentIdx(0);
    } else {
      const normalized = selectedCategory
        .replace(/ & /g, '_')
        .replace(/\s+/g, '_')
        .toLowerCase();
      const filtered = allReels.filter(r => {
        const tag = (r.tag || r.category || '').replace(/ & /g, '_').replace(/\s+/g, '_').toLowerCase();
        return tag === normalized;
      });
      setReels(filtered);
      setCurrentIdx(0);
    }
    setShowDescription(false);
  }, [selectedCategory, allReels]);

  // Reset like/save state on reel change
  useEffect(() => {
    setLiked(false);
    setSaved(false);
  }, [currentIdx, selectedCategory]);

  const handleNext = React.useCallback(() => {
    setCurrentIdx(idx => (idx + 1 < reels.length ? idx + 1 : 0));
    setShowDescription(false); // Hide description on next reel
  }, [reels.length]);

  function actionButtonStyle(bg, borderColor, shadowColor, border = true) {
    return {
      background: bg,
      color: borderColor,
      border: border ? `2px solid ${borderColor}` : 'none',
      borderRadius: '50%',
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      cursor: 'pointer',
      boxShadow: `0 2px 8px ${shadowColor}`,
      transition: 'all 0.15s'
    };
  }



  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext]);

  // Scroll navigation (wheel/touch)
  useEffect(() => {
    let ticking = false;
    const onWheel = (e) => {
      if (!ticking) {
        if (e.deltaY > 30) {
          ticking = true;
          handleNext();
          setTimeout(() => { ticking = false; }, 600); // debounce
        } else if (e.deltaY < -30) {
          ticking = true;
          setCurrentIdx(idx => (idx - 1 >= 0 ? idx - 1 : reels.length - 1));
          setShowDescription(false);
          setTimeout(() => { ticking = false; }, 600);
        }
      }
      e.preventDefault();
    };
    const container = document.getElementById('reel-scroll-container');
    if (container) {
      container.addEventListener('wheel', onWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener('wheel', onWheel);
    };
  }, [handleNext, reels.length]);

  // Infinite scroll: load more data when scrolled to bottom
  useEffect(() => {
    const container = document.getElementById('reel-scroll-container');
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >= container.scrollHeight - 10 &&
        !loadingMore
      ) {
        setLoadingMore(true);
        // Simulate loading more data (repeat the same data for demo)
        setTimeout(() => {
          setAllReels(prev => [...prev, ...prev]);
          setReels(prev => [...prev, ...prev]);
          setLoadingMore(false);
        }, 800);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [loadingMore]);

  const currentReel = reels[currentIdx];
  const videoUrl = currentReel
    ? currentReel.reel_url || currentReel.video_url
    : null;
  const shortsId = videoUrl ? getShortsId(videoUrl) : null;
  const isFirstReel = currentIdx === 0;

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          background: '#181818',
          height: 'calc(100vh - 63px)',
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden',
          boxSizing: 'border-box',
          flexWrap: 'nowrap',
        }}
      >
        <Sidebar />
        <div>
          {/* Category Bar */}
          <div
            className="no-scrollbar"
            style={{
              width: '100%',
              margin: 0,
              paddingLeft: 2,
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 8, // smaller space between buttons
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '4px 0 6px', // very minimal vertical padding
              background: '#1a1a1a',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              height: 50, // reduced height
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
                  borderRadius: 16, // slightly smaller radius
                  padding: '4px 12px', // tighter button padding
                  fontWeight: 500,
                  fontSize: 14, // smaller text
                  cursor: 'pointer',
                  boxShadow:
                    selectedCategory === cat
                      ? '0 2px 6px #6C63FF33'
                      : '0 1px 3px #0001',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4, // reduced icon-text space
                  whiteSpace: 'nowrap',
                  minWidth: 90, // even more compact
                  outline: selectedCategory === cat ? '2px solid #6C63FF' : 'none',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: 14 }}>{categoryIcons[cat]}</span>
                <span style={{ fontSize: 13 }}>{cat}</span>
              </button>
            ))}
          </div>



          <main
            style={{
              width: '100%',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 0,
              height: '100vh',
              overflow: 'hidden',
              backgroundColor: '#181818'
            }}
          >
            <div
              id="reel-scroll-container"
              style={{
                flex: 1,
                width: '100%',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollSnapType: 'y mandatory',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
                background: '#181818'
              }}
            >
              {currentReel && (
                <section
                  key={currentReel.id || currentIdx}
                  style={{
                    width: '100%',
                    height: 'calc(100vh - 110px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    scrollSnapAlign: 'start',
                    position: 'relative',
                    overflow: 'hidden',
                    flexDirection: 'column'
                  }}
                >
                  {/* Reel Video */}
                  <div style={{
                    width: 'min(90vw, 320px)',
                    aspectRatio: '9 / 16',
                    borderRadius: 18,
                    overflow: 'hidden',
                    background: '#111',
                    boxShadow: '0 8px 32px #000a, 0 1.5px 8px #0007',
                    position: 'relative'
                  }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={shortsId ? `https://www.youtube.com/embed/${shortsId}?autoplay=1&mute=${isFirstReel ? 1 : 0}&playsinline=1` : ''}
                      title={currentReel?.title || 'Reel'}
                      frameBorder="0"
                      allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        border: 'none',
                        background: '#000',
                        display: 'block'
                      }}
                    />
                  </div>





                  {/* Bottom-left Overlay: Title + Description + Audio + Profile */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                    color: '#fff',
                    fontSize: 13,
                    maxWidth: '65vw',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    zIndex: 10
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: 700,
                      fontSize: 20,
                      color: '#fff'
                    }}>
                      {currentReel?.title}
                    </div>
                    {/* Action Buttons (Bottom left, below title) */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      margin: '8px 0 4px 0'
                    }}>
                      <button
                        title="Like"
                        onClick={() => setLiked(l => !l)}
                        style={{
                          background: '#fff',
                          color: '#e0245e',
                          border: '2px solid #e0245e',
                          borderRadius: '50%',
                          width: 38,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px #e0245e22',
                          transition: 'all 0.15s'
                        }}
                      >
                        {liked ? '❤️' : '🤍'}
                      </button>
                      <button
                        title="Save"
                        onClick={() => setSaved(s => !s)}
                        style={{
                          background: saved ? '#7c5cff' : '#fff',
                          color: saved ? '#fff' : '#7c5cff',
                          border: saved ? 'none' : '2px solid #7c5cff',
                          borderRadius: '50%',
                          width: 38,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px #7c5cff33',
                          transition: 'all 0.15s'
                        }}
                      >
                        {saved ? '🔖' : '📑'}
                      </button>
                      <button
                        title="Skip"
                        onClick={handleNext}
                        style={{
                          background: '#fff',
                          color: '#7c5cff',
                          border: '2px solid #7c5cff',
                          borderRadius: '50%',
                          width: 38,
                          height: 38,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 18,
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px #7c5cff22',
                          transition: 'all 0.15s'
                        }}
                      >➡️</button>
                    </div>
                    <div style={{
                      fontSize: 16, // increased font size
                      color: '#ccc',
                      lineHeight: 1.4,
                      wordBreak: 'break-word',
                      maxHeight: '3em',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <span style={{ fontWeight: 700, color: '#fff', marginRight: 8 }}>Description:</span>
                      {showDescription
                        ? currentReel.description
                        : (currentReel.description?.slice(0, 80) || '') + (currentReel.description?.length > 80 ? '...' : '')}
                      {currentReel.description?.length > 80 && (
                        <button
                          onClick={() => setShowDescription(v => !v)}
                          style={{
                            background: 'none',
                            color: '#6C63FF',
                            border: 'none',
                            fontWeight: 500,
                            fontSize: 13,
                            cursor: 'pointer',
                            marginLeft: 6
                          }}
                        >
                          {showDescription ? 'less' : 'more'}
                        </button>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </main>


        </div>
      </div>
    </>
  );
}

export default ExploreReels;
