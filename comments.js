// Create web server
var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Create express app
var app = express();

// Set up the logger
app.use(logger('dev'));

// Parse incoming form-encoded HTTP bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

// Create a new in-memory array
var comments = [];

// Get all comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// Create a new comment
app.post('/comments', function(req, res) {
  // Add the new comment from the post data
  comments.push({
    name: req.body.name,
    comment: req.body.comment,
    timestamp: Date.now(),
  });
  // Send a 201 Created response
  res.status(201).end();
});

// Start the server
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});