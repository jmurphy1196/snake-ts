import Snake from "./Snake";
import Draw from "./Draw";
import { Fruit } from "./Fruit";
import { FruitsI } from "./types";
const GAME_SPEED = 1000 / 100;

const game_1_root: HTMLElement = document.querySelector(".root");
class Game {
  canvas: HTMLCanvasElement;
  root: HTMLElement;
  screen: Draw;
  snake: Snake;
  fruits: Fruit[];
  scale: number;
  score: number;
  constructor(root: HTMLElement, scale: number) {
    //setup the canvas
    const canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "grey";
    canvas.width = 640;
    canvas.height = 480;
    this.canvas = canvas;
    this.root = root;
    this.root.appendChild(canvas);
    this.scale = scale;
    this.score = 0;

    //setup the screen
    this.screen = new Draw(scale, canvas);
    this.snake = new Snake(this.screen.scale, "#cfdac8");
    this.fruits = [];
  }
  drawScore() {
    const scoreElement: HTMLElement = document.getElementById("score");
    if (scoreElement) {
      scoreElement.innerHTML = `SCORE: ${this.score}`;
    }
  }

  start() {
    this.drawScore();
    //variables

    // add event listener
    window.addEventListener("keypress", (e) => {
      switch (e.key) {
        case "w":
          this.snake.direction = "up";
          break;
        case "d":
          this.snake.direction = "right";
          break;
        case "a":
          this.snake.direction = "left";
          break;
        case "s":
          this.snake.direction = "down";
          break;
      }
    });
    //draw the snake
    this.screen.drawSnake(this.snake);

    setInterval(() => {
      if (this.fruits.length < 5) {
        const [fruitX, fruitY] = this.screen.randomPoints();
        const fruit = new Fruit(fruitX, fruitY, 40 * this.scale, "orange");
        this.fruits.push(fruit);
      }
    }, 5000);

    setInterval(() => {
      this.snake.setNewPosition(this.screen);
      const fruitCollided = this.snake.checkCollisionFruit(this.fruits);
      if (fruitCollided || fruitCollided === 0) {
        //handle collision
        this.snake.insert();
        this.fruits = this.fruits.filter((fruit, i) => i !== fruitCollided);
        this.score += 1;
        this.drawScore();
      }
      const collidedWithSelf = this.snake.checkCollisionWithSelf();
      if (collidedWithSelf) {
        console.log("game over!");
        this.reset();
      }
      this.screen.drawBoard(this.snake, this.fruits);
    }, 125);
  }
  reset() {
    this.score = 0;
    this.snake.delete();
    this.fruits = [];
    this.drawScore();
  }
}

const game = new Game(game_1_root, 1.3);
game.start();
