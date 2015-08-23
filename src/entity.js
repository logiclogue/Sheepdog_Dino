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



var Dinosaur = function() {
	var mod = Entity();


	var collision = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 16, 4, dinosaurCollision);
	var animationName = "dinosaurLeft";
	var animationSpeed = 100;
	var leftImage = "mainSprites_8";
	var rightImage = "mainSprites_11";
	var fallingImage = "mainSprites_14";

	mod.speed = 0.05;
	mod.sprite.image = leftImage;
	mod.sprite.setAnimation(animationName, animationSpeed);


	function fall(e) {
		mod.sprite.setAnimation();
		mod.sprite.image = fallingImage;
		mod.sprite.direction = (Math.PI / 2) + Math.atan2(e.y - mod.sprite.y, e.x - mod.sprite.x);
		mod.sprite.speed = 0.1;
		collision.w = 0;
		collision.h = 0;
		mod.controller = function() {};

		setTimeout(function() {
			mod.destroy();
		}, 100);
	}


	// more compact function to move the dinosaur in a particular direction
	function move(direction) {
		if (direction == Math.PI || direction == 0) {
			// just don't execute the other ifs
		}
		else if (direction > Math.PI) {
			animationName = "dinosaurLeft";
		}
		else {
			animationName = "dinosaurRight";
		}

		mod.sprite.direction = direction;
		mod.sprite.speed = mod.speed;
		mod.sprite.setAnimation(animationName, animationSpeed);
	};


	mod.update = function() {
		collision.updateXY(mod.sprite.x+8, mod.sprite.y+17);
	};

	mod.controller = function(keysdown) {
		if (keysdown[keys.up] && keysdown[keys.right]) {
			move(Math.PI / 4);
		}
		else if (keysdown[keys.right] && keysdown[keys.down]) {
			move((Math.PI * 3) / 4);
		}
		else if (keysdown[keys.down] && keysdown[keys.left]) {
			move((Math.PI * 5) / 4);
		}
		else if (keysdown[keys.left] && keysdown[keys.up]) {
			move((Math.PI * 7) / 4);
		}
		else if (keysdown[keys.up]) {
			move(0);
		}
		else if (keysdown[keys.down]) {
			move(Math.PI);
		}
		else if (keysdown[keys.right]) {
			move(Math.PI / 2);
		}
		else if (keysdown[keys.left]) {
			move((Math.PI * 3) / 2);
		}
		else {
			mod.sprite.speed = 0;
			mod.sprite.setAnimation("");

			if (animationName == "dinosaurLeft") {
				mod.sprite.image = leftImage;
			} else {
				mod.sprite.image = rightImage;
			}
		}
	};

	mod.destroy = function() {
		mod.sprite.destroy();
	};


	dinosaurCollision.addCollision(wallCollision, {
		general: function() {
			mod.sprite.x = mod.sprite.pX;
			mod.sprite.y = mod.sprite.pY;
		}
	});

	dinosaurCollision.addCollision(holeCollision, {
		all: function(e) {
			fall(e);
		}
	});


	return mod;
};



var Human = function(x, y) {
	var mod = Entity();


	var wallGroup = new game.CollisionGroup();
	var wallTouch = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 7, 9, wallGroup);

	var stillImage = "mainSprites_16";
	var fallingImage = "mainSprites_19";

	mod.speed = 0.07;

	mod.sprite.image = "mainSprites_16";
	mod.sprite.x = x || 0;
	mod.sprite.y = y || 0;

	mod.sprite.order.front();


	function fall() {
		mod.sprite.animation.name = "";
		mod.sprite.image = fallingImage;

		setTimeout(function() {
			mod.destroy();
		}, 200);
	}

	function sensor() {
		if (Math.sqrt(Math.pow(dinosaur.sprite.x - mod.sprite.x, 2) + Math.pow(dinosaur.sprite.y - mod.sprite.y, 2)) < 64) {
			mod.walking((Math.PI + Math.PI / 2) + Math.atan2(dinosaur.sprite.y - mod.sprite.y, dinosaur.sprite.x - mod.sprite.x));

			setTimeout(function() {
				mod.stopped();
			}, 1000);
		}
	}


	mod.walking = function(direction) {
		mod.sprite.speed = mod.speed;
		mod.sprite.setAnimation("humanWalking", 50);
		mod.sprite.direction = direction;
	};

	mod.stopped = function() {
		mod.sprite.speed = 0;
		mod.sprite.animation.name = "";
		mod.sprite.image = stillImage;
	};

	mod.update = function() {
		//collision.updateXY(mod.sprite.x-16, mod.sprite.y-16);
		wallTouch.updateXY(mod.sprite.x+13, mod.sprite.y+19);

		sensor();
	};

	mod.destroy = function() {
		wallGroup.destroy();
		mod.sprite.destroy();
	};


	wallGroup.addCollision(wallCollision, {
		general: function() {
			mod.sprite.x = mod.sprite.pX;
			mod.sprite.y = mod.sprite.pY;
		}
	});

	wallGroup.addCollision(holeCollision, {
		all: function(e) {
			mod.sprite.setAnimation();
			mod.sprite.image = fallingImage;
			mod.sprite.direction = (Math.PI / 2) + Math.atan2(e.y - mod.sprite.y, e.x - mod.sprite.x);
			mod.sprite.speed = 0.1;
			mod.controller = function() {};

			setTimeout(function() {
				mod.destroy();
			}, 100);
		}
	});


	return mod;
};



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



var Wall = function(x, y) {
	var mod = Entity();


	mod.sprite.x = x;
	mod.sprite.y = y;
	mod.sprite.still = true;
	mod.sprite.image = "mainSprites_1";

	new game.CollisionBox(x, y, 32, 32, wallCollision);


	return mod;
};



var Hole = function(x, y) {
	var mod = Entity();

	mod.sprite.x = x;
	mod.sprite.y = y;
	mod.sprite.still = true;
	mod.sprite.image = "mainSprites_3";

	new game.CollisionBox(x, y, 32, 32, holeCollision);


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
