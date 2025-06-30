import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';

function InstagramLayout() {
  const sidebarWidth = '270px';
  const suggestionsWidth = '320px';
  const mobileSidebarHeight = '56px';

  const selectedCategories = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('selectedCategories')) || [];
    } catch {
      return [];
    }
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background:  'linear-gradient(90deg, #a259ff 0%, #f24e1e 100%)',
            backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

        '--sidebar-width': sidebarWidth,
        '--suggestions-width': suggestionsWidth,
        '--mobile-sidebar-height': mobileSidebarHeight,
      }}
    >
      {/* Header */}
      <Header />

      <div
        className="insta-layout-main"
        style={{
          display: 'flex',
          background: '#fafafa',
          overflow: 'hidden',
        }}
      >
        {/* Sidebar */}
        <aside
          className="insta-sidebar"
          style={{
            width: 'var(--sidebar-width)',
            minWidth: 'var(--sidebar-width)',
            maxWidth: 'var(--sidebar-width)',
            position: 'fixed',
            top: 62,
            left: 0,
            bottom: 0,
            backgroundColor: '#fff',
            zIndex: 100,
            transition: 'all 0.3s ease',
          }}
        >
          <Sidebar />
        </aside>

        {/* Feed */}
        <main
  className="insta-feed"
  style={{
    flex: 1,
    minWidth: 0,
    marginLeft: 'var(--sidebar-width)',
    padding: '20px 30px',
    transition: 'margin 0.3s ease',
        background:  'linear-gradient(90deg,rgba(161, 89, 255, 0.18) 0%,rgba(242, 79, 30, 0.24) 100%)',
    borderRadius: 12, // optional for card-style look
    backdropFilter: 'blur(6px)', // optional blur
  }}
>
          <Feed selectedCategories={selectedCategories} />
        </main>
      </div>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 900px) {
            .insta-sidebar {
              display: none;
            }

            .insta-feed {
              margin-left: 0 !important;
              padding: 16px;
            }
          }

          @media (max-width: 600px) {
            .insta-feed {
              padding-bottom: var(--mobile-sidebar-height);
            }
          }
        `}
      </style>
    </div>
  );
}

export default InstagramLayout;
