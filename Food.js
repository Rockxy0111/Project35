class Food {
constructor(foodStock,lastFed) {
    this.foodStock=foodStock;
    this.lastFed=lastFed;
   this.getFoodStock=getFoodStock;
   this.updateFoodStock=updateFoodStock;

    this.image = loadImage("vpi/milk.png");
  


}
display(){
var x=150,y=100;

imageMode(CENTER)

if (this.foodStock!=0) {
    for (var i=0;i<this.foodStock;i++) {
        if (i%10==0) {
            x=150;
            y=y+50;
        }
       image(this.image,x,y,50,50)
       x=x+30;
    }
 }
}

Washroom(){
    imageMode(CENTER)
    background(washroom)
}
Garden(){
    imageMode(CENTER)
    background(garden)
}
Bedroom(){
    imageMode(CENTER)
    background(bedroom)
}




}