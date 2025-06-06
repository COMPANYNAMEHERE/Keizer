// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Evenementen from './pages/Evenementen/Evenementen';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <Router basename="/Keizer">
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Main site content */}
        <Route path="/home" element={<Home />} />

        {/* Other routes */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/evenementen" element={<Evenementen />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
