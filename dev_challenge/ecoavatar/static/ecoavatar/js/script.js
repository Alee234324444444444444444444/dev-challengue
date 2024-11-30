// Seleccionar el canvas
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Obtener rutas de las imágenes desde los atributos del canvas
const spriteSheetPath = canvas.getAttribute("data-sprite-sheet");
const hatImagePath = canvas.getAttribute("data-hat");

// Ajustar las dimensiones del canvas
canvas.width = 256; // Tamaño del canvas
canvas.height = 256;

// Cargar la hoja de sprites
const spriteSheet = new Image();
spriteSheet.src = spriteSheetPath;

// Configuración de la hoja de sprites
const FRAME_WIDTH = 500; // Ancho de cada frame en la hoja de sprites
const FRAME_HEIGHT = 500; // Alto de cada frame en la hoja de sprites
let currentFrame = 0; // Frame actual que se está mostrando
const totalFrames = 2; // Total de frames (ajusta este número si tienes más frames)
let frameCounter = 0; // Contador para el cambio de frame
const frameSpeed = 120; // Controla la velocidad de la animación (más alto = más lenta)

// Dibujar el frame actual desde la hoja de sprites 
function drawFrame() {
  // Limpiar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const sx = currentFrame * FRAME_WIDTH; 
  const sy = 0; 

  // Dibujar el frame en el canvas
  ctx.drawImage(
    spriteSheet, // Imagen de la hoja de sprites
    sx, sy, // Coordenadas del frame en la hoja
    FRAME_WIDTH, FRAME_HEIGHT, // Dimensiones del frame original
    0, 0, // Posición en el canvas
    canvas.width, canvas.height // Dimensiones escaladas en el canvas
  );

  // Cambiar de frame después de algunos ciclos
  frameCounter++;
  if (frameCounter >= frameSpeed) {
    currentFrame = (currentFrame + 1) % totalFrames; // Pasar al siguiente frame
    frameCounter = 0; // Reiniciar el contador
  }
}

// Loop de animación
function animationLoop() {
  drawFrame(); // Dibujar el frame actual
  requestAnimationFrame(animationLoop); // Repetir en el siguiente ciclo
}

// Iniciar la animación cuando la hoja de sprites esté cargada
spriteSheet.onload = () => {
  animationLoop();
};

// Depurar si la hoja de sprites no carga
spriteSheet.onerror = () => {
  console.error("Error: No se pudo cargar la hoja de sprites. Verifica la ruta.");
};

// Función para mostrar la alerta de "Completar Tarea"
function completeTask() {
  Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas completar esta tarea?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, completar',
      cancelButtonText: 'Cancelar',
      customClass: {
          confirmButton: 'btn-verde',  // Aplicar clase personalizada a todos los botones de confirmación
      }
  }).then((result) => {
      if (result.isConfirmed) {
          // Aquí puedes agregar la lógica para completar la tarea
          Swal.fire('Tarea Completada', 'La tarea se ha completado exitosamente', 'success');
      }
  });
}

// Función para mostrar la alerta de "Equipar Recompensa"
function equipReward() {
  Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas equipar la recompensa?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, equipar',
      cancelButtonText: 'Cancelar',
      customClass: {
          confirmButton: 'btn-verde',  // Aplicar clase personalizada a todos los botones de confirmación
      }
  }).then((result) => {
      if (result.isConfirmed) {
          // Aquí puedes agregar la lógica para equipar la recompensa
          Swal.fire('Recompensa Equipada', 'La recompensa ha sido equipada correctamente', 'success');
      }
  });
}
// Listas de desafíos
const dailyChallenges = [
  { id: 1, text: "Reciclar una botella", completed: false },
  { id: 2, text: "Apagar las luces de una habitación vacía", completed: false },
  { id: 3, text: "Usar menos agua al lavar los platos", completed: false },
];

const weeklyChallenges = [
  { id: 1, text: "Plantar un árbol", completed: false },
  { id: 2, text: "Recoger basura en un parque", completed: false },
  { id: 3, text: "Hacer composta con residuos orgánicos", completed: false },
];

// Elementos del DOM
const dailyChallengeList = document.getElementById("daily-challenge-list");
const weeklyChallengeList = document.getElementById("weekly-challenge-list");

// Renderizar desafíos en la página
function renderChallenges(challenges, container) {
  container.innerHTML = ""; // Limpia la lista
  challenges.forEach((challenge) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <span>${challenge.text}</span>
          <button onclick="completeChallenge(${challenge.id}, '${container.id}')">
              Completar
          </button>
      `;
      container.appendChild(li);
  });
}

// Marcar un desafío como completado
function completeChallenge(id, type) {
  let challenges;
  if (type === "daily-challenge-list") {
      challenges = dailyChallenges;
  } else if (type === "weekly-challenge-list") {
      challenges = weeklyChallenges;
  }

  const challenge = challenges.find((c) => c.id === id);
  if (challenge && !challenge.completed) {
      challenge.completed = true;
      Swal.fire({
          title: "¡Desafío Completado!",
          text: "¡Buen trabajo cuidando el planeta!",
          icon: "success",
      });

      // Si es un desafío diario, equipar el sombrero
      if (type === "daily-challenge-list") {
          equipHat();
      }

      // Renderizar la lista actualizada
      renderChallenges(challenges, type === "daily-challenge-list" ? dailyChallengeList : weeklyChallengeList);
  }
}

// Equipar el sombrero como recompensa
function equipHat() {
  const hat = new Image();
  hat.src = hatImagePath; // Ruta al sprite del sombrero
  hat.onload = () => {
      ctx.drawImage(hat, 50, 20, 150, 100); // Ajusta las coordenadas según el personaje
  };
}

// Renderizar las listas de desafíos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderChallenges(dailyChallenges, dailyChallengeList);
  renderChallenges(weeklyChallenges, weeklyChallengeList);
});
