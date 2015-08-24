var About = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

	Text("created in 72 hours", 64, 64);
	Text("for ludum dare 33", 64, 72);
	Text("copyright jordan lord 2015", 64, 80);

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