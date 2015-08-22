var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;

var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65,
	m: 77
};

game.set.canvas("gameCanvas", gameWidth, gameHeight);

var testRect = new game.Rect(0, 0, 32, 32, "#000000");


for (var x = -10; x < 10; x++) {
	for (var y = -10; y < 10; y++) {
		var tile = new game.Rect(x*32, y*32, 32, 32, "#000000");

		if (Math.random() > 0.5) {
			tile.colour = "#FF0000";
		} else {
			tile.colour = "#00FF00";
		}

	}
}

testRect.order.front();