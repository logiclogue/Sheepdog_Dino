var CompleteScreen = function() {
	Text("LEVEL COMPLETE!", -xOffset+132, -yOffset+64);

	var mod = Menu(-xOffset+140, -yOffset+128, ["next level", "main menu"], [
		function() {
			destroy();

			level = new Level(1);
			level.generate();
		},
		function() {
			destroy();

			MainMenu();
		}
	]);

	function destroy() {
		global.sprites = [];
		mod.destroy();
		mod = {};
		input.reset();
	};


	return mod;
};