# Dev Challenge
Ecoavatar va sobre un personaje virtual que trata de cumplir desafíos en el mundo real, este mundo medieval se compone de retos donde nuestro personaje demuestra la importancia de cuidar el medioambiente. En este entorno, se desarrollan desafíos, diarios o semanales, que involucran recolección, reducción y reutilización, todo en la realidad, nuestra realidad, ¿serás capaz de cumplir el desafío?

## Nombres de los integrantes

Alejandro Barrionuevo - John San Martin - José Luis Chávez 

## Objetivo
Este proyecto está enfocado en el tema principal del Challenge, basándose en la sostenibilidad y el medioambiente; en cómo podemos aportar para reducir nuestra huella de carbono. La aplicación web se basa en un sistema de recompensas, donde el usuario cumple los retos a través de un formulario donde registra sus pruebas, tanto una foto como una descripción de como llevó a cabo el reto; al llenar el formulario, estas pruebas se mostrarán en el apartado correspondiente a las publicaciones del usuario. También, se dispondrá de un foro donde todos podrán comentar, preguntar o responder sobre diferentes temas relacionados a los desafíos presentados. Todo esto tiene una finalidad, ya que cada usuario cuenta con un personaje base, el cual, mediante los retos cumplidos, obtiene recompensas, que serán accesorios para el personaje, además, de ayudar al medioambiente y ser conscientes de nuestro impacto como individuos.

## Especificaciones temporales
- Para iniciar sesión debe dirigirse a este enlace en su navegador:
~~~
http://127.0.0.1:8000/login/
~~~
- Se debe escribir en los campos de usuario y contraseña las siguientes credenciales:
    Usuario: jose
    Contraseña: jose
- Esto debido a que está en fase de desarrollo y no están completas todas las funcionalidades, una vez hecho esto ya podrá completar los desafíos y publicarlos.

## Instalación del ambiente

### Requerimientos

- Python 3.10 o superior
- PostgreSQL o SQLite

### Ubuntu Linux / MacOS
Instalación de gestor de ambientes virtuales de Python
~~~
sudo apt install python3-venv
~~~
Creación del ambiente virtual
~~~
python3 -m venv .venv
~~~
Activación del ambiente virtual
~~~
source .venv/bin/activate
~~~
Instalación de dependencias de este proyecto
~~~
pip3 install -r requirements.txt
~~~
En caso de querer desactivar el ambiente usar
~~~
deactivate
~~~
### Windows
Instalación de gestor de ambientes virtuales de Python
~~~
pip install virtualenv
~~~
Creación del ambiente virtual
~~~
py -m venv .venv
~~~
Activación del ambiente virtual para CMD
~~~
.venv\Scripts\activate
~~~
Activación del ambiente virtual para PowerShell
~~~
.venv\Scripts\activate.ps1
~~~
Instalación de dependencias de este proyecto
~~~
pip install -r requirements.txt
~~~
En caso de querer desactivar el ambiente usar
~~~
deactivate
~~~

## Comandos útiles

### Iniciar servidor
#### Linux o MacOS
~~~
python3 manage.py runserver
~~~
#### Windows
~~~
python manage.py runserver
~~~

Una vez inicializado el servidor se deberá dirigir al siguiente enlace: <http://localhost:8000>

### Crear nueva aplicación

** Nota: ** No olvidar el punto "." para que la aplicación se cree en el directorio raíz

#### Linux o MacOS
~~~
python3 manage.py startapp <nombre_de_la_aplicacion> .
~~~
#### Windows
~~~
python manage.py startapp <nombre_de_la_aplicacion> .
~~~

### Crear Súper Usuario
#### Linux o MacOS
~~~
python3 manage.py createsuperuser
~~~
#### Windows
~~~
python manage.py createsuperuser
~~~

### Generar archivos de migración
#### Linux o MacOS
~~~
python3 manage.py makemigrations
~~~
#### Windows
~~~
python manage.py makemigrations
~~~

### Migrar a bases de datos
#### Linux o MacOS
~~~
python3 manage.py migrate
~~~
#### Windows
~~~
python manage.py migrate
~~~
### Almacenar depdendencias y librerías instaladas
#### Linux o MacOS
~~~
pip3 freeze > requirements.txt
~~~
#### Windows
~~~
pip freeze > requirements.txt
~~~

# Ejemplos de Cadenas de Conexión para Django

### PostgreSQL

- Instalar pyscopg2
    ```bash
    pip3 install psycopg2
    ```
- Configurar archivo settings.py
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'nombre_de_tu_base_de_datos',
            'USER': 'tu_usuario',
            'PASSWORD': 'tu_contraseña',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```
### MySQL
- Instalar mysqlclient
    ```bash
    pip3 install mysqlclient
    ```
- Configurar archivo settings.py
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'nombre_de_tu_base_de_datos',
            'USER': 'tu_usuario',
            'PASSWORD': 'tu_contraseña',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }
    ```

### SQLite
- Configurar archivo settings.py
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
    ```

### Oracle

- Instalar cx_Oracle
    ```bash
    pip3 install cx_Oracle
    ```
- Configurar archivo settings.py
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.oracle',
            'NAME': 'nombre_de_tu_base_de_datos',
            'USER': 'tu_usuario',
            'PASSWORD': 'tu_contraseña',
            'HOST': 'localhost',
            'PORT': '1521',
        }
    }
    ```

### SQL Server (usando django-mssql-backend)

- Instalar cx_Oracle
    ```bash
    pip3 install django-mssql-backend
    ```
- Configurar archivo settings.py
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'sql_server.pyodbc',
            'NAME': 'nombre_de_tu_base_de_datos',
            'USER': 'tu_usuario',
            'PASSWORD': 'tu_contraseña',
            'HOST': 'localhost',
            'PORT': '1433',
            'OPTIONS': {
                'driver': 'ODBC Driver 17 for SQL Server',
            },
        }
    }
    ```
