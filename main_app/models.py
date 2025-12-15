from django.db import models

class HeroImage(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='hero_images/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class Student(models.Model):
    name = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='students/')
    
    def __str__(self):
        return self.name