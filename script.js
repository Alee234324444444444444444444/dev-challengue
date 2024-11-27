// Seleccionar el canvas
const canvas = document.getElementById("pixelCanvas");
const ctx = canvas.getContext("2d");

// Ajustar las dimensiones del canvas
canvas.width = 256; // Aumentamos el tamaño del canvas
canvas.height = 256;

// Cargar la hoja de sprites
const spriteSheet = new Image();
spriteSheet.src = "./assets/character.png"; // Ruta de la hoja de sprites (confirma que sea correcta)

// Configuración de animación
const FRAME_WIDTH = 130; // Ancho de cada frame del personaje
const FRAME_HEIGHT = 130; // Alto de cada frame del personaje
let currentFrame = 0; // Frame actual que se está mostrando
const totalFrames = 3; // Total de frames en la hoja de sprites
let frameCounter = 0; // Contador de frames
const frameSpeed = 100; // Más alto = animación más lenta

// Dibujar el frame actual
function drawFrame() {
  

  // Dibujar el frame actual desde la hoja de sprites
  ctx.drawImage(
    spriteSheet,
    currentFrame * FRAME_WIDTH, // Coordenada X del frame actual
    0, // Coordenada Y (ajustar si la animación tiene varias filas)
    FRAME_WIDTH, FRAME_HEIGHT, // Dimensiones del frame original
    0, 0, // Posición en el canvas (arriba a la izquierda)
    canvas.width, canvas.height // Escala al tamaño del canvas
  );

  // Cambiar de frame (para la animación)
  frameCounter++;
  if (frameCounter >= frameSpeed) {
    currentFrame = (currentFrame + 1) % totalFrames; // Ciclar entre frames
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
