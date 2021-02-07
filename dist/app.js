(() => {
  // src/Snake.ts
  var Snake = class {
    constructor(scale, color = "white") {
      this.CAN_CHANGE_DIRECTIONS = true;
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
    setNewPosition(columns, rows) {
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
          if (snakeHead.x + this.size / 2 > columns)
            snakeHead.x = 0;
          break;
        case "down":
          snakeHead.y += snakeHead.size;
          if (snakeHead.y + this.size / 2 > rows)
            snakeHead.y = 0;
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
      this.nodes.push(new SnakeNode(0, 0, this.size));
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
    changeDirections(key) {
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
          newNode = new SnakeNode(snakeHead.x + snakeHead.size, snakeHead.y, snakeHead.size);
          break;
        case "down":
          newNode = new SnakeNode(snakeHead.x, snakeHead.y + snakeHead.size, snakeHead.size);
          break;
        case "left":
          newNode = new SnakeNode(snakeHead.x - snakeHead.size, snakeHead.y, snakeHead.size);
          break;
        case "up":
          newNode = new SnakeNode(snakeHead.x, snakeHead.y - snakeHead.size, snakeHead.size);
          break;
      }
      this.nodes.push(newNode);
    }
  };
  var Snake_default = Snake;
  var SnakeNode = class {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  };

  // src/Draw.ts
  var Draw = class {
    constructor(scale, canvas) {
      this.scale = scale;
      this.ctx = canvas.getContext("2d");
      this.rows = canvas.height * scale;
      this.columns = canvas.width * scale;
      this.canvas = canvas;
      canvas.width *= scale;
      canvas.height *= scale;
    }
    drawSnake(snakeObj) {
      snakeObj.nodes.forEach((node) => {
        this.ctx.beginPath();
        this.ctx.rect(node.x, node.y, node.size, node.size);
        this.ctx.fillStyle = snakeObj.color;
        this.ctx.fill();
      });
    }
    drawFruit(fruits) {
      fruits.forEach((fruit) => {
        this.ctx.beginPath();
        this.ctx.rect(fruit.x, fruit.y, fruit.size, fruit.size);
        this.ctx.fillStyle = fruit.color;
        this.ctx.fill();
      });
    }
    drawBoard(snake, fruits) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawSnake(snake);
      this.drawFruit(fruits);
    }
    randomPoints() {
      const randomX = Math.floor(Math.random() * this.columns - 45);
      const randomY = Math.floor(Math.random() * this.rows - 45);
      return [randomX, randomY];
    }
  };
  var Draw_default = Draw;

  // src/Fruit.ts
  var Fruit = class {
    constructor(x, y, scale = 1, color = "orange") {
      this.size = 32;
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = 45;
    }
  };

  // src/app.ts
  var game_1_root = document.querySelector(".root");
  var Game = class {
    constructor(root, scale) {
      this.GAME_SPEED = 110;
      const canvas = document.createElement("canvas");
      canvas.style.backgroundColor = "grey";
      canvas.width = 640;
      canvas.height = 480;
      this.canvas = canvas;
      this.root = root;
      this.root.appendChild(canvas);
      this.scale = scale;
      this.score = 0;
      this.screen = new Draw_default(scale, canvas);
      this.snake = new Snake_default(1 * this.scale, "#cfdac8");
      this.fruits = [];
    }
    checkCollisionFruit() {
      let collided = false;
      let snakeHead = this.snake.nodes[this.snake.nodes.length - 1];
      let fruitIndex;
      this.fruits.forEach((fruit, i) => {
        if (snakeHead.x >= fruit.x - snakeHead.size / 2 && snakeHead.x <= fruit.x + snakeHead.size / 2 && snakeHead.y >= fruit.y - snakeHead.size / 2 && snakeHead.y <= fruit.y + snakeHead.size / 2) {
          collided = true;
          fruitIndex = i;
        }
      });
      if (collided) {
        return fruitIndex;
      }
      return void 0;
    }
    drawScore() {
      const scoreElement = document.getElementById("score");
      if (scoreElement) {
        scoreElement.innerHTML = `SCORE: ${this.score}`;
      }
    }
    start() {
      this.drawScore();
      let CAN_GET_DIRECTIONS = true;
      window.addEventListener("keypress", (e) => {
        this.snake.changeDirections(e.key);
      });
      this.screen.drawSnake(this.snake);
      setInterval(() => {
        if (this.fruits.length < 5) {
          const [fruitX, fruitY] = this.screen.randomPoints();
          const fruit = new Fruit(fruitX, fruitY, 40 * this.scale, "orange");
          this.fruits.push(fruit);
        }
      }, 5e3);
      setInterval(() => {
        this.snake.setNewPosition(this.screen.columns, this.screen.rows);
        const fruitCollided = this.checkCollisionFruit();
        if (fruitCollided || fruitCollided === 0) {
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
  };
  var game = new Game(game_1_root, 2);
  game.start();
})();
