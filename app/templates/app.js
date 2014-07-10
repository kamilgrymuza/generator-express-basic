'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send(200, {'data': 'Hello World!'});
});

module.exports = {'app': app};
