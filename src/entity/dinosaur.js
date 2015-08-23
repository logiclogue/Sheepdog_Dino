var Dinosaur = function() {
	var mod = Entity();


	var collision = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 6, 3, dinosaurCollision);
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
		}, 200);
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
		collision.updateXY(mod.sprite.x+13, mod.sprite.y+18);
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