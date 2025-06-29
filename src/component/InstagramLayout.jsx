import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';

function InstagramLayout() {
  const sidebarWidth = '240px';
  const sidebarCollapsedWidth = '60px';
  const suggestionsWidth = '320px';
  const mobileSidebarHeight = '56px';

  // Get selected categories from localStorage
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
        background: '#fafafa',
        '--sidebar-width': sidebarWidth,
        '--sidebar-collapsed-width': sidebarCollapsedWidth,
        '--suggestions-width': suggestionsWidth,
        '--mobile-sidebar-height': mobileSidebarHeight,
      }}
    >
      <Header />

      <div className="insta-layout-main" style={{
        display: 'flex',
        background: '#fafafa',
        overflow: 'auto',
      }}>
        {/* Sidebar */}
        <div className="insta-sidebar" style={{
          width: 'var(--sidebar-width)',
          minWidth: 'var(--sidebar-width)',
          maxWidth: 'var(--sidebar-width)',
        }}>
          <Sidebar />
        </div>

        {/* Feed */}
        <div className="insta-feed" style={{
          flex: 1,
          minWidth: 0,
        }}>
          <Feed selectedCategories={selectedCategories} />
        </div>

      
      </div>

      {/* Responsive Styles */}
      <style>
        {`
         

          @media (max-width: 600px) {
           
            .insta-layout-main {
              margin: 0;
            }

            .insta-feed {
              padding-bottom: var(--mobile-sidebar-height); /* Fixed overlapping issue */
            }
          }
        `}
      </style>
    </div>
  );
}

export default InstagramLayout;
