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

var text = Text("jordan");


input.fnc = function(e) {
	dinosaur.controller(e);
};

dinosaur.sprite.order.front();


game.set.method(function() {
	// keys
	input.run();

	// update entities
	entities.update();

	// camera
	xOffset = Math.round(-camera.sprite.x+gameWidth/2-16);
	yOffset = Math.round(-camera.sprite.y+gameHeight/2-16)
	game.set.offset(xOffset, yOffset);

	text.updateXY(dinosaur.sprite.x-8, dinosaur.sprite.y-16);

});


game.start();