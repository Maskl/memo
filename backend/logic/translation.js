findTranslation = function(lang, num, without, getWordFromDB, quality, callback, done, tryLen, out, iterations) {

	if (iterations > 100) {
		callback([]);
		return;
	}

	var croppedNum = num.substr(done, tryLen);

	if (typeof done == 'undefined') {
		if (!without) {
			without = [];
		}
		done = 0;
		tryLen = Math.floor(num.length / 2) + 1;
		out = [];
		iterations = 0;
		croppedNum = num;
	}

	getWordFromDB(lang, croppedNum, without, quality, function (word) {
		out.push(word);
		done += croppedNum.length;
		if (done === num.length) {
			callback(out);
			return;
		}

		// do not use the same word twice
		without.push(word);
		
		findTranslation(lang, num, without, getWordFromDB, quality, callback, done, num.length - done, out, iterations + 1);

	}, function() {
		
		tryLen = tryLen - 1;
		if (done + tryLen == num.length - 1) {
			// do not want one letter word at the end
			tryLen -= 1;
		}
		findTranslation(lang, num, without, getWordFromDB, quality, callback, done, tryLen, out, iterations + 1);

	});




}
