describe('toNumberCodePl', function() {

	beforeEach(function() {
		module('memo', function config($translateProvider) {
			$translateProvider.preferredLanguage('pl');
		});
	});

	it('should properly translate special consonants', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('tdnmrljckgfwpbzs')).toEqual('1123456677889900');
		expect(filter('TDNMRLJCKGFWPBZS')).toEqual('1123456677889900');

	}));


	it('should return empty string non-special for consonants and vowels', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('QXVEYUIOA')).toEqual('');
		expect(filter('qxveyuioa')).toEqual('');

	}));


	it('should return empty string for polish characters', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('ęóąśłżźćń')).toEqual('');
		expect(filter('ĘÓĄŚŁŻŹĆŃ')).toEqual('');

	}));


	it('should return empty string for polish digraphs', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('chczdzdźdżrzsz')).toEqual('');
		expect(filter('CHCZDZDŹDŻRZSZ')).toEqual('');

	}));


	it('should return empty string for digits and characters', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('123@#$!-:_ .,')).toEqual('');

	}));


	it('should return null for invalid types', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter(undefined)).toEqual('');
		expect(filter(null)).toEqual('');
		expect(filter('')).toEqual('');

	}));

});