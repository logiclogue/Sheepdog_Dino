var Human = function(x, y) {
	var mod = Entity();


	var wallGroup = new game.CollisionGroup();
	var wallTouch = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 7, 3, wallGroup);
	var stillImage = "mainSprites_16";
	var fallingImage = "mainSprites_19";
	var isRunning = false;

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

	// sensing the dinosaur
	function sensor() {
		if (Math.sqrt(Math.pow(dinosaur.sprite.x - mod.sprite.x, 2) + Math.pow(dinosaur.sprite.y - mod.sprite.y, 2)) < 48) {
			mod.running((Math.PI + Math.PI / 2) + Math.atan2(dinosaur.sprite.y - mod.sprite.y, dinosaur.sprite.x - mod.sprite.x));

			// if not running then run
			if (!isRunning) {
				isRunning = true;

				setTimeout(function() {
					mod.stopped();
					isRunning = false;
				}, 500);
			}
		}
	}


	mod.running = function(direction) {
		mod.sprite.speed = mod.speed;
		mod.sprite.setAnimation("humanRunning", 50);
		mod.sprite.direction = direction;
	};

	mod.stopped = function() {
		mod.sprite.speed = 0;
		mod.sprite.animation.name = "";
		mod.sprite.image = stillImage;
	};

	mod.update = function() {
		wallTouch.updateXY(mod.sprite.x+13, mod.sprite.y+26);
		sensor();
	};

	mod.destroy = function() {
		wallGroup.destroy();
		mod.sprite.destroy();
	};


	// colliding with a wall
	wallGroup.addCollision(wallCollision, {
		left: function() {
			mod.sprite.x = mod.sprite.pX;
			wallTouch.x = wallTouch.pX;
		},
		right: function() {
			mod.sprite.x = mod.sprite.pX;
			wallTouch.x = wallTouch.pX;
		},
		top: function() {
			mod.sprite.y = mod.sprite.pY;
			wallTouch.y = wallTouch.pY;
		},
		bottom: function() {
			mod.sprite.y = mod.sprite.pY;
			wallTouch.y = wallTouch.pY;
		}
	});

	// falling down hole
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

	// eaten by dinosaur
	wallGroup.addCollision(dinosaurCollision, {
		general: function() {
			mod.destroy();
		}
	});

	// enters goal
	wallGroup.addCollision(goalCollision, {
		all: function(e) {
			mod.sprite.setAnimation();
			mod.sprite.image = stillImage;
			mod.sprite.direction = (Math.PI / 2) + Math.atan2(e.y - mod.sprite.y, e.x - mod.sprite.x);
			mod.sprite.speed = 0.02;
			mod.controller = function() {};

			setTimeout(function() {
				mod.destroy();
			}, 1000);
		}
	});


	return mod;
};