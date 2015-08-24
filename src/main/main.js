// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry


var level = new Level(1);

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


input.fnc = function(e) {
	dinosaur.controller(e);
};

dinosaur.sprite.order.front();

//game.Rect(-100, -100, 1000, 1000, "#000000");
var menu = Menu(0, 0, ["play", "credit", "exit"], [function() {
	console.log("you selected play!");
}]);

setTimeout(function() {
	menu.select();
}, 1000);


game.set.method(function() {
	// keys
	input.run();

	// update entities
	entities.update();

	// camera
	xOffset = Math.round(-camera.sprite.x+gameWidth/2-16);
	yOffset = Math.round(-camera.sprite.y+gameHeight/2-16)
	game.set.offset(xOffset, yOffset);

	menu.updateXY(-xOffset, -yOffset);

});


game.start();