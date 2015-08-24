var Ghost = function(x, y) {
	var mod = Entity();


	var wallGroup = new game.CollisionGroup();
	var wallTouch = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 32, 32, wallGroup);
	var leftImage = "mainSprites_20";
	var rightImage = "mainSprites_21";
	var lastMove = new Date().getTime();

	mod.sprite.image = leftImage;
	mod.sprite.x = x || 0;
	mod.sprite.y = y || 0;
	mod.sprite.speed = 0.1;
	mod.sprite.direction = Math.PI / 4;


	mod.update = function() {
		wallTouch.updateXY(mod.sprite.x, mod.sprite.y);
	
		if (new Date().getTime() > lastMove + 500) {
			lastMove = new Date().getTime();
			mod.sprite.direction = Math.PI * 2 * Math.random();

			if (mod.sprite.direction > Math.PI) {
				mod.sprite.image = leftImage;
			} else {
				mod.sprite.image = rightImage;
			}
		}
	};


	wallGroup.addCollision(wallCollision, {
		general: function() {
			mod.sprite.x = mod.sprite.pX;
			mod.sprite.y = mod.sprite.pY;
		}
	});


	return mod;
};