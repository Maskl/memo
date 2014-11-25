angular.module('memo').factory('Num', function($resource) {

	return $resource('http://localhost:3000/num/:id/:without', 
		{ id: '@id' }, { 
			get: { 
				method: 'GET', 
				params: { bookId: '@id', without: '@without' }, 
				isArray: true 
			} 
		} );

});




angular.module('memo').controller('HomeCtrl', function($scope, $resource, Num){

	$scope.result = [];
	$scope.without = [];

	$scope.addToWithoutArray = function(a, b, c) {
		if (typeof this.word !== 'undefined') {
			$scope.without.push(this.word);
		} else {
			$scope.without.push($scope.result.join('@'));
		}

		fetchNewWords();
	}


	$scope.$watch("num", function(newValue, oldValue) {
		
		if (typeof newValue == 'undefined' || ("" + newValue).length <= 0) {
			return;
		}

		$scope.without = [];

		fetchNewWords();
	});

	function fetchNewWords() {
		Num.get({id: $scope.num, without: $scope.without}, function(data) {
			console.log(data);
			$scope.result = data;
		});
	}
});

