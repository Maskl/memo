angular.module('memo').directive('word', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'directive/word/word.html'
	};
});
