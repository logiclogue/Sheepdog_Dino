var mainMenu = (function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

	var mod = Menu(0, 0, ["play", "credit", "exit"], [function() {
		global.sprites = [];

		var level = new Level(1);
		level.generate();
	}]);

	game.set.method(function() {
		// keys
		input.run();

	});


	return mod;
})();