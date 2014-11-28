// Convert important consonants, for example: computer -> CoMPuTeR
angular.module('memo').filter('uppercaseSpecial', function($translate, _, majorSystemDict, digraphsDict) {
	return function(input, arg) {

		if (typeof input !== 'string') {
			return input;
		}

		var lang = $translate.use();

		input = input.toLowerCase();

		var out = '';
		_.each(input, function(character) {
			if (character in majorSystemDict[lang]) {
				out += character.toUpperCase();
			} else {
				out += character.toLowerCase();
			}
		});

		_.each(digraphsDict[lang], function(val, key) {
			out = out.replace(new RegExp(key.toUpperCase(), 'gi'), key.toLowerCase());
		});

		return out;
	};
});