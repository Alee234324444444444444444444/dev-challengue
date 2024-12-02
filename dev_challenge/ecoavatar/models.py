from django.db import models
from django.contrib.auth.models import User

class User(models.Model):
    name = models.CharField(max_length=75, null=False)
    user_name = models.CharField(max_length=75, null=False)
    email = models.EmailField(null=False, unique=True)

    def __str__(self):
        return self.user_name
    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='media/')
    description = models.CharField(max_length=75, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Op >> {self.user.user_name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
    
class Desafio(models.Model):
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.CharField(max_length=10, choices=[('diario', 'Diario'), ('semanal', 'Semanal')])
    completado = models.BooleanField(default=False)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='desafios', null=True, blank=True)  # Usuario relacionado con el desafío
    fecha_limite = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.titulo

class Recompensa(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='recompensas/')  # Imagen de la recompensa
    desafio = models.ForeignKey(Desafio, on_delete=models.CASCADE, related_name='recompensas')

    def __str__(self):
        return self.nombre
    
class Personaje(models.Model):
    nombre = models.CharField(max_length=100)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='personajes')
    recompensa = models.ManyToManyField('Recompensa', related_name='personajes', blank=True)  # Relación ManyToMany

    def __str__(self):
        return self.nombre