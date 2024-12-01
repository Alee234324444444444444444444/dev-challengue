from django.contrib import admin
from .models import User, Post, Desafio, Recompensa

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    pass

@admin.register(Desafio)
class DesafioAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'tipo', 'completado', 'usuario', 'fecha_limite')
    list_filter = ('tipo', 'completado', 'usuario')
    search_fields = ('titulo', 'descripcion')

@admin.register(Recompensa)
class RecompensaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'desafio')
    list_filter = ('desafio',)
    search_fields = ('nombre',)