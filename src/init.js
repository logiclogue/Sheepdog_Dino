var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;

game.set.canvas("gameCanvas", gameWidth, gameHeight);

game.load.spriteSheet("mainSheet", "res/sprite_sheet.png", 16, 16);

var testRect = new game.Rect(0, 0, 32, 32, "#000000");


for (var x = -10; x < 10; x++) {
	for (var y = -10; y < 10; y++) {
		var tile = new game.Sprite();
		tile.x = x*32;
		tile.y = y*32;

		if (Math.random() > 0.5) {
			tile.image = "mainSheet_0";
		}

	}
}

testRect.order.front();