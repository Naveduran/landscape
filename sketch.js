var groundHeight;
var mountain1;
var mountain2;
var tree;
var moon;
var sun;
var stars;
var darkness;

function setDarkness(){
    darkness = map(min(mouseX,windowWidth), 0, windowWidth, 0, 100);
}

function draw()
{
    setDarkness();
    noStroke();
    drawSky();
    drawStars();
    drawSun();
    drawMoon();
    drawClouds(mouseX);
    drawGround();
    drawMountains();
    drawTree();

}

// Set canvas and landscape configuration before drawing
function setup()
{
	createCanvas(windowWidth, windowHeight);

	groundHeight = (height / 3) * 2;

	mountain1 = {
		x: windowWidth/2,
		y: groundHeight,
		height: 320,
		width: 230
	};
    
	mountain2 = {
		x: mountain1.x - 80,
		y: groundHeight,
		height: 200,
		width: 130
	};

	tree = {
		x: 150,
		y: groundHeight + 20,
		trunkWidth: 40,
		trunkHeight: 150,
		canopyWidth: 120,
		canopyHeight: 100
	};

	sun = {
		x: 150,
		y: 70,
		diameter: 80,
	};
    
    moon = {
        x: 700,
        y: 100,
    }

    stars = {
        sizeX: 10,
        sizeY: 10,
        radius: 1,
        coordenates: generateRandomCoordenates(50, 0, windowWidth, 0, groundHeight)
    }

    cloud = {
        y: 100,
        size: 50,
    }

	darkness = 0;

}


// Generates random coordinates inside the canvas size
function generateRandomCoordenate(xMin, xMax, yMin, yMax) {
    return {
        x: Math.floor(Math.random() * (xMax - xMin + 1)),
        y: Math.floor(Math.random() * (yMax - yMin + 1)),
        isTitilant: random([true, false])
    }
}

function generateRandomCoordenates(total, xMin, xMax, yMin, yMax) {
  return Array.from( 
      { length: total }, 
      () => generateRandomCoordenate(xMin, xMax, yMin, yMax)
  )
} 

function drawTree () {
    treeDarkness = map(darkness, 0, 100, 25, 0)
	fill('hsla(0, 100%, ' + treeDarkness + '%,1)');
    rect(tree.x-tree.trunkWidth, tree.y-tree.trunkHeight, tree.trunkWidth, tree.trunkHeight);
    
    treeDarkness = map(darkness, 0, 100, 50, 0)
    fill('hsla(120, 61%, ' + treeDarkness + '%,1)');
    ellipse(tree.x-(tree.trunkWidth/2),tree.y-tree.trunkHeight, tree.canopyWidth, tree.canopyHeight);
    ellipse(tree.x-(tree.trunkWidth/2),tree.y-tree.trunkHeight, tree.canopyWidth, tree.canopyHeight);
}

function drawMoon () {
    moonDarkness = map(darkness, 0, 100, 0,0.7);
    fill('rgba(255, 255, 255,' + moonDarkness + ')');    
    ellipse(moon.x, moon.y, 100, 100);
    
    var skyColor = get(0,0)
    fill('rgba('+skyColor[0]+', '+skyColor[1]+', '+skyColor[2]+',' + skyColor[3]+ ')');
    ellipse(moon.x+40, moon.y, 100, 100);
}

// Draw a titilant star in the night sky 
function drawStar(x, y, isTitilant) {

    x = random(x + 2, x -2)
    y = random(y + 2, y -2)
    starDarkness = isTitilant ? random([map(darkness, 0, 100, 0, 0.4)], 0, 0, 0, 0): map(darkness, 0, 100, 0, 0.4)
    fill('rgba(255, 255, 255,' + starDarkness + ')');

    beginShape();
    vertex(
        (x + (stars.sizeX/2) - stars.radius),
        (y + (stars.sizeY/2) )
    );
    vertex(x, y);//top-left
    vertex(
        (x + (stars.sizeX/2) ),
        (y + (stars.sizeY/2) - stars.radius)
    );
    vertex(x + stars.sizeX, y); //top-right
    vertex(
        (x + (stars.sizeX/2) + stars.radius),
        (y + (stars.sizeY/2) )
    );
    vertex(x + stars.sizeX, y + stars.sizeY);//right-down
    vertex(
        (x + (stars.sizeX/2) ),
        (y + (stars.sizeY/2) + stars.radius)
    );
    vertex(x, y + stars.sizeY);//left-down
    endShape(CLOSE);
}

// Draw stars according with the coordinates
function drawStars(){
    for (star of stars.coordenates) {
        drawStar(star.x, star.y, star.isTitilant);
    }
}


// Draw three mountains 
function drawMountains(){
    mountainDarkness = map(darkness, 0, 100, 52, 0)
	fill('hsla(127, 11%, ' + mountainDarkness + '%,1)');
    
	triangle(mountain1.x, mountain1.y,
		mountain1.x + mountain1.width, mountain1.y,
		mountain1.x + (mountain1.width / 2), mountain1.y - mountain1.height);

	triangle(mountain2.x, mountain2.y,
		mountain2.x + mountain2.width, mountain2.y,
		mountain2.x + (mountain2.width / 2), mountain2.y - mountain2.height);
    
    triangle(mountain2.x - 260, mountain2.y,
		mountain2.x - 260 + mountain2.width, mountain2.y,
		mountain2.x - 260 + (mountain2.width / 2), mountain2.y - mountain2.height);
}

// Draw a sun that goes up and down in the sky according to the mouseX coordinate
function drawSun(){
    sun.y = map(mouseX, 0, 800, 60, 480);
    fill(255, 255, 0);
	ellipse(sun.x, sun.y, sun.diameter);
}

function drawGround(){
    groundDarkness = map(darkness, 0, 100, 39, 0)
	fill('hsla(99, 100%, ' + groundDarkness + '%,1)');
	rect(0, groundHeight, width, height - groundHeight);
}

function drawSky(){
    skyDarkness = map(darkness, 0, 100, 63, 8)
    background('hsla(211, 100%, ' + skyDarkness + '%,1)');
}

function drawCloud(x, y, size){

    y = y - size * 0.05
    size = size * 0.95
    small_size = size * 0.7

    ellipse(x - size * 0.98, y, small_size, small_size);
    ellipse(x - size * 0.35, y, size, size);
    ellipse(x + size * 0.35, y, size, size);
    ellipse(x + size * 0.96, y, small_size, small_size);
}

function drawCloudShadow(x, y, size){
    small_size = size * 0.7

    ellipse(x - size * 0.9, cloud.y, small_size, small_size);
    ellipse(x - size * 0.35, cloud.y, size, size);
    ellipse(x + size * 0.35, cloud.y, size, size);
    ellipse(x + size * 0.9, cloud.y, small_size,small_size);
}

function drawClouds (x)
{

    cloudDarkness = map(darkness, 0, 100, 1, 0.3);
    cloudColor = 'rgba(255, 255, 255,' + cloudDarkness + ')'; 
    cloudShadow = 'rgba(255, 255, 255,' + cloudDarkness + ')';   


    noStroke();
    fill(cloudShadow);
    drawCloudShadow(x, cloud.y, cloud.size);
    
    fill(cloudColor);
    drawCloud(x, cloud.y, cloud.size);

}

/* possible TODO:
 * - add birds
 * - make a colorful sunset
*/

