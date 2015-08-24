var MainMenu = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

	var mod = Menu(0, 0, ["play", "about"], [function() {
		global.sprites = [];

		var level = new Level(1);
		level.generate();

		mod.destroy();
		mod = {};
		input.reset();
	}]);

	input.onDown[input.keys.up] = function() {
		mod.up();
	};

	input.onDown[input.keys.down] = function() {
		mod.down();
	};

	input.onDown[input.keys.m] = function() {
		mod.select();
	};

	game.set.method(function() {
		// keys
		input.run();

	});


	return mod;
};