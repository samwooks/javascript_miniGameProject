/*

The Game Project 5 - Bring it all together

*/

var gameChar_world_x;

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var scrollPos;
var isPlummeting;
var isFalling;
var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
    //Trees
    trees_x = [50, 280, 600, 1000, 1200, 1600];
    clouds = [
        {x_pos: 200, y_pos:200, size: 50},
        {x_pos: 600, y_pos:100, size: 50},
        {x_pos: 900, y_pos:200, size: 50},
        {x_pos: 1400, y_pos:200, size: 50}
    ];
    
    //Collectables
    collectables = [
        {x_pos: 220, y_pos: floorPos_y, size: 20,isFound: false},
        {x_pos: 650, y_pos: floorPos_y, size: 20,isFound: false},
        {x_pos: 1100, y_pos: floorPos_y, size: 20,isFound: false},
        {x_pos: 1400, y_pos: floorPos_y, size: 20,isFound: false}
    ];
    
    //Canyons
    canyons =[
        {x_pos: 250, width: 100},
        {x_pos: 850, width: 100},
        {x_pos: 1450, width: 100},
        {x_pos: 1800, width: 100}
    ];
    
    //Mountains
    mountains = [
        {x_pos: 50, y_pos:432, size: 100},
        {x_pos: 600, y_pos:432, size: 100},
        {x_pos: 1000, y_pos:432, size: 100},
        {x_pos: 1600, y_pos:432, size: 100}
    ];
    
    //Clouds
    clouds = [
        {x_pos: 200, y_pos:200, size: 50},
        {x_pos: 600, y_pos:100, size: 50},
        {x_pos: 900, y_pos:200, size: 50},
        {x_pos: 1400, y_pos:200, size: 50}
    ];
}

function draw()
{
	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground

    push();
    translate(scrollPos,0)
    
	// Draw clouds.
    drawClouds();
	// Draw mountains.
    drawMountains();

	// Draw trees.
    drawTrees();

	// Draw canyons.
    for(var i = 0; i < canyons.length; i++){
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
    }

	// Draw collectable items.
    for(var i = 0; i < collectables.length; i++){
        if(collectables[i].isFound == false){
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }
    
    pop();

	// Draw game character.
	
	drawGameChar();

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}
    

	// Logic to make the game character rise and fall.
    if(isFalling){
        gameChar_y += 4; //how fast the character falls
        if(gameChar_y >= floorPos_y){
            isFalling = false;
        }
    }

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
    
    
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
    
    if(keyCode == 37){
        isLeft = true;
    }else if(keyCode == 39){
        isRight = true;
    }
    if(keyCode == 32 && isFalling == false){
        gameChar_y = gameChar_y-100;
        isFalling = true;
    }
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    if(keyCode == 37){
        isLeft = false;
    }else if(keyCode == 39){
        isRight = false;
    }
}



// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.
 
function drawGameChar()
{
	//the game character
	if(isLeft && isFalling)
	{
        // add your jumping-left code
        //body
        fill(100, 100, 100);
        rect(gameChar_x-10, gameChar_y-48, 20, 40);

        //feet
        fill(0);
        rect(gameChar_x-16, gameChar_y-18, 12, 12);
        rect(gameChar_x-2, gameChar_y-18, 12, 12);

        //head
        fill(180, 100, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20, 28);

        //arms
        fill(0);
        rect(gameChar_x-8, gameChar_y-52, 13, 13);
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        //body
        fill(100, 100, 100);
        rect(gameChar_x-10, gameChar_y-48, 20, 40);

        //feet
        fill(0);
        rect(gameChar_x-10, gameChar_y-18, 12, 12);
        rect(gameChar_x+4, gameChar_y-18, 12, 12);

        //head
        fill(180, 100, 100);

        ellipse(gameChar_x, gameChar_y - 60, 20, 28);
        //arms
        fill(0);
        rect(gameChar_x-5, gameChar_y-52, 13, 13);


	}
	else if(isLeft)
	{
		// add your walking left code
        //body
        fill(100, 100, 100);
        rect(gameChar_x-10, gameChar_y-48, 20, 40);

        //feet
        fill(0);
        rect(gameChar_x-16, gameChar_y-8, 12, 12);
        rect(gameChar_x-2, gameChar_y-8, 12, 12);

        //arms
        fill(0);
        rect(gameChar_x-8, gameChar_y-46, 13, 13);


         //head
        fill(180, 100, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20, 28);
	}
	else if(isRight)
	{
		// add your walking right code
        //body
        fill(100, 100, 100);
        rect(gameChar_x-10, gameChar_y-48, 20, 40);

        //feet
        fill(0);
        rect(gameChar_x-10, gameChar_y-8, 12, 12);
        rect(gameChar_x+4, gameChar_y-8, 12, 12);

        //arms
        fill(0);
        rect(gameChar_x-5, gameChar_y-46, 13, 13);


         //head
        fill(180, 100, 100);
        ellipse(gameChar_x, gameChar_y - 60, 20, 28);

	}
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        fill(100, 100, 100);
        rect(gameChar_x-13, gameChar_y-48, 26, 40);

        //feet
        fill(0);
        rect(gameChar_x-16, gameChar_y-18, 12, 12);
        rect(gameChar_x+4, gameChar_y-18, 12, 12);

        //arms
        fill(0);
        rect(gameChar_x+8, gameChar_y-52, 13, 13);
        rect(gameChar_x-21, gameChar_y-52, 13, 13);

         //head
        fill(180, 100, 100);
        ellipse(gameChar_x, gameChar_y - 60, 28);


	}
	else
	{
		// add your standing front facing code
    
        //body
        fill(100, 100, 100);
        rect(gameChar_x-13, gameChar_y-48, 26, 40);

        //feet
        fill(0);
        rect(gameChar_x-16, gameChar_y-8, 12, 12);
        rect(gameChar_x+4, gameChar_y-8, 12, 12);

        //arms
        fill(0);
        rect(gameChar_x+8, gameChar_y-46, 13, 13);
        rect(gameChar_x-21, gameChar_y-46, 13, 13);

         //head
        fill(180, 100, 100);
        ellipse(gameChar_x, gameChar_y - 60, 28);

	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds(){
  for(var i = 0; i < clouds.length; i++){
        fill(255);
        ellipse(clouds[i].x_pos, 100, clouds[i].size*1.2, clouds[i].size*0.8);
        ellipse(clouds[i].x_pos +(clouds[i].size), 100, clouds[i].size*1.4, clouds[i].size*1.2);
        ellipse(clouds[i].x_pos +(clouds[i].size*2), 100, clouds[i].size*1.8, clouds[i].size*1.8);
        ellipse(clouds[i].x_pos +(clouds[i].size*3), 100, clouds[i].size*1.4, clouds[i].size*1.2);
        ellipse(clouds[i].x_pos +(clouds[i].size*4), 100, clouds[i].size*1.2, clouds[i].size*0.8);
    }
}
// Function to draw mountains objects.
function drawMountains(){
    for(var i = 0; i < mountains.length; i++){
        fill(50);
        strokeWeight(4)

        triangle(mountains[i].x_pos, 432,
                mountains[i].x_pos+mountains[i].size, 400-(mountains[i].size*2),
                mountains[i].x_pos+(mountains[i].size*2), 432);
        triangle(mountains[i].x_pos+mountains[i].size, 432,
                mountains[i].x_pos+mountains[i].size*2, 400-(mountains[i].size*2),
                mountains[i].x_pos+(mountains[i].size*3), 432);
        triangle(mountains[i].x_pos+(mountains[i].size*2), 432,
                mountains[i].x_pos+mountains[i].size+(mountains[i].size*2), 400-(mountains[i].size*2),
                mountains[i].x_pos+(mountains[i].size*4), 432);
    }
}

// Function to draw trees objects.
function drawTrees(){
     for(var i = 0; i < trees_x.length; i++){
        fill(165, 100, 0);
        triangle(trees_x[i], (height/2), trees_x[i]-20, (height/2)+150, trees_x[i]+20, (height/2)+150);
        fill(145, 65, 0);
        triangle(trees_x[i]+2, (height/2), trees_x[i]-18, (height/2)+150, trees_x[i]+22, (height/2)+150);

        fill(0, 100, 10);
        ellipse(trees_x[i], (height/2), 170, 170);
        ellipse(trees_x[i], (height/2)-20, 150, 170);
        ellipse(trees_x[i], (height/2)-40, 130, 150);
        noStroke();
        fill(255);
    }
}


// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(205,133,63);
    rect(t_canyon.x_pos,432,t_canyon.width,144);
    fill(0, 45, 200)
    rect(t_canyon.x_pos,540,t_canyon.width,106);

    noStroke();
    fill(255);
    
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if((dist((t_canyon.x_pos + t_canyon.width/2), 0, gameChar_world_x, 0) <= 40) && (floorPos_y - gameChar_y) <= 5){
        gameChar_y += 10;
        gameChar_x = (t_canyon.x_pos + t_canyon.width/2);
        isPlummeting = true;
        isLeft = false;
        isRight = false;
    }
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    fill(255,200,0);

    beginShape();
    vertex(t_collectable.x_pos, t_collectable.y_pos);
    vertex(t_collectable.x_pos+t_collectable.size, t_collectable.y_pos-(t_collectable.size*1.8));
    vertex(t_collectable.x_pos, t_collectable.y_pos-(t_collectable.size*1.8));
    vertex(t_collectable.x_pos+t_collectable.size, t_collectable.y_pos);
    endShape(CLOSE);

    fill(255)

    fill(145, 65, 0);
    rect(t_collectable.x_pos, t_collectable.y_pos-t_collectable.size-(t_collectable.size/1.2), 
         t_collectable.size, t_collectable.size/6)
    rect(t_collectable.x_pos, t_collectable.y_pos-(t_collectable.size/6), 
         t_collectable.size, t_collectable.size/6)
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20){
            t_collectable.isFound = true;
    }
}
