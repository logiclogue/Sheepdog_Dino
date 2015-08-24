// Copyright Jordan Lord 2015
// Ludum Dare 33 game jam entry



var keys = {
	up: 87,
	down: 83,
	right: 68,
	left: 65,
	m: 77
};


input.fnc = function(e) {
	if (e[keys.m]) {
		mainMenu.select();
	} else if (e[keys.up]) {
		mainMenu.up();
	} else if (e[keys.down]) {
		mainMenu.down();
	}
}


game.start();