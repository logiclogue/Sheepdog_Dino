var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;

game.set.canvas("gameCanvas", gameWidth, gameHeight);
game.load.spriteSheet("mainSprites", "res/sprite_sheet.png", 8, 8);
game.animation.add("humanWalking", ["mainSprites_17", "mainSprites_16", "mainSprites_18"]);


var dinosaurCollision = game.CollisionGroup();