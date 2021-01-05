// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Snake.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Snake =
/** @class */
function () {
  function Snake(scale, color) {
    if (color === void 0) {
      color = "white";
    }

    this.CAN_CHANGE_DIRECTIONS = true;
    this.xSpeed = scale * 1;
    this.ySpeed = scale * 1;
    this.color = color;
    this.nodes = [new SnakeNode(0, 0, scale * 32)];
    this.direction = "right";
    this.size = 32 * scale;
    this.scale = scale;
  }

  Snake.prototype.print = function () {
    console.log(this.nodes);
  };

  Snake.prototype.setNewPosition = function (columns, rows) {
    var _this = this;

    var snakeHead = this.nodes[this.nodes.length - 1];
    var prevX = snakeHead.x;
    var prevY = snakeHead.y;

    var followTheHead = function followTheHead() {
      for (var i = _this.nodes.length - 2; i >= 0; i--) {
        var temp = _this.nodes[i].x;
        var temp2 = _this.nodes[i].y;
        _this.nodes[i].x = prevX;
        _this.nodes[i].y = prevY;
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
        if (snakeHead.x + this.size / 2 < 0) snakeHead.x = columns - snakeHead.size;
        break;

      case "up":
        snakeHead.y -= snakeHead.size;
        if (snakeHead.y + this.size / 2 < 0) snakeHead.y = rows - snakeHead.size;
        break;
    }

    followTheHead();
  };

  Snake.prototype.delete = function () {
    this.nodes = [];
    this.nodes.push(new SnakeNode(0, 0, this.size * this.scale));
  };

  Snake.prototype.checkCollisionWithSelf = function () {
    var snakePositions = {};
    var didCollide = false;
    this.nodes.forEach(function (node, i) {
      if (snakePositions[node.x + "," + node.y]) {
        didCollide = true;
      } else {
        snakePositions[node.x + "," + node.y] = i;
      }
    });
    return didCollide;
  };

  Snake.prototype.changeDirections = function (key) {
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
  };

  Snake.prototype.insert = function () {
    var snakeHead = this.nodes[this.nodes.length - 1];
    var newNode;

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
  };

  return Snake;
}();

exports.default = Snake;

var SnakeNode =
/** @class */
function () {
  function SnakeNode(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  return SnakeNode;
}();
},{}],"Draw.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Draw =
/** @class */
function () {
  function Draw(scale, canvas) {
    this.scale = scale;
    this.ctx = canvas.getContext("2d");
    this.rows = canvas.height * scale;
    this.columns = canvas.width * scale;
    this.canvas = canvas;
    canvas.width *= scale;
    canvas.height *= scale;
  }

  Draw.prototype.drawSnake = function (snakeObj) {
    var _this = this;

    snakeObj.nodes.forEach(function (node) {
      _this.ctx.beginPath();

      _this.ctx.rect(node.x, node.y, node.size, node.size);

      _this.ctx.fillStyle = snakeObj.color;

      _this.ctx.fill();
    });
  };

  Draw.prototype.drawFruit = function (fruits) {
    var _this = this;

    fruits.forEach(function (fruit) {
      _this.ctx.beginPath();

      _this.ctx.rect(fruit.x, fruit.y, fruit.size, fruit.size);

      _this.ctx.fillStyle = fruit.color;

      _this.ctx.fill();
    });
  };

  Draw.prototype.drawBoard = function (snake, fruits) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawSnake(snake);
    this.drawFruit(fruits);
  };

  Draw.prototype.randomPoints = function () {
    //TODO fix this -> sometimes will spawn fruit outside map edge
    var randomX = Math.floor(Math.random() * this.columns - 45);
    var randomY = Math.floor(Math.random() * this.rows - 45);
    return [randomX, randomY];
  };

  return Draw;
}();

exports.default = Draw;
},{}],"Fruit.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fruit = void 0;

var Fruit =
/** @class */
function () {
  function Fruit(x, y, scale, color) {
    if (scale === void 0) {
      scale = 1;
    }

    if (color === void 0) {
      color = "orange";
    }

    this.size = 32;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 45;
  }

  return Fruit;
}();

exports.Fruit = Fruit;
},{}],"app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Snake_1 = __importDefault(require("./Snake"));

var Draw_1 = __importDefault(require("./Draw"));

var Fruit_1 = require("./Fruit");

var game_1_root = document.querySelector(".root");

var Game =
/** @class */
function () {
  function Game(root, scale) {
    this.GAME_SPEED = 110; //setup the canvas

    var canvas = document.createElement("canvas");
    canvas.style.backgroundColor = "grey";
    canvas.width = 640;
    canvas.height = 480;
    this.canvas = canvas;
    this.root = root;
    this.root.appendChild(canvas);
    this.scale = scale;
    this.score = 0; //setup the screen

    this.screen = new Draw_1.default(scale, canvas);
    this.snake = new Snake_1.default(this.screen.scale, "#cfdac8");
    this.fruits = [];
  }

  Game.prototype.checkCollisionFruit = function () {
    var collided = false;
    var snakeHead = this.snake.nodes[this.snake.nodes.length - 1];
    var fruitIndex;
    this.fruits.forEach(function (fruit, i) {
      if (snakeHead.x >= fruit.x - snakeHead.size / 2 && snakeHead.x <= fruit.x + snakeHead.size / 2 && snakeHead.y >= fruit.y - snakeHead.size / 2 && snakeHead.y <= fruit.y + snakeHead.size / 2) {
        collided = true;
        fruitIndex = i;
      }
    });

    if (collided) {
      return fruitIndex;
    }

    return undefined;
  };

  Game.prototype.drawScore = function () {
    var scoreElement = document.getElementById("score");

    if (scoreElement) {
      scoreElement.innerHTML = "SCORE: " + this.score;
    }
  };

  Game.prototype.start = function () {
    var _this = this;

    this.drawScore(); //variables

    var CAN_GET_DIRECTIONS = true; // add event listener

    window.addEventListener("keypress", function (e) {
      _this.snake.changeDirections(e.key);
    }); //draw the snake

    this.screen.drawSnake(this.snake);
    setInterval(function () {
      if (_this.fruits.length < 5) {
        var _a = _this.screen.randomPoints(),
            fruitX = _a[0],
            fruitY = _a[1];

        var fruit = new Fruit_1.Fruit(fruitX, fruitY, 40 * _this.scale, "orange");

        _this.fruits.push(fruit);
      }
    }, 5000);
    setInterval(function () {
      _this.snake.setNewPosition(_this.screen.columns, _this.screen.rows);

      var fruitCollided = _this.checkCollisionFruit();

      if (fruitCollided || fruitCollided === 0) {
        //handle collision
        _this.snake.insert();

        _this.fruits = _this.fruits.filter(function (fruit, i) {
          return i !== fruitCollided;
        });
        _this.score += 1;

        _this.drawScore();
      }

      var collidedWithSelf = _this.snake.checkCollisionWithSelf();

      if (collidedWithSelf) {
        console.log("game over!");

        _this.reset();
      }

      _this.screen.drawBoard(_this.snake, _this.fruits);
    }, this.GAME_SPEED);
  };

  Game.prototype.reset = function () {
    this.score = 0;
    this.snake.delete();
    this.fruits = [];
    this.drawScore();
  };

  return Game;
}();

var game = new Game(game_1_root, 2);
game.start();
},{"./Snake":"Snake.ts","./Draw":"Draw.ts","./Fruit":"Fruit.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61693" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.ts"], null)
//# sourceMappingURL=/app.c61986b1.js.map