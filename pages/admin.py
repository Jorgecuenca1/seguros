# yourapp/admin.py

from django.contrib import admin
from .models import Servicio, Contacto, FAQ


@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'orden', 'delay')
    list_editable = ('orden','delay')
@admin.register(Contacto)
class ContactoAdmin(admin.ModelAdmin):
    list_display    = ('nombre', 'correo', 'asunto', 'creado_en')
    list_filter     = ('creado_en',)
    search_fields   = ('nombre', 'correo', 'asunto', 'mensaje')
    date_hierarchy  = 'creado_en'
    readonly_fields = ('creado_en',)

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('pregunta', 'categoria', 'orden', 'activa', 'creada_en')
    list_filter = ('categoria', 'activa', 'creada_en')
    list_editable = ('categoria', 'orden', 'activa')
    search_fields = ('pregunta', 'respuesta')
    ordering = ('categoria', 'orden')
    date_hierarchy = 'creada_en'