var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight;

var isFalling;
var isPlummeting;
var cameraPosx;

var collectables;
var mountains;
var hills;
var clouds;


function setup()
{
    //create canvas that fill in entire window
    createCanvas(windowWidth,windowHeight);

    floorPos_y = height * 7/8;
    gameChar_x = width/3;
    gameChar_y = floorPos_y;
    gameChar_width = 50;
    cameraPosx = 0;
    
    //initialise the value of these function to false
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    //setup the properties of game background
    //setup canyons
    canyons = 
    [
        {x_pos: 370, width: 120},
        {x_pos: 900, width: 120},
        {x_pos: 1300, width: 120}
    ]
    
    //setup collectables
    collectables = 
    [
        {pos_x: 200, pos_y:floorPos_y - 75, size: 50, isFound: false},
        {pos_x: 500, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 970, pos_y:floorPos_y - 50, size: 50, isFound: false},
        {pos_x: 1290, pos_y:floorPos_y - 70, size: 50, isFound: false}
    ]
    
    //setup clouds
    clouds = [
        {pos_x:random(20,width),pos_y:random(50,100),size:random(50,90)}, 
        {pos_x:random(15,width),pos_y:random(100,250),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)}
    ]
    
    //setup trees x position
    trees_x = [80,200,270,500,670,770,1230,1350];

    //setup hills
    hills = 
    [
        {pos_x: 0, pos_y:floorPos_y,height: 370,width: 680},
        {pos_x: 500,pos_y:floorPos_y,height: 400,width:700},
        {pos_x: 1000,pos_y:floorPos_y,height: 360,width:700},
        {pos_x: 1500,pos_y:floorPos_y,height: 250,width: 600 }
    ]

    //setup mountains
    mountains = 
    [
        {pos_x: 0,pos_y:floorPos_y - 200,height: 400,width: 600},
        {pos_x: 450,pos_y:floorPos_y - 270,height: 540,width: 800},
        {pos_x: 750,pos_y:floorPos_y - 275,height: 550,width: 400},
        {pos_x: 1050,pos_y:floorPos_y - 250,height: 500,width: 650},
        {pos_x: 1500,pos_y:floorPos_y - 265,height: 530,width: 600}  
    ]
}

function draw()
{
    //camera will stay center of the character
    cameraPosx = gameChar_x - width/2;

    //fill the sky and backgrond blue
    background(255,197,197);

    //draw the soil floor
    noStroke();
    fill(58, 77, 57)
    rect(0, floorPos_y, width, height - floorPos_y );

    //camera position
    push();
    translate(-cameraPosx, 0);

    //draw the clouds
    for(var i=0;i<clouds.length;i++) {
        fill(255);
        ellipse(clouds[i].pos_x,clouds[i].pos_y,clouds[i].size*1.5,clouds[i].size*1.5)
        ellipse(clouds[i].pos_x - 40,clouds[i].pos_y,clouds[i].size,clouds[i].size)
        ellipse(clouds[i].pos_x + 40,clouds[i].pos_y,clouds[i].size,clouds[i].size)
    }

    //animate the clouds
    //start 
    for (var i=0;i<clouds.length;i++) {
        if (clouds[i].pos_x > windowWidth)
			clouds[i].pos_x = random(10, windowWidth / 4);
		clouds[i].pos_x += random(1, 3);
    //end
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
    }

    //draw the hills
    //start
    for (var i=0;i<hills.length;i++) {
        fill(199,220,167);
        arc(hills[i].pos_x,
            hills[i].pos_y,
            hills[i].width,
            hills[i].height,
            PI, radians(360)
            )
    }
    //end

    //draw the trees
    for (var i=0;i<trees_x.length;i++) {
        noStroke();
        //tree trunk
        fill(185, 148, 112);
        rectMode(CENTER);
        rect(trees_x[i],floorPos_y - 50,40,100);
        rectMode(CORNER);
        //tree leaves
        fill(137,185,173)
        triangle(
                trees_x[i] - 80,
                floorPos_y - 100,
                trees_x[i],
                floorPos_y - 200,
                trees_x[i] + 80,
                floorPos_y -100
                );
        fill(137,185,173)
        triangle(
                trees_x[i] - 80,
                floorPos_y - 150,
                trees_x[i],
                floorPos_y - 290,
                trees_x[i] + 80,
                floorPos_y - 150
                );
    }

    //draw the canyon
    for(var i=0;i<canyons.length;i++) {
        fill(47,32,0,300);
        rect(canyons[i].x_pos,floorPos_y,canyons[i].width,height-floorPos_y);
    }
    
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

    //detect if the character withtin the canyon area
    for(var i=0;i<canyons.length;i++) {
        var canyon = canyons[i]
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
    }

    //game character
    if(isLeft && isFalling) {
        //start
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
        //end
    }

    pop();

    /////INTERACTION CODE/////
    if(isPlummeting) {
        gameChar_y += 10;
        return;
    }
    if(gameChar_y < floorPos_y) {
        gameChar_y += 2;
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
//start
function windowResized() {
    resizeCanvas(windowWidth,windowHeight);
}
//end

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