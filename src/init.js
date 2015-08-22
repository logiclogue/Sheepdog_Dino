var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;

game.set.canvas("gameCanvas", gameWidth, gameHeight);
game.load.spriteSheet("mainSprites", "res/sprite_sheet.png", 8, 8);
game.animation.add("humanWalking", ["mainSprites_17", "mainSprites_16", "mainSprites_18"]);
game.animation.add("dinosaurLeft", ["mainSprites_9", "mainSprites_8", "mainSprites_10", "mainSprites_8"]);
game.animation.add("dinosaurRight", ["mainSprites_12", "mainSprites_11", "mainSprites_13", "mainSprites_11"]);


var dinosaurCollision = game.CollisionGroup();
var wallCollision = game.CollisionGroup();