export class Fruit {
  x: number;
  y: number;
  color: string;
  size: number;
  constructor(x: number, y: number, size = 32, color = "orange") {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
  }
}
