from django.contrib import admin
from .models import  Student, Photo


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'photo')

    
@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('name', 'photo')
    ordering = ('order',)