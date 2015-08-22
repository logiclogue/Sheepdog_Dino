var Level = function() {

	this.generate = function() {

		for (var x = -10; x < 10; x++) {
			for (var y = -10; y < 10; y++) {
				
				if (Math.random() > 0.1) {
					if (Math.random() > 0.95) {
						Human(x*32, y*32);
					}

					var tile = new game.Sprite();
					tile.image = "mainSprites_0";
					tile.still = true;
					tile.x = x*32;
					tile.y = y*32;
					tile.order.back();
				} else {
					var wall = Wall(x*32, y*32);
				}

			}
		}

	}

}