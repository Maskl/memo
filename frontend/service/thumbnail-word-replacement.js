angular.module('memo').factory('thumbnailWordReplacement',function() {

	// Images are fetching from english version of Google Images, so sometimes we get images of english words... (for example sum sing for polish word sum [kind of fish])
	// Below there are replacement for common words (for 1 and 2 digits codes).
	var thumbnailWordReplacement = {
		'pl': {
			'sum': 'sum ryba',
			'ser': 'ser żółty',
			'tata': 'ojciec',
			'noe': 'noe bible',
			'dno': 'dno oceanu',
			'dom': 'domek',
			'nos': 'nose',
			'nora': 'nora lisa',
			'nil': 'nil mapa',
			'noc': 'noc gwiazdy',
			'noga': 'leg',
			'mina': 'mina przeciwczołgowa',
			'mama': 'mother',
			'maja': 'pszczółka maja',
			'mak': 'mak czerwony',
			'rosa': 'dew',
			'rana': 'wound',
			'rama': 'rama obrazu',
			'rola': 'rola pole',
			'raj': 'raj eden',
			'rafa': 'rafa koralowa',
			'lina': 'rope',
			'lala': 'doll',
			'lej': 'lej w ziemi',
			'cesarz': 'cesarz cezar',
			'car': 'car rosja',
			'kosa': 'kosa sierp',
			'kij': 'stick',
			'kakao': 'cacao',
			'kupa': 'kupa psa',
			'wino': 'wine',
			'wór': 'worek',
			'wierzba': 'wierzba płacząca',
			'pies': 'dog',
			'but': 'shoe',
			'sos': 'sauce'
		},
		'en': {

		}
	};

	return thumbnailWordReplacement;
});