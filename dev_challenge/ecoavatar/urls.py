from django.urls import path
from . import views

app_name = "ecoavatar"
urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.CustomLoginView.as_view(), name="login"),

    path("post/", views.list_post, name="list_post"),
    path('add_post/', views.add_post, name='add_post'),
]