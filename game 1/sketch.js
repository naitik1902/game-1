var balloon ;

var scene;

var cloud,bird , invisibleline,invisibleline2

var cloudsgroup , birdgroup
var score = 0;
var Highscore = 0;
var PLAY = 1 
var END = 0 
var gameState = PLAY

var gameOver, restart;

function preload(){

  // balloon_fly = loadAnimation("balloon1.png,balloon2.png");

  sceneImg = loadImage("scene1.png");

  
cloudImage = loadImage("cloud.png");

gameOverImage = loadImage("gameOver.png")
restartImage = loadImage("restart.png")

} 

function setup(){
  createCanvas(800,400);
  balloon = createSprite(50,300,20,20)
  //  balloon.addAnimation("flying",balloon_fly)

  scene = createSprite(400,380,400,10);
  scene.addImage(sceneImg);
  scene.scale=2

  invisibleline = createSprite(400,390,800,10);
  invisibleline2 = createSprite(400,10,800,10);

  gameOver = createSprite(400,200,10,10);
  gameOver.addImage(gameOverImage);

  restart = createSprite(400,250,10,10);
  restart.addImage(restartImage);
  restart.scale = 0.8
  
  cloudsgroup = createGroup();
  birdgroup = createGroup();
}

function draw(){
  
  text("Score:" + score,700,50)
    text("Highscore:" + Highscore,700,70)
    score = score + Math.round(frameCount/100);
    
  if(gameState === PLAY){
    scene.velocityX = -3

    gameOver.visible = false;
    restart.visible = false;

    
     if(scene.x > 0){
       scene.x = scene.width/2;
     }
  
    if(keyDown("space")){
      balloon.velocityY = -10
    }
    balloon.velocityY+= 0.5
    balloon.collide(invisibleline);
    balloon.collide(invisibleline2);
  
    invisibleline.visible = false
    invisibleline2.visible = false

    if(score > Highscore){
      Highscore = score
    }

    spawnClouds()
    spawnbirds()

    if(balloon.isTouching(cloudsgroup)){
        gameState = END;
     }

     if(balloon.isTouching(birdgroup)){
      gameState = END;
   }

    }
  else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;

      balloon.velocityY = 0;
      
      cloudsgroup.setVelocityXEach(0);
      birdgroup.setVelocityXEach(0);
      cloudsgroup.setLifetimeEach(-1);
      birdgroup.setLifetimeEach(-1);
      
      
  }

  if(mousePressedOver(restart)){
    reset();
  }
  

  
 
  
 

  drawSprites();
}

function reset(){
  gameState = PLAY;
  score = 0;
  gameOver.visible = false;
  restart.visible = false;
  birdgroup.destroyEach();
  cloudsgroup.destroyEach();
  
}

function spawnClouds (){
  if(frameCount % 60 === 0){
  var cloud = createSprite(800,200,10,20);
  cloud.y = Math.round(random(400,50));
  cloud.addImage(cloudImage);
  cloud.scale= 0.5;
  cloud.velocityX=-4;
  cloud.lifeTime=250;
 cloudsgroup.add(cloud)
  }
}

function spawnbirds (){
  if(frameCount % 60 === 0){
    var bird = createSprite(790,200,10,20);
    bird.y = Math.round(random(400,50));
    //bird.addImage();
   // bird.scale= 0.5;
    bird.velocityX=-4;
    bird.lifeTime=250;
    birdgroup.add(bird)
    }

  }




