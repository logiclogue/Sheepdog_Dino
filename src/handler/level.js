var Level = function(num) {
	var mod = {};


	var scoreText;
	var codeText;
	var total = 0;

	mod.num = num;
	mod.score = 0;
	mod.failed = false;
	mod.complete = false;

	function imgToData(url, callback) {
		var mapCanvas, mapCtx, mapImg;

		mapCanvas = document.createElement("canvas");

		mapImg = new Image();
		mapImg.src = url;
		
		mapImg.addEventListener("load", function() {
			mapCanvas.width = mapImg.width;
			mapCanvas.height = mapImg.height;

			mapCtx = mapCanvas.getContext("2d");

			mapCtx.drawImage(mapImg, 0, 0);
			callback(mapCtx.getImageData(0, 0, mapImg.width, mapImg.height), mapImg.width, mapImg.height);
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

	function componentToHex(c) {
    	var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b) {
	    return componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	mod.checkComplete = function() {
		if (total == mod.score) {
			mod.complete = true;
		} else {
			mod.complete = false;
		}
	}

	mod.restart = function() {
		entities.destroy();
		input.reset();
		global.sprites = [];

		level = new Level(mod.num);
		level.generate();
	}

	mod.generate = function() {
		// destroy old collisions
		wallCollision.destroy();
		holeCollision.destroy();
		goalCollision.destroy();
		ghostCollision.destroy();

		wallCollision = game.CollisionGroup();
		holeCollision = game.CollisionGroup();
		goalCollision = game.CollisionGroup();
		ghostCollision = game.CollisionGroup();

		// draw level from png
		imgToData("res/level/level_"+num+".gif", function(map, width, height) {
			for (var i = 0; i < map.data.length; i += 4) {
				var index = i / 4;
				var y = Math.floor(index / width);
				var x = index - (y * width);

				var id = rgbToHex(map.data[i], map.data[i+1], map.data[i+2]);

				switch(id) {
					// dinosaur
					case "00ff00":
						drawTile(x, y);
						dinosaur = Dinosaur(x*32, y*32);
						camera = Camera();
						camera.following = dinosaur;
						camera.sprite.x = x*32;
						camera.sprite.y = y*32;
						break;
					// hole
					case "000000":
						Hole(x*32, y*32).sprite.order.back();
						break;
					// wall facing
					case "ff0000":
						Wall(x*32, y*32, 1).sprite.order.back();
						break;
					// wall top
					case "ee0000":
						Wall(x*32, y*32, 2).sprite.order.back();
						break;
					// human
					case "ffff00":
						total++;
						drawTile(x, y);
						Human(x*32, y*32);
						break;
					// goal
					case "ff00ff":
						Goal(x*32, y*32).sprite.order.back();
						break;
					// ghost
					case "959595":
						drawTile(x, y);
						Ghost(x*32, y*32);
						break;
					// floor tile
					default:
						drawTile(x, y);
						break;
				}
			}

			dinosaur.sprite.order.front();

			input.fnc = function(e) {
				dinosaur.controller(e);
			};

			scoreText = Text("saved "+mod.score+"/"+total);
			codeText = Text("code "+levelCode(mod.num));

			game.set.method(function() {
				// keys
				input.run();

				// update entities
				entities.update();

				// camera
				xOffset = Math.round(-camera.sprite.x+gameWidth/2-16);
				yOffset = Math.round(-camera.sprite.y+gameHeight/2-16)
				game.set.offset(xOffset, yOffset);

				scoreText.updateText("saved "+mod.score+"/"+total);
				scoreText.updateXY(-xOffset+8, -yOffset+8);
				codeText.updateXY(-xOffset+220, -yOffset+8);

			});

		});

	}

	mod.destroy = function() {
		dinosaur.destroy();
		camera.destroy();
		entities.destroy();
		mod = {};
	};


	return mod;
}