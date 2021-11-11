class Milk{
    constructor(){
        this.image = loadImage("Images/Food Stock.png");
        this.FoodStock = 0;
        this.lastFed;
        this.foodStockRef;
    }

    getFoodStock(){
        return this.FoodStock;
    }

    updateFoodStock(x){
        this.FoodStock = x;
    }

    deductFood(FoodStock){
        FoodStock = FoodStock - 1;
    }

    display(){

        var x = 60, y = 100;
        imageMode(CENTER);
        image(this.image, 720, 280, 70, 70);
        if(this.FoodStock !=0){
            for(var i = 0; i<this.FoodStock; i++){
                if(i % 3 === 0){
                    x = 135,
                    y = y + 55;                
                }
                image(this.image, x, y, 50, 50);
                x = x + 50;            
            }
        }
}

bedroom(){
    background(bedroomImg, 680, 500);
}

garden(){
    background(gardenImg, 680, 500);
}

washroom(){
    background(washroomImg, 680, 500);
}

}