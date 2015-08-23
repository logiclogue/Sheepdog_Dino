var Entity = function() {
	var mod = {};

	entities.list.push(mod);

	mod.sprite = new game.Sprite();
	mod.sprite.order.front();


	mod.update = function() {};

	mod.destroy = function() {
		mod.sprite.destroy();
	};


	return mod;
};



var Text = function(text, x, y) {
	var mod = Entity();


	var letter = [];
	var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,.abcdefghijklmnopqrstuvwxyz"

	for (var i = 0; i < text.length; i++) {
		var index = alphabet.indexOf(text.substring(i, i+1));

		if (index != -1) {
			letter[i] = game.Sprite();
			letter[i].image = "font_" + index;
			letter[i].x = x + i * 8;
			letter[i].still = true;
		}
	}


	return mod;
};



var entities = (function() {
	var mod = {};


	mod.list = [];

	mod.update = function() {
		for (var i = 0; i < mod.list.length; i++) {
			mod.list[i].update();
		}
	};

	mod.destroy = function() {
		for (var i = 0; i < mod.list.length; i++) {
			mod.list[i].destroy();
		}

		mod.list = [];
	};


	return mod;
})();
