// Seleccionar el canvas
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Ajustar las dimensiones del canvas
canvas.width = 256; // Tamaño del canvas
canvas.height = 256;

// Cargar la hoja de sprites
const spriteSheet = new Image();
spriteSheet.src = "./assets/character.png"; // Asegúrate de que esta ruta sea correcta

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
