import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { SeriesProvider } from './context/SeriesContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import List from './pages/List/List';
import Statistics from './pages/Statistics/Statistics';
import Edit from './pages/Edit/Edit';
import './App.css';

function AppContent() {
  const navigate = useNavigate();

  // Global keyboard shortcuts
  useKeyboardShortcuts({
    'ctrl+h': () => navigate('/'),
    'ctrl+l': () => navigate('/list'),
    'ctrl+n': () => navigate('/register'),
    'ctrl+s': () => navigate('/statistics'),
    'ctrl+a': () => navigate('/about'),
  });

  useEffect(() => {
    // Show keyboard shortcuts hint on first visit
    const hasSeenHint = localStorage.getItem('keyboard-shortcuts-hint');
    if (!hasSeenHint) {
      console.log('🎹 Keyboard Shortcuts:');
      console.log('  Ctrl+H - Home');
      console.log('  Ctrl+L - My Series List');
      console.log('  Ctrl+N - Add New Series');
      console.log('  Ctrl+S - Statistics');
      console.log('  Ctrl+A - About');
      console.log('  ESC - Cancel/Close modals');
      localStorage.setItem('keyboard-shortcuts-hint', 'true');
    }
  }, []);

  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<List />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© 2024 Series Journal | Built with ❤️ by André Safar</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
          💡 Tip: Use Ctrl+H (Home), Ctrl+L (List), Ctrl+N (New), Ctrl+S (Stats)
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SeriesProvider>
        <Router>
          <AppContent />
        </Router>
      </SeriesProvider>
    </ErrorBoundary>
  );
}

export default App;