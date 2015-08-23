var Input = function () {
	var that = this;

	var keysdown = [];

	this.enable = true;
	this.keys = {};

	this.fnc = function() {};
	this.run = function() {
		if (that.enable) {
			this.fnc(keysdown);
		}
	};


	document.addEventListener("keydown", function(e) {
		if (that.enable) {
			keysdown[e.keyCode] = true;
		}
	});

	document.addEventListener("keyup", function(e) {
		keysdown[e.keyCode] = false;
	});

};