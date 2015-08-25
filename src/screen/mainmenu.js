var MainMenu = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");
	game.set.offset(0, 0);

	var logo = new game.Sprite();
	logo.x = 100;
	logo.y = 0;
	logo.image = "logo";

	Text(" W  or ARROW", 112, 64);
	Text("ASD     KEYS", 112, 72);
	Text("R/restart", 88, 88);
	Text("SPACE/ENTER/select", 88, 96);

	var mod = Menu(120, 128, ["new game", "enter code", "about"], [
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