var input = (function () {
	var mod = {};


	var keysdown = [];

	mod.enable = true;
	mod.keys = {
		up: 87,
		down: 83,
		right: 68,
		left: 65,
		m: 77,
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57
		
	};
	mod.onDown = [];

	mod.fnc = function() {};
	mod.run = function() {
		if (mod.enable) {
			mod.fnc(keysdown);
		}
	};

	mod.reset = function() {
		mod.onDown = [];
		mod.fnc = function() {};
		mod.run = function() {
			if (mod.enable) {
				mod.fnc(keysdown);
			}
		}
		keysdown = [];
	};


	document.addEventListener("keydown", function(e) {
		if (mod.enable) {
			keysdown[e.keyCode] = true;

			if (mod.onDown[e.keyCode] !== undefined) {
				mod.onDown[e.keyCode]();
			}
		}
	});

	document.addEventListener("keyup", function(e) {
		keysdown[e.keyCode] = false;
	});


	return mod;
})();