var foodS=20;
var database,dog,Dog,dogHappy,foodStock;
var feed,addFood; 
var fedTime,lastFed;
var getFoodStock,updateFoodStock;
var foodObj;
var input;
var readState;
var bedroom,garden,washroom;
function preload(){

Dog=loadImage("vpi/Dog.png");
bedroom=loadImage("vpi/Bed Room.jpg");
garden=loadImage("vpi/Garden.jpg");
washroom=loadImage("vpi/Wash Room.jpg");



}

function setup() {
database=firebase.database();

readState=database.ref('gameState');
readState.on("value",function(data){
    gameState=data.val();
});
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
    lastFed=data.val();
});

createCanvas(600, 750);
dog=createSprite(280,620,10,10)
dog.addImage(Dog)


feed=createButton("Feed the Dog")
feed.position(670,75)
feed.mousePressed(feedDog)

addFood=createButton("Add Food")
addFood.position(770,75)
addFood.mousePressed(addFoods)





foodObj=new Food(20,2)



}

function draw() {  

background(46,139,87)
fill(255)

//text("Food Remaining:"+foodS,210,190)

textSize(16)
text("Name Your Pet",634,39)

foodObj.display();


textSize(16)
currentTime=hour();
if (currentTime==(lastFed+1)) {
    foodObj.Garden();
    update("Playing")
    
}else if (currentTime==(lastFed+2)) {
      foodObj.Bedroom();
    update("Sleeping")
}else if(currentTime>(lastFed+2)&&currentTime<(lastFed+4)) {
    foodObj.Washroom();
    update("Bathing")
}else{
    foodObj.display();
    update("Hungry")
    
}

textSize(16)
if (lastFed>=12) {
    text("last Feed: "+lastFed%12+"Pm",130,39)
}else if (lastFed==0) {
    text("last Feed: 12Am ",130,39)
}else{
    text("last Feed: "+lastFed+"Am",130,39)
}

if(dog.y==300){
    dog.y=300;
}

if (gameState!="Hungry") {
    feed.hide()
    addFood.hide()
    dog.remove()
    
}else{
    feed.show()
    addFood.show()
    dog.addImage(Dog)
}



drawSprites();


}

function feedDog(){
if (foodS<=1) {
    foodS=1
}

foodS--;
dog.x=280;
dog.y=300;

foodObj=new Food(foodS,2)

database.ref('/').update({
Food:foodS,
FeedTime:hour()
})
}

function addFoods(){
if (foodS>=19) {
    foodS=19
}

dog.x=280;
dog.y=620;

dog.addImage(Dog)
foodS++;
foodObj=new Food(foodS,2)
database.ref('/').update({ 
    Food:foodS
})

}

function update(state) {
    database.ref('/').update({ 
        gameState:state
    })
      
}



