// src/pages/Citas.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaPhone, FaEnvelope, FaStethoscope, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { citasService, especialidadesService, doctoresService } from '../services/api';
import './Citas.css';

const Citas = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    especialidad: '',
    doctor: '',
    fecha: '',
    hora: '',
    motivo: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar especialidades y doctores
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const [especData, docData] = await Promise.all([
          especialidadesService.getAll(),
          doctoresService.getAll()
        ]);
        setEspecialidades(especData);
        setDoctores(docData);
      } catch (err) {
        console.error('Error al cargar datos:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar doctores cuando cambia la especialidad
  useEffect(() => {
    if (formData.especialidad) {
      const filtrados = doctores.filter(
        doc => doc.especialidad === parseInt(formData.especialidad)
      );
      setDoctoresFiltrados(filtrados);
    } else {
      setDoctoresFiltrados([]);
    }
  }, [formData.especialidad, doctores]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{7,15}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un teléfono válido (7-15 dígitos)';
    }

    if (!formData.especialidad) {
      newErrors.especialidad = 'Selecciona una especialidad';
    }

    if (!formData.doctor) {
      newErrors.doctor = 'Selecciona un doctor';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'Selecciona una fecha';
    } else {
      const fechaSeleccionada = new Date(formData.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      if (fechaSeleccionada < hoy) {
        newErrors.fecha = 'La fecha no puede ser anterior a hoy';
      }
    }

    if (!formData.hora) {
      newErrors.hora = 'Selecciona una hora';
    }

    if (!formData.motivo.trim()) {
      newErrors.motivo = 'El motivo de la consulta es requerido';
    } else if (formData.motivo.trim().length < 10) {
      newErrors.motivo = 'Describe el motivo con al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    try {
      const datosEnvio = {
        ...formData,
        especialidad: parseInt(formData.especialidad),
        doctor: parseInt(formData.doctor)
      };
      
      await citasService.create(datosEnvio);
      
      setLoading(false);
      setSubmitted(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        especialidad: '',
        doctor: '',
        fecha: '',
        hora: '',
        motivo: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error al guardar cita:', err);
      setErrors({ general: 'Error al guardar la cita. Intenta nuevamente.' });
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="citas-page">
        <div className="container">
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle className="success-icon" />
            <h2>¡Cita Agendada Exitosamente!</h2>
            <p>Hemos recibido tu solicitud. Te enviaremos un correo de confirmación en breve.</p>
            <button className="btn-nueva-cita" onClick={() => setSubmitted(false)}>
              Agendar Otra Cita
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="citas-page">
      <section className="hero-citas">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Agenda tu Cita
          </motion.h1>
          <p>Reserva tu espacio en línea de forma rápida y segura</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="citas-form-container">
            <form onSubmit={handleSubmit} className="citas-form">
              <div className="form-header">
                <h2>Información del Paciente</h2>
                <p>Completa todos los campos para agendar tu cita</p>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label><FaUser /> Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`form-control ${errors.nombre ? 'error' : ''}`}
                    placeholder="Ej: Juan Pérez"
                  />
                  {errors.nombre && <span className="error-message"><FaExclamationCircle /> {errors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label><FaEnvelope /> Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && <span className="error-message"><FaExclamationCircle /> {errors.email}</span>}
                </div>

                <div className="form-group">
                  <label><FaPhone /> Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`form-control ${errors.telefono ? 'error' : ''}`}
                    placeholder="Ej: 5551234567"
                  />
                  {errors.telefono && <span className="error-message"><FaExclamationCircle /> {errors.telefono}</span>}
                </div>

                <div className="form-group">
                  <label><FaStethoscope /> Especialidad *</label>
                  <select
                    name="especialidad"
                    value={formData.especialidad}
                    onChange={handleChange}
                    className={`form-control ${errors.especialidad ? 'error' : ''}`}
                  >
                    <option value="">Selecciona una especialidad</option>
                    {especialidades.map((esp) => (
                      <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                    ))}
                  </select>
                  {errors.especialidad && <span className="error-message"><FaExclamationCircle /> {errors.especialidad}</span>}
                </div>

                <div className="form-group">
                  <label><FaUser /> Doctor *</label>
                  <select
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className={`form-control ${errors.doctor ? 'error' : ''}`}
                    disabled={!formData.especialidad}
                  >
                    <option value="">Selecciona un doctor</option>
                    {doctoresFiltrados.map((doc) => (
                      <option key={doc.id} value={doc.id}>{doc.nombre}</option>
                    ))}
                  </select>
                  {errors.doctor && <span className="error-message"><FaExclamationCircle /> {errors.doctor}</span>}
                </div>

                <div className="form-group">
                  <label><FaCalendarAlt /> Fecha *</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleChange}
                    className={`form-control ${errors.fecha ? 'error' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.fecha && <span className="error-message"><FaExclamationCircle /> {errors.fecha}</span>}
                </div>

                <div className="form-group">
                  <label><FaClock /> Hora *</label>
                  <select
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    className={`form-control ${errors.hora ? 'error' : ''}`}
                  >
                    <option value="">Selecciona una hora</option>
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'].map((hora, index) => (
                      <option key={index} value={hora}>{hora}</option>
                    ))}
                  </select>
                  {errors.hora && <span className="error-message"><FaExclamationCircle /> {errors.hora}</span>}
                </div>
              </div>

              <div className="form-group full-width">
                <label>Motivo de la Consulta *</label>
                <textarea
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className={`form-control ${errors.motivo ? 'error' : ''}`}
                  rows="4"
                  placeholder="Describe brevemente los síntomas o motivo de tu consulta..."
                />
                {errors.motivo && <span className="error-message"><FaExclamationCircle /> {errors.motivo}</span>}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Procesando...' : 'Confirmar Cita'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Citas;