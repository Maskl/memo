describe('uppercaseSpecialEn', function() {

	beforeEach(function() {
		module('memo', function config($translateProvider) {
			$translateProvider.preferredLanguage('en');
		});
	});

	it('should uppercase special consonants', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter('tdnmrljckgfwvpbzs')).toEqual('TDNMRLJCKGFWVPBZS');
		expect(filter('TDNMRLJCKGFWVPBZS')).toEqual('TDNMRLJCKGFWVPBZS');

	}));


	it('should lowercase non-special consonants and vowels', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter('QXEYUIOA')).toEqual('qxeyuioa');
		expect(filter('qxeyuioa')).toEqual('qxeyuioa');

	}));


	it('should lowercase polish characters', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter('ęóąśłżźćń')).toEqual('ęóąśłżźćń');
		expect(filter('ĘÓĄŚŁŻŹĆŃ')).toEqual('ęóąśłżźćń');

	}));


	it('should not recognize polish digraphs', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter('chczdzdźdżrzsz')).toEqual('ChCZDZDźDżRZSZ');
		expect(filter('CHCZDZDŹDŻRZSZ')).toEqual('ChCZDZDźDżRZSZ');

	}));


	it('should leave special digits and characters', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter('123@#$!-:_ .,')).toEqual('123@#$!-:_ .,');

	}));


	it('should return empty string for empty string', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter('')).toEqual('');

	}));


	it('should leave incompatible types', inject(function($filter) {

		var filter = $filter('uppercaseSpecial');

		expect(filter(0)).toEqual(0);
		expect(filter(-328.547)).toEqual(-328.547);
		expect(filter(undefined)).toEqual(undefined);
		expect(filter(null)).toEqual(null);

	}));

});