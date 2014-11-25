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

router.get('/:num/:without?', function(req, res) {

	if (typeof req.params.num === 'undefined' || !/^[0-9]+$/.test("" + req.params.num)) {
		throw 'invalid number';
	}

	var without = null;
	if (typeof req.params.without !== 'undefined') {
		without = req.params.without.split(',');
	}

	findTranslation(req.params.num, without, getWordFromDB, function(out) {
		res.send(out);
	});

});

function getWordFromDB(code, without, successCallback, failCallback) {
	sqlConnection.query('SELECT `word` FROM `words` WHERE `code` = ?', code, function (err, rows, fields) {
		
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
