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


	mod.speed = 0.05;
	mod.sprite.image = "mainSprites_8";

	var collision = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 28, 23, dinosaurCollision);


	mod.update = function() {
		collision.updateXY(mod.sprite.x+2, mod.sprite.y+3);
	};


	dinosaurCollision.addCollision(wallCollision, {
		general: function() {
			mod.sprite.x = mod.sprite.pX;
			mod.sprite.y = mod.sprite.pY;
		}
	});


	return mod;
};



var Human = function(x, y) {
	var mod = Entity();


	mod.speed = 0.07;

	mod.sprite.image = "mainSprites_16";
	mod.sprite.x = x || 0;
	mod.sprite.y = y || 0;

	mod.sprite.order.front();

	var sensor = new game.CollisionGroup();
	var collision = new game.CollisionBox(mod.sprite.x-32, mod.sprite.y-32, 64, 64, sensor);

	var wallGroup = new game.CollisionGroup();
	var wallTouch = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 17, 24, wallGroup);


	mod.walking = function(direction) {
		mod.sprite.speed = mod.speed;
		mod.sprite.setAnimation("humanWalking", 50);
		mod.sprite.direction = direction;
	};

	mod.stopped = function() {
		mod.sprite.speed = 0;
		mod.sprite.animation.name = "";
		mod.sprite.image = "mainSprites_16";
	};

	mod.update = function() {
		collision.updateXY(mod.sprite.x-16, mod.sprite.y-16);
		wallTouch.updateXY(mod.sprite.x+8, mod.sprite.y+4);
	};


	sensor.addCollision(dinosaurCollision, {
		general: function() {
			mod.walking((Math.PI + Math.PI / 2) + Math.atan2(dinosaur.sprite.y - mod.sprite.y, dinosaur.sprite.x - mod.sprite.x));

			setTimeout(function() {
				mod.stopped();
			}, 1000);
		}
	});

	wallGroup.addCollision(wallCollision, {
		general: function() {
			mod.sprite.x = mod.sprite.pX;
			mod.sprite.y = mod.sprite.pY;
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
