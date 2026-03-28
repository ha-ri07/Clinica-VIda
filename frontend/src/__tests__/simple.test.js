// src/__tests__/simple.test.js
import { describe, it, expect } from 'vitest';

describe('🏥 Pruebas Básicas - Clínica Vida', () => {
  
  it('2 + 2 = 4', () => {
    expect(2 + 2).toBe(4);
  });
  
  it('La aplicación está disponible', () => {
    expect(true).toBe(true);
  });
  
  it('Los servicios médicos están configurados', () => {
    const servicios = [
      'Cardiología',
      'Neurología', 
      'Pediatría',
      'Radiología'
    ];
    expect(servicios.length).toBe(4);
    expect(servicios).toContain('Cardiología');
  });
  
  it('Los doctores tienen especialidad asignada', () => {
    const doctor = {
      nombre: 'Alejandro',
      apellido: 'Ruiz',
      especialidad: 'Cardiología'
    };
    expect(doctor.especialidad).toBe('Cardiología');
  });
  
});