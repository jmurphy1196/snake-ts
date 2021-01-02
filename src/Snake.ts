import { FruitsI, DrawI } from "./types";
export default class Snake {
  direction: string;
  xSpeed: number;
  ySpeed: number;
  color: string;
  nodes: Array<SnakeNode>;
  size: number;
  scale: number;
  constructor(scale: number, color = "white") {
    this.xSpeed = scale * 1;
    this.ySpeed = scale * 1;
    this.color = color;
    this.nodes = [new SnakeNode(0, 0, scale * 32)];
    this.direction = "right";
    this.size = 32 * scale;
    this.scale = scale;
  }

  print() {
    console.log(this.nodes);
  }
  setNewPosition(screen: DrawI) {
    const snakeHead = this.nodes[this.nodes.length - 1];
    let prevX = snakeHead.x;
    let prevY = snakeHead.y;
    switch (this.direction) {
      case "right":
        snakeHead.x += snakeHead.size;
        if (snakeHead.x > screen.columns) {
          snakeHead.x = 0;
        }
        for (let i = this.nodes.length - 2; i >= 0; i--) {
          let temp = this.nodes[i].x;
          let temp2 = this.nodes[i].y;
          this.nodes[i].x = prevX;
          this.nodes[i].y = prevY;
          prevX = temp;
          prevY = temp2;
        }
        break;
      case "down":
        snakeHead.y += snakeHead.size;
        if (snakeHead.y > screen.rows) {
          snakeHead.y = 0;
        }
        for (let i = this.nodes.length - 2; i >= 0; i--) {
          let temp = this.nodes[i].y;
          let temp2 = this.nodes[i].x;
          this.nodes[i].y = prevY;
          this.nodes[i].x = prevX;
          prevY = temp;
          prevX = temp2;
        }
        break;
      case "left":
        snakeHead.x -= snakeHead.size;
        if (snakeHead.x < 0) {
          snakeHead.x = screen.columns - snakeHead.size;
        }
        for (let i = this.nodes.length - 2; i >= 0; i--) {
          let temp = this.nodes[i].x;
          let temp2 = this.nodes[i].y;
          this.nodes[i].x = prevX;
          this.nodes[i].y = prevY;
          prevX = temp;
          prevY = temp2;
        }
        break;
      case "up":
        snakeHead.y -= snakeHead.size;
        if (snakeHead.y + snakeHead.size < 0) {
          snakeHead.y = screen.rows - snakeHead.size;
        }
        for (let i = this.nodes.length - 2; i >= 0; i--) {
          let temp = this.nodes[i].y;
          let temp2 = this.nodes[i].x;
          this.nodes[i].y = prevY;
          this.nodes[i].x = prevX;
          prevY = temp;
          prevX = temp2;
        }
        break;
    }
  }
  delete() {
    this.nodes = [];
    this.nodes.push(new SnakeNode(0, 0, this.size * this.scale));
  }
  checkCollisionWithSelf() {
    const snakePositions = {};
    let didCollide = false;
    this.nodes.forEach((node, i) => {
      if (snakePositions[`${node.x},${node.y}`]) {
        didCollide = true;
      } else {
        snakePositions[`${node.x},${node.y}`] = i;
      }
    });

    return didCollide;
  }
  checkCollisionFruit(fruits: FruitsI[]) {
    let collided = false;
    let snakeHead = this.nodes[this.nodes.length - 1];
    let fruitIndex;
    fruits.forEach((fruit, i) => {
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
  insert() {
    const snakeHead = this.nodes[this.nodes.length - 1];
    let newNode;
    switch (this.direction) {
      case "right":
        newNode = new SnakeNode(
          snakeHead.x + snakeHead.size,
          snakeHead.y,
          snakeHead.size
        );
        break;
      case "down":
        newNode = new SnakeNode(
          snakeHead.x,
          snakeHead.y + snakeHead.size,
          snakeHead.size
        );
        break;
      case "left":
        newNode = new SnakeNode(
          snakeHead.x - snakeHead.size,
          snakeHead.y,
          snakeHead.size
        );
        break;
      case "up":
        newNode = new SnakeNode(
          snakeHead.x,
          snakeHead.y - snakeHead.size,
          snakeHead.size
        );
        break;
    }

    this.nodes.push(newNode);
  }
}

class SnakeNode {
  constructor(public x: number, public y: number, public size: number) {}
}
