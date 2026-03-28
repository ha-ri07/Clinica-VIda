// src/pages/Especialidades.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBrain, 
  FaHeart, 
  FaBaby, 
  FaRadiation, 
  FaBone, 
  FaAllergies,
  FaEye, 
  FaTooth, 
  FaLungs, 
  FaStethoscope
} from 'react-icons/fa';
import { especialidadesService } from '../services/api';
import './Especialidades.css';

// Mapa de iconos para especialidades
const iconoMap = {
  'FaBrain': FaBrain,
  'FaHeart': FaHeart,
  'FaBaby': FaBaby,
  'FaRadiation': FaRadiation,
  'FaBone': FaBone,
  'FaAllergies': FaAllergies,
  'FaEye': FaEye,
  'FaTooth': FaTooth,
  'FaLungs': FaLungs,
  'FaStethoscope': FaStethoscope,
};

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        setCargando(true);
        const datos = await especialidadesService.getAll();
        setEspecialidades(datos);
      } catch (err) {
        console.error('Error al cargar especialidades:', err);
        setError('Error al cargar las especialidades');
      } finally {
        setCargando(false);
      }
    };

    cargarEspecialidades();
  }, []);

  if (cargando) {
    return (
      <div className="especialidades-page">
        <section className="hero-especialidades">
          <div className="container">
            <h1>Cargando especialidades...</h1>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="especialidades-page">
        <section className="hero-especialidades">
          <div className="container">
            <h1>{error}</h1>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="especialidades-page">
      <section className="hero-especialidades">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestras Especialidades
          </motion.h1>
          <p>Contamos con los mejores departamentos médicos para cubrir todas tus necesidades</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="especialidades-grid">
            {especialidades.map((esp, index) => {
              const IconComponent = iconoMap[esp.icono] || FaStethoscope;
              return (
                <motion.div
                  key={esp.id}
                  className="especialidad-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ '--color-principal': esp.color }}
                >
                  <div className="especialidad-icon" style={{ background: `${esp.color}20`, color: esp.color }}>
                    <IconComponent />
                  </div>
                  <h3>{esp.nombre}</h3>
                  <p className="descripcion">{esp.descripcion}</p>
                  <div className="servicios-list">
                    <h4>Servicios incluidos:</h4>
                    <ul>
                      {esp.servicios && esp.servicios.length > 0 ? (
                        esp.servicios.map((servicio, idx) => (
                          <li key={idx}>{servicio}</li>
                        ))
                      ) : (
                        <li>Consulta especializada</li>
                      )}
                    </ul>
                  </div>
                  <a href="/citas" className="btn-agendar" style={{ borderColor: esp.color, color: esp.color }}>
                    Agendar Cita
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Especialidades;
