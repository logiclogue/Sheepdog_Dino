var PreScreen = function(num) {
	game.set.offset(0, 0);

	var levelText = "LEVEL "+num;

	Text(levelText, (320-levelText.length*8)/2, 64);
	Text(msg[num-1], (320-msg[num-1].length*8)/2, 80);

	var mod = Menu(140, 128, ["start"], [
		function() {
			destroy();
			entities.destroy();

			level = new Level(num);
			level.generate();
		}
	]);

	game.set.method(function() {
		// keys
		input.run();
	});

	function destroy() {
		global.sprites = [];
		mod.destroy();
		mod = {};
		input.reset();
	};


	return mod;
};