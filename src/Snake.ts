import { FruitsI, DrawI } from "./types";
export default class Snake {
  direction: string;
  xSpeed: number;
  ySpeed: number;
  color: string;
  nodes: Array<SnakeNode>;
  size: number;
  scale: number;
  private CAN_CHANGE_DIRECTIONS: boolean = true;
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
  setNewPosition(columns: number, rows: number) {
    const snakeHead = this.nodes[this.nodes.length - 1];
    let prevX = snakeHead.x;
    let prevY = snakeHead.y;
    const followTheHead = () => {
      for (let i = this.nodes.length - 2; i >= 0; i--) {
        let temp = this.nodes[i].x;
        let temp2 = this.nodes[i].y;
        this.nodes[i].x = prevX;
        this.nodes[i].y = prevY;
        prevX = temp;
        prevY = temp2;
      }
    };
    switch (this.direction) {
      case "right":
        snakeHead.x += snakeHead.size;
        if (snakeHead.x + this.size / 2 > columns) snakeHead.x = 0;

        break;
      case "down":
        snakeHead.y += snakeHead.size;
        if (snakeHead.y + this.size / 2 > rows) snakeHead.y = 0;
        break;
      case "left":
        snakeHead.x -= snakeHead.size;
        if (snakeHead.x + this.size / 2 < 0)
          snakeHead.x = columns - snakeHead.size;

        break;
      case "up":
        snakeHead.y -= snakeHead.size;
        if (snakeHead.y + this.size / 2 < 0)
          snakeHead.y = rows - snakeHead.size;
        break;
    }
    followTheHead();
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
  changeDirections(key: string) {
    if (this.CAN_CHANGE_DIRECTIONS) {
      switch (key) {
        case "w":
          this.direction = "up";
          break;
        case "d":
          this.direction = "right";
          break;
        case "a":
          this.direction = "left";
          break;
        case "s":
          this.direction = "down";
          break;
      }
    }
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
