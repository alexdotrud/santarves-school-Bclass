from django.shortcuts import render
from .models import HeroImage


def homepage(request):
    hero_images = HeroImage.objects.all()
    return render(request, 'main_app/home.html', {'hero_images': hero_images})