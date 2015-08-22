var Input = function () {

	var keysdown = [];


	this.fnc = function() {};
	this.run = function() {
		this.fnc(keysdown);
	}


	document.addEventListener("keydown", function(e) {
		keysdown[e.keyCode] = true;
	});

	document.addEventListener("keyup", function(e) {
		keysdown[e.keyCode] = false;
	});

};