from django.shortcuts import render
from .models import HeroImage, GalleryPhoto, GalleryVideo


def homepage(request):
    hero_images = HeroImage.objects.all()
    return render(request, 'main_app/home.html', {'hero_images': hero_images})

def gallery(request):
    photos = GalleryPhoto.objects.all()
    videos = GalleryVideo.objects.all()
    return render(request, 'main_app/gallery.html', {'photos': photos, 'videos': videos})