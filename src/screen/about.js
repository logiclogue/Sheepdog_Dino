var About = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");

	Text("ABOUT", 140, 34);
	Text("created in 72 hours", 64, 64);
	Text("for ludum dare 33", 64, 74);
	Text("copyright jordan lord 2015", 64, 84);

	var mod = Menu(140, 150, ["back"], [
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