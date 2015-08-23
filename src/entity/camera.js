var Camera = function() {
	var mod = Entity();


	mod.following;

	mod.update = function() {
		mod.sprite.direction = (Math.PI / 2) + Math.atan2(mod.following.sprite.y - mod.sprite.y, mod.following.sprite.x - mod.sprite.x);
		mod.sprite.speed = Math.sqrt(Math.pow(mod.following.sprite.y - mod.sprite.y, 2) + Math.pow(mod.following.sprite.x - mod.sprite.x, 2)) / 1000;
	};

	mod.destroy = function() {
		mod.sprite.x = 0;
		mod.sprite.y = 0;

		mod.update = function() {};
	};


	return mod;
};