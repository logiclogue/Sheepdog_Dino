var Text = function(text, x, y) {
	var mod = {};


	x = x || 0;
	y = y || 0;

	var letter = [];
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/.abcdefghijklmnopqrstuvwxyz"


	function drawString(text) {
		var length;

		if (text.length > letter.length) {
			length = text.length;
		} else {
			length = letter.length
		}

		for (var i = 0; i < length; i++) {
			var index;

			if (text.substring(i, i+1) != "") {
				index = alphabet.indexOf(text.substring(i, i+1));
			} else {
				index = -1;
			}

			if (letter[i] !== undefined) {
				letter[i].visible = false;
			} else {
				letter[i] = game.Sprite();
			}

			if (index != -1) {
				letter[i].visible = true;
				letter[i].image = "font_" + index;
				letter[i].x = x + i * 8;
				letter[i].y = y;
				letter[i].still = true;
			}
		}
	};

	drawString(text);

	mod.updateXY = function(x, y) {
		for (var i = 0; i < letter.length; i++) {
			if (letter[i] !== undefined) {
				letter[i].x = x + i * 8;
				letter[i].y = y;
			}
		}
	};

	mod.updateText = function(text) {
		drawString(text);
	};

	mod.destroy = function() {
		for (var i = 0; i < text.length; i++) {
			if (letter[i] !== undefined) {
				letter[i].destroy();
			}
		}
	};


	return mod;
};