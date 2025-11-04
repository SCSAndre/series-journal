import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SeriesProvider } from './context/SeriesContext';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import List from './pages/List/List';
import Statistics from './pages/Statistics/Statistics';
import Edit from './pages/Edit/Edit';
import './App.css';

function App() {
  return (
    <SeriesProvider>
      <Router>
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
          </footer>
        </div>
      </Router>
    </SeriesProvider>
  );
}

export default App;