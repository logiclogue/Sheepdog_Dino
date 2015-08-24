// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry



var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65,
	m: 77
};

<<<<<<< HEAD

input.fnc = function(e) {
	if (e[keys.m]) {
		mainMenu.select();
	} else if (e[keys.up]) {
		mainMenu.up();
	} else if (e[keys.down]) {
		mainMenu.down();
	}
}
=======
game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

var menu = Menu(0, 0, ["play", "credit", "exit"], [function() {
	global.sprites = [];
	var level = new Level(1);
	level.generate();

	game.set.method(function() {
		// keys
		input.run();

		level.update();

		menu.updateXY(-xOffset, -yOffset);

	});
}]);

setTimeout(function() {
	menu.select();
}, 1000);


game.set.method(function() {
	// keys
	input.run();

	//level.update();

	menu.updateXY(-xOffset, -yOffset);

});
>>>>>>> f0c8a5b0051ffa2adc12dfc2ac5c4b07c1571a4d


game.start();