from django.urls import path
from . import views

app_name = "ecoavatar"
urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.CustomLoginView.as_view(), name="login"),
    path('equipar_recompensa/<int:personaje_id>/<int:recompensa_id>/', views.equipar_recompensa, name='equipar_recompensa'),
    path('completar_desafio/<int:desafio_id>/', views.completar_desafio, name='completar_desafio'),
    path('add_post/', views.add_post, name='add_post'),  
    path('list_post/', views.list_post, name='list_post'),
]