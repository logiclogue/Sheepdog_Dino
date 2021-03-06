	var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;
var xOffset = yOffset = 0;

game.set.canvas("gameCanvas", gameWidth, gameHeight);
game.load.spriteSheet("mainSprites", "res/sprite/sprite_sheet.png", 8, 8);
game.load.spriteSheet("font", "res/sprite/font.png", 8, 8);
game.load.sprite("logo", "res/sprite/logo.png");
game.animation.add("humanRunning", ["mainSprites_17", "mainSprites_16", "mainSprites_18"]);
game.animation.add("dinosaurLeft", ["mainSprites_9", "mainSprites_8", "mainSprites_10", "mainSprites_8"]);
game.animation.add("dinosaurRight", ["mainSprites_12", "mainSprites_11", "mainSprites_13", "mainSprites_11"]);
game.animation.add("goal", ["mainSprites_4", "mainSprites_5", "mainSprites_6", "mainSprites_7"]);


var dinosaurCollision = game.CollisionGroup();
var wallCollision = game.CollisionGroup();
var holeCollision = game.CollisionGroup();
var goalCollision = game.CollisionGroup();
var ghostCollision = game.CollisionGroup();

var dinosaur,
	camera,
	level;


// central align
document.getElementById("gameCanvas").style.paddingLeft = ((window.innerWidth - document.getElementById("gameCanvas").offsetWidth) / 2) + "px";