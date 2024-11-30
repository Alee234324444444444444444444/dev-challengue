from django.urls import path
from . import views

app_name = "ecoavatar"
urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.CustomLoginView.as_view(), name="login"),
]