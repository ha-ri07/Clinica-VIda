// src/pages/Doctores.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { doctoresService, especialidadesService } from '../services/api';
import './Doctores.css';

const Doctores = () => {
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Cargar especialidades y doctores
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [doctoresData, especialidadesData] = await Promise.all([
          doctoresService.getAll(),
          especialidadesService.getAll()
        ]);
        
        setDoctores(doctoresData);
        setEspecialidades(['Todos', ...especialidadesData.map(e => e.nombre)]);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('Error al cargar los doctores');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar doctores
  const doctoresFiltrados = filtro === 'Todos' 
    ? doctores 
    : doctores.filter(doc => doc.especialidad_nombre === filtro);

  if (cargando) {
    return (
      <div className="doctores-page">
        <section className="hero-doctores">
          <div className="container">
            <h1>Cargando...</h1>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctores-page">
        <section className="hero-doctores">
          <div className="container">
            <h1>{error}</h1>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="doctores-page">
      <section className="hero-doctores">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Nuestro Equipo Médico
          </motion.h1>
          <p>Especialistas certificados listos para atenderte con la mejor calidad</p>
        </div>
      </section>

      <section className="section filtro-section">
        <div className="container">
          <div className="filtro-container">
            <span className="filtro-label"><FaUserMd /> Filtrar por especialidad:</span>
            <div className="filtro-buttons">
              {especialidades.map((esp, index) => (
                <button
                  key={index}
                  className={`filtro-btn ${filtro === esp ? 'activo' : ''}`}
                  onClick={() => setFiltro(esp)}
                >
                  {esp}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="doctores-grid">
            {doctoresFiltrados.length > 0 ? (
              doctoresFiltrados.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  className="doctor-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="doctor-image-container">
                    <img src={doctor.imagen} alt={doctor.nombre} className="doctor-img" />
                    {doctor.disponible ? (
                      <span className="disponible-badge">Disponible</span>
                    ) : (
                      <span className="no-disponible-badge">No disponible</span>
                    )}
                  </div>
                  <div className="doctor-info">
                    <h3>{doctor.nombre}</h3>
                    <span className="especialidad">{doctor.especialidad_nombre}</span>
                    <div className="doctor-details">
                      <p><FaStar className="star-icon" /> {'★'.repeat(doctor.rating)}{'☆'.repeat(5 - doctor.rating)}</p>
                      <p><FaMapMarkerAlt /> {doctor.experiencia}</p>
                    </div>
                    <div className="doctor-contact">
                      <a href={`tel:${doctor.telefono}`} className="contact-btn"><FaPhone /> Llamar</a>
                      <a href="/citas" className="contact-btn primary"><FaUserMd /> Agendar Cita</a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No hay doctores disponibles</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctores;