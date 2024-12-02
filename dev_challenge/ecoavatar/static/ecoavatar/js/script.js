
// Configuración inicial del canvas
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Obtener las rutas de la hoja de sprites y el sombrero desde los atributos del canvas
const spriteSheetPath = canvas.getAttribute("data-sprite-sheet");
const hatImagePath = canvas.getAttribute("data-hat");

// Cargar la hoja de sprites y el sombrero
const spriteSheet = new Image();
const hatImage = new Image();
spriteSheet.src = spriteSheetPath;
hatImage.src = hatImagePath;

// Configuración de la animación del personaje
const FRAME_WIDTH = 500; 
const FRAME_HEIGHT = 500;
let currentFrame = 0;
const totalFrames = 2; // Cambiar si hay más frames en la hoja de sprites
let frameCounter = 0;
const frameSpeed = 120;

let isHatEquipped = false;
// Dibujar el personaje desde la hoja de sprites
function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sx = currentFrame * FRAME_WIDTH;
  const sy = 0;

  ctx.drawImage(
      spriteSheet,
      sx, sy,
      FRAME_WIDTH, FRAME_HEIGHT,
      0, 0,
      canvas.width, canvas.height
  );

  frameCounter++;
  if (frameCounter >= frameSpeed) {
      currentFrame = (currentFrame + 1) % totalFrames;
      frameCounter = 0;
  }

  // Si el sombrero está equipado, dibujarlo después del personaje
  if (isHatEquipped) {
      drawHat();
  }
}
// Dibujar el sombrero sobre el personaje
function drawHat() {
  const hatX = 50; // Posición X del sombrero
  const hatY = 1; // Posición Y del sombrero
  const hatWidth = 200; // Ancho del sombrero
  const hatHeight = 150; // Alto del sombrero
  
  ctx.drawImage(hatImage, hatX, hatY, hatWidth, hatHeight); // Dibujar el sombrero

}

// Loop de animación para el personaje
function animationLoop() {
    drawCharacter();
    requestAnimationFrame(animationLoop);
}

/// Equipar el sombrero al personaje
function equipReward() {
  hatImage.onload = function () {
      isHatEquipped = true; // Activar la bandera
      
      // Alert animado usando SweetAlert2
      Swal.fire({
          title: "¡Sombrero equipado!",
          text: "Tu personaje ahora luce más elegante.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: 'top-end',
          customClass: {
              popup: 'animate__animated animate__bounceIn'
          }
      });
  };

  hatImage.onerror = function () {
      console.error("Error: No se pudo cargar la imagen del sombrero.");
      
      // Alert de error usando SweetAlert2
      Swal.fire({
          title: "Error",
          text: "No se pudo equipar el sombrero.",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          toast: true,
          position: 'top-end',
          customClass: {
              popup: 'animate__animated animate__shakeX'
          }
      });
  };

  hatImage.src = hatImagePath;
}

// Iniciar la animación cuando la hoja de sprites esté cargada
spriteSheet.onload = () => {
    animationLoop();
};

spriteSheet.onerror = () => {
    console.error("Error: No se pudo cargar la hoja de sprites.");
};

// Asociar el evento "Equipar Recompensa" al botón
document.addEventListener("DOMContentLoaded", () => {
    const equipButton = document.querySelector(".equipar-btn");
    equipButton.addEventListener("click", equipReward);
});

// Función para abrir el modal al hacer clic en "Completar"
function openChallengeModal(button) {
    const desafioId = button.getAttribute('data-desafio-id');

    document.getElementById('challengeModal').style.display = 'flex';

    document.getElementById('challengeForm').onsubmit = function (event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('photo', document.getElementById('challengePhoto').files[0]);
        formData.append('description', document.getElementById('challengeDescription').value);

        fetch(`/ecoavatar/completar_desafio/${desafioId}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': '{{ csrf_token }}'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('¡Desafío completado!');
                closeModal();
                document.getElementById('rewardMessage').style.display = 'block';
                document.getElementById('rewardImage').src = data.recompensa_imagen_url;
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    };
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('challengeModal');
  modal.style.display = 'none'; // Cerrar el modal cambiando su estilo a 'none'
}

// Cuando se crea la publicación correctamente, redirigir a la lista de publicaciones
document.getElementById('submitPost').addEventListener('click', function () {
  const formData = new FormData(document.getElementById('challengeForm'));

  // Usar la URL generada por Django en el HTML
  fetch(addPostUrl, {
      method: 'POST',
      headers: {
          'X-CSRFToken': '{{ csrf_token }}' // Asegúrate de que el CSRF token esté disponible en el HTML
      },
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
        Swal.fire({
          title: "¡Publicación creada exitosamente!",
          text: "Gracias por tu contribución.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
          closeModal(); // Cierra el modal
          
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Algo salió mal al procesar la publicación.",
          icon: "error",
          confirmButtonText: "Intentar nuevamente"
        });
      }
  })
  .catch(error => console.error('Error:', error));
});



// Manejo de comentarios
document.addEventListener("DOMContentLoaded", () => {
    const fotoInput = document.getElementById("foto-perfil");
    const textarea = document.querySelector(".foro-textarea");
    const publicarButton = document.querySelector(".btn-publicar");
    const comentariosList = document.querySelector(".comentarios");

    publicarButton.addEventListener("click", () => {
        const comentarioTexto = textarea.value.trim();

        if (comentarioTexto === "") {
            Swal.fire({
                icon: "error",
                title: "Comentario vacío",
                text: "Por favor, escribe algo antes de publicar.",
            });
            return;
        }

        let fotoURL = "https://via.placeholder.com/50";
        if (fotoInput.files && fotoInput.files[0]) {
            const file = fotoInput.files[0];
            fotoURL = URL.createObjectURL(file);
        }

        const comentarioItem = document.createElement("li");
        comentarioItem.className = "comentario-item";

        const comentarioBox = document.createElement("div");
        comentarioBox.className = "comentario-box";

        const comentarioImg = document.createElement("img");
        comentarioImg.className = "comentario-img";
        comentarioImg.src = fotoURL;
        comentarioImg.alt = "Foto de perfil";

        const comentarioContent = document.createElement("div");
        comentarioContent.className = "comentario-content";

        const comentarioUsername = document.createElement("p");
        comentarioUsername.className = "comentario-username";
        comentarioUsername.textContent = "Usuario Anónimo:";

        const comentarioTextoElemento = document.createElement("p");
        comentarioTextoElemento.textContent = comentarioTexto;

        comentarioContent.appendChild(comentarioUsername);
        comentarioContent.appendChild(comentarioTextoElemento);
        comentarioBox.appendChild(comentarioImg);
        comentarioBox.appendChild(comentarioContent);
        comentarioItem.appendChild(comentarioBox);

        comentariosList.appendChild(comentarioItem);

        textarea.value = "";
        fotoInput.value = "";

        Swal.fire({
            icon: "success",
            title: "Publicado",
            text: "Tu comentario se ha publicado exitosamente.",
        });
    });
});

