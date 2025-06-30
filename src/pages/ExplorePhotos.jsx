import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import styles from '../ExplorePhotos.module.css';
import { useLocation } from 'react-router-dom';

// Icon map for categories
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

// Utility to get and set liked/saved photos in localStorage
function getLikedPhotosFromStorage() {
  try {
    const data = localStorage.getItem('likedPhotos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveLikedPhotosToStorage(photos) {
  try {
    localStorage.setItem('likedPhotos', JSON.stringify(photos));
  } catch { }
}
function getSavedPhotosFromStorage() {
  try {
    const data = localStorage.getItem('savedPhotos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveSavedPhotosToStorage(photos) {
  try {
    localStorage.setItem('savedPhotos', JSON.stringify(photos));
  } catch { }
}

function ExplorePhotos() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalPhoto, setModalPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Reset liked/saved when modalPhoto changes
  useEffect(() => {
    if (modalPhoto) {
      setLiked(false);
      setSaved(false);
    }
  }, [modalPhoto]);

  // Update searchTerm when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
  }, [location.search]);

  useEffect(() => {
    fetch('/data/photofeed.json')
      .then(res => res.json())
      .then(data => {
        // Map JSON fields to match the card structure
        const mapped = data
          .filter(photo => photo.image_url) // skip empty entries
          .map(photo => ({
            id: photo.id || photo.image_url, // fallback to url if no id
            url: photo.image_url,
            title: photo.title || '',
            caption: photo.description || '',
            likes: Math.floor(Math.random() * 200) + 10, // random likes for demo
            comments: Math.floor(Math.random() * 30), // random comments for demo
            date: '',
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90) + 1}.jpg`, // random avatar
            category: photo.tag ? photo.tag.charAt(0).toUpperCase() + photo.tag.slice(1) : 'All',
          }));
        setPhotos(mapped);
      });
  }, []);

  // Infinite scroll: load more when scrolled to bottom
  useEffect(() => {
    const handleScroll = () => {
      const container = document.scrollingElement || document.documentElement;
      if (
        container.scrollHeight - container.scrollTop - container.clientHeight < 40
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // When page increases, append more photos (repeat data)
  useEffect(() => {
    if (page === 1) return;
    fetch('/data/photofeed.json')
      .then(res => res.json())
      .then(data => {
        const mapped = data
          .filter(photo => photo.image_url)
          .map(photo => ({
            id: `${photo.id || photo.image_url}-page${page}-${Math.random()}`,
            url: photo.image_url,
            title: photo.title || '',
            caption: photo.description || '',
            likes: Math.floor(Math.random() * 200) + 10,
            comments: Math.floor(Math.random() * 30),
            date: '',
            avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90) + 1}.jpg`,
            category: photo.tag ? photo.tag.charAt(0).toUpperCase() + photo.tag.slice(1) : 'All',
          }));
        setPhotos(prev => [...prev, ...mapped]);
      });
  }, [page]);

  // When modalPhoto changes, check if it's already liked/saved
  useEffect(() => {
    if (modalPhoto) {
      const likedPhotos = getLikedPhotosFromStorage();
      setLiked(likedPhotos.some(p => p.id === modalPhoto.id));
      const savedPhotos = getSavedPhotosFromStorage();
      setSaved(savedPhotos.some(p => p.id === modalPhoto.id));
    }
  }, [modalPhoto]);

  // Fuzzy match: case-insensitive substring match
  function isMatch(title, search) {
    if (!search) return true;
    if (!title) return false;
    return title.toLowerCase().includes(search.toLowerCase());
  }

  const filteredPhotos = photos.filter(photo => {
    // Category filter
    const categoryOk = activeCategory === 'All' || photo.category === activeCategory;
    // Search filter
    const searchOk = isMatch(photo.title, searchTerm);
    return categoryOk && searchOk;
  });

  // Like handler: Save liked photo to localStorage
  function handleLike(photo) {
    let likedPhotos = getLikedPhotosFromStorage();
    if (!likedPhotos.some(p => p.id === photo.id)) {
      likedPhotos.push(photo);
      saveLikedPhotosToStorage(likedPhotos);
    }
    setLiked(true);
  }

  function handleUnlike(photo) {
    let likedPhotos = getLikedPhotosFromStorage();
    likedPhotos = likedPhotos.filter(p => p.id !== photo.id);
    saveLikedPhotosToStorage(likedPhotos);
    setLiked(false);
  }

  // Save handler: Save photo to savedPhotos in localStorage
  function handleSave(photo) {
    let savedPhotos = getSavedPhotosFromStorage();
    if (!savedPhotos.some(p => p.id === photo.id)) {
      savedPhotos.push(photo);
      saveSavedPhotosToStorage(savedPhotos);
    }
    setSaved(true);
  }

  function handleUnsave(photo) {
    let savedPhotos = getSavedPhotosFromStorage();
    savedPhotos = savedPhotos.filter(p => p.id !== photo.id);
    saveSavedPhotosToStorage(savedPhotos);
    setSaved(false);
  }

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', background: '#fafafa' }}>
        {/* Sidebar: fixed so it doesn't scroll with main feed, no scroll inside sidebar */}




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
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? '#6C63FF' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#181818',
                  border: 'none',
                  borderRadius: 16,
                  padding: '4px 12px',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow:
                    activeCategory === cat
                      ? '0 2px 6px #6C63FF33'
                      : '0 1px 3px #0001',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                  minWidth: 90,
                  outline: activeCategory === cat ? '2px solid #6C63FF' : 'none',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: 14 }}>{categoryIcons[cat]}</span>
                <span style={{ fontSize: 13 }}>{cat}</span>
              </button>
            ))}
          </div>

          <main style={{ maxWidth: 1300, width: '100%', padding: '0 0px', margin: "16px 16px" }}>
            <div
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
              {filteredPhotos.map(photo => (
                <div
                  key={photo.id}
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    cursor: 'zoom-in',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    minHeight: 200,
                    border: '1px solid #ececec',
                  }}
                  onClick={() => setModalPhoto(photo)}
                  onMouseOver={e => e.currentTarget.style.boxShadow = '0 6px 32px rgba(0,0,0,0.13)'
                  }
                  onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.08)'}
                >
                  <div style={{
                    width: '100%',
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                  }}>
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 0,
                        background: '#eee'
                      }}
                    />
                    <img
                      src={photo.avatar}
                      alt="avatar"
                      style={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        boxShadow: '0 2px 8px #0002'
                      }}
                    />
                  </div>
                  <div style={{ padding: '2px 10px 1px', width: '100%' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        color: '#222',
                        fontWeight: 600,
                        // lineHeight: 1.3,
                        textAlign: 'center',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.01) 0%, rgba(40,40,40,0.35) 30%, rgba(0, 0, 0, 0.55) 100%)', boxShadow: '0 2px 8px #6C63FF22',
                        borderRadius: 12,
                        padding: '8px 0',
                        width: '100%',
                        display: 'inline-block',
                        marginBottom: '0px',
                      }}
                    >
                      {photo.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            {/* Show modal with big picture when a photo is clicked */}
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
                    width: 'auto',
                    height: 'auto',
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
                  {/* Left: Title, Image, Bottom bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Title at top */}
                    <div style={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 22,
                      textAlign: 'center',
                      padding: '16px 24px 8px 24px',
                      background: 'rgba(0,0,0,0.45)',
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      width: '50vw',
                      maxWidth: '50vw'
                    }}>
                      {modalPhoto.title}
                    </div>
                    {/* Big Image */}
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'rgba(0,0,0,0.01)'
                      }}
                    >
                      <img
                        src={modalPhoto.url}
                        alt={modalPhoto.caption}
                        style={{
                          width: '50vw',
                          height: '28vw',
                          maxWidth: '50vw',
                          maxHeight: '60vh',
                          borderRadius: 0,
                          display: 'block',
                          margin: '0 auto',
                          objectFit: 'contain',
                          background: '#000'
                        }}
                      />
                    </div>
                    {/* Bottom bar for symmetry, show caption */}
                    <div style={{
                      color: '#fff',
                      fontSize: 16,
                      textAlign: 'center',
                      padding: '12px 24px 18px 24px',
                      background: 'rgba(0,0,0,0.45)',
                      borderBottomLeftRadius: 16,
                      borderBottomRightRadius: 16,
                      width: '50vw',
                      maxWidth: '50vw'
                    }}>
                      {modalPhoto.caption}
                    </div>
                  </div>
                  {/* Right: Like, Save, Skip buttons beside the zoomed photo */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 28,
                    marginLeft: 32,
                    minWidth: 0
                  }}>
                    <button
                      onClick={() => liked ? handleUnlike(modalPhoto) : handleLike(modalPhoto)}
                      style={{
                        background: liked ? '#e0245e' : '#fff',
                        color: liked ? '#fff' : '#e0245e',
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
                      {liked ? '❤️' : '🤍'}
                    </button>
                    <button
                      onClick={() => saved ? handleUnsave(modalPhoto) : handleSave(modalPhoto)}
                      style={{
                        background: saved ? '#7c5cff' : '#fff',
                        color: saved ? '#fff' : '#7c5cff',
                        border: saved ? 'none' : '2px solid #7c5cff',
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
                      {saved ? '🔖' : '📑'}
                    </button>
                    <button
                      onClick={() => {
                        // Skip logic: close modal and show next photo
                        const idx = filteredPhotos.findIndex(
                          (p) => p.id === modalPhoto.id
                        );
                        if (idx >= 0 && idx < filteredPhotos.length - 1) {
                          setModalPhoto(filteredPhotos[idx + 1]);
                        } else {
                          setModalPhoto(null);
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
                  {/* Close button in top right corner */}
                  <button
                    onClick={() => setModalPhoto(null)}
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
            {/* <PhotoModal photo={modalPhoto} onClose={() => setModalPhoto(null)} /> */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ExplorePhotos;
