from django.contrib import admin
from django.urls import path, include
from pages import views as pages_views
from django.conf import settings
from django.conf.urls.static import static
# Asignamos handler para error 404
handler404 = pages_views.page_not_found

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('pages.urls', namespace='pages')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)