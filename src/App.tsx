import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import Topics from './pages/Topics';
import Reviews from './pages/Reviews';
import Resources from './pages/Resources';
import Authors from './pages/Authors';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
