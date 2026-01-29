import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticlePage from './pages/ArticlePage';
import CreateArticlePage from './pages/CreateArticlePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
        <header className="bg-white shadow mb-8">
          <div className="container mx-auto p-4">
            <a href="/" className="text-xl font-bold text-gray-800">My Blog</a>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/create-article" element={<CreateArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
