var MainMenu = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");
	game.set.offset(0, 0);

	Text(" w ", 132, 64);
	Text("asd", 132, 72);
	Text("P/pause", 132, 88);
	Text("M/select", 132, 96);

	var mod = Menu(140, 128, ["play", "about"], [
		function() {
			destroy();
			PreScreen(1);
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