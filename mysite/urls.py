from django.contrib import admin
from django.urls import path, include
from pages import views as pages_views

# Asignamos handler para error 404
handler404 = pages_views.page_not_found

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls', namespace='pages')),
]
