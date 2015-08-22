var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;

game.set.canvas("gameCanvas", gameWidth, gameHeight);

game.load.spriteSheet("mainSheet", "res/sprite_sheet.png", 16, 16);

var testRect = new game.Rect(0, 0, 32, 32, "#000000");