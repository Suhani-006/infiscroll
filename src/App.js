import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import InstagramLayout from './component/InstagramLayout';
import ExploreReels from './pages/ExploreReels';
import ExplorePhotos from './pages/ExplorePhotos';
import ExploreVideos from './pages/ExploreVideos';
import LikesReels from './pages/LikesReels';
import LikesPhotos from './pages/LikesPhotos';
import LikesVideos from './pages/LikesVideos';
import SavedReels from './pages/SavedReels';
import SavedPhotos from './pages/SavedPhotos';
import SavedVideos from './pages/SavedVideos';
import Login from './pages/Login';
import SelectCategories from './pages/SelectCategories';

function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem('user');
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login redirectTo="/select-categories" />} />
        <Route path="/select-categories" element={<SelectCategories />} />
        <Route
          path="/*"
          element={
            <RequireAuth>
              <InstagramLayout />
            </RequireAuth>
          }
        />
        <Route
          path="/explore/reels"
          element={
            <RequireAuth>
              <ExploreReels />
            </RequireAuth>
          }
        />
        <Route
          path="/explore/photos"
          element={
            <RequireAuth>
              <ExplorePhotos />
            </RequireAuth>
          }
        />
        <Route
          path="/explore/videos"
          element={
            <RequireAuth>
              <ExploreVideos />
            </RequireAuth>
          }
        />
        <Route
          path="/likes/reels"
          element={
            <RequireAuth>
              <LikesReels />
            </RequireAuth>
          }
        />
        <Route
          path="/likes/photos"
          element={
            <RequireAuth>
              <LikesPhotos />
            </RequireAuth>
          }
        />
        <Route
          path="/likes/videos"
          element={
            <RequireAuth>
              <LikesVideos />
            </RequireAuth>
          }
        />
        <Route
          path="/saved/reels"
          element={
            <RequireAuth>
              <SavedReels />
            </RequireAuth>
          }
        />
        <Route
          path="/saved/photos"
          element={
            <RequireAuth>
              <SavedPhotos />
            </RequireAuth>
          }
        />
        <Route
          path="/saved/videos"
          element={
            <RequireAuth>
              <SavedVideos />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// NOTE: 
// The error "Invalid hook call" is not caused by the code in this file.
// It is usually caused by one of the following:
// 1. Multiple copies of React in node_modules (check `npm ls react` and ensure only one version is installed).
// 2. Mismatched versions of `react` and `react-dom`.
// 3. Importing React from different locations or symlinked folders.
// 4. Using hooks outside of a React component or inside a regular function.
//
// To fix:
// - Delete node_modules and package-lock.json/yarn.lock, then reinstall dependencies.
// - Ensure only one version of React is installed.
// - Make sure all packages use the same React version.
// - Restart your dev server after making these changes.
