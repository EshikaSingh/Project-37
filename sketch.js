var Dog;

var shelf;

var happyDog;

var Food;

var FoodStock;

var database;

var gameState;

var foodObj;

var lastFed;

var readState;

//var gameState;

var bedroomImg, gardenImg, washroomImg;

function preload()
{
  shelfImage = loadImage("Images/Shelf.png");

	DogImage = loadImage("Images/Dog.png");

  happyDogImage = loadImage("Images/dogImg1.png");

  backgroundImg = loadImage("Images/BgImage1.jpg");
  
  MilkImage = loadImage("Images/Milk.png");

  bedroomImg= loadImage("Images/bedroom.png");

  gardenImg= loadImage("Images/Garden.png");

  washroomImg = loadImage("Images/Wash Room.png");

  deadDog = loadImage("Images/deadDog.png");

  dogImage1 = loadImage("Images/dogImg.png");
}

function setup() {
	createCanvas(670,500);

  database = firebase.database();
  
  Dog = createSprite(550,400);
  Dog.addImage(DogImage);
  Dog.scale = 0.2;

  foodObj = new Milk();
  
  FoodStock = database.ref('Food');
  FoodStock.on("value", readStock);

  feed = createButton("Feed The Dog");
  feed.position(600, 105);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 105);
  addFood.mousePressed(addFoods);
}


function draw() {  

  background(backgroundImg); 

  currentTime = hour();

  if(currentTime == (lastFed + 1)){
    update("Playing");
    foodObj.garden();
    feed.hide();
    addFood.hide();
    Dog.visible = false;
  }

  else if(currentTime == (lastFed + 2)){
    update("Sleeping");
    foodObj.bedroom();
    feed.hide();
    addFood.hide();
    Dog.visible = false;
  }

  else if(currentTime === (lastFed + 3)){
    update("Bathing");
    foodObj.washroom();
    feed.hide();
    addFood.hide();
    Dog.visible = false;
  }

  else if(currentTime === (lastFed +4)){
    update("hungry");
  }

  if(gameState === "hungry"){
    feed.show();
    addFood.show();
    Dog.addImage(DogImage);
    Dog.visible = true;
    foodObj.display();
    
    textSize(20);
    fill("black");
    text("Food Remaining: " + FoodStock, 320, 110);
  }

  if(currentTime === (lastFed + 5)){
    Dog.addImage(deadDog);
    Dog.scale = 0.2;
  }

 lastFedRef = database.ref('FeedTime');
 lastFedRef.on("value", function(data){
   lastFed  = data.val();
   console.log(lastFed);
 })

 readState = database.ref('gameState');
 readState.on("value", function(data){
   gameState = data.val();
 })

 console.log(gameState);
 

  if(FoodStock <= 0){
    Dog.addImage(DogImage);
  }

  if(lastFed >= 12){
    textSize(20);
    fill("black");
    text("Last Feed: " + lastFed % 12 + " PM", 330, 30);
  }
  else if(lastFed == 0){
    textSize(20);
    fill("black");
    text("Last Feed: 12 AM", 330, 30);
  }
  else{
    textSize(20);
    fill("black");
    text("Last Feed: " + lastFed + " AM", 330,30);
  }

  drawSprites();
}

function readStock(data){
  FoodStock = data.val();
  foodObj.updateFoodStock(FoodStock);
}

function writeStock(x){

  if(x <=0){
    x = 0;
  }
  else{
    x = x-1;
    Dog.addImage(happyDogImage);
  }

  database.ref('/').update({
    Food: x
  })

}

function feedDog(){

  Dog.addImage(happyDogImage);
  
  if(foodObj.getFoodStock()<= 0){
    Dog.addImage(dogImage1);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    addFood.show();
  }

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
 if(FoodStock <= 14){
   addFood.show()
  FoodStock++;
  database.ref("/").update({
    Food: FoodStock
  })
}
else{
  addFood.hide();
}
}

function update(state){
  database.ref('/').update({
    gameState: state
  });
}



