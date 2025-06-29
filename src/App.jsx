// App component for infiScroll app
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore/photos" element={<Explore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;