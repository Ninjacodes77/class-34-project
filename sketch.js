var engine;
var world;
var ground;
var player;
var cubes = [];
var score = 0;

function setup() {
  var canvas = createCanvas(800, 600);
  engine = Matter.Engine.create();
  world = engine.world;

  // Create the ground
  var groundOptions = {
    isStatic: true
  };
  ground = Bodies.rectangle(width / 2, height - 10, width, 20, groundOptions);
  World.add(world, ground);

  // Create the player cube
  var playerOptions = {
    isStatic: true
  };
  player = Bodies.rectangle(width / 2, height - 50, 80, 80, playerOptions);
  World.add(world, player);
}

function draw() {
  background(220);
  rectMode(CENTER);

  // Draw the ground
  fill(128);
  rect(ground.position.x, ground.position.y, width, 20);

  // Draw the player cube
  fill(255);
  rect(player.position.x, player.position.y, 80, 80);

  // Draw the falling cubes
  if (cubes.length > 0) {
    for (var i = cubes.length - 1; i >= 0; i--) {
      var cube = cubes[i];
      fill(255, 0, 0);
      rect(cube.position.x, cube.position.y, 40, 40);

      // Check collision with player
      if (cube.position.y > height - 50 && cube.position.y < height &&
        cube.position.x > player.position.x - 40 && cube.position.x < player.position.x + 40) {
        score++; // Increase score if cube is caught by player
        Matter.World.remove(world, cube); // Remove cube from world
        cubes.splice(i, 1); // Remove cube from array
      }

      // If cube falls below the canvas, remove it from the world and array
      if (cube.position.y > height) {
        Matter.World.remove(world, cube);
        cubes.splice(i, 1);
      }
    }
  }

  // Display score counter
  fill(0);
  textSize(20);
  text("Score: " + score, 20, 30);
}

function keyPressed() {
  // Move the player cube left or right using arrow keys
  var movement = 20;
  if (keyCode === LEFT_ARROW && player.position.x > 40) {
    Matter.Body.translate(player, { x: -movement, y: 0 });
  } else if (keyCode === RIGHT_ARROW && player.position.x < width - 40) {
    Matter.Body.translate(player, { x: movement, y: 0 });
  }
}

function dropCube() {
  // Create a new falling cube at random x-coordinate
  var cubeOptions = {
    restitution: 0.5
  };
  var newCube = Bodies.rectangle(random(width), 0, 40, 40, cubeOptions);
  World.add(world, newCube);
  cubes.push(newCube);
}

// Use setInterval to drop a new cube every second
setInterval(dropCube, 1000);





