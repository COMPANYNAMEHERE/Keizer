// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import LandingPage from './LandingPage';
import Home from './Home';
import Menu from './Menu';
import Evenementen from './Evenementen';
import Contact from './Contact';

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
