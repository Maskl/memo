angular.module('memo').controller('HomeCtrl', function($scope, $resource, num){

	var without = [];
	$scope.result = [];

	$scope.$watch("num", function(newValue, oldValue) {
		
		if (typeof newValue === 'undefined' || !/^[0-9]+$/.test("" + newValue)) {
			$scope.errorMessage = 'Invalid number!';
			$scope.result = [];
			return;
		}

		$scope.errorMessage = null;
		without = [];
		fetchNewWords();
	});

	
	$scope.addToWithoutArray = function(a, b, c) {
		if (typeof this.word !== 'undefined') {
			without.push(this.word);
		} else {
			without.push($scope.result.join('@'));
		}

		fetchNewWords();
	};

	function fetchNewWords() {
		num.get({id: $scope.num, without: without}, function(data) {
			$scope.result = data;
		});
	}
});

