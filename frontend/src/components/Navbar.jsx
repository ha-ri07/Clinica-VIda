// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeartbeat, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Efecto de sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar container">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)}>
          <FaHeartbeat />
          <span>Clínica <span style={{color: 'var(--secondary)'}}>Vida</span></span>
        </Link>
        
        <button 
          className="menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link 
              to="/especialidades" 
              className={isActive('/especialidades') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Especialidades
            </Link>
          </li>
          <li>
            <Link 
              to="/doctores" 
              className={isActive('/doctores') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Doctores
            </Link>
          </li>
          <li>
            <Link 
              to="/contacto" 
              className={isActive('/contacto') ? 'active' : ''}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>

        <Link 
          to="/citas" 
          className="btn-cta"
          onClick={() => setIsOpen(false)}
        >
          Agendar Cita
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;