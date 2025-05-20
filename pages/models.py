# yourapp/models.py

from django.db import models

class Servicio(models.Model):
    titulo     = models.CharField("Título", max_length=100)
    descripcion= models.TextField("Descripción")
    imagen     = models.ImageField("Icono / Fondo", upload_to="servicios/")
    orden      = models.PositiveIntegerField("Orden", default=0)
    delay      = models.CharField("Data-wow-delay", max_length=10, default="0.1s")
    enlace     = models.URLField("URL de ‘Ver Más’", blank=True)

    class Meta:
        ordering = ['orden']
        verbose_name = "Servicio"
        verbose_name_plural = "Servicios"

    def __str__(self):
        return self.titulo
class Contacto(models.Model):
    nombre    = models.CharField("Nombre", max_length=100)
    correo    = models.EmailField("Correo Electrónico")
    asunto    = models.CharField("Asunto", max_length=150)
    mensaje   = models.TextField("Mensaje")
    creado_en = models.DateTimeField("Enviado el", auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} <{self.correo}> – {self.asunto}"