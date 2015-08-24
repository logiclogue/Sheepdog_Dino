var input = (function () {
	var mod = {};


	var keysdown = [];

	mod.enable = true;
	mod.keys = {};

	mod.fnc = function() {};
	mod.run = function() {
		if (mod.enable) {
			mod.fnc(keysdown);
		}
	};


	document.addEventListener("keydown", function(e) {
		if (mod.enable) {
			keysdown[e.keyCode] = true;
		}
	});

	document.addEventListener("keyup", function(e) {
		keysdown[e.keyCode] = false;
	});


	return mod;
})();