import React, { useEffect, useState } from 'react'; import Post from './Post';

// const dummyPosts = [
//   {
//     username: 'alice',
//     img: 'https://randomuser.me/api/portraits/women/1.jpg',
//     postImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80',
//     caption: 'Beautiful day!',
//   },
//   {
//     username: 'bob',
//     img: 'https://randomuser.me/api/portraits/men/2.jpg',
//     postImg: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80',
//     caption: 'Enjoying the view.',
//   },
// ];

function Feed({ selectedCategories = [] }) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch('/data/photofeed.json')
      .then(res => res.json())
      .then(data => setPhotos(data));
  }, []);

  // Filter photos by selected categories (tag)
  const filteredPhotos = React.useMemo(() => {
    if (!selectedCategories || selectedCategories.length === 0) return photos;
    // Normalize category names to match tags in JSON
    const normalized = selectedCategories.map(c => c.toLowerCase().replace(/ /g, '_'));
    return photos.filter(photo => normalized.includes(photo.tag));
  }, [photos, selectedCategories]);

  return (
    <main style={{ flex: 1, maxWidth: 600, margin: '0 auto', padding: '24px 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 24,
        padding:32,
        width: '90%',
        boxSizing: 'border-box',
      }}>
        {filteredPhotos.map(photo => (
          <div key={photo.id} style={{
  background: 'rgba(255, 255, 255, 0.6)',
  borderRadius: 16,
  boxShadow: '0 8px 24px rgb(0, 0, 0)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(6px)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
}}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-4px)';
    e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,255,255,0.35)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,255,255,0.3)';
  }}
>
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                background: '#eee',
                overflow: 'hidden',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                cursor: 'pointer',
              }}
            >
              <img
                src={photo.image_url}
                alt={photo.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            <div style={{ padding: '16px 14px 12px 14px' }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{photo.title}</div>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{photo.description}</div>
              <div style={{
                fontSize: 13,
                color: '#a259ff',
                fontWeight: 600,
                marginTop: 2,
                textTransform: 'capitalize'
              }}>{photo.tag.replace(/_/g, ' ')}</div>
            </div>
          </div>
        ))}
        {filteredPhotos.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: 18, marginTop: 40 }}>
            No posts found for your selected categories.
          </div>
        )}
      </div>
    </main>
  );
}

export default Feed;
