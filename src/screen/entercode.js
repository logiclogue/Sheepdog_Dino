var EnterCode = function() {
	game.Rect(-xOffset, -yOffset, gameWidth, gameHeight, "#000000");
	game.set.offset(0, 0);

	var codeText = Text("/", 132, 64);
	var incorrectPasscode = Text("  enter passcode  ", 88, 80);
	var cursorOn = true;
	var passcode = "";

	var mod = Menu(124, 128, ["main menu"], [
		function() {
			destroy();
			MainMenu();
		},
	]);

	var cursorUpdate = setInterval(function() {
		if (cursorOn) {
			codeText.updateText(passcode+" ");
			cursorOn = false;
		} else {
			codeText.updateText(passcode+"/");
			cursorOn = true;
		}

		// get rid of incorrect passcode message
		if (passcode.length != 0) {
			incorrectPasscode.updateText("");
		}

		// passcode fully entered
		if (passcode.length > 5) {
			passcode = passcode.substring(0, 6);

			for (var i = 0; i < 20; i++) {
				if (passcode == levelCode(i)) {
					destroy();
					PreScreen(i);
				}
			}

			incorrectPasscode.updateText("incorrect passcode");
			passcode = "";

		}
	}, 300);


	// inefficient, I know :/
	input.onDown[input.keys[0]] = function() {
		passcode += "0";
	}
	input.onDown[input.keys[1]] = function() {
		passcode += "1";
	}
	input.onDown[input.keys[2]] = function() {
		passcode += "2";
	}
	input.onDown[input.keys[3]] = function() {
		passcode += "3";
	}
	input.onDown[input.keys[4]] = function() {
		passcode += "4";
	}
	input.onDown[input.keys[5]] = function() {
		passcode += "5";
	}
	input.onDown[input.keys[6]] = function() {
		passcode += "6";
	}
	input.onDown[input.keys[7]] = function() {
		passcode += "7";
	}
	input.onDown[input.keys[8]] = function() {
		passcode += "8";
	}
	input.onDown[input.keys[9]] = function() {
		passcode += "9";
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