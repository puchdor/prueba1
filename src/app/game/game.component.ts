import { OnInit, Component, ElementRef } from '@angular/core';

@Component ({
  selector: 'game-component',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  node: string;
  GAME_LEVELS : Array<any> = [];

  constructor(private el: ElementRef){
    var playerXSpeed = 7;
    var gravity = 30;
    var jumpSpeed = 17;

    //
    var wobbleSpeed = 8;
    var wobbleDist = 0.07;
    // chance de moverse en segundos
    var maxStep = 0.05;

    var simpleLevelPlan = [
      "                      ",
      "                      ",
      "  x              = x  ",
      "  x         o o    x  ",
      "  x @      xxxxx   x  ",
      "  xxxxx            x  ",
      "      x!!!!!!!!!!!!x  ",
      "      xxxxxxxxxxxxxx  ",
      "                      "
    ];
    this.GAME_LEVELS.push(simpleLevelPlan);
  }

  ngOnInit() {

    runGameTest(this.GAME_LEVELS, DOMDisplay, this.el.nativeElement);

    //const tmp = document.createElement('div');
    //const el = this.el.nativeElement.cloneNode(true);
    //parent.appendChild( document.createElement("LI") || document.createTextNode("HOLA"))
    //tmp.appendChild(el);
    //this.node = tmp.innerHTML;
  }

}

/////////// GAME ////////////

// declaration Actores
function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
}
Player.prototype.type = "player";

Player.prototype.moveX = function(step, level, keys) {
    this.speed.x = 0;
    if (keys.left) this.speed.x -= this.playerXSpeed;
    if (keys.right) this.speed.x += this.playerXSpeed;

    var motion = new Vector(this.speed.x * step, 0);
    var newPos = this.pos.plus(motion);
    var obstacle = level.obstacleAt(newPos, this.size);
    if(obstacle)
      level.playerTouched(obstacle);
    else {
      this.pos = newPos;
    }
}


Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * this.gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  if(obstacle){
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)    // rebota contra un techo
      this.speed.y = -this.jumpSpeed;
    else
      this.speed.y = 0;  // se queda donde se subio
  } else {
    this.pos = newPos;
  }
}

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if(otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if(level.status == "lost") {
    this.pos.y += step;
    this.size.y -= step;
  }
}

//// declaration Actor -> Lava
function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1,1);
  if (ch == "=") {
    this.speed = new Vector(2,0);
  } else if (ch == "|") {
    this.speed = new Vector(0,2);
  } else if (ch == "v") {
    this.speed = new Vector(0,3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if(!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if( this.repeatPos)
      this.pos = this.repeatPos;
  else {
      this.speed = this.speed.times(-1);  // bouncing lava inverts its speed, para volver por donde vino.
  }
}

/// declaration Actor -> Coin
function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size =  new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";


Coin.prototype.act = function(step) {
  this.wobble += step * this.wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * this.wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};


//////////////// declaration Vector
function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

// define Nivel
function Level(plan : Array<string>) {
  this.width = plan[0].length; // string
  this.height = plan.length; // array
  this.grid = [];
  this.actors = [];
  this.actorChars = {
    "@" : Player,
    "o" : Coin,
    "=" : Lava,
    "|" : Lava,
    "v" : Lava
  };

  for(var y=0 ; y<this.height ; y++) {
    var line = plan[y];
    var gridLine = [];
    for(var x=0 ; x<this.width ; x++) {
      var ch = line[x];
      var fieldType = undefined;
      var Actor = this.actorChars[ch];     /// aca falta algo
      if(Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      else if (ch == "x")
        fieldType = "wall";
      else if (ch == "!")
        fieldType = "lava";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);   // Array de Array (Matriz)
  }

// de los Actores devuelve al player
  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];   // por si hay mas de uno... que no deberia

  this.status = this.finishDelay = undefined;

}

Level.prototype.isFinished = function() {
  return this.status != undefined && this.finishDelay < 0;
}

/////////// Motion ///////////////////////

//
Level.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  if( xStart < 0 || xEnd > this.width || yStart < 0 )
    return "wall";
  if( yEnd> this.height)
    return "lava";
  for( var y = yStart; y < yEnd; y++) {
    for( var x = xStart; x < xEnd; x++) {
      var fieldType = this.grid[y][x];
      if(fieldType)
        return fieldType;
    }
  }
}

// Devuelve other (otro actor), si el actor colisiona con other.
Level.prototype.actorAt = function(actor) {
  for( var i = 0; i < this.actors.length; i++){
      var other = this.actors[i];
      if(other != actor &&    // si no es el mismo (estan todos en el vector)
        actor.pos.x + actor.size.x > other.pos.x &&   // si actor choca por la izq
        actor.pos.x < other.pos.x + other.size.x &&   // si actor choca por la derecha
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
        return other;

  }
}

Level.prototype.animate = function(step, keys) {
  if (this.status != undefined)
    this.finishDelay -= step;

  while (step > 0 ){
    var thisStep = Math.min(step, this.maxStep);
    this.actors.forEach(function(actor){
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};

Level.prototype.playerTouched = function(type, actor) {
  if(type == "lava" && this.status == undefined){
    this.status = "lost";
    this.finishDelay = 1;
  }
  else if( type == "coin")
  {
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    if (!this.actors.some(function(actor){
                            return actor.type == "coin";
                          }))
    {
      this.status = "won";
      this.finishDelay = 1;
    }
  }
}

/////////// Drawing subsystem ////////////

// Una manera facil de crear un elemento y darle una clase
function elt(name, className) {
  var elt = document.createElement(name);
  if(className) elt.className = className;
  return elt;
}

class DOMDisplay {
    scale : number = 20;
    wrap : Object;
    level : Object;  // TODO Level
    actorLayer : Object; // player;

    constructor(parent, level) {
      this.wrap = parent.appendChild(elt("div", "game"));
      this.level = level;
      this.wrap.appendChild(this.drawBackground());
      this.actorLayer = undefined;
      this.drawFrame();
    }

    drawBackground() : number {
      var table = undefined;
      return table;
    }

    drawFrame(){

    }
}

// function DIMDisplay(parent, level) {
//   this.scale = 20 // escala de dibujos
//   this.wrap = parent.appendChild(elt("div", "game")); // parent.appendChild( document.createElement("LI") || document.createTextNode("HOLA"))
//   this.level = level;
//
//   this.wrap.appendChild(this.drawBackground());  // background es dibujado una vez
//   this.actorLayer;// = undefined;
//   this.drawFrame();   // <-- usa actorLayer para redibujar a los actores
// }

DOMDisplay.prototype.drawBackground = function () {
  var table = elt("table", "background");
  // this es DOMDisplay
  table.style.width = this.level.width * this.scale + "px";
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr", undefined));
    rowElt["style"] = {"height": this.scale + "px"};
    //rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

// es llamada por drawFrame
DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div", undefined);
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div", "actor " + actor.type));
    rect["style"] = {"width": actor.size.x * this.scale + "px"};
    rect["style"] = {"height": actor.size.y * this.scale + "px"};
    rect["style"] = {"left": actor.pos.x * this.scale + "px"};
    rect["style"] = {"top": actor.pos.y * this.scale + "px"};
    //rect.style.width = actor.size.x * scale + "px";
    //rect.style.height = actor.size.y * scale + "px";
    //rect.style.left = actor.pos.x * scale + "px";
    //rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

// Borra los actores y los vuelve a dibujar
DOMDisplay.prototype.drawFrame = function() {
  if(this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game" + (this.level.status || "");    // lost  or won , solo para player
  this.scrollPlayerIntoView();
}

// Centra al player en la pantalla cuando se mueve.
DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft;
  var right = left + width;
  var top = this.wrap.scrollTop;
  var bottom = top + height;

  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5)).times(this.scale); // mas la mitad del cuerpecito, mas la escala. centro centro.

  if(center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;

  if(center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

/////////// Tracking Keys ///////
var arrowCodes = {37: "left", 38: "up", 39: "right" };

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event){
    if(codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

/////////// Running the game //////
function runAnimation(frameFunc) {
  var lastTime; // = undefined;
  function frame(time) {
    var stop = false;
    if(lastTime != undefined) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if(!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, content, andThen) {
  var display = new Display(content, level);
  runAnimation(function(step){
    level.animate(step, arrows);
    display.drawFrame(step);
    if(level.isFinished()) {
      display.clear();
      if(andThen)
        andThen(level.status);
      return false;
    }
  });
}

////////// Motion /////////////

function runGameTest(plans, Display, content) {
  var level = new Level(plans[0]);
  var display = new Display(content, level);
  display.drawFrame(1);
}

function runGame(plans, Display, content) {
  function startLevel(n) {
    var plan = new Level(plans[n]);
    runLevel(plan, Display, content, function(status) {
      if(status == "lost")
        startLevel(n);
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else {
        console.log("You win!");
      }
    });
  }
  startLevel(0);
}
