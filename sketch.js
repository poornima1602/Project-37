var database ,dog,dog1,dog2
var position
var feed,add
var foodobject
var Feedtime
var Lastfeed
var bgImg,bg,mImg;
var brImg,lrImg,gImg,dvImg,wrImg,vdImg,rImg;
var drl,drr,injection,running,abc,run;

function preload(){
  dogimg1 = loadImage("images/dogImg.png")
  dogimg2 = loadImage("images/dogImg1.png")
  bgImg=loadImage('images/BBenz.jpg');
mImg=loadImage('images/Milk.png');
brImg=loadImage('images/Bed Room.png');
dvImg=loadImage('images/dogVaccination.png');
gImg=loadImage('images/Garden.png');
lrImg=loadImage('images/Living Room.png');
wrImg=loadImage('images/Wash Room.png');
vdImg=loadImage('images/Vaccination.jpg');
rImg=loadImage('images/running.png');
drr=loadImage('images/runningLeft.png');
drl=loadImage('images/running.png');
injection=loadImage('images/Injection.png')
running=loadImage('images/runningLeft.png');
run=addImage('images/running.png');
abc=loadImage('images/Food Stock.png');
}


function setup() {
	createCanvas(600, 600);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()

  dog=createSprite(500,400);
  dog.addImage(dogimg1);
  dog.scale=0.3;

  background(bgImg)

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

dogName=createInput("Enter Dog Name Here")
dogName.position(200,550);

title=createElement('h3');
title.html("Hello, I am so glad that you are")
title.position(360,100);

title1=createElement('h3');
title1.html("taking care of me but first enter ")
title1.position(360,120);

title2=createElement('h3');
title2.html("my name before you start the game.")
title2.position(360,140);

enter=createButton("ENTER")
enter.position(400,550);

br=createButton("Go To Bed Room")
br.position(80,20);

dv=createButton("See the Schedule of Dog Vaccination")
dv.position(220,20);

g=createButton("Go To Garden")
g.position(475,20);

lr=createButton("Go To Living Room")
lr.position(80,50);

wr=createButton("Go To Wash Room")
wr.position(235,50);

surprise=createButton(" It's time for a surprise!!!")
surprise.position(390,50);

enter.mousePressed(function(){
  enter.hide();
  dogName.hide();
  var name=dogName.value()
  var greeting=createElement('h2')
  greeting.html("Hey "+name);
  greeting.position(300,600)
  title.hide();
title1.hide();
title2.hide();
})

br.mousePressed(function(){
feed.hide();
add.hide();
Dog.visible=false;
inj.visible=false;
  background(brImg)
  title.hide();
title1.hide();
title2.hide();
})

surprise.mousePressed(function(){
  dog.visible=false;
  Dog=createSprite(200,400)
  Dog.addImage(running);
  Dog.scale=0.3;
  inj=createSprite(350,350);
  background(bgImg)
  inj.addImage(injection);
  inj.scale=0.3;
  feed.hide();
  title.hide();
title1.hide();
title2.hide();
    add.hide();
  })

wr.mousePressed(function(){
  background(wrImg)
  dog.visible=false;
  feed.hide();
  title.hide();
title1.hide();
title2.hide();
  add.hide();
  Dog.visible=false;
inj.visible=false;
  })

  g.mousePressed(function(){
    background(gImg)
    dog.visible=false;
    feed.hide();
  add.hide();
  title.hide();
title1.hide();
title2.hide();
  Dog.visible=false;
  inj.visible=false;
    })

    lr.mousePressed(function(){
      background(lrImg)
      dog.visible=false;
      feed.hide();
  add.hide();
  Dog.visible=false;
  title.hide();
title1.hide();
title2.hide();
  inj.visible=false;
      })

      dv.mousePressed(function(){
     background(dvImg)
     dog.visible=false;
     feed.hide();
     title.hide();
title1.hide();
title2.hide();
  add.hide();
  Dog.visible=false;
inj.visible=false;
 })

  feed = createButton("FEED ME")
  feed.position(000,1100)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(00,1010)
  add.mousePressed(AddFood)

} 

function draw(){
  if(keyIsDown("space")){
 background(bgImg);
  }

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}


function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}


function showError(){
  console.log("Error in writing to the database");
}


function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}



function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}


function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
