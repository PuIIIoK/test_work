import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './pages/ArticleList';
import ArticlePage from './pages/ArticlePage';
import CreateArticlePage from './pages/CreateArticlePage';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/10 shadow-sm"></div>

      <div className="container mx-auto px-6 h-20 relative flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 group-active:scale-95 transition-all duration-300">
            P
          </div>
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Polis<span className="text-blue-600 dark:text-blue-500">.Blog</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            )}
          </button>

          <Link to="/create-article" className="relative group px-6 py-2.5 rounded-full overflow-hidden shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow">
            <div className="absolute inset-0 bg-zinc-900 dark:bg-white transition-transform group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2 text-sm font-bold text-white dark:text-zinc-900 group-hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              New Article
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-300 pt-28">
          {/* Ambient Background Glows */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="hero-glow bg-blue-500/20 top-0 left-1/4 w-96 h-96 animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="hero-glow bg-violet-500/20 bottom-0 right-1/4 w-[500px] h-[500px] animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <Header />
          <main className="container mx-auto px-6 py-8 relative z-10">
            <Routes>
              <Route path="/" element={<ArticleList />} />
              <Route path="/articles/:id" element={<ArticlePage />} />
              <Route path="/create-article" element={<CreateArticlePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
