var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var savedSearches = require('./saved-searches.js');

router.get('/saved-searches', savedSearches.getall);
router.get('/saved-searches/:id', savedSearches.get);
router.post('/saved-searches', savedSearches.post);
router.put('/saved-searches/:id', savedSearches.put);
router.delete('/saved-searches/:id', savedSearches.delete);

app.use(bodyParser.json());

// stub authentication middleware
app.use(function (req, res, next) {
	req.user = {
		id: 123456789
	};

	next();
});

app.use('/', router);

// Start the server
app.listen(4545, '127.0.0.1');
console.log('running...');