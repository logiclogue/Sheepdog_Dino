var Menu = function(x, y, strings, theFunctions) {
	var mod = {};


	var text = [];
	var gapDistance = 16;
	var selected = 0;
	var totalOptions = strings.length;

	input.reset();

	function draw() {
		for (var i = 0; i < totalOptions; i++) {
			var usingText = strings[i];
			if (i == selected) {
				usingText = strings[i].toUpperCase();
			}

			if (text[i] !== undefined) {
				text[i].destroy();
			}

			text[i] = Text(usingText, x, y+i*gapDistance);
		}
	}

	draw();


	mod.up = function() {
		// if selecting the bottom option
		if (selected == 0) {
			selected = totalOptions - 1;
		} else {
			selected--;
		}

		draw();
	};

	mod.down = function() {
		// if selecting the top option
		if (selected + 1 == totalOptions) {
			selected = 0;
		} else {
			selected++;
		}

		draw();
	};

	mod.select = function() {
		if (theFunctions[selected] !== undefined) {
			theFunctions[selected]();
		}
	};

	mod.updateXY = function(x, y) {
		for (var i = 0; i < text.length; i++) {
			text[i].updateXY(x, y+i*gapDistance);
		}
	};

	mod.destroy = function() {
		for (var i = 0; i < totalOptions; i++) {
			text[i].destroy();
		}

		text = [];
		theFunctions = [];
		mod = {};
	};


	input.onDown[input.keys.up] = function() {
		mod.up();
	};

	input.onDown[input.keys.down] = function() {
		mod.down();
	};

	input.onDown[input.keys.m] = function() {
		mod.select();
	};

	game.set.method(function() {
		// keys
		input.run();

	});


	return mod;
};