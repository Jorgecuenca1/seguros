# yourapp/admin.py

from django.contrib import admin
from .models import Servicio, Contacto


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