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

class FAQ(models.Model):
    pregunta = models.CharField("Pregunta", max_length=200)
    respuesta = models.TextField("Respuesta")
    categoria = models.CharField("Categoría", max_length=50, choices=[
        ('general', 'General'),
        ('seguros', 'Seguros'),
        ('reclamos', 'Reclamos'),
        ('pagos', 'Pagos'),
        ('cobertura', 'Cobertura'),
    ], default='general')
    orden = models.PositiveIntegerField("Orden", default=0)
    activa = models.BooleanField("Activa", default=True)
    creada_en = models.DateTimeField("Creada el", auto_now_add=True)

    class Meta:
        ordering = ['categoria', 'orden', 'pregunta']
        verbose_name = "Pregunta Frecuente"
        verbose_name_plural = "Preguntas Frecuentes"

    def __str__(self):
        return self.pregunta