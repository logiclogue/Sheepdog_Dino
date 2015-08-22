var Level = function() {

	this.generate = function() {

		for (var x = -10; x < 10; x++) {
			for (var y = -10; y < 10; y++) {
				var tile = new game.Sprite();
				tile.x = x*32;
				tile.y = y*32;

				if (Math.random() > 0.5) {
					tile.image = "mainSheet_0";
				}

			}
		}

		testRect.order.front();

	}

}