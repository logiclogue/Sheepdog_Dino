var MainMenu = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");
	game.set.offset(0, 0);

	Text(" w ", 132, 64);
	Text("asd", 132, 72);
	Text("R/restart", 132, 88);
	Text("M/select", 132, 96);

	var mod = Menu(140, 128, ["new game", "enter code", "about"], [
		function() {
			destroy();
			PreScreen(1);
		},
		function() {
			destroy();
			EnterCode();
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