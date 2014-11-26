angular.module('memo').controller('HomeCtrl', function($scope, $resource, num, thumbnail, _){

	var without = [];
	$scope.result = [];
	$scope.quality = 0;
	$scope.num = '';
	$scope.images = {};

	$scope.$watch("num", function(newValue, oldValue) {
		
		if (typeof newValue === 'undefined' || newValue.length <= 0) {
			$scope.emptyNumber = true;
			$scope.result = [];
			return;			
		} else if (!/^[0-9]+$/.test("" + newValue)) {
			$scope.invalidNumber = true;
			$scope.result = [];
			return;
		}

		$scope.emptyNumber = false;
		$scope.invalidNumber = false;
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

	
	$scope.addToWithoutArray = function() {
		if (typeof this.word !== 'undefined') {
			without.push(this.word);
		} else {
			without.push($scope.result.join('@'));
		}

		fetchNewWords();
	};

	$scope.isImageLoaded = function(word) {
		return word in $scope.images;
	};

	function fetchNewWords() {
		if ($scope.num.length === 0) {
			$scope.result = [];
			return;
		}

		num.get({id: $scope.num, quality: $scope.quality, without: without}, function(data) {
			$scope.result = data;
			fetchImages(data);
		});
	}

	function fetchImages(data) {

		_.each(data, function (word) {
			if ($scope.images[word]) {
				return;
			}

			thumbnail.get({word: word}, function(data, a, b, c) {
				if (typeof data === 'undefined' || typeof data.responseData === 'undefined' || typeof data.responseData.cursor === 'undefined' || typeof data.responseData.cursor.moreResultsUrl !== 'string' || typeof data.responseData.results === 'undefined' || typeof data.responseData.results.length <= 0)  {
					return;
				}

				var whatIndex = data.responseData.cursor.moreResultsUrl.indexOf('&q=');
				if (whatIndex <= 0) {
					return;
				}
				
				var what = data.responseData.cursor.moreResultsUrl.substr(whatIndex + 3);
				$scope.images[word] = data.responseData.results[0];
				console.log(what, data, a, b, c, word);
			});		
		});
		
	}
});

