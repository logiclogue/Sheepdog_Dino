var Wall = function(x, y, num) {
	var mod = Entity();


	mod.sprite.x = x;
	mod.sprite.y = y;
	mod.sprite.still = true;
	mod.sprite.image = "mainSprites_" + num;

	new game.CollisionBox(x, y, 32, 32, wallCollision);


	return mod;
};