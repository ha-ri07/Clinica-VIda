# 🏥 Clínica Vida - Guía de Conexión Backend-Frontend

## ✅ Estado de la Conexión

La conexión entre el **backend (Django)** y el **frontend (React)** ha sido configurada correctamente.

---

## 🚀 Cómo Ejecutar la Aplicación

### **1. Backend (Django)**

```bash
cd "c:\WORKSPACE\Clinica Vida\backend"
python manage.py runserver
```

El servidor estará disponible en: `http://localhost:8000`

**Usuario Admin:**

- Usuario: `admin`
- Contraseña: `admin` (establécela la primera vez que ingreses)

### **2. Frontend (React)**

En otra terminal:

```bash
cd "c:\WORKSPACE\Clinica Vida\frontend"
npm run dev
```

El servidor estará disponible en: `http://localhost:5173`

---

## 📡 Endpoints de la API

### **Especialidades** (`/api/especialidades/`)

- `GET /api/especialidades/` - Obtener todas las especialidades
- `GET /api/especialidades/{id}/` - Obtener una especialidad específica
- `POST /api/especialidades/` - Crear una especialidad
- `PUT /api/especialidades/{id}/` - Actualizar una especialidad
- `DELETE /api/especialidades/{id}/` - Eliminar una especialidad

### **Doctores** (`/api/doctores/`)

- `GET /api/doctores/` - Obtener todos los doctores
- `GET /api/doctores/{id}/` - Obtener un doctor específico
- `GET /api/doctores/disponibles/` - Obtener doctores disponibles
- `GET /api/doctores/por_especialidad/?especialidad_id=1` - Filtrar por especialidad
- `POST /api/doctores/` - Crear un doctor
- `PUT /api/doctores/{id}/` - Actualizar un doctor
- `DELETE /api/doctores/{id}/` - Eliminar un doctor

### **Citas** (`/api/citas/`)

- `GET /api/citas/` - Obtener todas las citas
- `GET /api/citas/{id}/` - Obtener una cita específica
- `GET /api/citas/pendientes/` - Obtener citas pendientes
- `GET /api/citas/por_doctor/?doctor_id=1` - Filtrar por doctor
- `POST /api/citas/` - Crear una cita
- `POST /api/citas/crear_rapida/` - Crear cita sin doctor específico
- `PUT /api/citas/{id}/` - Actualizar una cita
- `DELETE /api/citas/{id}/` - Eliminar una cita

---

## 📝 Ejemplo de Request para Crear una Cita

```javascript
POST http://localhost:8000/api/citas/

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "5551234567",
  "especialidad": 1,
  "doctor": 1,
  "fecha": "2025-03-25",
  "hora": "09:00",
  "motivo": "Dolor en el pecho"
}
```

---

## 🔄 Flujo de Datos

### **En el Frontend:**

1. **`src/services/api.js`** - Cliente HTTP centralizado
2. **Componentes** - Usan los servicios para obtener/enviar datos:
   - `pages/Doctores.jsx` - Consume `doctoresService`
   - `pages/Especialidades.jsx` - Consume `especialidadesService`
   - `pages/Citas.jsx` - Consume `citasService`

### **En el Backend:**

1. **`api/models.py`** - Modelos de datos (Especialidad, Doctor, Cita)
2. **`api/serializers.py`** - Serializadores para validación
3. **`api/views.py`** - ViewSets con la lógica de la API
4. **`api/urls.py`** - Rutas de la API
5. **`clinica_vida_backend/urls.py`** - Rutas principales

---

## 🛠 Configuración CORS

El backend permite solicitudes desde:

- `http://localhost:5173` (desarrollo)
- `http://127.0.0.1:5173`

Configurado en `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

---

## 📚 Base de Datos

- **Motor:** SQLite (desarrollo)
- **Ubicación:** `backend/db.sqlite3`
- **Datos iniciales:** 6 especialidades y 6 doctores

Para resetear la BD:

```bash
1. Elimina `backend/db.sqlite3`
2. Ejecuta: python manage.py migrate
3. Ejecuta: python manage.py createsuperuser
4. Ejecuta: python populate_db.py
```

---

## 🧪 Probar la API

### Opción 1: Con cURL

```bash
curl http://localhost:8000/api/especialidades/
```

### Opción 2: Con Insomnia/Postman

Importa la URL: `http://localhost:8000/api/`

### Opción 3: En el navegador

Visita: `http://localhost:8000/api/`

---

## ⚙️ Configuración de Desarrollo

### Variables de Entorno Backend

- `DEBUG = True` (desarrollo)
- `ALLOWED_HOSTS = ['localhost', '127.0.0.1']`
- Base de datos SQLite

### Detalles Técnicos

**Backend:**

- Django 6.0
- Django REST Framework
- django-cors-headers
- django-filter

**Frontend:**

- React con Vite
- React Router
- Framer Motion (animaciones)
- React Icons

---

## 🐛 Solución de Problemas

### Error: `ModuleNotFoundError: No module named 'django_filters'`

```bash
pip install django-filter
```

### Error: `CORS policy: No 'Access-Control-Allow-Origin' header`

Verifica que `CORS_ALLOWED_ORIGINS` en `settings.py` incluya tu URL del frontend.

### Frontend no conecta con API

1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Revisa la consola del navegador (F12 > Console)
3. Abre Developer Tools > Network para ver las solicitudes

---

## 📊 Datos de Prueba

Se incluyen 6 especialidades y 6 doctores por defecto:

- Cardiología
- Neurología
- Pediatría
- Radiología
- Traumatología
- Dermatología

Cada especialidad tiene al menos 1 doctor asociado.

---

## 🔐 Panel de Administración

Accede a: `http://localhost:8000/admin/`

Gestiona:

- Especialidades
- Doctores
- Citas (estado, confirmación, etc.)

---

¡La conexión backend-frontend está lista para usar! 🎉
