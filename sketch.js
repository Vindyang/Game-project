var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight;

var isFalling;
var isPlummeting;
var collectable;

function setup()
{
    //create canvas that fill in entire window
    createCanvas(windowWidth,windowHeight);
    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    gameChar_width = 50;
    setupScene(); //calls the startScene in gamebg.js

    //initialise the valur of these function to false
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;

    collectable = {X_pos: 100, y_pos:floorPos_y -20, size: 50, isFound: false};
    canyon = {x_pos: 500, width: 150};
    
}

//resized when the window is resize
function windowResized()
{
    resizeCanvas(windowWidth,windowHeight);
}

function drawCanyon()
{
    fill(0,0,0);
    rect(canyon.x_pos,floorPos_y,canyon.width,height-floorPos_y);
    fill(255,0,0);
    ellipse(canyon.x_pos,floorPos_y,10,10);
}

function ifCharOverTheCanyon()
{
    //check if the game character on the floor
    var con1 = gameChar_y == floorPos_y
    //check if the game character is from the left of the canyon
    var con2 = gameChar_x - gameChar_width/2>(canyon.x_pos);
    //check if the game character is from the right of the canyon 
    var con3 = gameChar_x + gameChar_width/2<(canyon.x_pos + canyon.width);
}

    //check if game character over the canyon
    if(con1 && con2 && con3)
    {
        isPlummeting = true;
    }

function ifCharInCollectableRange()
{
    var d = dist(gameChar_x,gameChar_y,collectable.x_pos,collectable.y_pos);
    if (d <= 30)
    {
        collectable.isFound = true;
    }
}

function drawCollectable()
{
    if (collectible.isFound ==false)
    {
        fill(255,215,0);
        rectMode(CENTER);
        ellipse(collectable.x_pos,collectable.y_pos,collectable.size,collectable.size);
        rectMode(CORNER);
        fill(255,0,0);
        ellipse(collectable.x_pos,collectable.y_pos,10,10);
    }
}

function draw()
{
    //fill the sky and backgrond blue
    background(135,206,250);

    noStroke();
    fill(34,139,34);
    //draw the grass floor
    rect(0, floorPos_y, width, height - floorPos_y);

    //draw the mountain
    drawMountains()
;
    //draw the canyon
    drawCanyon();

    //draw the collectable
    drawCollectable();

    //check if the game character is in the range  of the collectable 
    ifCharInCollectableRange();

    //check if game character is over the canyon
    ifCharOverTheCanyon();

    //game character
    if(isLeft && isFalling)
    {
        //jumping left 
        gameCharIsLeftAndJump();
    }
    else if(isRight && isFalling)
    {
        //jumping right 
        gameCharIsRightAndJump();
    }
    else if(isLeft)
    {
        //walking left
        gameCharIsLeft();
    }
    else if(isRight)
    {
        //walking right
        gameCharIsRight();
    }
    else if(isFalling || isPlummeting)
    {
        //character jumps
        gameCharIsJump();
    }
    else 
    {
        //character idle
        gameCharIsIdle();
    }

    /////INTERACTION CODE/////
    if(isPlummeting)
    {
        gameChar_y += 10;
        return;
    }
    if(gameChar_y < floorPos_y)
    {
        gameChar_y += 1;
        isFalling = true;
    } else {
        ifFalling = false;
    }

    if(isLeft == true)
    {
        gameChar_x -= 5;
    }
    else if(isRight == true)
    {
        gameChar_x += 5;
    }
}

function keyPressed()
{
    if(keyCode == 37){
        isLeft = true;
    } else if (keyCode == 39){
        isRight = true;
    } else if (keyCode == 38){
        if(gameChar_y >= floorPos_y)
        gameChar_y -=50
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