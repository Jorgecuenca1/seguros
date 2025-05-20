from django.shortcuts import render

from pages.models import Servicio, Contacto


def index(request):
    error = None
    enviado = False

    if request.method == 'POST':
        nombre  = request.POST.get('nombre', '').strip()
        correo  = request.POST.get('correo', '').strip()
        asunto  = request.POST.get('asunto', '').strip()
        mensaje = request.POST.get('mensaje', '').strip()

        if not (nombre and correo and asunto and mensaje):
            error = "Todos los campos son obligatorios."
        else:
            Contacto.objects.create(nombre=nombre,
                                    correo=correo,
                                    asunto=asunto,
                                    mensaje=mensaje)
            enviado = True

    return render(request, 'pages/index.html', {
        'servicios': Servicio.objects.all(),
        'error': error,
        'enviado': enviado,
    })

def about(request):
    return render(request, 'pages/about.html')

def appointment(request):
    return render(request, 'pages/appointment.html')

def contact(request):
    error = None
    enviado = False

    if request.method == 'POST':
        nombre  = request.POST.get('nombre','').strip()
        correo  = request.POST.get('correo','').strip()
        asunto  = request.POST.get('asunto','').strip()
        mensaje = request.POST.get('mensaje','').strip()

        # validación muy básica
        if not (nombre and correo and asunto and mensaje):
            error = "Todos los campos son obligatorios."
        else:
            Contacto.objects.create(
                nombre=nombre,
                correo=correo,
                asunto=asunto,
                mensaje=mensaje
            )
            enviado = True

    return render(request, 'pages/contact.html', {
        'error': error,
        'enviado': enviado,
    })


def feature(request):
    return render(request, 'pages/feature.html')


def service(request):
    return render(request, 'pages/service.html', {
        'servicios': Servicio.objects.all()
    })

def team(request):
    return render(request, 'pages/team.html')

def testimonial(request):
    return render(request, 'pages/testimonial.html')

# Vista personalizada para errores 404
def page_not_found(request, exception):
    return render(request, 'pages/404.html', status=404)
