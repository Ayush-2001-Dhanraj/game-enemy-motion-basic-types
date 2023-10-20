/** @type {HTMLCanvasElement} */
// wiggle in place
const canvas1 = document.getElementById("canvas1");
const canvas1ctx = canvas1.getContext("2d");
const CANVAS1_HEIGHT = (canvas1.height = 700);
const CANVAS1_WIDTH = (canvas1.width = 500);
const numberOfEnemies = 20;

// endless horizonatl movement
const canvas2 = document.getElementById("canvas2");
const canvas2ctx = canvas2.getContext("2d");
const CANVAS2_HEIGHT = (canvas2.height = 700);
const CANVAS2_WIDTH = (canvas2.width = 500);

const type1EnemyArr = [];
const type2EnemyArr = [];

const enemyImage1 = new Image();
enemyImage1.src = "enemy1.png";
const enemyImage2 = new Image();
enemyImage2.src = "enemy2.png";
let gameFrame = 0;

class EnemyType1 {
  constructor() {
    this.spriteWidth = 293;
    this.spriteHeight = 155;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (CANVAS1_WIDTH - this.width);
    this.y = Math.random() * (CANVAS1_HEIGHT - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
  }
  update() {
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 10 - 5;
    this.frame = Math.floor(gameFrame / this.flapSpeed) % 6;
  }
  draw() {
    canvas1ctx.drawImage(
      enemyImage1,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class EnemyType2 {
  constructor() {
    this.spriteWidth = 266;
    this.spriteHeight = 166;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas2.width - this.width);
    this.y = Math.random() * (canvas2.height - this.height);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 2 + 1);
    this.speed = Math.random() * 4 + 1;
    this.curve = Math.random() * 7;
  }
  update() {
    this.x -= this.speed;
    if (this.x + this.width < 0) this.x = canvas2.width;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    this.frame = Math.floor(gameFrame / this.flapSpeed) % 6;
  }
  draw() {
    canvas2ctx.drawImage(
      enemyImage2,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  type1EnemyArr.push(new EnemyType1());
  type2EnemyArr.push(new EnemyType2());
}

function animate() {
  canvas1ctx.clearRect(0, 0, CANVAS1_WIDTH, CANVAS1_HEIGHT);
  canvas2ctx.clearRect(0, 0, CANVAS2_WIDTH, CANVAS2_HEIGHT);
  type1EnemyArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  type2EnemyArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
