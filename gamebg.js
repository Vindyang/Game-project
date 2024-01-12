var mountains;

function setupScene()
{
    mountains = 
    [{pos_x: 300,pos_y:floorPos_y - 100,height:200,width:80},
    {pos_x: 200,pos_y:floorPos_y - 90,height:180,width:50},
    {pos_x:70,pos_y:floorPos_y - 150,height:300,width:180}  

    ];
}

function drawMountains()
{
    drawMountain(mountains[0]);
    drawMountain(mountains[1]);
    drawMountain(mountains[2]);
}

function drawMountain(t_mountain)
{
    var x1 = t_mountain.pos_x - t_mountain.width/2;
    var y1 = t_mountain.pos_y + t_mountain.height/2;
    var x2 = t_mountain.pos_x;
    var y2 = t_mountain.pos_y - t_mountain.height/2;
    var x3 = t_mountain.pos_x + t_mountain.width/2;
    var y3 = t_mountain.pos_y + t_mountain.height/2;
    fill(130,108,52);
    triangle(x1, y1, x2, y2, x3, y3);
    fill(255,0,0);
    ellipse(t_mountain.pos_x, t_mountain.pos_y, 10, 10);
}