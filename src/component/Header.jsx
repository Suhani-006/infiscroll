// Header component for infiScroll app
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleDark = () => setDark((d) => !d);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/explore/photos?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleUploadClick = () => {
    if (toast.isActive('upload-toast')) return;
    toast.info('This feature not available currently', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      style: {
        fontWeight: 600,
        fontSize: 16,
      },
      icon: "🚫",
      toastId: 'upload-toast'
    });
  };

  // Responsive styles
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px 8px 20px',
    borderBottom: '1px solid #ececec',
    background: dark ? '#222' : '#fff',
    color: dark ? '#fff' : '#222',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    minHeight: 35,
    transition: 'background 0.2s, color 0.2s',
  };

  const logoStyle = {
    cursor: 'pointer',
    display: 'inline-block',
    minWidth: 120,
  };

  const searchBarWrapper = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    margin: '0 16px',
    maxWidth: 500,
  };

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    background: dark ? '#23272f' : '#f5f6fa',
    borderRadius: 10,
    padding: '0 12px',
    height: 40,
    minWidth: 180,
    maxWidth: 420,
    width: '100%',
    boxShadow: 'none',
    border: '1px solid #ececec',
    transition: 'background 0.2s',
  };

  const rightButtonsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginLeft: 12,
  };

  // Responsive: Hide search and right buttons on mobile, show hamburger
  const mobileBreakpoint = 700;
  const isMobile = window.innerWidth < mobileBreakpoint;

  return (
    <>
      <ToastContainer />
      <header style={headerStyle}>
        {/* Logo */}
        <div
          style={logoStyle}
          onClick={() => navigate('/')}
          title="Go to Home"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #a259ff 0%, #f24e1e 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px #a259ff22',
              }}
            >
              {/* Play icon SVG */}
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                <circle cx="11" cy="11" r="11" fill="#fff" />
                <polygon points="9,7 16,11 9,15" fill="#a259ff" />
              </svg>
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 20,
                background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 0.5,
                userSelect: 'none',
              }}
            >
              infiScroll
            </span>
          </div>
        </div>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setShowMobileMenu((v) => !v)}
          style={{
            display: isMobile ? 'flex' : 'none',
            background: 'none',
            border: 'none',
            fontSize: 28,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 8,
            color: 'inherit',
          }}
          aria-label="Open menu"
        >
          <span style={{ fontSize: 28 }}>☰</span>
        </button>

        {/* Search Bar */}
        <div style={{ ...searchBarWrapper, display: isMobile ? 'none' : 'flex' }}>
          <div style={searchBarStyle}>
            <svg width="18" height="18" fill="none" style={{ opacity: 0.5, marginRight: 8 }}>
              <circle cx="8" cy="8" r="7" stroke="#888" strokeWidth="2" />
              <line x1="13" y1="13" x2="17" y2="17" stroke="#888" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search reels, photos, videos..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 15,
                width: '100%',
                color: dark ? '#fff' : '#222',
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 8,
                color: '#a259ff',
                fontSize: 18,
                fontWeight: 700,
              }}
              title="Search"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Right Side Buttons */}
        <div style={{ ...rightButtonsStyle, display: isMobile ? 'none' : 'flex' }}>
          {/* Upload Button */}
          <button
            onClick={handleUploadClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
              border: 'none',
              borderRadius: 10,
              padding: '7px 18px',
              fontWeight: 600,
              fontSize: 15,
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 2px 8px #a259ff22',
              position: 'relative',
              transition: 'background 0.2s',
            }}
            title="Upload"
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              marginRight: 4,
            }}>+</span>
            Upload
          </button>

          {/* Notification */}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                color: 'inherit',
                padding: 0,
                position: 'relative',
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              title="Notifications"
              onClick={() => {
                if (toast.isActive('notification-toast')) return;
                toast.info('This feature not available currently', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  style: {
                    fontWeight: 600,
                    fontSize: 16,
                  },
                  icon: "🚫",
                  toastId: 'notification-toast'
                });
              }}
            >
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" style={{ color: dark ? '#fff' : '#222' }}>
                <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z" stroke="currentColor" />
              </svg>
            </button>
          </div>

          {/* Dark/Light Mode */}
          <button
            onClick={toggleDark}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 22,
              cursor: 'pointer',
              color: 'inherit',
              padding: 0,
              borderRadius: '50%',
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            title="Toggle dark/light mode"
          >
            {dark ? (
              <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="11" cy="11" r="5" stroke="#fff" />
                <path d="M11 1v2M11 19v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 11h2M19 11h2M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42" stroke="#fff" />
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="#222" />
              </svg>
            )}
          </button>

          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <button
              style={{
                background: 'none',
                border: '2px solid #ececec',
                fontSize: 22,
                cursor: 'pointer',
                borderRadius: '50%',
                width: 42,
                height: 42,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit',
                transition: 'border 0.2s',
                position: 'relative',
              }}
              title="Profile"
              onClick={() => setShowProfileDropdown((v) => !v)}
              tabIndex={0}
            >
              <svg width="26" height="26" fill="none" stroke="#888" strokeWidth="2">
                <circle cx="13" cy="9" r="4" stroke="currentColor" />
                <ellipse cx="13" cy="18" rx="7" ry="4" stroke="currentColor" />
              </svg>
            </button>
            {/* Dropdown */}
            {showProfileDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 48,
                  right: 0,
                  background: dark ? '#23272f' : '#fff',
                  color: dark ? '#fff' : '#222',
                  border: '1px solid #ececec',
                  borderRadius: 10,
                  boxShadow: '0 4px 16px #0002',
                  minWidth: 140,
                  zIndex: 1000,
                  padding: '8px 0',
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                <div
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                  }}
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate('/profile');
                  }}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') { setShowProfileDropdown(false); navigate('/profile'); } }}
                >
                  Profile
                </div>
                <div
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                  }}
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate('/settings');
                  }}
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') { setShowProfileDropdown(false); navigate('/settings'); } }}
                >
                  Setting
                </div>
                <div
                  style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    color: '#f24e1e',
                    transition: 'background 0.15s',
                  }}
                  onClick={() => {
                    setShowProfileDropdown(false);
                    localStorage.removeItem('user');
                    navigate('/login');
                  }}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setShowProfileDropdown(false);
                      localStorage.removeItem('user');
                      navigate('/login');
                    }
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && showMobileMenu && (
          <div
            style={{
              position: 'fixed',
              top: 60,
              left: 0,
              width: '100vw',
              background: dark ? '#23272f' : '#fff',
              color: dark ? '#fff' : '#222',
              boxShadow: '0 4px 24px #0002',
              zIndex: 999,
              padding: '18px 0 12px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
              animation: 'fadeIn 0.2s',
            }}
          >
            <div style={{ width: '90%', marginBottom: 10 }}>
              <div style={searchBarStyle}>
                <svg width="18" height="18" fill="none" style={{ opacity: 0.5, marginRight: 8 }}>
                  <circle cx="8" cy="8" r="7" stroke="#888" strokeWidth="2" />
                  <line x1="13" y1="13" x2="17" y2="17" stroke="#888" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search reels, photos, videos..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleSearch();
                      setShowMobileMenu(false);
                    }
                  }}
                  style={{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: 15,
                    width: '100%',
                    color: dark ? '#fff' : '#222',
                  }}
                />
                <button
                  onClick={() => {
                    handleSearch();
                    setShowMobileMenu(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    marginLeft: 8,
                    color: '#a259ff',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                  title="Search"
                >
                  🔍
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                handleUploadClick();
                setShowMobileMenu(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
                border: 'none',
                borderRadius: 10,
                padding: '7px 18px',
                fontWeight: 600,
                fontSize: 15,
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #a259ff22',
                position: 'relative',
                transition: 'background 0.2s',
                width: '90%',
                margin: '0 auto',
              }}
              title="Upload"
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 700,
                marginRight: 4,
              }}>+</span>
              Upload
            </button>
            <button
              onClick={() => {
                if (!toast.isActive('notification-toast')) {
                  toast.info('This feature not available currently', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    style: {
                      fontWeight: 600,
                      fontSize: 16,
                    },
                    icon: "🚫",
                    toastId: 'notification-toast'
                  });
                }
                setShowMobileMenu(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                color: 'inherit',
                padding: 0,
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              title="Notifications"
            >
              <svg width="24" height="24" fill="none" stroke="#222" strokeWidth="2" style={{ color: dark ? '#fff' : '#222' }}>
                <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z" stroke="currentColor" />
              </svg>
            </button>
            <button
              onClick={() => {
                toggleDark();
                setShowMobileMenu(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                color: 'inherit',
                padding: 0,
                borderRadius: '50%',
                width: 38,
                height: 38,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              title="Toggle dark/light mode"
            >
              {dark ? (
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2">
                  <circle cx="11" cy="11" r="5" stroke="#fff" />
                  <path d="M11 1v2M11 19v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 11h2M19 11h2M4.22 17.78l1.42-1.42M16.36 5.64l1.42-1.42" stroke="#fff" />
                </svg>
              ) : (
                <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="#222" />
                </svg>
              )}
            </button>
            <div style={{ width: '90%' }}>
              <button
                onClick={() => {
                  setShowProfileDropdown((v) => !v);
                  setShowMobileMenu(false);
                }}
                style={{
                  background: 'none',
                  border: '2px solid #ececec',
                  fontSize: 22,
                  cursor: 'pointer',
                  borderRadius: '50%',
                  width: 42,
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'inherit',
                  transition: 'border 0.2s',
                  position: 'relative',
                  margin: '0 auto',
                }}
                title="Profile"
                tabIndex={0}
              >
                <svg width="26" height="26" fill="none" stroke="#888" strokeWidth="2">
                  <circle cx="13" cy="9" r="4" stroke="currentColor" />
                  <ellipse cx="13" cy="18" rx="7" ry="4" stroke="currentColor" />
                </svg>
              </button>
              {showProfileDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: 48,
                    right: 0,
                    left: 0,
                    background: dark ? '#23272f' : '#fff',
                    color: dark ? '#fff' : '#222',
                    border: '1px solid #ececec',
                    borderRadius: 10,
                    boxShadow: '0 4px 16px #0002',
                    minWidth: 140,
                    zIndex: 1000,
                    padding: '8px 0',
                    fontWeight: 500,
                    fontSize: 16,
                  }}
                >
                  <div
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/profile');
                    }}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter') { setShowProfileDropdown(false); navigate('/profile'); } }}
                  >
                    Profile
                  </div>
                  <div
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate('/settings');
                    }}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter') { setShowProfileDropdown(false); navigate('/settings'); } }}
                  >
                    Setting
                  </div>
                  <div
                    style={{
                      padding: '10px 20px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      color: '#f24e1e',
                      transition: 'background 0.15s',
                    }}
                    onClick={() => {
                      setShowProfileDropdown(false);
                      localStorage.removeItem('user');
                      navigate('/login');
                    }}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        setShowProfileDropdown(false);
                        localStorage.removeItem('user');
                        navigate('/login');
                      }
                    }}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      {/* Responsive: Add a style tag for fadeIn animation */}
      <style>
        {`
          @media (max-width: 700px) {
            header {
              flex-direction: column;
              padding: 10px 6px 8px 6px !important;
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </>
  );
}

export default Header;
