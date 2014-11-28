angular.module('memo').controller('HomeCtrl', function(_, $scope, $resource, $location, $translate, num, thumbnail, thumbnailWordReplacement){

	var without = [];
	var url = $location.url();
	if (url.indexOf('/pl') === 0) {
		$translate.use('pl');
	} else {
		$translate.use('en');
	}

	$scope.result = [];
	$scope.quality = 0;
	$scope.num = '';
	$scope.images = {};
	$scope.emptyNumber = true;
	$scope.invalidNumber = false;
	$scope.generatingWords = false;
	$scope.lang = $translate.use();
	for (var numStart in $location.search()) {
		$scope.num = numStart;
		break;
	}

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
		
		$location.search(newValue);

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

	$scope.showMain = function() {
		$scope.num = '';
		$location.search('');
	};

	$scope.switchLanguage = function() {
		$scope.lang = ($scope.lang === 'pl') ? 'en' : 'pl';
		var urlLang = $scope.lang === 'pl' ? '/pl' : '/';
		$location.url(urlLang + '?' + $scope.num);
	};
	
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

		$scope.inTyping = true;
		fetchNewWordsWithoutValidationDebounce();
	}

	function fetchNewWordsWithoutValidation() {
		$scope.generatingWords = true;
		num.get({id: $scope.num, quality: $scope.quality, without: without, lang: $scope.lang}, function(data) {
			$scope.result = data;
			$scope.inTyping = false;
			$scope.generatingWords = false;
			fetchImagesDebounce();
			setTimeout(function() {
				document.getElementById("num-input").focus(); // just for better interaction
			}, 500);
		});
	}

	function fetchImages() {
		_.each($scope.result, function (word) {
			if ($scope.images[word]) {
				return;
			}

			var searchWord = word.toLowerCase();
			if (searchWord in thumbnailWordReplacement[$scope.lang]) {
				searchWord = thumbnailWordReplacement[$scope.lang][searchWord];
			}			

			thumbnail.get({word: searchWord}, function(data) {
				if (typeof data === 'undefined' || typeof data.responseData === 'undefined' || typeof data.responseData.cursor === 'undefined' || typeof data.responseData.cursor.moreResultsUrl !== 'string' || typeof data.responseData.results === 'undefined' || typeof data.responseData.results.length <= 0)  {
					return;
				}
				
				$scope.images[word] = data.responseData.results[0];
			});		
		});
	
	}

	var fetchNewWordsWithoutValidationDebounce = _.debounce(fetchNewWordsWithoutValidation, 1000);
	var fetchImagesDebounce = _.debounce(fetchImages, 100);
});

