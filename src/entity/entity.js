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
