angular.module('memo').factory('num', function($resource) {

	return $resource('http://localhost:3000/num/:id/:quality/:without', {}, { 
		get: { 
			method: 'GET',
			isArray: true 
		} 
	});

});
