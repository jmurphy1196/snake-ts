import Snake from "./Snake";
import Draw from "./Draw";
import { Fruit } from "./Fruit";

const game_1_root: HTMLElement = document.querySelector(".root");
class Game {
  private GAME_SPEED = 110;
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
  checkCollisionFruit() {
    let collided = false;
    let snakeHead = this.snake.nodes[this.snake.nodes.length - 1];
    let fruitIndex;
    this.fruits.forEach((fruit, i) => {
      if (
        snakeHead.x >= fruit.x - snakeHead.size / 2 &&
        snakeHead.x <= fruit.x + snakeHead.size / 2 &&
        snakeHead.y >= fruit.y - snakeHead.size / 2 &&
        snakeHead.y <= fruit.y + snakeHead.size / 2
      ) {
        collided = true;
        fruitIndex = i;
      }
    });
    if (collided) {
      return fruitIndex;
    }
    return undefined;
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
    let CAN_GET_DIRECTIONS = true;

    // add event listener
    window.addEventListener("keypress", (e) => {
      this.snake.changeDirections(e.key);
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
      this.snake.setNewPosition(this.screen.columns, this.screen.rows);
      const fruitCollided = this.checkCollisionFruit();
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
    }, this.GAME_SPEED);
  }
  reset() {
    this.score = 0;
    this.snake.delete();
    this.fruits = [];
    this.drawScore();
  }
}

const game = new Game(game_1_root, 2);
game.start();
