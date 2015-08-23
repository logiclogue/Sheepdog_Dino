var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;
var xOffset, yOffset;

game.set.canvas("gameCanvas", gameWidth, gameHeight);
game.load.spriteSheet("mainSprites", "res/sprite_sheet.png", 8, 8);
game.animation.add("humanRunning", ["mainSprites_17", "mainSprites_16", "mainSprites_18"]);
game.animation.add("dinosaurLeft", ["mainSprites_9", "mainSprites_8", "mainSprites_10", "mainSprites_8"]);
game.animation.add("dinosaurRight", ["mainSprites_12", "mainSprites_11", "mainSprites_13", "mainSprites_11"]);


var dinosaurCollision = game.CollisionGroup();
var wallCollision = game.CollisionGroup();
var holeCollision = game.CollisionGroup();


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}