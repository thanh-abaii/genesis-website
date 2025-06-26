import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import Topics from './pages/Topics';
import Reviews from './pages/Reviews';
import Resources from './pages/Resources';
import Authors from './pages/Authors';
import AuthorDetail from './pages/AuthorDetail'; // Import the new component
import Events from './pages/Events';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/events" element={<Events />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:authorSlug" element={<AuthorDetail />} /> {/* Add the new route */}
      </Routes>
    </Layout>
  );
}

export default App;
