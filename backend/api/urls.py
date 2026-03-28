from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EspecialidadViewSet, DoctorViewSet, CitaViewSet

router = DefaultRouter()
router.register(r'especialidades', EspecialidadViewSet, basename='especialidad')
router.register(r'doctores', DoctorViewSet, basename='doctor')
router.register(r'citas', CitaViewSet, basename='cita')

urlpatterns = [
    path('', include(router.urls)),
]
