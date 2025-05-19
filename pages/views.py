from django.shortcuts import render

def index(request):
    return render(request, 'pages/index.html')

def about(request):
    return render(request, 'pages/about.html')

def appointment(request):
    return render(request, 'pages/appointment.html')

def contact(request):
    return render(request, 'pages/contact.html')

def feature(request):
    return render(request, 'pages/feature.html')

def service(request):
    return render(request, 'pages/service.html')

def team(request):
    return render(request, 'pages/team.html')

def testimonial(request):
    return render(request, 'pages/testimonial.html')

# Vista personalizada para errores 404
def page_not_found(request, exception):
    return render(request, 'pages/404.html', status=404)
