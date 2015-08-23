var Goal = function(x, y) {
	var mod = Entity();


	mod.sprite.x = x;
	mod.sprite.y = y;
	mod.sprite.still = true;
	mod.sprite.setAnimation("goal", 100);

	new game.CollisionBox(x, y, 32, 32, goalCollision);


	return mod;
};