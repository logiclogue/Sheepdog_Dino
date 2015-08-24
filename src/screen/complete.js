var CompleteScreen = function() {
	Text("LEVEL COMPLETE", -xOffset+104, -yOffset+64);

	dinosaur.stop();

	var mod = Menu(-xOffset+120, -yOffset+128, ["next", "main menu"], [
		function() {
			destroy();
			entities.destroy();

			PreScreen(level.num+1);
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