angular.module('memo').factory('majorSystemDict',function() {

	var majorSystemDict = {
		'pl': {
			't': '1',
			'd': '1',
			'n': '2',
			'm': '3',
			'r': '4',
			'l': '5',
			'j': '6',
			'c': '6',
			'k': '7',
			'g': '7',
			'f': '8',
			'w': '8',
			'p': '9',
			'b': '9',
			'z': '0',
			's': '0'
		},
		'en': {
			't': '2',
			'd': '2',
			'n': '3',
			'm': '4',
			'r': '5',
			'l': '6',
			'j': '7',
			'c': '7',
			'k': '8',
			'g': '8',
			'f': '9',
			'w': '9',
			'p': '0',
			'b': '0',
			'z': '1',
			's': '1'
		}
	};

	return majorSystemDict;
});