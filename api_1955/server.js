// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");

var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('./server/config/mongoose')
require('./server/config/routes')(app)


// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})
