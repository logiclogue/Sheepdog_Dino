// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry


var dinosaur = new Dinosaur();


var input = new Input();
var level = new Level();

var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65,
	m: 77
};

level.generate();

var human = new Human();

humanCollision.addCollision(dinosaurCollision, {
	general: function() {
		human.sprite.direction = (Math.PI + Math.PI / 2) + Math.atan2(dinosaur.sprite.y - human.sprite.y, dinosaur.sprite.x - human.sprite.x);
		human.sprite.speed = 0.07;
		human.sprite.setAnimation("humanWalking", 100);

		setTimeout(function() {
			human.sprite.speed = 0;
			human.sprite.animation.name = "";
			human.sprite.image = "mainSprites_16";
		}, 1000);
	}
});


input.fnc = function(keysdown) {
	if (keysdown[keys.up]) {
		dinosaur.sprite.direction = 0;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.down]) {
		dinosaur.sprite.direction = Math.PI;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.right]) {
		dinosaur.sprite.direction = Math.PI / 2;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.left]) {
		dinosaur.sprite.direction = (Math.PI * 3) / 2;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.up] && keysdown[keys.right]) {
		dinosaur.sprite.direction = Math.PI / 4;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.right] && keysdown[keys.down]) {
		dinosaur.sprite.direction = (Math.PI * 3) / 4;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.down] && keysdown[keys.left]) {
		dinosaur.sprite.direction = (Math.PI * 5) / 4;
		dinosaur.sprite.speed = dinosaur.speed;
	}

	if (keysdown[keys.left] && keysdown[keys.up]) {
		dinosaur.sprite.direction = (Math.PI * 7) / 4;
		dinosaur.sprite.speed = dinosaur.speed;
	}


	if (keysdown[keys.m]) {
		dinosaur.sprite.speed = 0;
	}
};


game.set.method(function() {
	// keys
	input.run();

	// camera
	game.set.offset(Math.round(-dinosaur.sprite.x+gameWidth/2-16), Math.round(-dinosaur.sprite.y+gameHeight/2-16));

	// update dinosaur collision position
	dinosaur.collision.updateXY(dinosaur.sprite.x, dinosaur.sprite.y);
	// update human collision position
	human.collision.updateXY(human.sprite.x, human.sprite.y);


});


game.start();