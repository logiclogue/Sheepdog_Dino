var About = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

	var mod = Menu(140, 100, ["back"], [
		function() {
			global.sprites = [];

			mod.destroy();
			mod = {};
			input.reset();

			MainMenu();
		}
	]);


	return mod;
};