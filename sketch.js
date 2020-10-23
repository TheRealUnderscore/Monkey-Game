
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground;

function preload(){
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600,600);
  monkey = createSprite(150,450,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15;
  monkey.debug = true;
  
  ground = createSprite(300,500,1000,10);
  ground.velocityX = -5; // ?
  ground.debug = true;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white")
  if(ground.x > 250) {
    ground.x = ground.width / 2;
  }
  if(keyDown("space")) {
    if(monkey.y >= 449.95 - (monkey.scale*41)) {
    monkey.y = monkey.y-10;
    monkey.velocityY = -25;
    }
  }
  monkey.collide(ground);
  monkey.velocityY++;
  if(World.frameCount % 80 === 0) {
    spawnBanana();
  }
  if(World.frameCount % 300 === 0) {
    spawnObstacle();
  }
  if(monkey.isTouching(bananaGroup)) {
    for(var i = 0; i < bananaGroup.length; i++) {
      if(monkey.isTouching(bananaGroup[i])) {
        bananaGroup[i].destroy();           
        monkey.scale = monkey.scale+0.02;
      }
    }
  }
  else if(monkey.isTouching(obstacleGroup)) {
    for(var j = 0; j < obstacleGroup.length; j++) {
      if(monkey.isTouching(obstacleGroup[j])) {
        obstacleGroup[j].destroy();           
        monkey.scale = monkey.scale-0.05;
        if(monkey.scale <= 0) {
          monkey.scale = 0.15;
        }
      }
    }
  }
  drawSprites();
  stroke("black"); 
  textSize(20); 
  fill("black"); 
  survivalTime = Math.floor(frameCount/frameRate()); 
  text(`Survival Time: ${survivalTime}`,100,50);
}
function spawnBanana() {
  banana = createSprite(800,Math.round(random(120,200)),10,10);
  banana.addAnimation("banana",bananaImage);
  banana.scale = 0.2;
  banana.velocityX = -5;
  banana.lifetime = 175;
  bananaGroup.add(banana);
}
function spawnObstacle() {
  obstacle = createSprite(800,450,10,10);
  obstacle.addImage("obstacle",obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -5;
  obstacle.lifetime = 175;
  obstacleGroup.add(obstacle);
}