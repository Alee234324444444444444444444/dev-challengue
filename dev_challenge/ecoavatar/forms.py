from django import forms
from django.db import connection 
from .models import User

class UserForm(forms.ModelForm):
    class Meta:
        model =  User
        fields = '__all__'
        widgets = {
            'name':forms.TextInput(attrs={'class': 'form-control'}),
            'user_name':forms.TextInput(attrs={'class': 'form-control'}),
            'email':forms.EmailInput(attrs={'class': 'form-control'}),
        }
        labels = {
            'name': 'Nombres',
            'user_name': 'Nombre Usuario',
            'email': 'Correo electrónico',
        }