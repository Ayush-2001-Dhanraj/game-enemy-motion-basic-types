/** @type {HTMLCanvasElement} */
// wiggle in place
const canvas1 = document.getElementById("canvas1");
const canvas1ctx = canvas1.getContext("2d");
const CANVAS1_HEIGHT = (canvas1.height = 700);
const CANVAS1_WIDTH = (canvas1.width = 500);

// endless horizonatl movement
const canvas2 = document.getElementById("canvas2");
const canvas2ctx = canvas2.getContext("2d");
const CANVAS2_HEIGHT = (canvas2.height = 700);
const CANVAS2_WIDTH = (canvas2.width = 500);

// different pattern movement animation
const canvas3 = document.getElementById("canvas3");
const canvas3ctx = canvas3.getContext("2d");
const CANVAS3_HEIGHT = (canvas3.height = 700);
const CANVAS3_WIDTH = (canvas3.width = 500);

let gameFrame = 0;
const numberOfEnemies = 100;
const type1EnemyArr = [];
const type2EnemyArr = [];
const type3EnemyArr = [];

const enemyImage1 = new Image();
enemyImage1.src = "enemy1.png";
const enemyImage2 = new Image();
enemyImage2.src = "enemy2.png";
const enemyImage3 = new Image();
enemyImage3.src = "enemy3.png";

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

class EnemyType3 {
  constructor() {
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;
    this.x = Math.random() * (canvas3.width - this.width);
    this.y = Math.random() * (canvas3.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = 0;
    this.angleSpeed = Math.random() * 2 + 0.5;
  }
  update() {
    this.x =
      (canvas3.width / 2) * Math.sin(this.angle * (Math.PI / 200)) +
      (canvas3.width / 2 - this.width / 2);
    this.y =
      (canvas3.height / 2) * Math.cos(this.angle * (Math.PI / 250)) +
      (canvas3.height / 2 - this.height / 2);
    this.angle += this.angleSpeed;
    if (this.x + this.width < 0) this.x = canvas3.width;
    this.frame = Math.floor(gameFrame / this.flapSpeed) % 6;
  }
  draw() {
    canvas3ctx.drawImage(
      enemyImage3,
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
  type3EnemyArr.push(new EnemyType3());
}

function animate() {
  canvas1ctx.clearRect(0, 0, CANVAS1_WIDTH, CANVAS1_HEIGHT);
  canvas2ctx.clearRect(0, 0, CANVAS2_WIDTH, CANVAS2_HEIGHT);
  canvas3ctx.clearRect(0, 0, CANVAS3_WIDTH, CANVAS3_HEIGHT);
  type1EnemyArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  type2EnemyArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  type3EnemyArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
