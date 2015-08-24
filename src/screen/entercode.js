var EnterCode = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");
	game.set.offset(0, 0);

	var cursor = Text("/", 132, 64);
	var cursorOn = true;
	var passcode = "";

	var mod = Menu(140, 128, ["main menu"], [
		function() {
			destroy();
			MainMenu();
		},
	]);

	var cursorUpdate = setInterval(function() {
		if (cursorOn) {
			cursor.updateText(" ");
			cursorOn = false;
		} else {
			cursor.updateText("/");
			cursorOn = true;
		}
	}, 300);


	for (var i = 0; i < 10; i++) {
		input.onDown[input.keys[i+48]] = function(e) {
			console.log(i-48);
		}
	}


	function destroy() {
		clearInterval(cursorUpdate);
		global.sprites = [];
		mod.destroy();
		mod = {};
		input.reset();
	};


	return mod;
};