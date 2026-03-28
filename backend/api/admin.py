from django.contrib import admin
from .models import Especialidad, Doctor, Cita

@admin.register(Especialidad)
class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'color')
    search_fields = ('nombre',)
    ordering = ('nombre',)


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'especialidad', 'rating', 'disponible')
    list_filter = ('especialidad', 'disponible', 'rating')
    search_fields = ('nombre', 'email')
    ordering = ('nombre',)


@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'especialidad', 'doctor', 'fecha', 'hora', 'estado')
    list_filter = ('estado', 'especialidad', 'doctor', 'fecha')
    search_fields = ('nombre', 'email')
    ordering = ('-creado_en',)
    readonly_fields = ('creado_en', 'actualizado_en')

