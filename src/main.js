// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry
var input = new Input();
var level = new Level();

var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65,
	m: 77
};

level.generate();

new Human();

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
	// keys
	input.run();

	// camera
	game.set.offset(-testRect.x+gameWidth/2-testRect.width/2, -testRect.y+gameHeight/2-testRect.height/2);

});


game.start();