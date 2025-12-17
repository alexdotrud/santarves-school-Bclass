from django.shortcuts import render
from .models import HeroImage, Photo, GalleryVideo, Student


def homepage(request):
    students = Student.objects.all()
    hero_images = HeroImage.objects.all()
    return render(request, 'main_app/home.html', {
        'students': students,
        'hero_images': hero_images,

    })


def gallery(request):
    photos = Photo.objects.all()
    videos = GalleryVideo.objects.all()

    return render(request, 'main_app/gallery.html', {
        'photos': photos,
        'videos': videos
    })
