var Hole = function(x, y) {
	var mod = Entity();


	mod.sprite.x = x;
	mod.sprite.y = y;
	mod.sprite.still = true;
	mod.sprite.image = "mainSprites_3";

	new game.CollisionBox(x, y, 32, 32, holeCollision);


	return mod;
};