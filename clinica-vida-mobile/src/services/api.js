// src/services/api.js
import axios from 'axios';
import { API_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const especialidadesService = {
  getAll: () => api.get('especialidades/'),
};

export const doctoresService = {
  getAll: () => api.get('doctores/'),
  getByEspecialidad: (id) => api.get(`doctores/?especialidad=${id}`),
};

export const citasService = {
  create: (data) => api.post('citas/', data),
};

export default api;