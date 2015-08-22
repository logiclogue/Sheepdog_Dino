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
		human.sprite.direction = Math.PI;
		human.sprite.speed = 0.05;
	}
});

input.fnc = function(keysdown) {
	if (keysdown[keys.up]) {
		dinosaur.sprite.direction = 0;
		dinosaur.sprite.speed = 0.01;
	}

	if (keysdown[keys.down]) {
		dinosaur.sprite.direction = Math.PI;
		dinosaur.sprite.speed = 0.01;
	}

	if (keysdown[keys.right]) {
		dinosaur.sprite.direction = Math.PI / 2;
		dinosaur.sprite.speed = 0.01;
	}

	if (keysdown[keys.left]) {
		dinosaur.sprite.direction = (Math.PI * 3) / 2;
	}

	if (keysdown[keys.m]) {
		game.set.clear();
	}
};


game.set.method(function() {
	// keys
	input.run();

	// camera
	game.set.offset(Math.round(-dinosaur.sprite.x+gameWidth/2-16), Math.round(-dinosaur.sprite.y+gameHeight/2-16));

	// update dinosaur collision position
	dinosaur.collision.updateXY(dinosaur.sprite.x, dinosaur.sprite.y);


});


game.start();