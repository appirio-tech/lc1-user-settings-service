// Get the packages we need
var express = require('express');

// Create our Express application
var app = express();

// Create our Express router
var router = express.Router();

router.get('/saved-searches', function(req, res) {
  res.json({ message: 'Will return all searches based on the user key' });
});

router.get('/saved-searches/:id', function(req, res) {
  res.json({ message: 'Will return a single search based on the id provided' });
});

router.post('/saved-searches', function(req, res) {
  res.json({ message: 'Will create a search based on the json provided' });
});

router.put('/saved-searches/:id', function(req, res) {
  res.json({ message: 'Will replace a search with matching id with the json provided !' });
});

router.delete('/saved-searches/:id', function(req, res) {
  res.json({ message: 'Will remove the search with matching id !' });
});

app.use('/', router);

// Start the server
app.listen(4545, '127.0.0.1');
console.log('running...');