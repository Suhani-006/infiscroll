import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function Sidebar() {
  const [dark, setDark] = useState(false);
  const [showExplore, setShowExplore] = useState(() => JSON.parse(localStorage.getItem('showExplore')) || false);
  const [showLikes, setShowLikes] = useState(() => JSON.parse(localStorage.getItem('showLikes')) || false);
  const [showSaved, setShowSaved] = useState(() => JSON.parse(localStorage.getItem('showSaved')) || false);

  useEffect(() => {
    localStorage.setItem('showExplore', showExplore);
  }, [showExplore]);

  useEffect(() => {
    localStorage.setItem('showLikes', showLikes);
  }, [showLikes]);

  useEffect(() => {
    localStorage.setItem('showSaved', showSaved);
  }, [showSaved]);



  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper to check if a route is active
  const isActive = (route) => currentPath === route;

  // Helper to check if a group is open based on current path
  const isGroupActive = (prefix) => currentPath.startsWith(prefix);

  return (
    <aside
      style={{
        width: 270,
        marginRight: 10,
        padding: '10px 0 0 0',
        borderRight: '1px solid #ececec',
        height: '100%',
        minHeight: '5%',
        position: 'sticky', // changed from 'fixed' to 'relative'
        left: 0,
        top: 0,
        background: dark ? '#18191a' : '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 120,
      }}
    >
      <nav style={{ flex: 1, overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 17 }}>
          {/* Home */}
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              margin: '18px 0',
              padding: '0 32px',
              color: isActive('/') ? '#7b3ff2' : '#222',
              fontWeight: isActive('/') ? 700 : 500,
              background: isActive('/') ? '#f5f3ff' : undefined,
              borderRadius: isActive('/') ? 8 : undefined,
              border: isActive('/') ? '1px solid #e0d7fa' : undefined,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') navigate('/');
            }}
          >
            <svg width="22" height="22" fill="none" stroke={isActive('/') ? "#7b3ff2" : "#222"} strokeWidth="2">
              <path d="M3 10.5L11 4l8 6.5V19a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V10.5z" stroke={isActive('/') ? "#7b3ff2" : "#222"} />
            </svg>
            Home
          </li>
          {/* Explore (expandable) */}
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              margin: '18px 0',
              padding: '0 32px',
              // REMOVE highlight from Explore group
              background: undefined,
              borderRadius: undefined,
              color: '#222',
              fontWeight: 500,
              border: undefined,
              position: 'relative',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setShowExplore((v) => !v)}
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') setShowExplore(v => !v);
            }}
          >
            <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2">
              <circle cx="11" cy="11" r="9" />
              <path d="M11 7v4l3 2" />
            </svg>
            Explore
            <span style={{ marginLeft: 'auto', fontSize: 16, color: '#aaa', transform: showExplore ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▶
            </span>
          </li>
          {/* Sub-items under Explore */}
          {showExplore && (
            <>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/explore/reels') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/explore/reels') ? 700 : 500,
                  background: isActive('/explore/reels') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/explore/reels') ? 8 : undefined,
                  border: isActive('/explore/reels') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/explore/reels')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/explore/reels') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <rect x="2" y="4" width="14" height="10" rx="2" />
                  <rect x="6" y="7" width="6" height="4" rx="1" />
                </svg>
                Reels
              </li>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/explore/photos') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/explore/photos') ? 700 : 500,
                  background: isActive('/explore/photos') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/explore/photos') ? 8 : undefined,
                  border: isActive('/explore/photos') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/explore/photos')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/explore/photos') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <rect x="2" y="2" width="14" height="14" rx="3" />
                  <circle cx="7" cy="7" r="2" />
                  <path d="M14 14l-4-4" />
                </svg>
                Photos
              </li>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/explore/videos') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/explore/videos') ? 700 : 500,
                  background: isActive('/explore/videos') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/explore/videos') ? 8 : undefined,
                  border: isActive('/explore/videos') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/explore/videos')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/explore/videos') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <polygon points="6,4 14,9 6,14" />
                </svg>
                Videos
              </li>
            </>
          )}
          {/* Likes (expandable) */}
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              margin: '22px 0 0 0',
              padding: '0 32px',
              // REMOVE highlight from Likes group
              background: undefined,
              borderRadius: undefined,
              color: '#222',
              fontWeight: 500,
              border: undefined,
              position: 'relative',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setShowLikes((v) => !v)}
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') setShowLikes(v => !v);
            }}
          >
            <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2">
              <path d="M16.5 3.5a5.5 5.5 0 0 1 0 7.78L11 16.78l-5.5-5.5a5.5 5.5 0 1 1 7.78-7.78l.72.72.72-.72a5.5 5.5 0 0 1 7.78 0z" />
            </svg>
            Likes
            <span style={{ marginLeft: 'auto', fontSize: 16, color: '#aaa', transform: showLikes ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▶
            </span>
          </li>
          {showLikes && (
            <>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/likes/reels') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/likes/reels') ? 700 : 500,
                  background: isActive('/likes/reels') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/likes/reels') ? 8 : undefined,
                  border: isActive('/likes/reels') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/likes/reels')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/likes/reels') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <rect x="2" y="4" width="14" height="10" rx="2" />
                  <rect x="6" y="7" width="6" height="4" rx="1" />
                </svg>
                Reels
              </li>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/likes/photos') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/likes/photos') ? 700 : 500,
                  background: isActive('/likes/photos') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/likes/photos') ? 8 : undefined,
                  border: isActive('/likes/photos') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/likes/photos')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/likes/photos') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <rect x="2" y="2" width="14" height="14" rx="3" />
                  <circle cx="7" cy="7" r="2" />
                  <path d="M14 14l-4-4" />
                </svg>
                Photos
              </li>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/likes/videos') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/likes/videos') ? 700 : 500,
                  background: isActive('/likes/videos') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/likes/videos') ? 8 : undefined,
                  border: isActive('/likes/videos') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/likes/videos')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/likes/videos') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <polygon points="6,4 14,9 6,14" />
                </svg>
                Videos
              </li>
            </>
          )}
          {/* Saved (expandable) */}
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              margin: '22px 0 0 0',
              padding: '0 32px',
              // REMOVE highlight from Saved group
              background: undefined,
              borderRadius: undefined,
              color: '#222',
              fontWeight: 500,
              border: undefined,
              position: 'relative',
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onClick={() => setShowSaved((v) => !v)}
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === 'Enter' || e.key === ' ') setShowSaved(v => !v);
            }}
          >
            <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2">
              <path d="M5 3h12a2 2 0 0 1 2 2v14l-8-5-8 5V5a2 2 0 0 1 2-2z" />
            </svg>
            Saved
            <span style={{ marginLeft: 'auto', fontSize: 16, color: '#aaa', transform: showSaved ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▶
            </span>
          </li>
          {showSaved && (
            <>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/saved/reels') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/saved/reels') ? 700 : 500,
                  background: isActive('/saved/reels') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/saved/reels') ? 8 : undefined,
                  border: isActive('/saved/reels') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/saved/reels')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/saved/reels') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <rect x="2" y="4" width="14" height="10" rx="2" />
                  <rect x="6" y="7" width="6" height="4" rx="1" />
                </svg>
                Reels
              </li>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/saved/photos') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/saved/photos') ? 700 : 500,
                  background: isActive('/saved/photos') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/saved/photos') ? 8 : undefined,
                  border: isActive('/saved/photos') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/saved/photos')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/saved/photos') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <rect x="2" y="2" width="14" height="14" rx="3" />
                  <circle cx="7" cy="7" r="2" />
                  <path d="M14 14l-4-4" />
                </svg>
                Photos
              </li>
              <li
                style={{
                  margin: '8px 0 0 48px',
                  color: isActive('/saved/videos') ? '#7b3ff2' : '#444',
                  fontWeight: isActive('/saved/videos') ? 700 : 500,
                  background: isActive('/saved/videos') ? '#f5f3ff' : undefined,
                  borderRadius: isActive('/saved/videos') ? 8 : undefined,
                  border: isActive('/saved/videos') ? '1px solid #e0d7fa' : undefined,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/saved/videos')}
              >
                <svg width="18" height="18" fill="none" stroke={isActive('/saved/videos') ? "#7b3ff2" : "#888"} strokeWidth="2">
                  <polygon points="6,4 14,9 6,14" />
                </svg>
                Videos
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;