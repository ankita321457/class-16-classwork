var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;




function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  //trex_collided = loadAnimation("trex_collided.png");
  
  // this code helps in creating the ground image
  groundImage = loadImage("ground2.png");
  
  // this code helps in creating the clound image
  cloudImage = loadImage("cloud.png");
  
  // this code helps to load the image obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  // this code helps the load the images gameOver and reset
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  // this code helps in creating the Trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  //trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  // this code helps in creating the ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  // this code helps in creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // this code helps in creating groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  // this code helps to create,add and reset the size of the wordings in the image
  gameOver = createSprite(300,100)
  gameOver.addImage("gameOver" , gameOverImage)
  gameOver.scale = 0.5
 
 // This  code helps to create,add and reset the size of the image
  restart = createSprite(300,150)
  restart.addImage("restart" , restartImage)
  restart.scale = 0.4

  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  

  if(gameState === PLAY){
       
    ground.velocityX = -4;
   
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    // this code helps the Images to not be seen
    gameOver.visible = false
    restart.visible = false


    spawnClouds();

    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
   
  else if (gameState === END) {
       
      ground.velocityX = 0;
     
      // this code helps the Images to be seen
      gameOver.visible = true
      restart.visible = true


     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}




function spawnObstacles(){

 if (frameCount % 60 === 0){

   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}





function spawnClouds() {
   
  if (frameCount % 60 === 0) {
     
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 134;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

