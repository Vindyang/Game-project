var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;
var game_score
var gameChar_world_x

var isLeft;
var isRight;

var isFalling;
var isPlummeting;
var cameraPosx;

var collectables;
var mountains;
var hills;
var clouds;
var canyons;
var platforms;
var onPlatforms;

var flagpole;
var lives;
var gameOver;
var sound;

function setup()
{
    //create canvas that fill in entire window
    createCanvas(windowWidth,windowHeight);

    //init lives
    lives = 3;

    gameOver= false;
    //init  starting variable
    init();

    //create the platforms
    platforms = [];
    platforms.push(createPlatforms(130, floorPos_y - 150, 150));
    platforms.push(createPlatforms(400, floorPos_y - 90, 150));
}

function init()
{
    floorPos_y = height * 7/8;
    gameChar_x = 700;
    gameChar_y = floorPos_y;
    gameChar_width = 50;
    cameraPosx = 0;
    game_score = 0;
    
    //initialise the value of these function to false
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    onPlatforms = false;

    //setup the properties of game background
    setupClouds();
    setupMountains();
    setupHills();
    setupTrees();
    setupCollectables();
    setupCanyons();
    createPlatforms();    

    //setup the flagpole
    flagpole = {x_pos: 1700, isReached: false};
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
    translate(- cameraPosx, 0);

    //draw the clouds
    animateClouds();

    //draw the mountain
    drawMountains();

    //draw the hills
    drawHills();

    //draw the trees
    drawTrees();

    //draw the canyon
    drawCanyon();

    //check if any collectable near the character
    checkIfAnyCollectable();

    //draw the collectable
    drawCollectable();

    //draw the flagpole
    drawFlagPole();

    //if character reach the flagpole
    reachFlagPole();

    //draw the platforms
    drawPlatforms();
    //check if character is under the platform
    charOnPlat();
    
    //check if game character is over the canyon
    charOverCanyon();
        
    if(gameOver){
        drawGameOver();
        //set character back to starting point
        gameChar_x = 700;
        gameChar_y = floorPos_y;

    }

    //game character
    if (onPlatforms && isLeft) 
    {
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
    else if (onPlatforms && isRight)
    {
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
    else if(isLeft && isFalling)
    {
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
    else if(isRight && isFalling)
    {
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
    else if(isLeft)
    {
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
    else if(isRight)
    {
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
    else if (onPlatforms)
    {
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
    }
    else if(isFalling || isPlummeting)
    {
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
    else 
    {
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
    }

    pop();

    //write out the game score
    drawGameScore();

    //draw the live token function
    liveTokens();

    /////INTERACTION CODE/////
    if(isPlummeting) {
        gameChar_y += 4;
        gameCharLives();
        fallSound.play();
        return;
    }
    if(gameChar_y < floorPos_y) {
        isFalling = true;

    } else {
        isFalling = false;
        gameChar_y = floorPos_y
    }

    if(isLeft == true) {
        gameChar_x -= 5;

    } else if(isRight == true) {
        gameChar_x += 5;
    }

    //Update real position of gameChar for collision detection.
    gameChar_world_x = gameChar_x - cameraPosx;

}

//resized when the window is resize
function windowResized()
{
    resizeCanvas(windowWidth,windowHeight);
}

//setup the canyons
function setupCanyons()
{
    canyons = [
        {x_pos: 370, width: 120},
        {x_pos: 900, width: 120},
        {x_pos: 1300, width: 120}
    ]
}

//draw the canyons
function drawCanyon()
{
    for(var i=0;i<canyons.length;i++) {
        fill(47,32,0,300);
        rect(canyons[i].x_pos,floorPos_y,canyons[i].width,height-floorPos_y)
    }
}

//check if the character is over the canyon
function charOverCanyon() {
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
}

//function for collectables
function setupCollectables() {
    collectables = [
        {pos_x: 200, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 500, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 970, pos_y:floorPos_y - 50, size: 50, isFound: false}
    ]
} 

//check if the character is in range of the collectable
function ifCharInCollectableRange(collectables) {
    //check if any collectable has been collected
    if(collectables.isFound==false){
        var d = dist(gameChar_x,gameChar_y,collectables.pos_x,collectables.pos_y);
        if (d < 30) {
            collectables.isFound = true;
            game_score++;
            collectSound.play();
        }
    }    
}

//check if any collectable near the character
function checkIfAnyCollectable() {
    for(var i=0;i<collectables.length;i++) {
        ifCharInCollectableRange(collectables[i])
    }
}

//call the drawCollectable function
function drawCollectable() {
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
}

//setup clouds
function setupClouds()
{
    clouds= [
        {pos_x:random(20,width),pos_y:random(50,100),size:random(50,90)}, 
        {pos_x:random(15,width),pos_y:random(100,250),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)}
    ]
}

//animate the clouds accross the canvas
function animateClouds() {
    for (var i=0;i<clouds.length;i++) {
        if (clouds[i].pos_x > windowWidth)
			clouds[i].pos_x = random(10, windowWidth / 4);
		clouds[i].pos_x += random(1, 3);
        drawClouds(clouds[i]);
    }
}

//call the drawclouds function
function drawClouds(cloudy) {
    fill(255);
    ellipse(cloudy.pos_x,cloudy.pos_y,cloudy.size*1.5,cloudy.size*1.5)
    ellipse(cloudy.pos_x - 40,cloudy.pos_y,cloudy.size,cloudy.size)
    ellipse(cloudy.pos_x + 40,cloudy.pos_y,cloudy.size,cloudy.size)
}

//setup trees
function setupTrees()
{
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
}

//call the drawtrees function
function drawTrees()
{
    for (var i=0;i<trees.length;i++)
    {
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
    }
}

//setup the hills
function setupHills()
{
    hills = 
    [
        {pos_x: 0, pos_y:floorPos_y,height: 370,width: 680},
        {pos_x: 500,pos_y:floorPos_y,height: 400,width:700},
        {pos_x: 1000,pos_y:floorPos_y,height: 360,width:700},
        {pos_x: 1500,pos_y:floorPos_y,height: 250,width: 600 }
    ]
}

//call the drawhills function
function drawHills()
{
    for (var i=0;i<hills.length;i++)
    {
        fill(199,220,167);
        arc(hills[i].pos_x,
            hills[i].pos_y,
            hills[i].width,
            hills[i].height,
            PI, radians(360)
            )
    }
}


//setup the mountains
function setupMountains()
{
    mountains = 
    [
        {pos_x: 0,pos_y:floorPos_y - 200,height: 400,width: 600},
        {pos_x: 450,pos_y:floorPos_y - 270,height: 540,width: 800},
        {pos_x: 750,pos_y:floorPos_y - 275,height: 550,width: 400},
        {pos_x: 1050,pos_y:floorPos_y - 250,height: 500,width: 650},
        {pos_x: 1500,pos_y:floorPos_y - 265,height: 530,width: 600}  
    ];
}

//call the drawMountains
function drawMountains()
{
    for (var i=0;i<mountains.length;i++)
    {
        fill(255,235,216);
        triangle(mountains[i].pos_x - mountains[i].width/2,
                 mountains[i].pos_y + mountains[i].height/2,
                 mountains[i].pos_x,
                 mountains[i].pos_y - mountains[i].height/2,
                 mountains[i].pos_x + mountains[i].width/2,
                 mountains[i].pos_y + mountains[i].height/2
                )
    }
}

//draw the platforms
function createPlatforms(x,y,length)
{
    var P = {
        x: x,
        y: y,
        length: length,
        draw: function() {
            fill(136, 179, 128);
            rect(this.x,this.y,this.length,20);
        },
        checkContact: function(gc_x, gc_y)
        {
            //check x-axis
            if (gc_x + 20 > this.x && gc_x < this.x + 20 + this.length)
            {
                //check y-axis
                var d = this.y - gc_y;
                if(d >= 0 && d < 1)
                {
                    return true;
                }
            }
            return false;
        }
    };
    return P;
}

//draw the platforms
function drawPlatforms()
{
    for (var i = 0; i < platforms.length; i++)
    {
        platforms[i].draw();
    }
}

//check if the character is on the platform
function charOnPlat()
{
    if (isFalling) {
        var isContact = false;
        onPlatforms = false;
        for (var i = 0; i < platforms.length; i++) {
            isContact = platforms[i].checkContact(gameChar_x, gameChar_y);
            if (isContact) {
                onPlatforms = true;
                break;
            }
        }
        if (!isContact) {
            gameChar_y += 2;
        } 
    }
}

//function for gamescore
function drawGameScore()
{
    fill(0);
    textSize(30);
    text("score : " + game_score,5,30);
}

//draw the flagpole
function drawFlagPole()
{
    fill(125);
    rect(flagpole.x_pos,floorPos_y-400,30,400);
    fill(100);
    if(flagpole.isReached) {
        rect(flagpole.x_pos,floorPos_y-400,100,50);
    } else {
        rect(flagpole.x_pos,floorPos_y-50,100,50);
    }
}

//check if the character reach the flagpole
function reachFlagPole()
{
    if(flagpole.isReached==false){
        var d = dist(gameChar_x,gameChar_y,flagpole.x_pos,floorPos_y)
        if(d<10){
            flagpole.isReached=true;
            gameOver = true;
        }
    }
}

//check if the player is dead
function gameCharLives()
{
    if(gameChar_y>height){
        lives--;
        //restart game if there's live
        if(lives>0){
            init();
        } else {
            gameOver = true
        }
    }
}

//live token
function liveTokens()
{
    fill(0);
    for(var i=0;i<lives;i++){
        rect(40*i+1670,10,30,30);
    }
}

//draw the gameover letters on screen
function drawGameOver()
{
    fill(0);
    textSize(100);
    text("Game Over", 250, height/2-100);
    if(lives>0){
        text("You Win!", 300, height/2);
    } else {
        text("Your Lose!", 300,height/2);
    }
}

//load the audio file
function preload()
{
    soundFormats("mp3");
    jumpSound = loadSound("assets/jump.mp3");
    collectSound = loadSound("assets/collect.mp3")
    fallSound = loadSound("assets/falling.mp3")
}

//keyboard function to control character
function keyPressed()
{
    if(keyCode == 37){
        isLeft = true;

    } else if (keyCode == 39){
        isRight = true;

    } else if (keyCode == 38){
        if(gameChar_y >= floorPos_y || onPlatforms) {
            gameChar_y -= 150;
            jumpSound.play();
        }
    }
}

function keyReleased()
{
    if(keyCode == 37){
        isLeft = false;
        
    } else if (keyCode == 39){
        isRight = false;
    }
}