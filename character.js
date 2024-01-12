function gameCharIsIdle()
{
    fill(0,255,0);
	ellipse(gameChar_x, gameChar_y - 60, 20, 20); //head
	fill(0,0,255);
	ellipse(gameChar_x, gameChar_y - 30, 30, 50); //body
    gameCharAnchorPoint();
}

function gameCharIsJump()
{
    fill(0,255,0);
	ellipse(gameChar_x, gameChar_y - 70, 20, 20); //head
	fill(0,0,255);
	ellipse(gameChar_x, gameChar_y - 45, 40, 40); //body
    gameCharAnchorPoint();
}

function gameCharIsLeftAndJump()
{
    fill(0,255,0);
	ellipse(gameChar_x + 5, gameChar_y - 60, 20, 20); //head
	fill(0,0,255);
	ellipse(gameChar_x + 5, gameChar_y - 35, 40, 40) //body
    gameCharAnchorPoint();
}

function gameCharIsRightAndJump()
{
    fill(0,255,0);
	ellipse(gameChar_x - 5, gameChar_y - 60, 20, 20); //head
	fill(0,0,255);
	ellipse(gameChar_x - 5, gameChar_y - 35, 40, 40) //body
    gameCharAnchorPoint();
}

function gameCharIsLeft()
{
    fill(0,255,0);
	ellipse(gameChar_x + 10, gameChar_y - 60, 20, 20); //head
	fill(0,0,255);
	ellipse(gameChar_x + 10, gameChar_y - 30, 30, 50); //body
    gameCharAnchorPoint();
}

function gameCharIsRight()
{
    fill(0,255,0);
	ellipse(gameChar_x - 10, gameChar_y - 60, 20, 20); //head
	fill(0,0,255);
	ellipse(gameChar_x - 10, gameChar_y - 30, 30, 50) //body
    gameCharAnchorPoint();
}


function gameCharAnchorPoint()
{
    fill(255,0,0);
    ellipse(gameChar_x,gameChar_y,10,10);
}