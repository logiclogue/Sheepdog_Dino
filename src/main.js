// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry


var game = new ScrixelGame();
var input = new Input();

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


input.fnc = function(keysdown) {
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

	if (keysdown[keys.m]) {
		game.set.clear();
	}
};


game.set.method(function() {
	
	input.run();

});


game.start();