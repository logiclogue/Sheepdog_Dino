// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry


var game = new ScrixelGame();

var gameWidth = 320;
var gameHeight = 240;
var keysdown = [];

var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65
};

game.set.canvas("gameCanvas", gameWidth, gameHeight);


var testRect = new game.Rect(0, 0, 32, 32, "#000000");


document.addEventListener("keydown", function(e) {
	keysdown[e.keyCode] = true;
});

document.addEventListener("keyup", function(e) {
	keysdown[e.keyCode] = false;
});


game.set.method(function() {
	if (keysdown[keys.up]) {
		testRect.direction = 0;
		testRect.speed = 0.01;
	}

	if (keysdown[keys.down]) {
		testRect.direction = Math.PI;
		testRect.speed = 0.01;
	}

	if (keysdown[keys.right]) {
		testRect.direction = Math.PI / 2;
		testRect.speed = 0.01;
	}

	if (keysdown[keys.left]) {
		testRect.direction = (Math.PI * 3) / 2;
	}
});


game.start();