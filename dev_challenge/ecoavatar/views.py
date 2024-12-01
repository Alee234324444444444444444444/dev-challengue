from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.shortcuts import get_object_or_404, redirect, render
from .models import User, Post
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from ecoavatar.forms import UserForm, PostForm

class CustomLoginView(LoginView):
    template_name = 'login.html'

def index(request):
    template = loader.get_template('index.html')
    context = {
        'user': request.user,
        'logged_in': request.user.is_authenticated
    }
    return render(request, 'index.html', context)

def list_post(request):
    posts = Post.objects.order_by('description')
    template = loader.get_template('list_post.html')
    return HttpResponse(template.render({'posts':posts}, request))    

def add_post(request):
    if request.method == 'POST':
        photo = request.FILES.get('photo')
        description = request.POST.get('description')

        if photo and description:
            try:
                # Asegurarse de que 'request.user' sea una instancia de 'User'
                user_instance = User.objects.get(id=request.user.id)  # Obtener usuario explícitamente

                # Crear la publicación asociada al usuario autenticado
                Post.objects.create(
                    user=user_instance,  # Asignar la instancia del usuario correctamente
                    photo=photo, 
                    description=description
                )
                return JsonResponse({
                    'status': 'success', 
                    'message': 'Publicación creada exitosamente'
                })
            except Exception as e:
                return JsonResponse({
                    'status': 'error', 
                    'message': str(e)
                }, status=400)
        
        return JsonResponse({
            'status': 'error', 
            'message': 'Completa todos los campos'
        }, status=400)
    
    return JsonResponse({
        'status': 'error', 
        'message': 'Método no permitido'
    }, status=405)

