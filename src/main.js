// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry


var input = new Input();
var level = new Level();

var dinosaur = new Dinosaur();
var camera = new Camera();

camera.following = dinosaur;


var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65,
	m: 77
};


level.generate();


input.fnc = function(keysdown) {
	if (keysdown[keys.up] && keysdown[keys.right]) {
		dinosaur.sprite.direction = Math.PI / 4;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurRight", 100);
	}

	else if (keysdown[keys.right] && keysdown[keys.down]) {
		dinosaur.sprite.direction = (Math.PI * 3) / 4;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurRight", 100);
	}

	else if (keysdown[keys.down] && keysdown[keys.left]) {
		dinosaur.sprite.direction = (Math.PI * 5) / 4;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurLeft", 100);
	}

	else if (keysdown[keys.left] && keysdown[keys.up]) {
		dinosaur.sprite.direction = (Math.PI * 7) / 4;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurLeft", 100);
	}

	else if (keysdown[keys.up]) {
		dinosaur.sprite.direction = 0;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurLeft", 100);
	}

	else if (keysdown[keys.down]) {
		dinosaur.sprite.direction = Math.PI;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurRight", 100);
	}

	else if (keysdown[keys.right]) {
		dinosaur.sprite.direction = Math.PI / 2;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurRight", 100);
	}

	else if (keysdown[keys.left]) {
		dinosaur.sprite.direction = (Math.PI * 3) / 2;
		dinosaur.sprite.speed = dinosaur.speed;
		dinosaur.sprite.setAnimation("dinosaurLeft", 100);
	}

	else {
		dinosaur.sprite.speed = 0;
		dinosaur.sprite.setAnimation("");
	}
};


game.set.method(function() {
	// keys
	input.run();

	// update entities
	entities.update();

	// camera
	game.set.offset(Math.round(-camera.sprite.x+gameWidth/2-16), Math.round(-camera.sprite.y+gameHeight/2-16));

});


game.start();