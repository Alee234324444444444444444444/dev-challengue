from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.shortcuts import get_object_or_404, redirect, render
from .models import User, Post, Desafio, Recompensa, Personaje
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from ecoavatar.forms import UserForm, PostForm

class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True
    
def index(request):
    personaje = Personaje.objects.first()  
    recompensas = Recompensa.objects.all()  

    context = {
        'personaje': personaje,
        'recompensas': recompensas,
    }
    return render(request, 'ecoavatar/index.html', context)
def index(request):
    template = loader.get_template('index.html')
    context = {
        'user': request.user,
        'logged_in': request.user.is_authenticated
    }
    return render(request, 'index.html', context)

def index(request):
    # Obtener los desafíos no completados (tanto diarios como semanales)
    desafios_diarios = Desafio.objects.filter(tipo='diario', completado=False)
    desafios_semanales = Desafio.objects.filter(tipo='semanal', completado=False)

    return render(request, 'index.html', {
        'desafios_diarios': desafios_diarios,
        'desafios_semanales': desafios_semanales,
        'user': request.user,
        'logged_in': request.user.is_authenticated
    })

def list_post(request):
    posts = Post.objects.order_by('-created_at')  
    template = loader.get_template('list_post.html')
    return HttpResponse(template.render({'posts': posts}, request))  

def add_post(request):
    if request.method == 'POST':
        photo = request.FILES.get('photo')
        description = request.POST.get('description')

        if photo and description:
            try:
                # Asegurarse de que el usuario esté autenticado y se pueda recuperar
                user_instance = User.objects.get(id=request.user.id)

                # Crear la publicación en la base de datos
                Post.objects.create(
                    user=user_instance, 
                    photo=photo, 
                    description=description
                )

                # Responder si la creación fue exitosa
                return JsonResponse({'status': 'success', 'message': 'Publicación creada exitosamente'})
            except Exception as e:
                # Manejar cualquier error que ocurra durante la creación
                return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
        
        # Responder si no se han completado todos los campos
        return JsonResponse({'status': 'error', 'message': 'Completa todos los campos'}, status=400)
    
    # Responder si el método no es POST
    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)

def equipar_recompensa(request, personaje_id, recompensa_id):
    # Obtener el personaje y la recompensa
    personaje = get_object_or_404(Personaje, id=personaje_id)
    recompensa = get_object_or_404(Recompensa, id=recompensa_id)

    # Equipar la recompensa
    personaje.recompensas.add(recompensa)  # Asignar recompensa al personaje
    personaje.save()

    return JsonResponse({
        'status': 'success',
        'message': 'Recompensa equipada correctamente',
        'recompensa_imagen_url': recompensa.imagen.url  
    })


def completar_desafio(request, desafio_id):
    # Obtener el desafío
    desafio = get_object_or_404(Desafio, id=desafio_id)

    if request.method == 'POST' and request.FILES.get('photo'):
        # Obtener la foto subida
        photo = request.FILES['photo']
        description = request.POST['description']

        # Aquí puedes guardar la foto en un modelo o hacer alguna validación

        # Asignar la recompensa (si existe)
        recompensa = Recompensa.objects.filter(desafio=desafio).first()  # Suponiendo que hay una recompensa asociada

        if recompensa:
            return JsonResponse({
                'status': 'success',
                'message': 'Desafío completado con éxito',
                'recompensa_imagen_url': recompensa.imagen.url  # La URL de la imagen de la recompensa
            })
        else:
            return JsonResponse({
                'status': 'error',
                'message': 'No se encontró una recompensa para este desafío'
            })

    return JsonResponse({
        'status': 'error',
        'message': 'Método no permitido o falta la foto'
    }, status=400)