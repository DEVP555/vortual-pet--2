var dog , sadDog , happydog;
var foodS , foodStock , database;

function preload()
{
	sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("Images/happydog.png");
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value" , readStock);


  dog = createSprite(800 , 200 , 150 , 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  
}


function draw() {  
  background("green");
  if(foodS!== undefined){
      textSize(20)
      fill(255)
      text("Note : press up arrow key to feed Drago milk" , 50 , 50);
      text("Food Remaining:"+foodS , 150  , 150);



      if(keyWentDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(happydog);
      }


      if(keyWentUp(UP_ARROW)){
        dog.addImage(sadDog);
      }


      if(foodS === 0 ){
        foodS = 20;
      }
  }

  
  drawSprites();
  
}

function writeStock(x){
   if(x <= 0){
      x = 0;
   }
   else{
     x = x-1;
   }
   database.ref("/".update)({
     Food : x
   });
}

function readStock(){
  foodS = data.val();
}

