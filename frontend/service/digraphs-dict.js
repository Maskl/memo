angular.module('memo').factory('digraphsDict',function() {

	var digraphsDict = {
		'pl': {
			'rz': true,
			'sz': true,
			'cz': true,
			'ch': true,
			'dz': true,
			'dż': true,
			'dź': true
		},
		'en': {

		}
	};

	return digraphsDict;
});