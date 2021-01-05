parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"qo4e":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,s){void 0===s&&(s="white"),this.CAN_CHANGE_DIRECTIONS=!0,this.xSpeed=1*e,this.ySpeed=1*e,this.color=s,this.nodes=[new i(0,0,32*e)],this.direction="right",this.size=32*e,this.scale=e}return e.prototype.print=function(){console.log(this.nodes)},e.prototype.setNewPosition=function(e,i){var s=this,t=this.nodes[this.nodes.length-1],n=t.x,o=t.y;switch(this.direction){case"right":t.x+=t.size,t.x+this.size/2>e&&(t.x=0);break;case"down":t.y+=t.size,t.y+this.size/2>i&&(t.y=0);break;case"left":t.x-=t.size,t.x+this.size/2<0&&(t.x=e-t.size);break;case"up":t.y-=t.size,t.y+this.size/2<0&&(t.y=i-t.size)}!function(){for(var e=s.nodes.length-2;e>=0;e--){var i=s.nodes[e].x,t=s.nodes[e].y;s.nodes[e].x=n,s.nodes[e].y=o,n=i,o=t}}()},e.prototype.delete=function(){this.nodes=[],this.nodes.push(new i(0,0,this.size*this.scale))},e.prototype.checkCollisionWithSelf=function(){var e={},i=!1;return this.nodes.forEach(function(s,t){e[s.x+","+s.y]?i=!0:e[s.x+","+s.y]=t}),i},e.prototype.changeDirections=function(e){if(this.CAN_CHANGE_DIRECTIONS)switch(e){case"w":this.direction="up";break;case"d":this.direction="right";break;case"a":this.direction="left";break;case"s":this.direction="down"}},e.prototype.insert=function(){var e,s=this.nodes[this.nodes.length-1];switch(this.direction){case"right":e=new i(s.x+s.size,s.y,s.size);break;case"down":e=new i(s.x,s.y+s.size,s.size);break;case"left":e=new i(s.x-s.size,s.y,s.size);break;case"up":e=new i(s.x,s.y-s.size,s.size)}this.nodes.push(e)},e}();exports.default=e;var i=function(){return function(e,i,s){this.x=e,this.y=i,this.size=s}}();
},{}],"wG71":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t,i){this.scale=t,this.ctx=i.getContext("2d"),this.rows=i.height*t,this.columns=i.width*t,this.canvas=i,i.width*=t,i.height*=t}return t.prototype.drawSnake=function(t){var i=this;t.nodes.forEach(function(o){i.ctx.beginPath(),i.ctx.rect(o.x,o.y,o.size,o.size),i.ctx.fillStyle=t.color,i.ctx.fill()})},t.prototype.drawFruit=function(t){var i=this;t.forEach(function(t){i.ctx.beginPath(),i.ctx.rect(t.x,t.y,t.size,t.size),i.ctx.fillStyle=t.color,i.ctx.fill()})},t.prototype.drawBoard=function(t,i){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawSnake(t),this.drawFruit(i)},t.prototype.randomPoints=function(){return[Math.floor(Math.random()*this.columns-45),Math.floor(Math.random()*this.rows-45)]},t}();exports.default=t;
},{}],"K6en":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Fruit=void 0;var t=function(){return function(t,i,e,o){void 0===e&&(e=1),void 0===o&&(o="orange"),this.size=32,this.x=t,this.y=i,this.color=o,this.size=45}}();exports.Fruit=t;
},{}],"EVxB":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./Snake")),r=e(require("./Draw")),s=require("./Fruit"),n=document.querySelector(".root"),i=function(){function e(e,s){this.GAME_SPEED=110;var n=document.createElement("canvas");n.style.backgroundColor="grey",n.width=640,n.height=480,this.canvas=n,this.root=e,this.root.appendChild(n),this.scale=s,this.score=0,this.screen=new r.default(s,n),this.snake=new t.default(this.screen.scale,"#cfdac8"),this.fruits=[]}return e.prototype.checkCollisionFruit=function(){var e,t=!1,r=this.snake.nodes[this.snake.nodes.length-1];if(this.fruits.forEach(function(s,n){r.x>=s.x-r.size/2&&r.x<=s.x+r.size/2&&r.y>=s.y-r.size/2&&r.y<=s.y+r.size/2&&(t=!0,e=n)}),t)return e},e.prototype.drawScore=function(){var e=document.getElementById("score");e&&(e.innerHTML="SCORE: "+this.score)},e.prototype.start=function(){var e=this;this.drawScore();window.addEventListener("keypress",function(t){e.snake.changeDirections(t.key)}),this.screen.drawSnake(this.snake),setInterval(function(){if(e.fruits.length<5){var t=e.screen.randomPoints(),r=t[0],n=t[1],i=new s.Fruit(r,n,40*e.scale,"orange");e.fruits.push(i)}},5e3),setInterval(function(){e.snake.setNewPosition(e.screen.columns,e.screen.rows);var t=e.checkCollisionFruit();(t||0===t)&&(e.snake.insert(),e.fruits=e.fruits.filter(function(e,r){return r!==t}),e.score+=1,e.drawScore()),e.snake.checkCollisionWithSelf()&&(console.log("game over!"),e.reset()),e.screen.drawBoard(e.snake,e.fruits)},this.GAME_SPEED)},e.prototype.reset=function(){this.score=0,this.snake.delete(),this.fruits=[],this.drawScore()},e}(),o=new i(n,1.3);o.start();
},{"./Snake":"qo4e","./Draw":"wG71","./Fruit":"K6en"}]},{},["EVxB"], null)
//# sourceMappingURL=app.e66c254f.js.map