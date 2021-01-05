export class Fruit {
  x: number;
  y: number;
  color: string;
  size: number = 32;
  constructor(x: number, y: number, scale = 1, color = "orange") {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 45;
  }
}
