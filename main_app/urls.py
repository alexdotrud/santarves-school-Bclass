from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('', views.homepage, name='home'),
    path('gallery/', views.gallery, name='gallery'),
    path('matematika/', views.matematika, name='matematika'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)