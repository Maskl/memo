describe('toNumberCodeEn', function() {

	beforeEach(function() {
		module('memo', function config($translateProvider) {
			$translateProvider.preferredLanguage('en');
		});
	});

	it('should properly translate special consonants', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('tdnmrljckgfwvpbzs')).toEqual('11234566778889900');
		expect(filter('TDNMRLJCKGFWVPBZS')).toEqual('11234566778889900');

	}));


	it('should return empty string non-special for consonants and vowels', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('QXEYUIOA')).toEqual('');
		expect(filter('qxeyuioa')).toEqual('');

	}));


	it('should return empty string for polish characters', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('ęóąśłżźćń')).toEqual('');
		expect(filter('ĘÓĄŚŁŻŹĆŃ')).toEqual('');

	}));


	it('should not recognize polish digraph', inject(function($filter) {

		var filter = $filter('toNumberCode');

		expect(filter('chczdzdźdżrzsz')).toEqual('66010114000');
		expect(filter('CHCZDZDŹDŻRZSZ')).toEqual('66010114000');

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