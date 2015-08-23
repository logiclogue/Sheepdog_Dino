var Level = function() {

	function imgToData(url, callback) {
		var canvas, ctx, img;
		
		canvas = document.createElement("canvas");

		img = new Image();
		img.src = url;
		
		img.addEventListener("load", function() {
			canvas.width = img.width;
			canvas.height = img.height;

			ctx = canvas.getContext("2d");

			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			callback(ctx.getImageData(0, 0, canvas.width, canvas.height), img.width, img.height);
		});
	}

	function drawTile(x, y) {
		var tile = new game.Sprite();
		tile.image = "mainSprites_0";
		tile.still = true;
		tile.x = x*32;
		tile.y = y*32;
		tile.order.back();
	}

	this.generate = function() {

		imgToData("res/level_1.png", function(map, width, height) {
			for (var i = 0; i < map.data.length; i += 4) {
				var index = i / 4;
				var y = Math.floor(index / width);
				var x = index - y * width;

				var id = rgbToHex(map.data[i], map.data[i+1], map.data[i+2])

				switch(id) {
					// dinosaur
					case "00ff00":
						drawTile(x, y);
						dinosaur.sprite.x = camera.sprite.x = x*32;
						dinosaur.sprite.y = camera.sprite.y = y*32;
						break;
					// hole
					case "000000":
						Hole(x*32, y*32).sprite.order.back();
						break;
					// wall facing
					case "ff0000":
						Wall(x*32, y*32, 1).sprite.order.back();
						break;
					case "ee0000":
						Wall(x*32, y*32, 2).sprite.order.back();
						break;
					// human
					case "ffff00":
						drawTile(x, y);
						Human(x*32, y*32);
						break;
					case "ff00ff":
						Goal(x*32, y*32).sprite.order.back();
						break;
					// floor tile
					default:
						drawTile(x, y);
						break;
				}
			}

			dinosaur.sprite.order.front();
		});

	}

}