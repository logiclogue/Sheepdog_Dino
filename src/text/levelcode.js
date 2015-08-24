var levelCode = function(n) {
	var low = 0;
	var high = 1000001;

	n = "level___" + n;

	var pad = function(n, width, z) {
		z = z || '0';
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	};

	var indexLetter = function(input, n) {
		input = (input.substring(n, n+1)).toUpperCase();
		var alphabet = "*ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789_,";
		return alphabet.indexOf(input);
	};

	function rand(seed) {
		var x = 1;

		for (var i = 0; i < seed.length; i++) {
			if (x < 4294967295)	x *= indexLetter(seed, i);
			else x /= indexLetter(seed, i);
		}

		if (x > 4294967295) x /= indexLetter(seed, 0);

		x = Math.abs(x);
		x = Math.floor(x);
		  
		x ^= (x << 21);
		x ^= (x >>> 35);
		x ^= (x << 4);

		return (x / 4294967295) + 0.5;
	}

	n = rand(n);
	return Math.floor((n * (high - low)) + low);
};