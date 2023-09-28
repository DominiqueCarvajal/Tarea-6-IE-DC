/**
 *
 *  Campo de Noise
 *
 */

let particles;
let bg;
let speedButtons = [];
let selectedSpeed = 5; // Velocidad inicial
let activeButton = null; // Botón activo
let scene = 1; // Escenario inicial

function setup() {
  createCanvas(windowWidth, windowHeight);
  particles = [];

  // Botones de velocidad
  createSpeedButtons();

  // Crear 100 partículas
  for (let i = 0; i < 4000; i++) {
    let p = new Patricle(random(width), random(height), selectedSpeed, scene);
    particles.push(p);
  }
  regen();
  background(0);
}

function regen() {
  let r = 5;
  bg = createGraphics(width, height);
  for (let y = 0; y < height; y += r) {
    for (let x = 0; x < width; x += r) {
      let n = noise(x / selectedSpeed, y / selectedSpeed) * 255;
      bg.fill(n);
      bg.noStroke();
      bg.rect(x, y, r, r);
    }
  }
}

function draw() {
  blendMode(SCREEN);

  for (let p of particles) {
    p.move();
    p.draw();
  }

  blendMode(BLEND);
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);
}

function createSpeedButtons() {
  const numButtons = 10;
  const buttonWidth = 40;
  const buttonHeight = 30;
  const spacing = 10;
  const startX = width / 2 - (buttonWidth + spacing) * (numButtons / 2);

  for (let i = 1; i <= numButtons; i++) {
    let button = createButton(i.toString());
    button.position(startX + (buttonWidth + spacing) * (i - 1), height - buttonHeight - 10);
    button.size(buttonWidth, buttonHeight);
    button.mousePressed(() => changeScene(i, button));
    speedButtons.push(button);
  }
}

function changeScene(newScene, button) {
  scene = newScene;
  adjustParticles();
  regen();
  
  // Aplicar estilo al botón activado
  if (activeButton) {
    activeButton.style('background-color', '');
  }
  activeButton = button;
  activeButton.style('background-color', 'rgba(0, 0, 0, 0.2)');
}

function adjustParticles() {
  particles = [];
  for (let i = 0; i < 4000; i++) {
    let p = new Patricle(random(width), random(height), selectedSpeed, scene);
    particles.push(p);
  }
}

class Patricle {
  constructor(x, y, speed, scene) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.age = 0;
    this.maxAge = random(120, 320);
    this.speed = speed;
    this.col = getColor(scene);
    this.scene = scene; // Almacenar el número de escenario
  }

  move() {
    this.angle =
      (noise(this.x / this.speed, this.y / this.speed) - 0.5) *
      TWO_PI *
      2;

    this.x += cos(this.angle) * 3;
    this.y += sin(this.angle) * 3;

    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    this.age++;
    if (this.age > this.maxAge) {
      this.x = random(width);
      this.y = random(height);
      this.age = 0;
      this.col = getColor(this.scene);
    }
  }

  draw() {
    let currentCol = lerpColor(this.col, color(0, 0), this.age / this.maxAge);
    fill(currentCol);
    stroke(currentCol);
    strokeWeight(5);

    // Cambiar la forma de las partículas según el escenario
    switch (this.scene) {
      case 1: // Escenario 1
        ellipse(this.x, this.y, 10, 10);
        break;

      case 2: // Escenario 2
        rect(this.x, this.y, 10, 10);
        break;

      case 3: // Escenario 3
        triangle(this.x, this.y, this.x + 10, this.y, this.x + 5, this.y - 10);
        break;

      case 4: // Escenario 4
        ellipse(this.x, this.y, 8, 8);
        break;

      case 5: // Escenario 5
        rect(this.x, this.y, 8, 8);
        break;

      case 6: // Escenario 6
        // Nueva forma para el escenario 6
        line(this.x, this.y, this.x + 5, this.y - 5);
        break;

      case 7: // Escenario 7
        // Nueva forma para el escenario 7
        line(this.x, this.y, this.x + 5, this.y + 5);
        break;

      case 8: // Escenario 8
        // Nueva forma para el escenario 8
        rect(this.x, this.y, 12, 12);
        break;

      case 9: // Escenario 9
        // Nueva forma para el escenario 9
        ellipse(this.x, this.y, 12, 6);
        break;

      case 10: // Escenario 10
        // Nueva forma para el escenario 10
        triangle(this.x, this.y, this.x + 5, this.y, this.x + 2.5, this.y - 5);
        break;

      default:
        // Escenario predeterminado (círculos)
        ellipse(this.x, this.y, 10, 10);
        break;
    }
  }
}

function getColor(scene) {
  const colorPaletteArray = [
    color(255, 0, 0),   // Escenario 1 - Rojo
    color(0, 0, 255),   // Escenario 2 - Azul
    color(255, 255, 0), // Escenario 3 - Amarillo
    color(255, 192, 203), // Escenario 4 - Rosa
    color(0, 255, 0),   // Escenario 5 - Verde
    color(128, 0, 128), // Escenario 6 - Púrpura
    color(255, 165, 0), // Escenario 7 - Naranja
    color(255, 69, 0),  // Escenario 8 - Rojo-Naranja
    color(0, 128, 128), // Escenario 9 - Teal
    color(255)           // Escenario 10 - Blanco
  ];
  
  return colorPaletteArray[scene - 1];
}
