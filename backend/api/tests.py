from django.test import TestCase
from django.urls import reverse
from .models import Especialidad, Doctor, Cita

class BackendTests(TestCase):
    """
    Pruebas del Backend - Clínica Vida
    """
    
    def test_creacion_especialidad(self):
        """Test 1: Crear una especialidad médica"""
        especialidad = Especialidad.objects.create(
            nombre="Cardiología",
            descripcion="Diagnóstico y tratamiento de enfermedades del corazón",
            icono="FaHeart",
            color="#e53935"
        )
        self.assertEqual(str(especialidad), "Cardiología")
        self.assertEqual(especialidad.nombre, "Cardiología")
        self.assertEqual(especialidad.color, "#e53935")
    
    def test_creacion_doctor(self):
        """Test 2: Crear un doctor"""
        especialidad = Especialidad.objects.create(
            nombre="Neurología",
            descripcion="Especialidad del sistema nervioso",
            icono="FaBrain",
            color="#8e24aa"
        )
        doctor = Doctor.objects.create(
            nombre="Alejandro Ruiz",
            especialidad=especialidad,
            imagen="https://example.com/doctor.jpg",
            experiencia="15 años",
            rating=5,
            email="alejandro@clinicavida.com",
            telefono="3001234567"
        )
        self.assertIn("Alejandro", str(doctor))
        self.assertIn("Neurología", str(doctor))
        self.assertEqual(doctor.rating, 5)
        self.assertTrue(doctor.disponible)
    
    def test_creacion_cita(self):
        """Test 3: Crear una cita médica"""
        especialidad = Especialidad.objects.create(
            nombre="Pediatría",
            descripcion="Atención de niños",
            icono="FaBaby",
            color="#fb8c00"
        )
        doctor = Doctor.objects.create(
            nombre="María Sánchez",
            especialidad=especialidad,
            imagen="https://example.com/doctor2.jpg",
            experiencia="10 años",
            rating=4,
            email="maria@clinicavida.com",
            telefono="3007654321"
        )
        cita = Cita.objects.create(
            nombre="Juan Pérez",
            email="juan@email.com",
            telefono="3101234567",
            especialidad=especialidad,
            doctor=doctor,
            fecha="2026-03-25",
            hora="09:00:00",
            motivo="Dolor en el pecho",
            estado="pendiente"
        )
        self.assertIn("Juan Pérez", str(cita))
        self.assertEqual(cita.estado, "pendiente")
    
    def test_api_especialidades(self):
        """Test 4: API retorna especialidades"""
        Especialidad.objects.create(
            nombre="Dermatología",
            descripcion="Cuidado de la piel",
            icono="FaAllergies",
            color="#fdd835"
        )
        response = self.client.get('/api/especialidades/')
        self.assertEqual(response.status_code, 200)
    
    def test_api_doctores(self):
        """Test 5: API retorna doctores"""
        especialidad = Especialidad.objects.create(
            nombre="Radiología",
            descripcion="Diagnóstico por imagen",
            icono="FaRadiation",
            color="#039be5"
        )
        Doctor.objects.create(
            nombre="Carlos Díaz",
            especialidad=especialidad,
            imagen="https://example.com/doctor3.jpg",
            experiencia="8 años",
            rating=5,
            email="carlos@clinicavida.com",
            telefono="3009876543"
        )
        response = self.client.get('/api/doctores/')
        self.assertEqual(response.status_code, 200)
    
    def test_validacion_rating(self):
        """Test 6: Validación de rating (1-5)"""
        especialidad = Especialidad.objects.create(
            nombre="Traumatología",
            descripcion="Huesos y músculos",
            icono="FaBone",
            color="#43a047"
        )
        doctor = Doctor.objects.create(
            nombre="Ana López",
            especialidad=especialidad,
            imagen="https://example.com/doctor4.jpg",
            experiencia="12 años",
            rating=4,
            email="ana@clinicavida.com",
            telefono="3005551234"
        )
        self.assertGreaterEqual(doctor.rating, 1)
        self.assertLessEqual(doctor.rating, 5)