// src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaBrain,      // ✅ Neurología
  FaHeart,      // ✅ Cardiología
  FaBaby,       // ✅ Pediatría
  FaRadiation,  // ✅ Radiología
  FaArrowRight  // ✅ Flecha para botón
} from 'react-icons/fa';
import './Home.css';

const serviciosData = [
  {
    id: 1,
    nombre: 'Neurología',
    icono: FaBrain,
    descripcion: 'Diagnóstico y tratamiento avanzado de enfermedades del sistema nervioso.',
    color: '#8e24aa',
    link: '/especialidades'
  },
  {
    id: 2,
    nombre: 'Cardiología',
    icono: FaHeart,
    descripcion: 'Cuidado integral del corazón con tecnología de imagenología de última generación.',
    color: '#e53935',
    link: '/especialidades'
  },
  {
    id: 3,
    nombre: 'Pediatría',
    icono: FaBaby,
    descripcion: 'Atención especializada y cálida para el desarrollo saludable de tus hijos.',
    color: '#fb8c00',
    link: '/especialidades'
  },
  {
    id: 4,
    nombre: 'Radiología',
    icono: FaRadiation,
    descripcion: 'Equipos de resonancia y tomografía para diagnósticos precisos y rápidos.',
    color: '#039be5',
    link: '/especialidades'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tu salud en manos de expertos de clase mundial
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tecnología de vanguardia y atención humana para cuidar lo que más importa: tu vida.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/citas" className="btn-hero">
              Comienza tu cuidado hoy <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Nuestras Especialidades
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Contamos con los mejores departamentos médicos para cubrir todas tus necesidades.
            </motion.p>
          </div>

          <div className="services-grid">
            {serviciosData.map((servicio, index) => (
              <motion.div
                key={servicio.id}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div 
                  className="card-icon" 
                  style={{ 
                    background: `${servicio.color}15`,
                    color: servicio.color 
                  }}
                >
                  <servicio.icono />
                </div>
                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcion}</p>
                <Link to={servicio.link} className="card-link" style={{ color: servicio.color }}>
                  Más información <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="section-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>¿No encuentras lo que buscas?</p>
            <Link to="/especialidades" className="btn-secondary">
              Ver todas las especialidades
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3>25+</h3>
              <p>Años de Experiencia</p>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3>50+</h3>
              <p>Doctores Especialistas</p>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3>100K+</h3>
              <p>Pacientes Atendidos</p>
            </motion.div>
            <motion.div 
              className="stat-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>98%</h3>
              <p>Satisfacción</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;