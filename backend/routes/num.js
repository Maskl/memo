var express = require('express');
var router = express.Router();

router.get('/:num/:without?', function(req, res) {

	out = [];
	if (req.params.num % 10 == 0) {
		out = ['kot', 'pies', 'czołg'];
	} else if (req.params.num % 10 == 1) {
		out = ['zebra', 'kaczka', 'mamut', 'mysz'];
	} else {
		out = [];
	}

	if (typeof req.params.without !== 'undefined') {
		out.push('ddddd');
	}

	res.send(out);
});

module.exports = router;
