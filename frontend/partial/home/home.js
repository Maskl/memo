angular.module('memo').controller('HomeCtrl', function($scope, $resource, num){

	var without = [];
	$scope.result = [];
	$scope.quality = 0;
	$scope.num = '';

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

	$scope.$watch("quality", function(newValue, oldValue) {
		
		if (typeof newValue === 'undefined' || !/^[0-9]+$/.test("" + newValue)) {
			$scope.quality = oldValue;
			return;
		}

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
		if ($scope.num.length === 0) {
			$scope.result = [];
			return;
		}

		num.get({id: $scope.num, quality: $scope.quality, without: without}, function(data) {
			$scope.result = data;
		});
	}
});

