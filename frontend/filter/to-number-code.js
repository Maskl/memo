angular.module('memo').filter('toNumberCode', function(majorSystemDict, digraphsDict, _) {
	return function(input,arg) {

		if (typeof input !== 'string') {
			return '';
		}

		input = input.toLowerCase();

		_.each(digraphsDict, function(val, key) {
			input = input.replace(new RegExp(key, 'g'), '@'); // because drzź could remove firstly rz and then dź
		});

		input = input.replace(new RegExp('@', 'g'), '');

		var out = '';
		_.each(input, function(character) {
			if (character in majorSystemDict) {
				out += majorSystemDict[character];
			}
		});

		return out;
	};
});