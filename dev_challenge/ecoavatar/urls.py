from django.urls import path
from django.contrib.auth.views import LogoutView  # Para el cierre de sesión
from .views import CustomLoginView  # Importa la vista personalizada de inicio de sesión
from . import views

app_name = "ecoavatar"

urlpatterns = [
    # Ruta principal
    path('', views.index, name='index'),
    
    # Rutas de autenticación
    path("login/", CustomLoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(next_page='ecoavatar:login'), name="logout"),   # Cierre de sesión
    
    # Otras rutas específicas de la app
    path('equipar_recompensa/<int:personaje_id>/<int:recompensa_id>/', views.equipar_recompensa, name='equipar_recompensa'),
    path('completar_desafio/<int:desafio_id>/', views.completar_desafio, name='completar_desafio'),
    path('add_post/', views.add_post, name='add_post'),  
    path('list_post/', views.list_post, name='list_post'),
]
