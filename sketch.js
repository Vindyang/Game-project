var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;

var isLeft;
var isRight;

var isFalling;
var isPlummeting;

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
    
    //initialise the valur of these function to false
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    setupClouds();
    setupMountains();
    setupHills();
    setupTrees();
    setupCollectables();

    //canyon = {x_pos: 500, width: 150};
    
}

function draw()
{
    //fill the sky and backgrond blue
    background(255,204,128);

    noStroke();
    fill(76,40,62);
    //draw the soil floor
    rect(0, floorPos_y, width, height - floorPos_y );

    //draw the floor
    fill(252,193,10);
    rect(0,floorPos_y - 80, width, height - floorPos_y );

    //draw the clouds
    // drawClouds();
    // animateClouds();

    //draw the mountain
    drawMountains();

    //draw the hills
    drawHills();

    //draw the trees
    drawTrees();

    //draw the canyon
    //drawCanyon();

    //draw the collectable
    checkIfAnyCollectable();
    drawCollectable();

    //check if the game character is in the range  of the collectable 
    ifCharInCollectableRange();

    //check if game character is over the canyon
    //ifCharOverTheCanyon();

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

//resized when the window is resize
function windowResized()
{
    resizeCanvas(windowWidth,windowHeight);
}

// function drawCanyon()
// {
//     fill(0,0,0);
//     rect(canyon.x_pos,floorPos_y,canyon.width,height-floorPos_y);
//     fill(255,0,0);
//     ellipse(canyon.x_pos,floorPos_y,10,10);
// }

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

function setupCollectables()
{
    collectables =
    [
        {pos_x: 200, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 500, pos_y:floorPos_y - 25, size: 50, isFound: false},
        {pos_x: 800, pos_y:floorPos_y - 25, size: 50, isFound: false}
    ]
} 


function ifCharInCollectableRange(collectable)
{
    var d = dist(gameChar_x,gameChar_y,collectable.pos_x,collectable.pos_y);
    if (d < 30)
    {
        collectable.isFound = true;
    }
}

function checkIfAnyCollectable()
{
    for(var i=0;i<collectables.length;i++)
    {
        ifCharInCollectableRange(collectables[i])
    }
}

function drawCollectable()
{
    for(var i=0;i<collectables.length;i++)
    {  
        if (collectables[i].isFound == false)
        {
            fill(255,215,0);
            //rectMode(CENTER);
            ellipse(collectables[i].pos_x,
                    collectables[i].pos_y,
                    collectables[i].size,
                    collectables[i].size);
            //rectMode(CORNER);
            fill(255,0,0);
            ellipse(collectables[i].pos_x,collectables[i].pos_y,10,10);
        }
    }
}

function setupClouds()
{
    clouds=
    [
        {pos_x:random(20,width),pos_y:random(50,100),size:random(50,90)}, 
        {pos_x:random(15,width),pos_y:random(100,250),size:random(50,90)},
        {pos_x:random(10,width),pos_y:random(200,300),size:random(50,90)}
    ]
}

// function animateClouds()
// {
//     for (var i=0;i<clouds.length;i++)
//     {
//         clouds[i].pos_x = clouds[i].pos_x + 1;
//         drawClouds(clouds[i]);
//     }
// }

function drawClouds(cloudy)
{
    fill(255);
    ellipse(cloudy.pos_x,cloudy.pos_y,cloudy.size*1.5,cloudy.size*1.5)
    ellipse(cloudy.pos_x - 40,cloudy.pos_y,cloudy.size,cloudy.size)
    ellipse(cloudy.pos_x + 40,cloudy.pos_y,cloudy.size,cloudy.size)
    fill(255,0,0);
    ellipse(cloudy.pos_x,cloudy.pos_y,10,10);
}

function setupTrees()
{
    trees = 
    [
        {pos_x: 80,pos_y:floorPos_y - 50},
        {pos_x: 350,pos_y:floorPos_y - 50},
        {pos_x: 600,pos_y:floorPos_y - 50},
        {pos_x: 850,pos_y:floorPos_y - 50},
        {pos_x: 1100,pos_y:floorPos_y - 50},
        {pos_x: 1350,pos_y:floorPos_y - 50}
    ]
}

function drawTrees()
{
    for (var i=0;i<trees.length;i++)
    {
        noStroke();
        //tree trunk
        fill(79,52,46);
        rectMode(CENTER);
        rect(trees[i].pos_x,trees[i].pos_y,40,100);
        rectMode(CORNER);
        //tree leaves
        fill(231,157,34)
        triangle(trees[i].pos_x - 80,
                 trees[i].pos_y - 50,
                 trees[i].pos_x,
                 trees[i].pos_y - 150,
                 trees[i].pos_x + 80,
                 trees[i].pos_y - 50)
        fill(255,0,0);
        ellipse(trees[i].pos_x,trees[i].pos_y,10,10);
    }
}

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

function drawHills()
{
    for (var i=0;i<hills.length;i++)
    {
        fill(244,120,28);
        arc(hills[i].pos_x,
            hills[i].pos_y,
            hills[i].width,
            hills[i].height,
            PI, radians(360)
            )
    }
}

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

function drawMountains()
{
    for(var i=0;i<mountains.length;i++)
    {
        fill(255,225,131);
        triangle(mountains[i].pos_x - mountains[i].width/2,
                 mountains[i].pos_y + mountains[i].height/2,
                 mountains[i].pos_x,
                 mountains[i].pos_y - mountains[i].height/2,
                 mountains[i].pos_x + mountains[i].width/2,
                 mountains[i].pos_y + mountains[i].height/2
                )
        fill(255,0,0);
        ellipse(mountains[i].pos_x,mountains[i].pos_y, 10, 10);
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