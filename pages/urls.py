from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('', views.index,       name='index'),
    path('about/', views.about, name='about'),
    path('appointment/', views.appointment, name='appointment'),
    path('contact/', views.contact, name='contact'),
    path('feature/', views.feature, name='feature'),
    path('service/', views.service, name='service'),
    path('servicio/<int:id>/', views.detalle_service, name='detalle_service'),
    path('team/', views.team, name='team'),
    path('testimonial/', views.testimonial, name='testimonial'),
path('404/', views.page_not_found, name='404'),
]
