var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var translation = require('../logic/translation')

var sqlConnection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'memo_dict'
});

sqlConnection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

    console.log('connected as id ' + sqlConnection.threadId);
});

router.get('/:lang/:num/:quality?/:without?', function(req, res) {

	if (typeof req.params.num === 'undefined' || !/^[0-9]+$/.test("" + req.params.num) || req.params.num.length > 20) {
		res.send([]);
		return;
	}

	if (typeof req.params.num === 'undefined' || !/^[1-9][0-9]*$/.test("" + req.params.quality)) {
		quality = 0;
	} else {
		quality = +req.params.quality;
	}

	var without = null;
	if (typeof req.params.without !== 'undefined') {
		without = req.params.without.split(',');
	}

	findTranslation(req.params.lang, req.params.num, without, getWordFromDB, quality, function(out) {
		res.send(out);
	});

});

function getWordFromDB(lang, code, without, quality, successCallback, failCallback) {
	if (lang.length != 2) {
		return;
	}
	var str = 'SELECT `word` FROM `words_' + lang + '` WHERE `code` = ?';
	var params = code;
	if (quality > 0) {
		str = 'SELECT `word` FROM `words_' + lang + '` WHERE `code` = ? AND `value` > ?';
		params = [code, quality];
	}

	sqlConnection.query(str, params, function (err, rows, fields) {
		
		if (err) {
			throw err;
		}

		for (var i = 0; i < rows.length; ++i) {
			
			var out = rows[i].word;
			if (without && without.indexOf(out) >= 0) {
				continue;
			}

			successCallback(out);	
			return;
		}

		failCallback();

	});
}

module.exports = router;
