// WebGL Snake Game
// Made by Sebastien Hutt
//
// This uses my LIME library v1.0, I made more additions to my 1.1 so this might be outdated.

// Global variables
var SCALE = 3.5;
var SPEED = 15.0;


function main() {

  var scene = new LIME.Scene("myCanvas");  // Creates a LIME scene
  scene.setClearColor(0.9,0.9,0.9,1.0);    // Set the clear color
  var gl = scene.getContext();             // Get the context
  var SCALE = 3.5;                         // scale is used so the points are scaled according to the canvas size
  var snake = [];                          // array to hold the snake which is made of black squares
  var snakeSize;                           // how long the snake is
  var current_command;                     // the current direction the head of the snake is going
  var game_running;                        // game state

  var score_screen = document.getElementById("score_screen");                  // handle for the html text that holds the score
  var hud = document.getElementById("hud");                                    // handle for the html text that holds the hud
  var gameOver_screen = document.getElementById("game_over")                   // handle for the html text that holds the 'game over' text
  var restart_instruction = document.getElementById("restart_instruction");    // handle for the html text that holds the restart instructions
  var score;                                                                   // variables that holds the score
  var point = new PickUp(scene);                                               // create a new red dot

  // Init function
  // @param  none
  // @return none
  // @descr  Restart the game and reset the game variables and state.
  init = function() {
    snake = [];                          // empty the snake
    snakeSize = 10;                      // reset the snake size
    current_command = "right";           // set the snake to go right
    game_running = true;                 // reset the state of the game to running

    score_screen = document.getElementById("score_screen");  
    score = 0;                           // set the score to 0

    scene.clearCanvas();


    // creates the snake
    for(var i = 0; i < snakeSize; i++) {
      var offset = 0.01*SCALE;
      var block = new SnakeBlock(0.0+(offset*i), 0.0, scene);
      snake.push(block);
    }

    // moves the head of the snake one block to the right
    snake[snake.length-1].mesh.translate(-offset, 0.0, 0.0);

    // Place the red dot in a random place
    point.setPosition(Math.floor(Math.random()*56)-28, Math.floor(Math.random()*56)-28);

    gameOver_screen.innerHTML = "";        // remove the content of the gameover screen, so to make it disapear
    score_screen.innerHTML = "score = 0";  // reset the score text
    restart_instruction.innerHTML = "";    // remove the content of the other line of the gameover screen
  }

  init();   //start the game
  
  // Queue Command Function
  // @param  none
  // @return none
  // @descr  Every snake block has a command variable that dicataces why way it should be moving at the end of the next cycle.
  //         This function copy the command of a block down the chain of blocks. The head repeats the current command.
  queueCommand = function() {

    var head_index = snake.length-1;                    // get the index of the head of the snake
    snake[head_index].setCommand(current_command);      // set the current command to the head
    var nextCommand = snake[head_index].getCommand();   // varaible that is going to move down the chain and get commands.
                                                        // Getting the command of the head first
    // Moves the commands down the chain.
    for(var i = head_index-1; i >= 0; i--) {
      var temp_command = snake[i].getCommand();
      snake[i].setCommand(nextCommand);
      nextCommand = temp_command;
    }

    // Moves the blocks according to their commands
    for(var i = 0; i < snake.length; i++) {
      snake[i].executeCurrentCommand();
      var blockPos = snake[i].getPosition()
      if(blockPos[0] > 1.0) {
        snake[i].setPosition(-blockPos[0], blockPos[1], 0.0);
      }
      else if(blockPos[0] < -1.0) {
        snake[i].setPosition(-blockPos[0], blockPos[1], 0.0);
      }
      else if(blockPos[1] > 1.0) {
        snake[i].setPosition(blockPos[0], -blockPos[1], 0.0);
      }
      else if(blockPos[1] < -1.0) {
        snake[i].setPosition(blockPos[0], -blockPos[1], 0.0);
      }
    }

    var headPos = snake[head_index].getPosition();
    var pointPos = point.getPosition();

    // Check wheter the snake collides with a red dot, and proceeds to add a tail block accordingly.
    if( roundUp(headPos[0]) == roundUp(pointPos[0]) && roundUp(headPos[1]) == roundUp(pointPos[1])) {
      var lastBlockPos = snake[0].getPosition();
      var lastBlockCommand = snake[0].getCommand();
      var offset = 0.01*SCALE;
      var newBlock;
      if(lastBlockCommand == "right") {
        newBlock = new SnakeBlock(lastBlockPos[0]-offset, lastBlockPos[1], scene);
      }
      else if(lastBlockCommand == "left") {
        newBlock = new SnakeBlock(lastBlockPos[0]+offset, lastBlockPos[1], scene);
      }
      else if(lastBlockCommand == "up") {
        newBlock = new SnakeBlock(lastBlockPos[0], lastBlockPos[1]-offset, scene);
      }
      else if(lastBlockCommand == "down") {
        newBlock = new SnakeBlock(lastBlockPos[0], lastBlockPos[1]+offset, scene);
      }
      else {
        newBlock = new SnakeBlock(lastBlockPos[0], lastBlockPos[1], scene);
      }

      newBlock.setCommand(lastBlockCommand);  
      snake.unshift(newBlock);                  // add at the beginning of array
      score++;
      score_screen.innerHTML = "score = " + String(score);   // update score
      point.setPosition(Math.floor(Math.random()*56)-28, Math.floor(Math.random()*56)-28);  // move the point to a new random position
    }
  }
  
  // interval for the snake movment
  var interval = setInterval(function(){queueCommand()}, 1000/SPEED);

  // Listener for keydown event. Also makes sure that the snake can't go back into itslef
  document.onkeydown = function(ev) {
    if(event.keyCode == 39 && current_command != "left") {
      current_command = "right";
    }
    else if(event.keyCode == 37 && current_command != "right") {
      current_command = "left";
    }
    else if(event.keyCode == 38 && current_command != "down") {
      current_command = "up";
    }
    else if(event.keyCode == 40 && current_command != "up") {
      current_command = "down";
    }

    // Reset the game when in game over state
    else if(event.keyCode == 13 && game_running == false) {
      init();
      interval = setInterval(function(){queueCommand()}, 1000/SPEED);
    }
  }

  // Remove the interval, set the game state to 'game over' and display the game over screen
  gameOver = function() {
    clearInterval(interval);
    gameOver_screen.innerHTML = "Game Over";
    restart_instruction.innerHTML = "Press ENTER to restart the game";
    game_running = false;
  }

  // Tick function is executed every frame while the game is not in 'game over' state.
  // It draws each blocks and the red dot and checks if the snake is bitting his tail.
  tick = function() {
    if(game_running) {
      scene.clearCanvas();
      var head_index = snake.length-1;
      var head_pos = snake[head_index].getPosition();
      var pos;
      for(var i = 0; i < snake.length-2; i++) {
        snake[i].draw();
        pos = snake[i].getPosition();
        if(pos[0] == head_pos[0] && pos[1] == head_pos[1]) {
          gameOver();
        }
      }
      snake[head_index].draw();
      point.draw();
    }  
    requestAnimationFrame(tick);
  }
  tick();

}

// Snake Block class
// Contains a material and a mesh. The draw class is inherited from the mesh class.
SnakeBlock = function (x, y, scene) {

  this.gl = scene.getContext();
  this.geo = new LIME.Geometry(scene);
  this.geo.createRectangle(0.01*SCALE, 0.01*SCALE, 0.0);
  this.mat = new LIME.FlatShader(this.geo, this.gl, 0.0, 0.0, 0.0, 1.0);
  this.mesh = new LIME.Shape(this.geo, this.mat, this.gl, LIME.drawTriangleFan);
  this.mesh.setPosition(x, y, 0.0);

  this.command = "right";   // the initial command is to go right

  // Execute Current Command Function
  // @param  none
  // @return none
  // @descr  translates the block depending on its current command
  SnakeBlock.prototype.executeCurrentCommand = function() {
    if(this.command == "right") {
      this.mesh.translate(0.01*SCALE, 0.0, 0.0);
    }
    else if(this.command == "left") {
      this.mesh.translate(-0.01*SCALE, 0.0, 0.0);
    }
    else if(this.command == "up") {
      this.mesh.translate(0.0, 0.01*SCALE, 0.0);
    }
    else if(this.command == "down") {
      this.mesh.translate(0.0, -0.01*SCALE, 0.0);
    }
  }

  // Draw Function
  // @param  none
  // @return none
  // @descr  calls the draw function for the LIME.mesh object
  SnakeBlock.prototype.draw = function() {
    this.mesh.draw();
  }

  // Set Commands Function
  // @param  command string
  // @return none
  // @descr  set the current commands of the block
  SnakeBlock.prototype.setCommand = function(command) {
    this.command = command;
  }

  // Get Command
  // @param  none
  // @return current command of the block
  // @descr  returns the current command of the block
  SnakeBlock.prototype.getCommand = function() {
    return this.command;
  }

  // Get Position
  // @param  none
  // @return current position of the block
  // @descr  returns the current position of the block
  SnakeBlock.prototype.getPosition = function() {
    return this.mesh.getLocation();
  }

  // Set Position
  // @param  x and y coordinate
  // @return none
  // @descr  translate the block
  SnakeBlock.prototype.setPosition = function(x, y) {
    this.mesh.setPosition(x, y, 0.0);
  }
}

// Pickup Class
// Made for the red dot object in the game. Has the same basic parameter than the snake block.
// Uses a LIME material and mesh and uses the LIME.mesh.draw function to display itself on the field.
PickUp = function (scene) {
  this.gl = scene.getContext();
  this.geo = new LIME.Geometry(scene);
  this.geo.createCircle(0.005*SCALE, 20, 0.0);
  this.mat = new LIME.FlatShader(this.geo, this.gl, 1.0, 0.0, 0.0, 1.0);
  this.mesh = new LIME.Shape(this.geo, this.mat, this.gl, LIME.drawTriangleFan);

  // Draw Function
  // @param  none
  // @return none
  // @descr  calls the draw function for the LIME.mesh object
  PickUp.prototype.draw = function() {
    this.mesh.draw();
  }

  // Set Position
  // @param  x and y coordinate
  // @return none
  // @descr  translate the red dot
  PickUp.prototype.setPosition = function(x, y) {
    this.mesh.setPosition((0.01*SCALE)*x, (0.01*SCALE)*y, 0.0);
  }

  // Get Position
  // @param  none
  // @return current position of the red dot
  // @descr  returns the current position of the red dot
  PickUp.prototype.getPosition = function() {
    return this.mesh.getLocation();
  }
}

// Round Up Function
// @param  a numerical value
// @return the rounded value
// @descr  gets rid of the lower digits of a float deciaml value. I had to make this because
//         of the way floats work in Javascript, they are very impressise and I needed to check
//         for matching positions.
roundUp = function(num) {
  return Math.round(num * 10000);
}