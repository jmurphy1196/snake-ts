import { FruitsI, SnakeI } from "./types";
export default class Draw {
  ctx: CanvasRenderingContext2D;
  rows: number;
  columns: number;
  canvas: HTMLCanvasElement;
  constructor(public scale: number, canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
    this.rows = canvas.height * scale;
    this.columns = canvas.width * scale;
    this.canvas = canvas;
    canvas.width *= scale;
    canvas.height *= scale;
  }

  drawSnake(snakeObj: SnakeI) {
    snakeObj.nodes.forEach((node) => {
      this.ctx.beginPath();
      this.ctx.rect(node.x, node.y, node.size, node.size);
      this.ctx.fillStyle = snakeObj.color;
      this.ctx.fill();
    });
  }
  drawFruit(fruits: FruitsI[]) {
    fruits.forEach((fruit) => {
      this.ctx.beginPath();
      this.ctx.rect(fruit.x, fruit.y, fruit.size, fruit.size);
      this.ctx.fillStyle = fruit.color;
      this.ctx.fill();
    });
  }
  drawBoard(snake: SnakeI, fruits: FruitsI[]) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawSnake(snake);
    this.drawFruit(fruits);
  }

  randomPoints() {
    //TODO fix this -> sometimes will spawn fruit outside map edge
    const randomX = Math.floor(Math.random() * this.columns - 45);
    const randomY = Math.floor(Math.random() * this.rows - 45);
    return [randomX, randomY];
  }
}
