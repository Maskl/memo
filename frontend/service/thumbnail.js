angular.module('memo').factory('thumbnail', function($resource) {

	return $resource('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=:word', { callback: "JSON_CALLBACK" }, { 
		get: { 
			method: 'JSONP'
		} 
	});

});
