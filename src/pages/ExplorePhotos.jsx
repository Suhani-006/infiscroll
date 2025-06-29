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

function ExplorePhotos() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [modalPhoto, setModalPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);
  // Add state for liked and saved
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



        <div style={{ flex: 1, padding: '0px 0', display: 'flex', justifyContent: 'center', overflowY: 'auto' , marginLeft: '280px', marginRight: '16px'}}>
          <main className={styles['explore-root']} style={{ maxWidth: 1200, width: '100%' }}>
            {/* Category Bar */}
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

            <div className={styles['masonry-grid']}>
              {filteredPhotos.map(photo => (
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
                  {/* Left: Image and description */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Name at top */}
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
                          height: 'auto',
                          maxWidth: '50vw',
                          maxHeight: '70vh',
                          borderRadius: 0,
                          display: 'block',
                          margin: '0 auto',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                    {/* Description at bottom */}
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
                      onClick={() => setLiked(l => !l)}
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
                      onClick={() => setSaved(s => !s)}
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
