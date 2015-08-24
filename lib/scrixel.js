// Scrixel.JS
// Copyright Jordan Lord 2015


// Global variables
publc = {
	delta: 0,
	xOffset: 0,
	yOffset: 0,
	cycles: 0,
	method: function() {}
};

var global = {
	images: {},
	loaded: { s: 0, f: 0 },
	sprites: [],
	animations: {},
	collisionGroups: []
};




// Main Constructor
var ScrixelGame = function() {};



// Constructor sprite
publc.Sprite = function() {
	// Declare
	var mod = {};


	// Private
	function removeFromArray() {
		global.sprites.splice(global.sprites.indexOf(mod), 1);
	}

	function indexOfMod() {
		return global.sprites.indexOf(mod);
	}


	// Public
	mod.speed = 0;
	mod.direction = 0;
	mod.x = 0;
	mod.y = 0;
	// previous x and y
	mod.pX = 0;
	mod.pY = 0;
	//
	mod.visible = true;
	mod.still = false;
	mod.image = "";
	mod.animation = { name: "", duration: 100, lastFrame: 0, index: 0 };
	mod.spriteType = "sprite";


	mod.setAnimation = function(name, duration) {
		mod.animation.name = name;
		mod.animation.duration = duration;
	};

	mod.order = {
		
		front: function() {
			removeFromArray();
			global.sprites.splice(global.sprites.length, 0, mod);
		},

		back: function() {
			removeFromArray();
			global.sprites.splice(0, 0, mod);
		},

		forward: function() {
			var index = indexOfMod();
			removeFromArray();
			global.sprites.splice(index+1, 0, mod);
		},

		backward: function() {
			var index = indexOfMod();
			removeFromArray();
			global.sprites.splice(index-1, 0, mod);
		},

		get: function() {
			return indexOfMod();
		},

		set: function(index) {
			removeFromArray();
			global.sprites.splice(index, 0, mod);
		}
	
	};

	mod.destroy = function() {
		if (global.sprites.indexOf(mod) >= 0) {
			removeFromArray();
			delete mod;
		}
	};


	global.sprites.push(mod);


	// Return
	return mod;
};

publc.Rect = function(fX, fY, lX, lY, colour) {
	// Declare
	var mod = publc.Sprite();


	// Private


	// Public
	mod.x = fX;
	mod.y = fY;
	mod.width = lX;
	mod.height = lY;

	mod.colour = colour;
	
	mod.spriteType = "rect";

	mod.destroy = function() {
		if (global.sprites.indexOf(mod) >= 0) {
			global.sprites.splice(global.sprites.indexOf(mod), 1);
			delete mod;
		}
	};

	global.sprites.push(mod);

	// Return
	return mod;
};




// Module set
publc.set = function() {
	// Declare
	var mod = {};


	// Private


	// Public
	mod.canvas = function(id, pixelWidth, pixelHeight) {
		var c = document.getElementById(id);
		global.ctx = c.getContext("2d");

		global.actualWidth = c.width;
		global.actualHeight = c.height;
		global.pixelWidth = pixelWidth;
		global.pixelHeight = pixelHeight;
		global.widthScale = global.actualWidth / pixelWidth;
		global.heightScale = global.actualHeight / pixelHeight;
	};

	mod.offset = function(xOffset, yOffset) {
		publc.xOffset = xOffset;
		publc.yOffset = yOffset;
	};

	mod.method = function(functionMethod) {
		publc.method = functionMethod;
	};

	mod.clear = function() {
		global.sprites = [];
		publc.method = function() {};
		global.collisionGroups = [];
	};


	// Return
	return mod;
}();



// Module load
publc.load = function() {
	// Declare
	var mod = {};


	// Private
	function getSprite(image, columns, rows, xSelect, ySelect) {
		// credit to: http://phoboslab.org/log/2012/09/drawing-pixels-is-hard
		var widthScaled = (image.width/columns) * global.widthScale;
		var heightScaled = (image.height/rows) * global.heightScale;

		var orig = document.createElement("canvas");
		orig.width = image.width;
		orig.height = image.height;
		var origCtx = orig.getContext("2d");
		origCtx.drawImage(image, 0, 0);
		var origPixels = origCtx.getImageData(0, 0, image.width, image.height);

		var scaled = document.createElement("canvas");
		scaled.width = widthScaled;
		scaled.height = heightScaled;
		var scaledCtx = scaled.getContext("2d");
		var scaledPixels = scaledCtx.getImageData(0, 0, widthScaled, heightScaled);

		for (var y = 0; y < heightScaled; y++) {
			for (var x = 0; x < widthScaled; x++) {
				var newY = y + (ySelect * heightScaled);
				var newX = x + (xSelect * widthScaled);
				var index = ((Math.floor(newY / global.heightScale) * image.width) + Math.floor(newX / global.widthScale)) * 4;
				var indexScaled = ((y * widthScaled) + x) * 4;

				scaledPixels.data[indexScaled] = origPixels.data[index];
				scaledPixels.data[indexScaled+1] = origPixels.data[index+1];
				scaledPixels.data[indexScaled+2] = origPixels.data[index+2];
				scaledPixels.data[indexScaled+3] = origPixels.data[index+3];
			}
		}

		scaledCtx.putImageData(scaledPixels, 0, 0);
		
		return scaled;
	}


	// Public
	mod.sprite = function(name, path) {
		var tempImg = new Image();
		tempImg.src = path;

		global.loaded.s += 1;

		tempImg.onload = function() {
			// saves the resized image to the global 'images' object
			global.images[name] = getSprite(tempImg, 1, 1, 0, 0);
			global.loaded.f += 1;
		};
	};

	mod.spriteSheet = function(name, path, columns, rows) {
		var tempImg = new Image();
		tempImg.src = path;

		global.loaded.s += columns * rows;

		tempImg.onload = function() {
			for (var x = 0; x < columns; x++) {
				for (var y = 0; y < rows; y++) {
					global.images[name + "_" + ((y * columns) + x)] = getSprite(tempImg, columns, rows, x, y);
					global.loaded.f += 1;
				}
			}
		};
	};


	// Return
	return mod;
}();



// Module add
publc.add = function() {
	// Declare
	var mod = {};


	// Private


	// Public
	mod.animation = function() {

	};


	// Return
	return mod;
}();



// Module collision group
publc.CollisionGroup = function() {
	// Declare
	var mod = {};


	mod.boxes = [];
	mod.groupRefs = [];
	mod.collisionFuncs = [];

	mod.addCollision = function(theCollisionGroup, theFunctions) {
		mod.groupRefs.push(theCollisionGroup);
		mod.collisionFuncs.push(theFunctions);
	};

	mod.removeCollision = function(theCollisionGroup) {
		var index = mod.groupRefs.indexOf(theCollisionGroup);

	}

	mod.testCollision = function(theCollisionGroup) {
		var colGroupIndex = mod.groupRefs.indexOf(theCollisionGroup)

		if (colGroupIndex > -1) {

			for (var a = 0; a < theCollisionGroup.boxes.length; a++) {
				for (var b = 0; b < mod.boxes.length; b++) {
					var boxB = theCollisionGroup.boxes[a];
					var boxA = mod.boxes[b];
					var collisionFuncs = mod.collisionFuncs[colGroupIndex];

					// if there is a collision
					if (boxA.x < boxB.x + boxB.w && boxA.x + boxA.w > boxB.x && boxA.y < boxB.y + boxB.h && boxA.y + boxA.h > boxB.y) {
						
						// left
						if (boxA.pX + boxA.w < boxB.x && boxA.x + boxA.w >= boxB.x && collisionFuncs.left !== undefined) {
							collisionFuncs.left(boxB);
						}
						
						// right
						if (boxA.pX >= boxB.x + boxB.w && boxA.x < boxB.x + boxB.w && collisionFuncs.right !== undefined) {
							collisionFuncs.right(boxB);
						}
						
						// top
						if (boxA.pY + boxA.h < boxB.y && boxA.y + boxA.h >= boxB.y && collisionFuncs.top !== undefined) {
							collisionFuncs.top(boxB);
						}
						
						// bottom
						if (boxA.pY >= boxB.y + boxB.h && boxA.y < boxB.y + boxB.h && collisionFuncs.bottom !== undefined) {
							collisionFuncs.bottom(boxB);
						}

						// all in
						if (boxA.x > boxB.x && boxA.x + boxA.w < boxB.x + boxB.w && boxA.y > boxB.y && boxA.y + boxA.h < boxB.y + boxB.h && collisionFuncs.all !== undefined) {
							collisionFuncs.all(boxB);
						}

						// general
						if (mod.collisionFuncs[colGroupIndex].general !== undefined) {
							collisionFuncs.general(boxB);
						}

					}
				}
			}

		}
	};

	mod.destroy = function() {
		mod.boxes = [];
		mod.groupRefs = [];
		mod.collisionFuncs = [];

		if (global.collisionGroups.indexOf(mod) >= 0) {
			global.collisionGroups.splice(global.collisionGroups.indexOf(mod), 1);
			delete mod;
		}
	};

	
	global.collisionGroups.push(mod);


	// Return
	return mod;
};



// Module collision box
publc.CollisionBox = function(x, y, w, h, group) {

	this.x = x;
	this.y = y;
	this.pX = x;
	this.pY = y;
	this.w = w;
	this.h = h;


	this.updateXY = function(x, y) {
		this.pX = this.x;
		this.pY = this.y;
		this.x = x;
		this.y = y;
	};


	group.boxes.push(this);

};



// Module animation
publc.animation = function() {
	// Declare
	var mod = {};


	// Private


	// Public
	mod.add = function(name, sprites) {
		global.animations[name] = {};
		global.animations[name].sprites = sprites;
	};


	// Return
	return mod;
}();



// Module update
global.update = function() {
	//Declare
	var mod = {};
	var lastFrameTimeMs = 0,
		maxFPS = 60,
		delta = 0,
		lastFpsUpdate = 0,
		framesThisSecond = 0,
		timestep = 1000/60,
		fps = 30,
		lastDelta = 0;

	var numTotal;


	// Private
	function update(delta) {
		// updates sprites
		for (var i = 0; i < global.sprites.length; i++) {
			if (!global.sprites[i].still) {
				// update sprite positions
				global.sprites[i].pX = global.sprites[i].x;
				global.sprites[i].pY = global.sprites[i].y;
				global.sprites[i].x += Math.sin(global.sprites[i].direction) * global.sprites[i].speed * delta;
				global.sprites[i].y += -Math.cos(global.sprites[i].direction) * global.sprites[i].speed * delta;
			}


			// animations
			// check to see if sprite has an animation assigned
			if (global.sprites[i].animation.name !== "") {
				var thisAnim = global.sprites[i].animation;

				// check to see if it's time for a new frame
				if (thisAnim.lastFrame + thisAnim.duration < new Date().getTime()) {
					//k = new Date().getTime() - (thisAnim.lastFrame + thisAnim.duration);
					//console.log(k);
					thisAnim.lastFrame = new Date().getTime();
					
					global.sprites[i].image = global.animations[thisAnim.name].sprites[thisAnim.index];

					(thisAnim.index >= global.animations[thisAnim.name].sprites.length - 1 ? thisAnim.index = 0 : thisAnim.index++);
				}
			}
		}

		// run method
		publc.method();

		// test collisions
		for (var a = 0; a < global.collisionGroups.length; a++) {
			for (var b = 0; b < global.collisionGroups.length; b++) {
				global.collisionGroups[a].testCollision(global.collisionGroups[b]);
			}
		}
	}

	function draw() {
		global.ctx.fillRect(0, 0, global.actualWidth, global.actualHeight);

		for (var i = 0; i < global.sprites.length; i++) {

			var drawLeft = drawRight = drawTop = drawBottom = false;

			if (global.sprites[i].image !== "") {
				drawLeft = -publc.xOffset < global.sprites[i].x + global.images[global.sprites[i].image].width / global.widthScale;
				drawRight = -publc.xOffset > global.sprites[i].x - global.pixelWidth;
				drawTop = -publc.yOffset < global.sprites[i].y + global.images[global.sprites[i].image].height / global.heightScale;
				drawBottom = -publc.yOffset > global.sprites[i].y - global.pixelHeight;
			}

			if (global.sprites[i].spriteType == "sprite" && global.sprites[i].visible && drawLeft && drawRight && drawTop && drawBottom) {

				global.ctx.drawImage(global.images[global.sprites[i].image], Math.round(global.sprites[i].x + publc.xOffset) * global.widthScale, Math.round(global.sprites[i].y + publc.yOffset) * global.heightScale);
			
			} else if (global.sprites[i].spriteType == "rect" && global.sprites[i].visible) {
			
				global.ctx.fillStyle = global.sprites[i].colour;
				global.ctx.fillRect(Math.round(global.sprites[i].x + publc.xOffset) * global.widthScale, Math.round(global.sprites[i].y + publc.yOffset) * global.heightScale, Math.round(global.sprites[i].width) * global.widthScale, Math.round(global.sprites[i].height) * global.heightScale);
			
			}
		}
	}


	// Public
	mod.gameLoop = function(timestamp) {
		if (window.requestAnimationFrame == null) timestamp = new Date().getTime();
		// credit to: http://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
		// also note: http://jsfiddle.net/IceCreamYou/rnqLfz14/6/light/
		if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
	        if (window.requestAnimationFrame != null) requestAnimationFrame(mod.gameLoop);
	        else setTimeout(mod.gameLoop, 1);
	        return;
	    }
		//console.log(delta);
		
	    delta = (timestamp - lastFrameTimeMs) + lastDelta;
	    lastFrameTimeMs = timestamp;

	    if (timestamp > lastFpsUpdate + 1000) {
	        fps = 0.25 * framesThisSecond + 0.75 * fps;
	        //console.log(fps);

	        lastFpsUpdate = timestamp;
	        framesThisSecond = 0;
	    }

	    framesThisSecond++;

	    var numUpdateSteps = 0;

	    //console.log(delta + ", " + timestep);
	    //timestep = 17;
	    while (delta >= timestep) {
	    	publc.cycles++;
	        update(timestep);
	        delta -= timestep;
	        if (++numUpdateSteps >= 240) {
	            delta = 0;
	            break;
	        }
	    }
	   	
	   	if (isNaN(delta) ? lastDelta = 0 : lastDelta = delta);
	    //lastDelta = delta;
	    //numTotal += numUpdateSteps;

	    draw();

		// call itself
		if (window.requestAnimationFrame != null) {
			window.requestAnimationFrame(mod.gameLoop);
		} else {
			setTimeout(mod.gameLoop, 1);
		}
	}
	/*setInterval(function() {
		console.log(numTotal);
		numTotal = 0;
	}, 1000);*/


	// Return
	return mod;
}();



// Module start
publc.start = function() {
	// this is where the game loop will be
	// Declare


	// Private
	check = setInterval(function() {
		if (global.loaded.s === global.loaded.f) {
			clearInterval(check);
			global.update.gameLoop();
		}
	}, 1);


	//Public
	

	//Return
};




// Set
ScrixelGame.prototype = publc;