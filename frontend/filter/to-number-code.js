// Convert word to number code, for example: computer -> 63914
angular.module('memo').filter('toNumberCode', function($translate, majorSystemDict, digraphsDict, _) {
	return function(input,arg) {

		if (typeof input !== 'string') {
			return '';
		}

		var lang = $translate.use();

		input = input.toLowerCase();

		_.each(digraphsDict[lang], function(val, key) {
			input = input.replace(new RegExp(key, 'g'), '@'); // because drzź could remove firstly rz and then dź
		});

		input = input.replace(new RegExp('@', 'g'), '');

		var out = '';
		_.each(input, function(character) {
			if (character in majorSystemDict[lang]) {
				out += majorSystemDict[lang][character];
			}
		});

		return out;
	};
});