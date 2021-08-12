var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg;
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");

  boyImg = loadAnimation("runner1.png","runner2.png");

  gameOverImg = loadImage("gameOver.png");

  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,450);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4.2;

GameOver = createSprite(200,225,20,20)
GameOver.addImage(gameOverImg);
GameOver.scale = 0.9;
GameOver.visible = false;

boy = createSprite(70,370,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.078;


  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}



function draw() {

    background(0);
    boy.x = World.mouseX;
  
 if(gameState === PLAY){
    boy.x = World.mouseX;
   
    //code to reset the background
    if(path.y > 400 ){
    path.y = height/2;
   }
  
    GameOver.visible = false;
   
   
    createSword();
    spawnTreasure();
   
   if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+5;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+10;
      } 
   else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+15;
      }
   else if(swordGroup.isTouching(boy)) {
        gameState = END;
     jwelleryG.destroyEach();
     diamondsG.destroyEach();
     cashG.destroyEach();
     swordGroup.destroyEach();
    }
 }
  
  
  

  edges= createEdgeSprites();
  boy.collide(edges);
  drawSprites();
  
  if (gameState === END) {
     path.velocityY = 0;
    
    boy.visible = false;
    GameOver.visible = true;
  }
  
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  var cash = createSprite(Math.round(random(50, 350),40,     10, 10)) 
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
}

function createDiamonds() {
  var diamonds = createSprite(Math.round(random(50,      350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}

function createJwellery() {
  var jwellery = createSprite(Math.round(random(50,  350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
    
  }
}

function spawnTreasure(){
  var selecttreasure = Math.round(random(1,3))
  console.log(selecttreasure)
  
  if (World.frameCount % 60 == 0) {
    if(selecttreasure == 1){
     createCash(); 
    }
    else if(selecttreasure == 2){
    createDiamonds();
    }
    else {
    createJwellery();
    }
  }
}

