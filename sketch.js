var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight;

var isFalling;
var isPlummeting;
var cameraPos_x;

var collectables;
var mountains;
var hills;
var clouds;


function setup()
{
    //create canvas that fill in entire window
    createCanvas(windowWidth,windowHeight);
    floorPos_y = height * 7/8;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    gameChar_width = 50;
    cameraPos_x = 0;
    
    //initialise the value of these function to false
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    //setup the properties of game background

    canyon = {x_pos: 900, width: 120};

    collectables = 
    [
        {pos_x: 200, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 500, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 970, pos_y:floorPos_y - 50, size: 50, isFound: false}
    ]
    
    clouds= [
        {pos_x:random(20,width),pos_y:random(50,100),size:random(50,90)}, 
        {pos_x:random(15,width),pos_y:random(100,250),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)}
    ]
    
    trees = 
    [
        {pos_x: 80,pos_y:floorPos_y - 50},
        {pos_x: 200,pos_y:floorPos_y - 50},
        {pos_x: 270,pos_y:floorPos_y - 50},
        {pos_x: 500,pos_y:floorPos_y - 50},
        {pos_x: 670,pos_y:floorPos_y - 50},
        {pos_x: 770,pos_y:floorPos_y - 50},
        {pos_x: 1230,pos_y:floorPos_y - 50},
        {pos_x: 1350,pos_y:floorPos_y - 50}
    ]

    hills = 
    [
        {pos_x: 0, pos_y:floorPos_y,height: 370,width: 680},
        {pos_x: 500,pos_y:floorPos_y,height: 400,width:700},
        {pos_x: 1000,pos_y:floorPos_y,height: 360,width:700},
        {pos_x: 1500,pos_y:floorPos_y,height: 250,width: 600 }
    ]

    mountains = 
    [
        {pos_x: 0,pos_y:floorPos_y - 200,height: 400,width: 600},
        {pos_x: 450,pos_y:floorPos_y - 270,height: 540,width: 800},
        {pos_x: 750,pos_y:floorPos_y - 275,height: 550,width: 400},
        {pos_x: 1050,pos_y:floorPos_y - 250,height: 500,width: 650},
        {pos_x: 1500,pos_y:floorPos_y - 265,height: 530,width: 600}  
    ];
}

function draw()
{
    //camera will stay center of the character
    cameraPos_x = gameChar_x - width/2;

    //fill the sky and backgrond blue
    background(255,197,197);

    //draw the soil floor
    noStroke();
    fill(58, 77, 57)
    rect(0, floorPos_y, width, height - floorPos_y );

    //camera position
    push();
    translate(-cameraPos_x, 0);

    //draw the clouds
    for(var i=0;i<clouds.length;i++) {
        fill(255);
        ellipse(clouds[i].pos_x,clouds[i].pos_y,clouds[i].size*1.5,clouds[i].size*1.5)
        ellipse(clouds[i].pos_x - 40,clouds[i].pos_y,clouds[i].size,clouds[i].size)
        ellipse(clouds[i].pos_x + 40,clouds[i].pos_y,clouds[i].size,clouds[i].size)
        // fill(255,0,0);
        // ellipse(clouds.pos_x,clouds.pos_y,10,10);
    }

    //animate the clouds
    for (var i=0;i<clouds.length;i++) {
        if (clouds[i].pos_x > windowWidth)
			clouds[i].pos_x = random(10, windowWidth / 4);
		clouds[i].pos_x += random(1, 3);
    }    

    //draw the mountain
    for(var i=0;i<mountains.length;i++) {
        fill(255,235,216);
        triangle(mountains[i].pos_x - mountains[i].width/2,
                 mountains[i].pos_y + mountains[i].height/2,
                 mountains[i].pos_x,
                 mountains[i].pos_y - mountains[i].height/2,
                 mountains[i].pos_x + mountains[i].width/2,
                 mountains[i].pos_y + mountains[i].height/2
                )
        // fill(255,0,0);
        // ellipse(mountains[i].pos_x,mountains[i].pos_y, 10, 10);
    }

    //draw the hills
    for (var i=0;i<hills.length;i++) {
        fill(199,220,167);
        arc(hills[i].pos_x,
            hills[i].pos_y,
            hills[i].width,
            hills[i].height,
            PI, radians(360)
            )
    }

    //draw the trees
    for (var i=0;i<trees.length;i++) {
        noStroke();
        //tree trunk
        fill(185, 148, 112);
        rectMode(CENTER);
        rect(trees[i].pos_x,trees[i].pos_y,40,100);
        rectMode(CORNER);
        //tree leaves
        fill(137,185,173)
        triangle(
                trees[i].pos_x - 80,
                trees[i].pos_y - 50,
                trees[i].pos_x,
                trees[i].pos_y - 150,
                trees[i].pos_x + 80,
                trees[i].pos_y - 50
                );
        fill(137,185,173)
        triangle(
                trees[i].pos_x - 80,
                trees[i].pos_y - 100,
                trees[i].pos_x,
                trees[i].pos_y - 240,
                trees[i].pos_x + 80,
                trees[i].pos_y - 100
                );
        //fill(255,0,0);
        //ellipse(trees[i].pos_x,trees[i].pos_y,10,10);
    }

    //draw the canyon
    fill(47,32,0,300);
    rect(canyon.x_pos,floorPos_y,canyon.width,height-floorPos_y);
    // fill(255,0,0);
    // ellipse(canyon.x_pos,floorPos_y,10,10);
    
    //draw the collectable
    for(var i=0;i<collectables.length;i++) {  
        if (collectables[i].isFound == false) {
            fill(255,215,0);
            ellipse(
                    collectables[i].pos_x,
                    collectables[i].pos_y,
                    collectables[i].size,
                    collectables[i].size
                    );
            // fill(255,0,0);
            // ellipse(collectables[i].pos_x,collectables[i].pos_y,10,10);
        }
    }

    //detect any collectable near the character
    for(var i=0;i<collectables.length;i++) {
        var collectable = collectables[i];
        var d = dist(gameChar_x,gameChar_y,collectable.pos_x,collectable.pos_y);
        if (d < 30) {
            collectable.isFound = true;
        }

    }

    //check if game character is over the canyon
    var con1 = gameChar_y == floorPos_y
    //check if the game character is from the left of the canyon
    var con2 = gameChar_x - gameChar_width/2>(canyon.x_pos);
    //check if the game character is from the right of the canyon 
    var con3 = gameChar_x + gameChar_width/2<(canyon.x_pos + canyon.width);


    //check if game character over the canyon
    if(con1 && con2 && con3) {
        isPlummeting = true;
    }

    //game character
    if(isLeft && isFalling) {
        //jumping left
        stroke(100);
        fill(255,228,196);
	    ellipse(gameChar_x + 5, gameChar_y - 60, 20, 20); //head
        fill(0,0,0);
        ellipse(gameChar_x + 2, gameChar_y - 65, 5, 5) //left eye
        ellipse(gameChar_x, gameChar_y - 58, 6, 6) //mouth
        fill(255,228,196);
        ellipse(gameChar_x + 4, gameChar_y - 35, 35, 40) //body
        ellipse(gameChar_x + 8, gameChar_y - 55, 10, 30) //left arm
        // fill(255,0,0);
	    // ellipse(gameChar_x, gameChar_y, 10, 10); //anchor point
    }
    else if(isRight && isFalling) {
        //jumping right
        stroke(100); 
        fill(255,228,196);
	    ellipse(gameChar_x + 5, gameChar_y - 60, 20, 20); //head
	    fill(0,0,0);
	    ellipse(gameChar_x + 9, gameChar_y - 65, 5, 5); //right eye
	    ellipse(gameChar_x + 12, gameChar_y - 58, 6, 6); //mouth
	    fill(255,228,196);
	    ellipse(gameChar_x + 5, gameChar_y - 35, 35, 40) //body
	    ellipse(gameChar_x + 3, gameChar_y - 55, 10, 30); //right arm
        // fill(255,0,0);
	    // ellipse(gameChar_x, gameChar_y, 10, 10); //anchor point
    }
    else if(isLeft) {
        //walking left
        stroke(100);
        fill(255,228,196);
	    ellipse(gameChar_x + 10, gameChar_y - 47, 20, 20); //head
	    fill(0,0,0);
	    ellipse(gameChar_x + 6, gameChar_y - 52, 5, 5); //eye
	    line(gameChar_x, gameChar_y - 45, gameChar_x + 6, gameChar_y - 46); //mouth
	    fill(255,228,196);
	    ellipse(gameChar_x + 10, gameChar_y - 20, 25, 40); //body
	    ellipse(gameChar_x + 10, gameChar_y - 17, 10,30); //left arm
        // fill(255,0,0);
	    // ellipse(gameChar_x, gameChar_y, 10, 10); //anchor point
    }
    else if(isRight) {
        //walking right
        stroke(100);
        fill(255,228,196);
        ellipse(gameChar_x - 10, gameChar_y - 47, 20, 20); //head
        fill(0,0,0);
        ellipse(gameChar_x - 6, gameChar_y - 52, 5, 5); //right eye
        line(gameChar_x - 1, gameChar_y - 45, gameChar_x - 7, gameChar_y - 46); //mouth
        fill(255,228,196);
        ellipse(gameChar_x - 10, gameChar_y - 20, 25, 40) //body
        ellipse(gameChar_x - 10, gameChar_y - 17, 10, 30); //right arm
        // fill(255,0,0);
	    // ellipse(gameChar_x, gameChar_y, 10, 10); //anchor point
    }
    else if(isFalling || isPlummeting) {
        //character jumps
        stroke(100);
        fill(255,228,196);
	    ellipse(gameChar_x, gameChar_y - 53, 20, 20); //head
	    fill(0,0,0);
	    ellipse(gameChar_x - 6, gameChar_y - 56, 5, 5); //left eye
	    ellipse(gameChar_x + 6, gameChar_y - 56, 5, 5); //right eye
	    ellipse(gameChar_x, gameChar_y - 51, 6, 6); //mouth
	    fill(255,228,196);
	    ellipse(gameChar_x, gameChar_y - 28, 35, 40); //body
	    ellipse(gameChar_x - 16, gameChar_y - 48, 10, 30); //left arm
	    ellipse(gameChar_x + 16, gameChar_y - 48, 10,30); //right arm
        // fill(255,0,0);
	    // ellipse(gameChar_x, gameChar_y, 10, 10); //anchor point
    }
    else {
        //character idle
        stroke(100);
        fill(255,228,196);
	    ellipse(gameChar_x, gameChar_y - 43, 25,25); //head
	    fill(0,0,0);
	    ellipse(gameChar_x - 8, gameChar_y - 47, 5, 5); //left eye
	    ellipse(gameChar_x + 8, gameChar_y - 47, 5, 5); //right eye
	    line(gameChar_x - 5, gameChar_y - 43, gameChar_x + 5, gameChar_y - 40); //mouth
	    fill(255,228,196);
	    ellipse(gameChar_x, gameChar_y - 20, 35, 35); //body
	    ellipse(gameChar_x - 16, gameChar_y - 17, 10, 30); //left arm
	    ellipse(gameChar_x + 16, gameChar_y - 17, 10,30); //right arm
        // fill(255,0,0);
	    // ellipse(gameChar_x, gameChar_y, 10, 10); //anchor point
    }

    pop();

    /////INTERACTION CODE/////
    if(isPlummeting) {
        gameChar_y += 10;
        return;
    }
    if(gameChar_y < floorPos_y) {
        gameChar_y += 1;
        isFalling = true;

    } else {
        isFalling = false;
    }

    if(isLeft == true) {
        gameChar_x -= 5;

    } else if(isRight == true) {
        gameChar_x += 5;
    }


}

//resized when the window is resize
function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}

//keyboard function to control character
function keyPressed() {
    if(keyCode == 37){
        isLeft = true;

    } else if (keyCode == 39){
        isRight = true;

    } else if (keyCode == 38){
        if(gameChar_y >= floorPos_y)
        gameChar_y -= 100
    }
}

function keyReleased() {
    if(keyCode == 37){
        isLeft = false;
        
    } else if (keyCode == 39){
        isRight = false;
    }
}