// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Doctores from './pages/Doctores';
import Citas from './pages/Citas';
import Especialidades from './pages/Especialidades';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctores" element={<Doctores />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/especialidades" element={<Especialidades />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;