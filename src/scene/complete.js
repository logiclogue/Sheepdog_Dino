var CompleteScreen = function() {
	Text("LEVEL COMPLETE", -xOffset+104, -yOffset+64);

	dinosaur.sprite.speed = 0;

	var mod = Menu(-xOffset+120, -yOffset+128, ["next level", "main menu"], [
		function() {
			var levelnum = level.num;
			destroy();

			entities.destroy();

			level = new Level(levelnum+1);
			level.generate();
		},
		function() {
			destroy();

			MainMenu();
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