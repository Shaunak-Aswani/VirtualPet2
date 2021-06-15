var dog, happyDog, database, foodS, foodStock
var feed, addFood, foodObj, lastFed;

function preload()
{
	dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
	createCanvas(800, 500);
  Dog = createSprite(250,300,150,150);
  Dog.addImage(dog)
  Dog.scale = 0.15

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}


function draw() {  
  background("green");
  foodObj.display();



  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);   
  //   Dog.addImage(happyDog);
  // }

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  });


  drawSprites();
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last feed : " + lastFed%12 + " PM",350,30);
  } else if(lastFed == 0){
    text("Last feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  // stroke("black");
  // text("Food Remaining: " + foodS, 170, 200);
  // textSize(10);
  // text("Note: Press Up Arrow Key to feed Dog", 120, 10);

}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  } else{ 
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0
  } else {
    x=x-1
  }

  database.ref('/').update({
    Food:x
  });

  
}

