angular.module('memo').factory('num', function($resource) {

	return $resource('http://localhost:3000/num/:id/:without', {}, { 
		get: { 
			method: 'GET', 
			params: { 
				bookId: '@id', 
				without: '@without' 
			}, 
			isArray: true 
		} 
	});

});
