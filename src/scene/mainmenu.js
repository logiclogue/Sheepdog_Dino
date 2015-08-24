var MainMenu = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

	var mod = Menu(0, 0, ["play", "about"], [
		function() {
			destroy();

			var level = new Level(1);
			level.generate();
		},
		function() {
			destroy();

			About();
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