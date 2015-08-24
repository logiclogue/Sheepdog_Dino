var PreScreen = function(num) {
	Text("LEVEL "+num, -xOffset+104, -yOffset+64);

	dinosaur.sprite.speed = 0;

	var mod = Menu(-xOffset+120, -yOffset+128, ["start"], [
		function() {
			destroy();
			entities.destroy();

			level = new Level(num);
			level.generate();
		}
	]);

	game.set.method(function() {
		// keys
		input.run();

		camera.update();

	});

	function destroy() {
		global.sprites = [];
		mod.destroy();
		mod = {};
		input.reset();
	};


	return mod;
};