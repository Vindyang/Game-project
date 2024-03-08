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

var enemies;
var damage;

var flagpole;
var lives;
var gameOver;
var sound;
var BGM

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
    platforms.push(createPlatforms(-390, floorPos_y - 150, 150));
    platforms.push(createPlatforms(130, floorPos_y - 150, 150));
    platforms.push(createPlatforms(400, floorPos_y - 90, 150));
    platforms.push(createPlatforms(900, floorPos_y - 110, 150));
    platforms.push(createPlatforms(1200, floorPos_y - 130, 150));
    platforms.push(createPlatforms(2090, floorPos_y - 130, 150));

    //create the enemies
    enemies = [];
    enemies.push(Enemy(- 200, floorPos_y, 400));
    enemies.push(Enemy(310, floorPos_y, 280));
    enemies.push(Enemy(700, floorPos_y, 600));
    enemies.push(Enemy(1410, floorPos_y, 390));
    enemies.push(Enemy(1900, floorPos_y, 590));

}

function init()
{
    floorPos_y = height * 7/8;
    gameChar_x = 1000;
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
    damage = false;
    BGM_sound = false;

    //setup the properties of game background
    setupClouds();
    setupMountains();
    setupHills();
    setupTrees();
    setupCollectables();
    setupCanyons();
    createPlatforms();    

    //setup the flagpole
    flagpole = {x_pos: 2950, isReached: false};

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
    
    //check if the character is hit by enemy
    checkEnemyContact();

    //draw the enemy
    drawEnemy();

    if(gameOver){
        drawGameOver();
        //set character back to starting point
        gameChar_x = 2950;
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

    //instruction text
    let textSpeed = millis();

    if(textSpeed < 7000){
        fill(40, 48, 68);
        textSize(28);
        text("Use arrow key to control the character", windowWidth/7, 100);
        text("Collect as many coins as possible", windowWidth/7, 150);
        text("Get to the flagpole to win", windowWidth/7, 200);
    }

    //write out the game score
    drawGameScore();

    //draw the live token function
    liveTokens();

    /////INTERACTION CODE/////
    if(damage) {
        fill(0);
        textSize(50);
        return;
    }
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
        {x_pos: - 1600, width: 1000},
        {x_pos: - 300, width: 100},
        {x_pos: 200, width: 100},
        {x_pos: 600, width: 100},
        {x_pos: 1300, width: 100},
        {x_pos: 1800, width: 100},
        {x_pos: 2500, width: 100},
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
        {pos_x: -480, pos_y:floorPos_y - 200, size: 50, isFound: false},
        {pos_x: -100, pos_y:floorPos_y - 50, size: 50, isFound: false},
        {pos_x: 200, pos_y:floorPos_y - 180, size: 50, isFound: false},
        {pos_x: 950, pos_y:floorPos_y - 140, size: 50, isFound: false},
        {pos_x: 1300, pos_y:floorPos_y - 200, size: 50, isFound: false},
        {pos_x: 1260, pos_y:floorPos_y - 40, size: 50, isFound: false},
        {pos_x: 1800, pos_y:floorPos_y - 190, size: 50, isFound: false},
        {pos_x: 2290, pos_y:floorPos_y - 260, size: 50, isFound: false},
        {pos_x: 2550, pos_y:floorPos_y - 30, size: 50, isFound: false},
    ]
} 

//check if the character is in range of the collectable
function ifCharInCollectableRange(collectables) {
    //check if any collectable has been collected
    if(collectables.isFound==false){
        var d = dist(gameChar_x,gameChar_y,collectables.pos_x,collectables.pos_y);
        if (d < 50) {
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
    [];
    //starting position of first tree
    let startX = -1300;

    for (var i = 0; i < 17; i++) {
        trees.push({
            pos_x: startX + i * 400, 
            pos_y: floorPos_y - 50
        });
    }
}

//call the drawtrees function
function drawTrees()
{
    for (var i=0;i<trees.length;i++)
    {
        noStroke();
        //tree trunk
        fill(185,148,112);
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
        {pos_x: - 1010, pos_y:floorPos_y,height: 350,width: 780},
        {pos_x: - 500, pos_y:floorPos_y,height: 300,width: 700},
        {pos_x: 0, pos_y:floorPos_y,height: 370,width: 680},
        {pos_x: 500,pos_y:floorPos_y,height: 400,width:700},
        {pos_x: 1000,pos_y:floorPos_y,height: 360,width:700},
        {pos_x: 1500,pos_y:floorPos_y,height: 250,width: 600 },
        {pos_x: 2000,pos_y:floorPos_y,height: 300,width: 700},
        {pos_x: 2500,pos_y:floorPos_y,height: 400,width: 600},
        {pos_x: 3000,pos_y:floorPos_y,height: 280,width: 750},
        {pos_x: 3500,pos_y:floorPos_y,height: 350,width: 850},
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
        {pos_x: - 1200,pos_y:floorPos_y - 225   ,height: 450,width: 800},
        {pos_x: - 870,pos_y:floorPos_y - 250,height: 330,width: 500},
        {pos_x: - 600,pos_y:floorPos_y - 150,height: 300,width: 600},
        {pos_x: - 350,pos_y:floorPos_y - 300,height: 500,width: 450},
        {pos_x: 0,pos_y:floorPos_y - 200,height: 400,width: 600},
        {pos_x: 450,pos_y:floorPos_y - 270,height: 540,width: 800},
        {pos_x: 750,pos_y:floorPos_y - 275,height: 550,width: 400},
        {pos_x: 1050,pos_y:floorPos_y - 250,height: 500,width: 650},
        {pos_x: 1500,pos_y:floorPos_y - 265,height: 530,width: 600},
        {pos_x: 1800,pos_y:floorPos_y - 300,height: 600,width: 500},
        {pos_x: 2100,pos_y:floorPos_y - 250,height: 500,width: 700},
        {pos_x: 2500,pos_y:floorPos_y - 200,height: 350,width: 600},
        {pos_x: 3000,pos_y:floorPos_y - 300,height: 600,width: 800},
        {pos_x: 3400,pos_y:floorPos_y - 150,height: 300,width: 300},
        {pos_x: 3700,pos_y:floorPos_y - 250,height: 500,width: 700},  
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
            gameChar_y += 5;
        } 
    }
}

//setup the enemy function
function Enemy(x,y,range)
{
    var E = {
        x: x,
        y: y,
        range: range,
        currentX: x,
        inc: 1,
        update: function()
        {
            this.currentX += this.inc;
            if(this.currentX > this.x + this.range)
            {
                this.inc = -1;
            } else if (this.currentX < this.x)
            {
                this.inc = 1;
            }
        },
        draw: function()
        {
            this.update();
            //torso and hand
            stroke(100)
            fill(182, 70, 95);
            ellipse(this.currentX,this.y - 45,20,20);
            ellipse(this.currentX,this.y - 20,40,40);
            ellipse(this.currentX - 23,this.y - 23,13,13);
            ellipse(this.currentX + 23,this.y - 23,13,13);
            //eyes
            fill(0, 0, 0);
            ellipse(this.currentX - 5,this.y - 50,5,5);
            ellipse(this.currentX + 5,this.y - 50,5,5);
            //spear
            rect(this.currentX - 25,this.y - 60,5,60);
            fill(192, 192, 192);
            triangle(this.currentX - 40,this.y - 60,this.currentX - 5,this.y - 60,this.currentX - 22,this.y - 90);

        },
        checkContact: function(gc_x, gc_y)
        {
            var d = dist(gc_x,gc_y,this.currentX,this.y);
            if(d < 20)
            {
                return true;
            }
            return false;
        }
    };
    return E;
}

//draw the enemy
function drawEnemy()
{
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

//check if the character is hit by enemy
function checkEnemyContact()
{
    if (damage) {
        return;
    }
    for (var i = 0; i < enemies.length; i++) {
        var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
        if (isContact) {
            lives--;
            damage = true;
            if (lives > 0) {
                init();
            } else {
                gameOver = true;
            }
        
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
    fill(185,148,112);
    rect(flagpole.x_pos + 25,floorPos_y - 10,50,10);
    fill(143,188,143);
    rect(flagpole.x_pos + 40,floorPos_y - 510,20,500);
    fill(85,107,47);
    ellipse(flagpole.x_pos + 50,floorPos_y - 525,40,40);
    if(flagpole.isReached == false){
    fill(255,255,255);
    //flag down
    triangle(flagpole.x_pos + 40,floorPos_y - 10,flagpole.x_pos - 80,floorPos_y - 60,flagpole.x_pos + 40,floorPos_y - 60);
    } else {
        //flag up
        triangle(flagpole.x_pos + 40,floorPos_y - 505,flagpole.x_pos - 80,floorPos_y - 500,flagpole.x_pos + 40,floorPos_y - 450);
    }
}

//check if the character reach the flagpole
function reachFlagPole()
{
    if(flagpole.isReached == false){
        var d = dist(gameChar_x,gameChar_y,flagpole.x_pos,floorPos_y)
        if(d < 5){
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
        drawHeart(50 * i + 1670, 30);
    }
}

//draw the lives shape
function drawHeart(x, y) {
    push();
    translate(x, y);
    fill(255, 0, 0);
    noStroke();
    beginShape();
    vertex(0, -10);
    bezierVertex(-22, -35, -22, 12, 0, 20);
    bezierVertex(22, 12, 22, -35, 0, -10);
    endShape(CLOSE);
    pop();
  }

//draw the gameover letters on screen
function drawGameOver()
{
    fill(0);
    textSize(100);
    text("Game Over", 2700, height/2-80);
    if(lives>0){
        textSize(80);
        text("You Win!", 2800, height/2);
        textSize(30);
        text("Your Score: " + game_score, 2820, height/2 + 50);
    } else {
        textSize(80);
        text("You Lose!", 800,height/2);
    }
}

//load the audio file
function preload()
{
    soundFormats("mp3");
    //https://pixabay.com/sound-effects/cartoon-jump-6462/
    jumpSound = loadSound("assets/jump.mp3");
    jumpSound.setVolume(0.1);
    //https://mixkit.co/free-sound-effects/game/?page=2
    collectSound = loadSound("assets/collect.mp3")
    collectSound.setVolume(0.1);
    //https://mixkit.co/free-sound-effects/falling/
    fallSound = loadSound("assets/falling.mp3")
    fallSound.setVolume(0.2);
    //https://www.fesliyanstudios.com/royalty-free-music/downloads-c/8-bit-music/6
    BGM = loadSound("assets/background.mp3")
    BGM.setVolume(0.1);

}

//keyboard function to control character
function keyPressed()
{
    if(BGM_sound == false){
        BGM.play();
        BGM_sound = true;
    }
    if(keyCode == 37 || keyCode == 65){
        isLeft = true;

    } else if (keyCode == 39 || keyCode == 68){
        isRight = true;

    } else if (keyCode == 38 || keyCode == 32){
        if(gameChar_y >= floorPos_y || onPlatforms) {
            gameChar_y -= 200;
            jumpSound.play();
        }
    }
}

function keyReleased()
{
    if(keyCode == 37 || keyCode == 65){
        isLeft = false;
        
    } else if (keyCode == 39 || keyCode == 68){
        isRight = false;
    }
}