const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');

// Personaje inicial
function drawCharacter() {
  // Dibujar un rectángulo básico como personaje
  ctx.fillStyle = 'blue'; // Color del personaje
  ctx.fillRect(40, 40, 48, 48); // Posición y tamaño del personaje
}

drawCharacter();

// Completar tarea
function completeTask() {
  alert("¡Tarea completada! Has ganado un sombrero.");
}

// Equipar recompensa
function equipReward() {
  // Dibujar un sombrero en el personaje
  ctx.fillStyle = 'red'; // Color del sombrero
  ctx.fillRect(48, 20, 32, 20); // Posición y tamaño del sombrero
  alert("¡Has equipado el sombrero!");
}
