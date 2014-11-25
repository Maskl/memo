angular.module('memo').filter('uppercaseSpecial', function(_, majorSystemDict, digraphsDict) {
	return function(input, arg) {

		if (typeof input !== 'string') {
			return input;
		}

		input = input.toLowerCase();

		var out = '';
		_.each(input, function(character) {
			if (character in majorSystemDict) {
				out += character.toUpperCase();
			} else {
				out += character.toLowerCase();
			}
		});

		_.each(digraphsDict, function(val, key) {
			out = out.replace(new RegExp(key.toUpperCase(), 'gi'), key.toLowerCase());
		});

		return out;
	};
});