	findTranslation = function(num, without, getWordFromDB, callback) {

	getWordFromDB(num, without, function (word) {
		callback([word]);
	}, function() {
		callback([]);
	});

}
