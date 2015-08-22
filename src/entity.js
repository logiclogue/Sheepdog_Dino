var Entity = function() {
	var mod = {};

	mod.sprite = new game.Sprite();
	mod.sprite.order.front();

	return mod;
};


var Dinosaur = function() {
	var mod = Entity();

	mod.speed = 0.05;
	mod.sprite.image = "mainSprites_8";
	mod.collision = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 32, 32, dinosaurCollision);

	return mod;
};


var Human = function() {
	var mod = Entity();

	mod.sprite.image = "mainSprites_16";
	mod.sprite.x = 64;
	mod.sprite.y = 64;

	mod.sprite.order.front();

	mod.collision = new game.CollisionBox(mod.sprite.x, mod.sprite.y, 32, 32, humanCollision);

	mod.moving = function() {

	};

	return mod;
};