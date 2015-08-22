var Entity = function() {

	this.sprite = new game.Sprite();

};


var Human = function() {

	this.sprite.image = "mainSprites_16";
	this.sprite.setAnimation("humanWalking", 100);
	this.sprite.direction = Math.PI;
	this.sprite.speed = 0.05;

	this.sprite.order.front();

};

Human.prototype = new Entity();